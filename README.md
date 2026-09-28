# Convite digital — Lais & Lucas

30 de novembro de 2026 · Casa Maraponga Buffet · Fortaleza-CE

Inspirado no convite de Nayra & Italo, com a paleta branco + verde oliva + tons de azul (praia).

## Arquivos

- `index.html`: o convite (abre direto no navegador ou no GitHub Pages)
- `assets/musica-iris.mp3`: música que toca ao abrir o convite (Iris, The Goo Goo Dolls)
- `assets/presentes/`: fotos dos presentes (recortadas do PDF da lista)
- `assets/js/qrcode.js`: gerador de QR Code do Pix (biblioteca MIT, sem dependência externa)

## O que falta configurar

Tudo fica no começo do `<script>` do `index.html`:

| O quê | Onde | Observação |
|---|---|---|
| Foto do pré-wedding | salvar como `assets/pre-wedding.jpg` | Aparece sozinha no arco do topo; sem o arquivo, fica a ilustração de praia |
| WhatsApp dos noivos | `var WHATSAPP = ""` | Só dígitos, com DDI+DDD (ex.: `5585999999999`). Vazio = botões de WhatsApp escondidos |
| Lista de convidados | `var GUEST_LIST = []` | Vazia = aceita qualquer nome na confirmação |
| Pagamento com cartão | campo `card` de cada item em `GIFTS` / `VOUCHERS` | Com link preenchido, aparece o botão "Pagar com cartão" |

## Pix

O código Pix Copia e Cola e o QR Code são gerados no próprio convite (padrão BR Code do Banco Central),
já com o valor de cada presente, a partir da chave `laiskimberlybp@gmail.com`.
