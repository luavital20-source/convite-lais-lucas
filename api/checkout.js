/* Pagamento com cartão — Mercado Pago Checkout Pro (função serverless da Vercel).
   Variável de ambiente obrigatória na Vercel:
     MP_ACCESS_TOKEN = APP_USR-...   (Access Token de produção do Mercado Pago)
   Opcional:
     SITE_URL = https://seu-dominio  (para onde o convidado volta após pagar;
                                      por padrão usa o próprio domínio do convite) */
const PRESENTES = require('../presentes.js');

const MAX_INSTALLMENTS = 12;

function findItem(id, amount) {
  if (id === PRESENTES.free.id) {
    const value = Math.round(Number(amount) * 100) / 100;
    if (!Number.isFinite(value) || value < PRESENTES.free.min || value > PRESENTES.free.max) return null;
    return { id, name: PRESENTES.free.name, price: value };
  }
  const gift = PRESENTES.gifts.concat(PRESENTES.vouchers).find((g) => g.id === id);
  if (!gift) return null;
  return { id: gift.id, name: gift.id.startsWith('vale-') ? `${gift.name} R$ ${gift.price}` : gift.name, price: gift.price };
}

function siteUrl(req) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/+$/, '');
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const proto = req.headers['x-forwarded-proto'] || 'https';
  return `${proto}://${host}`;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const token = process.env.MP_ACCESS_TOKEN;
  if (!token) {
    return res.status(503).json({ error: 'Pagamento com cartão ainda não configurado (MP_ACCESS_TOKEN ausente).' });
  }

  let body = req.body || {};
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }

  const item = findItem(String(body.id || ''), body.amount);
  if (!item) return res.status(400).json({ error: 'Presente ou valor inválido.' });

  const base = siteUrl(req);
  const preference = {
    items: [{
      id: item.id,
      title: `${item.name} — Casamento Lais & Lucas`,
      quantity: 1,
      currency_id: 'BRL',
      unit_price: item.price
    }],
    back_urls: {
      success: `${base}/?pagamento=aprovado`,
      pending: `${base}/?pagamento=pendente`,
      failure: `${base}/?pagamento=falhou`
    },
    auto_return: 'approved',
    statement_descriptor: 'LAIS E LUCAS',
    external_reference: `presente:${item.id}:${Date.now()}`,
    payment_methods: {
      installments: MAX_INSTALLMENTS,
      // só cartão (e saldo Mercado Pago); Pix sem taxa fica pela chave direta do convite
      excluded_payment_types: [{ id: 'ticket' }, { id: 'bank_transfer' }, { id: 'atm' }]
    }
  };

  try {
    const mp = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(preference)
    });
    const data = await mp.json().catch(() => ({}));
    if (!mp.ok || !data.init_point) {
      console.error('Mercado Pago recusou a preferência', mp.status, data);
      return res.status(502).json({ error: 'Não foi possível iniciar o pagamento. Tente novamente em instantes.' });
    }
    return res.status(200).json({ url: data.init_point });
  } catch (err) {
    console.error('Erro ao falar com o Mercado Pago', err);
    return res.status(502).json({ error: 'Não foi possível iniciar o pagamento. Tente novamente em instantes.' });
  }
};
