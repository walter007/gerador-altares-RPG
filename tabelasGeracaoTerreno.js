

const geracaoTerrenos = [
  {
    terrenoPredominante: "Costeiro",
    chanceTerreno: [
      { nome: "Planície", intervalo: "1-5" },
      { nome: "Costeiro", intervalo: "6-9" },
      { nome: "Aquático", intervalo: "10-16" },
      { nome: "Deserto", intervalo: null },
      { nome: "Floresta", intervalo: null },
      { nome: "Colinas", intervalo: "17" },
      { nome: "Selva", intervalo: "18" },
      { nome: "Montanha", intervalo: null },
      { nome: "Pântano", intervalo: "19-20" }
    ]
  },
  {
    terrenoPredominante: "Planície",
    chanceTerreno: [
      { nome: "Planície", intervalo: "1-10" },
      { nome: "Costeiro", intervalo: "11-12" },
      { nome: "Aquático", intervalo: "13-14" },
      { nome: "Deserto", intervalo: "15" },
      { nome: "Floresta", intervalo: "16-17" },
      { nome: "Colinas", intervalo: "18-19" },
      { nome: "Selva", intervalo: "20" },
      { nome: "Montanha", intervalo: null },
      { nome: "Pântano", intervalo: null }
    ]
  },
  {
    terrenoPredominante: "Aquático",
    chanceTerreno: [
      { nome: "Planície", intervalo: "1" },
      { nome: "Costeiro", intervalo: "2-8" },
      { nome: "Aquático", intervalo: "9-18" },
      { nome: "Deserto", intervalo: null },
      { nome: "Floresta", intervalo: null },
      { nome: "Colinas", intervalo: null },
      { nome: "Selva", intervalo: null },
      { nome: "Montanha", intervalo: null },
      { nome: "Pântano", intervalo: "19-20" }
    ]
  },
  {
    terrenoPredominante: "Deserto",
    chanceTerreno: [
      { nome: "Planície", intervalo: "1-4" },
      { nome: "Costeiro", intervalo: null },
      { nome: "Aquático", intervalo: null },
      { nome: "Deserto", intervalo: "6-15" },
      { nome: "Floresta", intervalo: null },
      { nome: "Colinas", intervalo: "16-19" },
      { nome: "Selva", intervalo: null },
      { nome: "Montanha", intervalo: "20" },
      { nome: "Pântano", intervalo: null }
    ]
  },
  {
    terrenoPredominante: "Floresta",
    chanceTerreno: [
      { nome: "Planície", intervalo: "1-3" },
      { nome: "Costeiro", intervalo: null },
      { nome: "Aquático", intervalo: "4-5" },
      { nome: "Deserto", intervalo: null },
      { nome: "Floresta", intervalo: "6-12" },
      { nome: "Colinas", intervalo: "13-14" },
      { nome: "Selva", intervalo: "15-16" },
      { nome: "Montanha", intervalo: "17" },
      { nome: "Pântano", intervalo: "18-20" }
    ]
  },
  {
    terrenoPredominante: "Colinas",
    chanceTerreno: [
      { nome: "Planície", intervalo: "1-3" },
      { nome: "Costeiro", intervalo: null },
      { nome: "Aquático", intervalo: "4" },
      { nome: "Deserto", intervalo: "5" },
      { nome: "Floresta", intervalo: "6-7" },
      { nome: "Colinas", intervalo: "8-12" },
      { nome: "Selva", intervalo: "13-15" },
      { nome: "Montanha", intervalo: "17-19" },
      { nome: "Pântano", intervalo: "20" }
    ]
  },
  {
    terrenoPredominante: "Selva",
    chanceTerreno: [
      { nome: "Planície", intervalo: "1" },
      { nome: "Costeiro", intervalo: null },
      { nome: "Aquático", intervalo: "2-3" },
      { nome: "Deserto", intervalo: null },
      { nome: "Floresta", intervalo: "4-5" },
      { nome: "Colinas", intervalo: "6-7" },
      { nome: "Selva", intervalo: "8-14" },
      { nome: "Montanha", intervalo: "15" },
      { nome: "Pântano", intervalo: "16-20" }
    ]
  },
  {
    terrenoPredominante: "Montanha",
    chanceTerreno: [
      { nome: "Planície", intervalo: null },
      { nome: "Costeiro", intervalo: null },
      { nome: "Aquático", intervalo: null },
      { nome: "Deserto", intervalo: null },
      { nome: "Floresta", intervalo: "1-3" },
      { nome: "Colinas", intervalo: "4-8" },
      { nome: "Selva", intervalo: "9" },
      { nome: "Montanha", intervalo: "10-19" },
      { nome: "Pântano", intervalo: "20" }
    ]
  },
  {
    terrenoPredominante: "Pântano",
    chanceTerreno: [
      { nome: "Planície", intervalo: "1" },
      { nome: "Costeiro", intervalo: "2" },
      { nome: "Aquático", intervalo: "3-5" },
      { nome: "Deserto", intervalo: null },
      { nome: "Floresta", intervalo: "6-7" },
      { nome: "Colinas", intervalo: "8-9" },
      { nome: "Selva", intervalo: "10-12" },
      { nome: "Montanha", intervalo: "13" },
      { nome: "Pântano", intervalo: "14-20" }
    ]
  }
];

