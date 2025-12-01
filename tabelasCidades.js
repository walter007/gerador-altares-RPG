const tabelaCidade = [
  { tipo: "Aldeia", p1: "Olden", p2: "lann" },
  { tipo: "Aldeia", p1: "Ulin", p2: "nash" },
  { tipo: "Vilarejo", p1: "Naig", p2: "bur" },
  { tipo: "Vilarejo", p1: "Soler", p2: "brid" },
  { tipo: "Vilarejo", p1: "Casti", p2: "valis" },
  { tipo: "Vilarejo", p1: "Morin", p2: "beine" },
  { tipo: "Vilarejo", p1: "Ester", p2: "don" },
  { tipo: "Forte", p1: "Arch", p2: "mor" },
  { tipo: "Forte", p1: "Vlan", p2: "cree" },
  { tipo: "Forte", p1: "Teran", p2: "lond" },
  { tipo: "Porto", p1: "Lang", p2: "bar" },
  { tipo: "Porto", p1: "Dakk", p2: "nor" },
  { tipo: "Porto", p1: "Notum", p2: "held" },
  { tipo: "Burgo", p1: "Morden", p2: "gar" },
  { tipo: "Burgo", p1: "Krud", p2: "dorf" },
  { tipo: "Burgo", p1: "Rosdar", p2: "velon" },
  { tipo: "Grande", p1: "Glon", p2: "krum" },
  { tipo: "Metrópole", p1: "Crak", p2: "ia" }
];

const estabelecimentosPorTipo = {
  "Aldeia": [
    "Taverna",
    "Fazenda"
  ],
  "Vilarejo": [
    "Taverna",
    { simples: 2 }
  ],
  "Forte": [
    "Taverna",
    "Estábulo",
    "Quartel",
    { simples: 2 },
    { decente: 1 }
  ],
  "Porto": [
    "Taverna",
    "Cais",
    "Estaleiro",
    { simples: 1 },
    { decente: 2 }
  ],
  "Burgo": [
    "Palácio",
    "Hospedaria",
    { simples: 1 },
    { decente: 1 },
    { nobre: 1 }
  ],
  "Grande": [
    "Palácio",
    "Hospedaria",
    { simples: 2 },
    { decente: 2 },
    { nobre: 2 }
  ],
  "Metrópole": [
    "Taverna", "Fazenda", "Estábulo", "Cais", "Estaleiro", "Palácio", "Hospedaria",
    "Mercearia", "Ferreiro", "Alfaiate", "Templo", "Quartel", "Guilda", "Bazar",
    "Luteiro", "Torre", "Apotecário", "Arena", "Laboratório", "Biblioteca", "Academia"
  ]
};

const tabelaEstabelecimentos = [
  { simples: "Taverna", decente: "Hospedaria", nobre: "Apotecário" },
  { simples: "Mercearia", decente: "Quartel", nobre: "Arena" },
  { simples: "Ferreiro", decente: "Guilda", nobre: "Laboratório" },
  { simples: "Alfaiate", decente: "Bazar", nobre: "Biblioteca" },
  { simples: "Estábulo", decente: "Luteiro", nobre: "Palácio" },
  { simples: "Templo", decente: "Torre", nobre: "Academia" }
];

detalhesEstabelecimentos = {
     "Apotecário": {
        "tipoItes": "Apotecário",
        "itensExclusivos": [
            "Ervas Medicinais",
            "Solução Explosiva",
            "Poção de Vitalidade",
            "Elixir Universal",
            "Semente de Mandrágora",
            "Pó Prismático"
        ]
     },
     "Apotecário": {
        "tipoItes": "Alfaiate"
     },
     "Apotecário": {
        "tipoItes": "Apotecário",
        "itensExclusivos": [
            "Ervas Medicinais",
            "Solução Explosiva",
            "Poção de Vitalidade",
            "Elixir Universal",
            "Semente de Mandrágora",
            "Pó Prismático"
        ]
     },
     "Apotecário": {
        "tipoItes": "Apotecário",
        "itensExclusivos": [
            "Ervas Medicinais",
            "Solução Explosiva",
            "Poção de Vitalidade",
            "Elixir Universal",
            "Semente de Mandrágora",
            "Pó Prismático"
        ]
     }
}
