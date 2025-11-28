const aventuras = [
  {
    id: 1,
    nome: "O resgate na Floresta dos Goblins",
    gancho: "Aldeões relatam que Goblins estão mais organizados que o comum e roubaram um objeto precioso. Há rumores de um Ogro liderando-os.",
    inicio: "O grupo chega à orla da floresta densa. O cheiro de chuva e terra molhada é forte, e trilhas de destruição indicam que algo grande passou por ali recentemente.",
    cenas: [
      {
        dado: 1,
        parte1: "Barranco escorregadio no meio do caminho",
        parte2: "Árvore muito antiga coberta por inscrições desconhecidas",
        parte3: "Começa uma chuva intensa que dificulta a visão"
      },
      {
        dado: 2,
        parte1: "Árvore imensa caída no meio do caminho",
        parte2: "Placa de madeira mal feita escrita \"Va imbora humanos fedidos\"",
        parte3: "Colmeia em uma árvore e muitas abelhas por todo lugar"
      },
      {
        dado: 3,
        parte1: "Rio com correnteza forte",
        parte2: "Cogumelos estranhos entre as árvores",
        parte3: "3 Goblins Bucha distraídos"
      },
      {
        dado: 4,
        parte1: "Fenda no chão e apenas uma ponte de cordas para atravessar",
        parte2: "Cordas amarradas de uma árvore em outra",
        parte3: "1 Urso devorando uma presa"
      },
      {
        dado: 5,
        parte1: "Espinhos por todo o chão",
        parte2: "Um acampamento abandonado",
        parte3: "Kaprotauro Sentinela sentado no chão afiando seu machado"
      },
      {
        dado: 6,
        parte1: "Local totalmente enlamaçado que dificulta a movimentação",
        parte2: "Borboletas coloridas em volta de uma árvore específica",
        parte3: "1 Troll dormindo profundamente"
      }
    ],
    complicacao: [
      { dado: 1, evento: "Uma árvore cai no meio do caminho do grupo" },
      { dado: 2, evento: "O pé do alvo afunda no chão e fica preso" },
      { dado: 3, evento: "Grande galho cai do alto em cima de alguém" },
      { dado: 4, evento: "3 Lobos famintos pulam de trás das moitas" },
      { dado: 5, evento: "1 Goblin Bruxo e 3 Goblins Bucha saem de trás das árvores" },
      { dado: 6, evento: "4 Goblins Inflamáveis vem correndo em direção do grupo" }
    ],
    busca: [
      { dado: 1, item: "[Complicação] e role novamente aqui." },
      { dado: 2, item: "Pedaços de ossos de animais" },
      { dado: 3, item: "Mochila de aventureiro rasgada" },
      { dado: 4, item: "Objeto que revela o objetivo do Ogro" },
      { dado: 5, item: "Poção de Vitalidade" },
      { dado: 6, item: "Pedra Preciosa aleatória (pág 40)" }
    ],
    inspiracao: {
      parte1: ["Ossos", "Folhas", "Nuvens", "Árvore", "Guerra", "Machado"],
      parte2: ["Rainha Naga", "Goblin", "Chuva", "Gritos", "Vida", "Correnteza"]
    },
    chefe: {
        nome: "LOROGH, O OGRO",
        recompensa: "MACHADO DA LUA GLACIAL"
    },
    encontroFinal: "Lorogh e um Goblin Bucha amarrando a vitima na árvore. O Goblin ficará ao lado da vitima para garantir que ele não se solte",
    bioma:"Floresta"
  }
];