window.chancePontoInteresse  = [
  {
    terreno: "Planície",
    chance: {
      A: "1-4",
      B: "1-2",
      C: "1-8",
      D: "1-6"
    }
  },
  {
    terreno: "Costeiro",
    chance: {
      A: "1-6",
      B: "1-3",
      C: "1-10",
      D: "1-8"
    }
  },
  {
    terreno: "Aquático",
    chance: {
      A: "1-2",
      B: "1",
      C: "1-6",
      D: "1-8"
    }
  },
  {
    terreno: "Deserto",
    chance: {
      A: "1-2",
      B: "1-3",
      C: "1-4",
      D: "1-6"
    }
  },
  {
    terreno: "Floresta",
    chance: {
      A: "1-4",
      B: "1-3",
      C: "1-8",
      D: "1-6"
    }
  },
  {
    terreno: "Colinas",
    chance: {
      A: "1-4",
      B: "1-2",
      C: "1-6",
      D: "1-5"
    }
  },
  {
    terreno: "Selva",
    chance: {
      A: "1-3",
      B: "1",
      C: "1-6",
      D: "1-4"
    }
  },
  {
    terreno: "Montanha",
    chance: {
      A: "1-2",
      B: "1",
      C: "1-6",
      D: "1-4"
    }
  },
  {
    terreno: "Pântano",
    chance: {
      A: "1-2",
      B: "1",
      C: "1-4",
      D: "1-4"
    }
  }
];

window.chanceTipoPontoInteresse = [
  {
    terreno: "Planície",
    tipoPI: [
      { nome: "Cidade", chance: "1-5" },
      { nome: "Monstruoso", chance: "6-7" },
      { nome: "NPC", chance: "8-10" },
      { nome: "Divino", chance: "11-12" },
      { nome: "Militar", chance: "13-14" },
      { nome: "Mágico", chance: "15-16" },
      { nome: "Geográfico", chance: "17-18" },
      { nome: "Aventura", chance: "19-20" }
    ]
  },
  {
    terreno: "Costeiro",
    tipoPI: [
      { nome: "Cidade", chance: "1-8" },
      { nome: "Monstruoso", chance: "9-10" },
      { nome: "NPC", chance: "11-14" },
      { nome: "Divino", chance: "15" },
      { nome: "Militar", chance: "16" },
      { nome: "Mágico", chance: "17" },
      { nome: "Geográfico", chance: "18" },
      { nome: "Aventura", chance: "19-20" }
    ]
  },
  {
    terreno: "Aquático",
    tipoPI: [
      { nome: "Monstruoso", chance: "1-8" },
      { nome: "NPC", chance: "9-15" },
      { nome: "Geográfico", chance: "16-20" }
    ]
  },
  {
    terreno: "Deserto",
    tipoPI: [
      { nome: "Cidade", chance: "1-2" },
      { nome: "Monstruoso", chance: "3-9" },
      { nome: "NPC", chance: "10-12" },
      { nome: "Divino", chance: "13" },
      { nome: "Militar", chance: "14" },
      { nome: "Mágico", chance: "15" },
      { nome: "Geográfico", chance: "16-18" },
      { nome: "Aventura", chance: "19-20" }
    ]
  },
  {
    terreno: "Floresta",
    tipoPI: [
      { nome: "Cidade", chance: "1-4" },
      { nome: "Monstruoso", chance: "5-8" },
      { nome: "NPC", chance: "9-11" },
      { nome: "Divino", chance: "12" },
      { nome: "Militar", chance: "13" },
      { nome: "Mágico", chance: "14" },
      { nome: "Geográfico", chance: "15-18" },
      { nome: "Aventura", chance: "19-20" }
    ]
  },
  {
    terreno: "Colinas",
    tipoPI: [
      { nome: "Cidade", chance: "1-4" },
      { nome: "Monstruoso", chance: "5-8" },
      { nome: "NPC", chance: "9-11" },
      { nome: "Divino", chance: "12-13" },
      { nome: "Militar", chance: "14-15" },
      { nome: "Mágico", chance: "16" },
      { nome: "Geográfico", chance: "17-18" },
      { nome: "Aventura", chance: "19-20" }
    ]
  },
  {
    terreno: "Selva",
    tipoPI: [
      { nome: "Cidade", chance: "1" },
      { nome: "Monstruoso", chance: "2-10" },
      { nome: "NPC", chance: "11-12" },
      { nome: "Divino", chance: "13" },
      { nome: "Militar", chance: "14" },
      { nome: "Mágico", chance: "15" },
      { nome: "Geográfico", chance: "16-19" },
      { nome: "Aventura", chance: "20" }
    ]
  },
  {
    terreno: "Montanha",
    tipoPI: [
      { nome: "Cidade", chance: "1" },
      { nome: "Monstruoso", chance: "2-7" },
      { nome: "NPC", chance: "8-10" },
      { nome: "Divino", chance: "11-12" },
      { nome: "Militar", chance: "13-14" },
      { nome: "Mágico", chance: "15" },
      { nome: "Geográfico", chance: "16-18" },
      { nome: "Aventura", chance: "19-20" }
    ]
  },
  {
    terreno: "Pântano",
    tipoPI: [
      { nome: "Cidade", chance: "1" },
      { nome: "Monstruoso", chance: "2-8" },
      { nome: "NPC", chance: "9-10" },
      { nome: "Divino", chance: "11" },
      { nome: "Militar", chance: "12" },
      { nome: "Mágico", chance: "13" },
      { nome: "Geográfico", chance: "14-18" },
      { nome: "Aventura", chance: "19-20" }
    ]
  }
];

const custoMovimento = {
  "Planície": 1,
  "Costeiro": 2,
  "Aquático": 3,
  "Deserto": 2,
  "Floresta": 2,
  "Colinas": 2,
  "Selva": 3,
  "Montanha": 3,
  "Pântano": 3
};