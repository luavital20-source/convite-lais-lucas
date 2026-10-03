# Convite digital — Lais & Lucas

30 de novembro de 2026 · Casa Maraponga Buffet · Fortaleza-CE

Inspirado no convite de Nayra & Italo, com a paleta branco + verde oliva + tons de azul (praia).

## Arquivos

- `index.html`: o convite (abre direto no navegador ou no GitHub Pages)
- `assets/musica-iris.mp3`: música que toca ao abrir o convite (Iris, The Goo Goo Dolls)
- `assets/presentes/`: fotos dos presentes (recortadas do PDF da lista)
- `assets/js/qrcode.js`: gerador de QR Code do Pix (biblioteca MIT, sem dependência externa)

## Configuração

No começo do `<script>` do `index.html`:

| O quê | Onde | Situação |
|---|---|---|
| WhatsApp dos noivos | `var WHATSAPP` | `5585984537058` |
| Lista de convidados | `var GUEST_LIST = []` | Vazia = aceita qualquer nome na confirmação |

Os presentes (nome, preço, foto) ficam em `presentes.js`. A foto de cada um é `assets/presentes/<id>.jpg`.

## Pix

O código Pix Copia e Cola e o QR Code são gerados no próprio convite (padrão BR Code do Banco Central),
já com o valor de cada presente, a partir da chave `laiskimberlybp@gmail.com`. Não passa pelo Mercado Pago (sem taxa).

## Cartão — Mercado Pago (Checkout Pro)

O botão "Pagar com cartão" chama a função `api/checkout.js`, que cria o pagamento no Mercado Pago
e leva o convidado para a página segura deles (crédito em até 12x). O preço é conferido no servidor
a partir de `presentes.js`, então ninguém consegue mudar o valor pelo navegador.

Para ativar na Vercel:

1. Importar este repositório na Vercel (sem build: Framework Preset "Other").
2. Em **Settings → Environment Variables**, criar `MP_ACCESS_TOKEN` com o **Access Token de produção**
   (começa com `APP_USR-`), pego em Mercado Pago → Suas integrações → Credenciais de produção.
3. Fazer um novo deploy (Deployments → Redeploy) para a variável valer.

Opcional: `SITE_URL` (ex.: `https://lais-e-lucas.vercel.app`) se quiser fixar o endereço de volta após o pagamento;
sem ela, o convidado volta para o mesmo domínio em que abriu o convite.

Depois do pagamento o convidado volta ao convite com um aviso ("Muito obrigado!", "em análise" ou "não concluído").
Os pagamentos aparecem na conta do Mercado Pago com a descrição "<presente> — Casamento Lais & Lucas".
