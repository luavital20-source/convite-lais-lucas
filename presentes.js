/* Lista de presentes — usada pelo convite (navegador) e pela função de
   pagamento com cartão (api/checkout.js), que confere o preço no servidor.
   Para mudar um presente ou preço, edite só aqui. */
(function (root) {
  var PRESENTES = {
    gifts: [
      { id: "travesseiros",   name: "Kit Travesseiro Antialérgico Impermeável",      price: 85 },
      { id: "ferro",          name: "Ferro de Passar Roupa a Seco VFA Black+Decker", price: 119 },
      { id: "toalhas",        name: "Jogo de Toalha de Banho Buddemeyer",            price: 155 },
      { id: "liquidificador", name: "Liquidificador 1400 Full Oster Preto",          price: 179 },
      { id: "jogo-cama",      name: "Jogo de Cama Queen 200 Fios Karsten",           price: 250 },
      { id: "jogo-jantar",    name: "Jogo de Jantar 30 Peças Oxford",                price: 340 },
      { id: "panela-pressao", name: "Panela de Pressão Elétrica Electrolux PCE20",   price: 369 },
      { id: "air-fryer",      name: "Air Fryer Mondial Forno Oven",                  price: 459 },
      { id: "jogo-panelas",   name: "Jogo de Panelas Tramontina Solar em Aço Inox",  price: 569 },
      { id: "purificador",    name: "Purificador de Água FR600",                     price: 639 },
      { id: "fogao",          name: "Fogão Consul CFO4NAR 4 Bocas Inox",             price: 899 },
      { id: "maquina-lavar",  name: "Máquina de Lavar 9kg Brastemp",                 price: 1199 }
    ],
    vouchers: [
      { id: "vale-200", name: "Vale-presente", price: 200 },
      { id: "vale-300", name: "Vale-presente", price: 300 },
      { id: "vale-400", name: "Vale-presente", price: 400 }
    ],
    /* contribuição com valor livre no cartão (em reais) */
    free: { id: "livre", name: "Contribuição livre", min: 20, max: 10000 }
  };
  if (typeof module !== "undefined" && module.exports) module.exports = PRESENTES;
  else root.PRESENTES = PRESENTES;
})(this);
