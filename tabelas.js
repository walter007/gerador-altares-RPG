

// Tabelas
const precisa = [
  "Recuperar","Proteger","Investigar","Destruir","Libertar","Escoltar","Resgatar","Impedir",
  "Descobrir","Purificar","Capturar","Entregar","Explorar","Reativar","Roubar","Convencer",
  "Selar","Libertar","Despertar","Erradicar"
];

const objeto = [
  "Artefato","Espírito","Monstro","Cidade","Relíquia","Maldição","Amigo","Livro","Herdeiro","Animal",
  "Pessoa","Feiticeiro","Herói","Vilão","Monstro","Fortaleza","Cidade","Orbe","Portal","Arma"
];

const situacao = [
  "Roubado","Perdido","Corrompido","Esquecido","Selado","Destruído","Invocado","Traído","Profanado","Escondido",
  "Transformado","Atacado","Amaldiçoado","Guardado","Contaminado","Raptado","Enfeitiçado","Silenciado","Dividido","Preso"
];

const local = [
  "Em uma floresta","Em uma planície","Em uma montanha","Em um deserto","Em um pântano","Em uma caverna","Sob as águas","Em uma cidade",
  "Em uma caverna","Em uma Dungeon","Em um templo","Em um Ponto Geográfico","Em um Ponto Militar","Em um Ponto Monstruoso","Em uma vila",
  "Em uma aldeia","Em um local esquecido","Em outro Plano","Em um Ponto Mágico","Submerso"
];


//Encontros
const encontrosPorBioma = {
  planicie: [
    ["4 Goblin Bucha", "4 Goblin Bucha e 1 Bruxo", "1 Ogro Mercenário e 1 Ogro Brigão"],
    ["1 Kaprotauro Guerreiro", "1 Kaprotauro Lanceiro e 1 Curandeiro", "2 Goblin Bucha e 1 Troll Capenga"],
    ["2 Ladrões", "2 Javalis", "2 Kaprotauro Lanceiro e 1 Curandeiro"],
    ["1 Ogro Brigão", "2 Soldados", "2 Nagas Soldado e 1 Mística"]
  ],
  floresta: [
    ["2 Ninhadas de Aracnídeos", "1 Aracna Gigante", "4 Boitatás"],
    ["2 Plantas Ambulantes", "2 Limos Vivos", "2 Plantas Ambulantes e 3 Cuspidores"],
    ["2 Bolhas Gelatinosas", "3 Boitatás", "2 Kaprotauro Lanceiro e 1 Kaprotauro Curandeiro"],
    ["2 Fungos Protetores e 2 Atiradores", "4 Fungos Protetores e 1 Fungo Mestre", "4 Fungos Protetores e 3 Fungo Mestre"]
  ],
  selva: [
    ["1 Leão", "1 Leão e 1 Pantera", "2 Leões e 1 Pantera"],
    ["3 Serpentes Constritoras", "2 Nagas Soldado", "2 Nagas Soldado e 1 Mística"],
    ["1 Naga Soldado", "Urso Preto", "2 Goblins Bucha e 1 Troll Capenga"],
    ["2 Javalis", "Quimera Grotesca", "Urso Pardo"]
  ],
  deserto: [
    ["3 Abutres", "4 Abutres", "1 Ogro Mercenário e 1 Ogro Brigão"],
    ["2 Ladrões", "3 Ladrões", "Verme Devorador + 2 Abutres"],
    ["1 Ogro Brigão", "1 Ogro Mercenário", "1 Ogro Mercenário + 3 Goblins Bucha"],
    ["4 Goblin Bucha", "Verme Devorador", "2 Rumas Soldado + 2 Rumas Ladrão"]
  ],
  colina: [
    ["2 Harpias", "2 Harpias e 1 Abutre", "2 Harpias e 1 Quimera Grotesca"],
    ["3 Lobos", "Urso Preto", "Urso Pardo"],
    ["Leão", "Grifo Selvagem", "Grifo Selvagem + 3 Lobos"],
    ["Pantera", "Quimera Grotesca", "2 Leões e 1 Pantera"]
  ],
  montanha: [
    ["Elemental de Fogo", "2 Harpias e 1 Abutre", "2 Harpias e 1 Quimera Grotesca"],
    ["1 Yeti", "2 Canidracos", "1 Elemental de Fogo e 1 Serpe"],
    ["1 Serpe", "4 Yetilins", "2 Yetis"],
    ["3 Bodes", "1 Yeti e 1 Yetilin", "2 Serpes"]
  ],
  costeiro: [
    ["2 Smorks Soldado", "2 Smorks Soldado e 1 Suporte", "3 Smorks Soldado e 1 Suporte"],
    ["1 Smork Soldado e 1 Suporte", "3 Smorks Soldado", "2 Smorks Soldado e 2 Suporte"],
    ["2 Ladrões", "3 Ladrões", "3 Ladrões e 2 Soldado"],
    ["2 Fantasmas Perdidos", "3 Fantasmas Perdidos", "4 Fantasmas Perdidos"]
  ],
  marinho: [
    ["2 Smorks Soldado", "2 Smorks Soldado e 1 Suporte", "3 Smorks Soldado e 1 Suporte"],
    ["1 Smork Soldado e 1 Suporte", "3 Smorks Soldado", "2 Smorks Soldado e 2 Suporte"],
    ["Tubarão", "1 Crocodilo", "2 Crocodilos"],
    ["Tubarão", "2 Tubarões", "1 Crocodilo e 2 Tubarões"]
  ],
  pantano: [
    ["2 Enxames de Mosquitos", "3 Fantasmas Perdidos", "4 Fantasmas Perdidos"],
    ["2 Fantasmas Perdidos", "4 Zumbis", "3 Diabretes e 3 Zumbis"],
    ["3 Zumbis", "1 Crocodilo", "2 Crocodilos"],
    ["4 Diabretes", "1 Shugoth", "1 Shugoth e 2 Fantasmas Perdidos"]
  ]
};

const cenasPlanicie = {
"1-1": { lugar: "Flores coloridas", curiosidade: "Rastro de animal", obstaculo: "Chuva constante" },
"1-2": { lugar: "Pasto rasteiro", curiosidade: "Pássaros voando em círculos", obstaculo: "Rio largo no caminho" },
"1-3": { lugar: "Arbustos distantes", curiosidade: "Placa de madeira quebrada", obstaculo: "Caminho com espinhos" },
"1-4": { lugar: "Árvore solitária", curiosidade: "Carcaça de animal", obstaculo: "Nuvem de insetos" },
"1-5": { lugar: "Grama alta", curiosidade: "Acampamento abandonado", obstaculo: "[Lobos] estão devorando uma caça" },
"1-6": { lugar: "Gramado verdejante", curiosidade: "Buraco grande e estranho", obstaculo: "[Assaltantes] estão acampados ali" },

"2-1": { lugar: "Colina baixa", curiosidade: "Pedra solta", obstaculo: "Riacho estreito bloqueia o caminho" },
"2-2": { lugar: "Campo aberto", curiosidade: "Rastro de carruagem", obstaculo: "Vento forte atrapalha" },
"2-3": { lugar: "Planície ondulada", curiosidade: "Flor rara no chão", obstaculo: "Trilha lamacenta" },
"2-4": { lugar: "Pasto seco", curiosidade: "Galho quebrado bloqueia", obstaculo: "Rebanho assusta-se" },
"2-5": { lugar: "Colina rochosa", curiosidade: "Marcas de pneus antigos", obstaculo: "Pedras caindo" },
"2-6": { lugar: "Gramado suave", curiosidade: "Árvore caída", obstaculo: "Cavalo ferido atravessa" },

"3-1": { lugar: "Vale raso", curiosidade: "Rastro de pássaro", obstaculo: "Rio caudaloso" },
"3-2": { lugar: "Planície arenosa", curiosidade: "Pedra com runa", obstaculo: "Caminho escorregadio" },
"3-3": { lugar: "Campo verde", curiosidade: "Fragmento de vidro", obstaculo: "Nuvem de poeira" },
"3-4": { lugar: "Colina com arbustos", curiosidade: "Ruína antiga", obstaculo: "Ramo bloqueia" },
"3-5": { lugar: "Gramado pontilhado", curiosidade: "Ferro retorcido", obstaculo: "Buraco escondido" },
"3-6": { lugar: "Planície com flores brancas", curiosidade: "Corvo pousado", obstaculo: "Névoa baixa" },

"4-1": { lugar: "Vale estreito", curiosidade: "Pedra marcada", obstaculo: "Árvore caída" },
"4-2": { lugar: "Pastagem aberta", curiosidade: "Animal morto", obstaculo: "Rio raso bloqueia" },
"4-3": { lugar: "Colina alta", curiosidade: "Som estranho", obstaculo: "Bando de aves assusta" },
"4-4": { lugar: "Campo limpo", curiosidade: "Placa quebrada", obstaculo: "Trilha de lama" },
"4-5": { lugar: "Gramado úmido", curiosidade: "Rastro de sapato", obstaculo: "Caminho escorregadio" },
"4-6": { lugar: "Planície com pedras", curiosidade: "Marcas de rodas", obstaculo: "Pedras soltas" },

"5-1": { lugar: "Colina suave", curiosidade: "Carcaça de animal", obstaculo: "Riacho profundo" },
"5-2": { lugar: "Campo florido", curiosidade: "Árvore oca", obstaculo: "Pedras rolando" },
"5-3": { lugar: "Vale verdejante", curiosidade: "Runas apagadas", obstaculo: "Buraco profundo" },
"5-4": { lugar: "Gramado aberto", curiosidade: "Placa antiga", obstaculo: "Caminho bloqueado" },
"5-5": { lugar: "Planície ampla", curiosidade: "Fragmento de escudo", obstaculo: "Rio largo" },
"5-6": { lugar: "Colina rochosa", curiosidade: "Árvore caída", obstaculo: "Caminho instável" },

"6-1": { lugar: "Pastagem alta", curiosidade: "Pedra estranha", obstaculo: "Correnteza rápida" },
"6-2": { lugar: "Campo raso", curiosidade: "Marcas de animal", obstaculo: "Riacho barrento" },
"6-3": { lugar: "Gramado dourado", curiosidade: "Placa de aviso", obstaculo: "Ramos caídos" },
"6-4": { lugar: "Planície de flores", curiosidade: "Coruja observa", obstaculo: "Bando de lobos" },
"6-5": { lugar: "Colina verde", curiosidade: "Rastro de carruagem", obstaculo: "Pedras escorregadias" },
"6-6": { lugar: "Vale amplo", curiosidade: "Pedra grande", obstaculo: "Caminho difícil" }
};

const complicacoesPlanicie = {
"1-1": { comp: "Chuva aperta e dificulta a visão", t1: "Vazio / Flor", t2: "Verdejante" },
"1-2": { comp: "Raio (1 dano) cai sobre um personagem!", t1: "Barulho", t2: "Chuva distante" },
"1-3": { comp: "O chão se abre nos pés do grupo", t1: "Terra / Trilha", t2: "Comprido" },
"1-4": { comp: "[Inimigos] surgem!", t1: "Eco / Grama", t2: "Cansado" },
"1-5": { comp: "[Insetos Gigantes] aparecem do chão!", t1: "Vento / Frio", t2: "Ao fundo" },
"1-6": { comp: "[Inimigos] se aproximam!", t1: "Calor / Luz", t2: "Tranquilo" },

"2-1": { comp: "Névoa baixa encobre a visão", t1: "Riacho / Lama", t2: "Silencioso" },
"2-2": { comp: "Pedra solta rola colina abaixo", t1: "Barulho / Eco", t2: "Longe" },
"2-3": { comp: "Raio de magia antiga explode", t1: "Vento / Poeira", t2: "Distante" },
"2-4": { comp: "Rebanho em fuga bloqueia caminho", t1: "Grama / Arbusto", t2: "Cansado" },
"2-5": { comp: "Poço oculto surge sob os pés", t1: "Terra / Rocha", t2: "Ao fundo" },
"2-6": { comp: "Correnteza rápida arrasta objetos", t1: "Água / Espuma", t2: "Tranquilo" },

"3-1": { comp: "Ramo cai em direção aos heróis", t1: "Barulho / Eco", t2: "Rápido" },
"3-2": { comp: "Explosão de flores tóxicas", t1: "Cheiro / Cor", t2: "Vibrante" },
"3-3": { comp: "Som estranho vem do vale", t1: "Luz / Sombra", t2: "Longínquo" },
"3-4": { comp: "[Inimigos] armam emboscada", t1: "Barulho / Passos", t2: "Cansado" },
"3-5": { comp: "Insetos zunem intensamente", t1: "Vento / Poeira", t2: "Ao fundo" },
"3-6": { comp: "Pequena fenda no chão se abre", t1: "Terra / Pedras", t2: "Silencioso" },

"4-1": { comp: "Relâmpago corta o céu", t1: "Calor / Luz", t2: "Rápido" },
"4-2": { comp: "Árvore cai bloqueando trilha", t1: "Barulho / Tronco", t2: "Longe" },
"4-3": { comp: "Som de rugido distante", t1: "Vento / Eco", t2: "Tranquilo" },
"4-4": { comp: "[Inimigos] atacam de surpresa", t1: "Grama / Rocha", t2: "Cansado" },
"4-5": { comp: "Armadilha antiga se ativa", t1: "Poeira / Folhagem", t2: "Ao fundo" },
"4-6": { comp: "Céu escurece rapidamente", t1: "Nuvem / Sombra", t2: "Silencioso" },

"5-1": { comp: "Poça de lama engole sapato", t1: "Água / Terra", t2: "Rápido" },
"5-2": { comp: "Rastro de criatura gigante", t1: "Barulho / Passo", t2: "Longe" },
"5-3": { comp: "Pedras caem de encosta", t1: "Rocha / Pó", t2: "Tranquilo" },
"5-4": { comp: "Vento forte derruba objetos", t1: "Arbusto / Poeira", t2: "Cansado" },
"5-5": { comp: "Luz estranha surge no horizonte", t1: "Luz / Cor", t2: "Ao fundo" },
"5-6": { comp: "Corrente de ar corta caminho", t1: "Ar / Eco", t2: "Silencioso" },

"6-1": { comp: "Raio mágico atinge solo", t1: "Vento / Luz", t2: "Rápido" },
"6-2": { comp: "[Inimigos] perseguem grupo", t1: "Barulho / Passos", t2: "Longe" },
"6-3": { comp: "Terra instável ameaça cair", t1: "Terra / Rocha", t2: "Tranquilo" },
"6-4": { comp: "Névoa espessa invade trilha", t1: "Vapor / Sombra", t2: "Cansado" },
"6-5": { comp: "Ruína desmorona parcialmente", t1: "Poeira / Pedra", t2: "Ao fundo" },
"6-6": { comp: "Vento repentino espalha folhas", t1: "Árvore / Folha", t2: "Silencioso" }
};

const cenasFloresta = {
"1-1": { lugar: "Árvores altas", curiosidade: "Rastro de animal", obstaculo: "Barranco alto à frente" },
"1-2": { lugar: "Folhas por todo o chão", curiosidade: "Barulho do alto das árvores", obstaculo: "Rio largo no caminho" },
"1-3": { lugar: "Floresta densa e escura", curiosidade: "Trilha no chão", obstaculo: "Árvore imensa caída à frente" },
"1-4": { lugar: "Galhos caídos", curiosidade: "Carcaça de animal", obstaculo: "Caminho com espinhos" },
"1-5": { lugar: "Árvores variadas", curiosidade: "Acampamento abandonado", obstaculo: "[Inimigos] no caminho" },
"1-6": { lugar: "Várias árvores iguais", curiosidade: "Árvore oca com algo dentro", obstaculo: "[Inimigos] há espreita" },

"2-1": { lugar: "Clareira pequena", curiosidade: "Pedra marcada", obstaculo: "Riacho estreito bloqueia" },
"2-2": { lugar: "Troncos caídos", curiosidade: "Rastro de pássaro", obstaculo: "Pedras escorregadias" },
"2-3": { lugar: "Árvores retorcidas", curiosidade: "Cercado de galhos", obstaculo: "Buraco no caminho" },
"2-4": { lugar: "Matagal denso", curiosidade: "Penas espalhadas", obstaculo: "Correnteza ruidosa" },
"2-5": { lugar: "Trilha sombreada", curiosidade: "Ruína antiga", obstaculo: "Raiz exposta bloqueia" },
"2-6": { lugar: "Pequena colina arborizada", curiosidade: "Som de sinos", obstaculo: "Caminho lamacento" },

"3-1": { lugar: "Floresta com musgo", curiosidade: "Pedra estranha", obstaculo: "Barranco íngreme" },
"3-2": { lugar: "Troncos partidos", curiosidade: "Rastro de animal gigante", obstaculo: "Árvore caída bloqueia" },
"3-3": { lugar: "Árvores finas e altas", curiosidade: "Pássaro estranho voa", obstaculo: "Buraco profundo" },
"3-4": { lugar: "Matagal com flores", curiosidade: "Cascalho no chão", obstaculo: "Rio barrento à frente" },
"3-5": { lugar: "Pequeno bosque", curiosidade: "Fragmento de osso", obstaculo: "[Lobos] perseguem" },
"3-6": { lugar: "Árvores retorcidas", curiosidade: "Marcas de luta", obstaculo: "[Inimigos] armam emboscada" },

"4-1": { lugar: "Floresta úmida", curiosidade: "Rastro de coelho", obstaculo: "Riacho rápido" },
"4-2": { lugar: "Troncos cobertos de musgo", curiosidade: "Pedra com runa", obstaculo: "Árvore caída" },
"4-3": { lugar: "Clareira ampla", curiosidade: "Som distante de passos", obstaculo: "Buraco oculto" },
"4-4": { lugar: "Árvores antigas", curiosidade: "Rastro de cervo", obstaculo: "Caminho escorregadio" },
"4-5": { lugar: "Matagal fechado", curiosidade: "Pequena estufa abandonada", obstaculo: "[Inimigos] observam" },
"4-6": { lugar: "Bosque com folhas vermelhas", curiosidade: "Corvo pousa", obstaculo: "Ramo bloqueia" },

"5-1": { lugar: "Trilha estreita", curiosidade: "Carcaça de animal", obstaculo: "Barranco alto" },
"5-2": { lugar: "Árvores jovens", curiosidade: "Pedra quebrada", obstaculo: "Rio largo" },
"5-3": { lugar: "Floresta cerrada", curiosidade: "Rastro de carroça", obstaculo: "Árvore caída" },
"5-4": { lugar: "Matagal com arbustos", curiosidade: "Pássaro empoleirado", obstaculo: "Tronco bloqueia caminho" },
"5-5": { lugar: "Bosque raso", curiosidade: "Ruína de cabana", obstaculo: "[Inimigos] rondam" },
"5-6": { lugar: "Árvores alinhadas", curiosidade: "Som de passos rápidos", obstaculo: "[Inimigos] perseguem" },

"6-1": { lugar: "Clareira com flores", curiosidade: "Rastro de raposa", obstaculo: "Caminho lamacento" },
"6-2": { lugar: "Troncos inclinados", curiosidade: "Pedra grande", obstaculo: "Buraco escondido" },
"6-3": { lugar: "Floresta enevoada", curiosidade: "Som de água", obstaculo: "Barranco íngreme" },
"6-4": { lugar: "Árvores próximas", curiosidade: "Carroça abandonada", obstaculo: "Raiz saliente bloqueia" },
"6-5": { lugar: "Matagal com troncos", curiosidade: "Pequena tocha apagada", obstaculo: "[Inimigos] bloqueiam" },
"6-6": { lugar: "Bosque silencioso", curiosidade: "Marcas de batalha", obstaculo: "[Inimigos] rondam" }
};

const complicacoesFloresta = {
"1-1": { comp: "Uma grande árvore cai sobre o grupo", t1: "Folhas / Flecha", t2: "Úmido" },
"1-2": { comp: "Perfume de flores soníferas", t1: "Escuro / Tronco", t2: "Seco" },
"1-3": { comp: "[Inimigos] atacam o grupo!", t1: "Limo / Pássaros", t2: "Vívido" },
"1-4": { comp: "[Inimigos] atacam o grupo!", t1: "Trilha / Broto", t2: "Alto" },
"1-5": { comp: "[Inimigos] atacam o grupo!", t1: "Confusão / Casca", t2: "Perdido" },
"1-6": { comp: "[Inimigos] atacam o grupo!", t1: "Raiz / Marcas", t2: "Antigo" },

"2-1": { comp: "Ramo cai inesperadamente", t1: "Folhas / Galho", t2: "Silencioso" },
"2-2": { comp: "Pedras escorregadias bloqueiam o caminho", t1: "Limo / Pedra", t2: "Rápido" },
"2-3": { comp: "Névoa baixa encobre a visão", t1: "Vapor / Tronco", t2: "Distante" },
"2-4": { comp: "Raio de luz corta o bosque", t1: "Som / Folhagem", t2: "Alto" },
"2-5": { comp: "Rebanho de cervos atravessa caminho", t1: "Pó / Terra", t2: "Cansado" },
"2-6": { comp: "Insetos zumbem intensamente", t1: "Vento / Galho", t2: "Ao fundo" },

"3-1": { comp: "Poça de lama engole sapato", t1: "Água / Terra", t2: "Rápido" },
"3-2": { comp: "Galhos caídos bloqueiam trilha", t1: "Barulho / Tronco", t2: "Longe" },
"3-3": { comp: "Som estranho ecoa no bosque", t1: "Vento / Eco", t2: "Tranquilo" },
"3-4": { comp: "Raiz saliente faz tropeço", t1: "Limo / Terra", t2: "Cansado" },
"3-5": { comp: "Carroça antiga caída bloqueia", t1: "Ruína / Madeira", t2: "Ao fundo" },
"3-6": { comp: "Esporos de cogumelos cegam parcialmente", t1: "Luz / Sombra", t2: "Silencioso" },

"4-1": { comp: "Árvore caída sobre trilha", t1: "Barulho / Tronco", t2: "Rápido" },
"4-2": { comp: "Pedra grande rola do alto", t1: "Pedra / Poeira", t2: "Longe" },
"4-3": { comp: "Som de rugido distante", t1: "Som / Eco", t2: "Tranquilo" },
"4-4": { comp: "[Inimigos] cercam o grupo", t1: "Poeira / Galho", t2: "Cansado" },
"4-5": { comp: "[Inimigos] armam emboscada", t1: "Confusão / Tronco", t2: "Ao fundo" },
"4-6": { comp: "Névoa invade a clareira", t1: "Vapor / Folha", t2: "Silencioso" },

"5-1": { comp: "Vento forte derruba galhos", t1: "Barulho / Folhagem", t2: "Rápido" },
"5-2": { comp: "Poço oculto no caminho", t1: "Terra / Musgo", t2: "Longe" },
"5-3": { comp: "Riacho repentino bloqueia passo", t1: "Água / Pedra", t2: "Tranquilo" },
"5-4": { comp: "Luz estranha aparece entre árvores", t1: "Luz / Folhagem", t2: "Cansado" },
"5-5": { comp: "Raio atinge árvore próxima", t1: "Calor / Tronco", t2: "Ao fundo" },
"5-6": { comp: "Bando de corvos ataca", t1: "Vento / Penas", t2: "Silencioso" },

"6-1": { comp: "Ruína antiga desmorona parcialmente", t1: "Poeira / Pedra", t2: "Rápido" },
"6-2": { comp: "Tronco oco abriga surpresa", t1: "Limo / Galho", t2: "Longe" },
"6-3": { comp: "Trecho lamacento impede avanço", t1: "Água / Terra", t2: "Tranquilo" },
"6-4": { comp: "Som metálico ecoa", t1: "Som / Tronco", t2: "Cansado" },
"6-5": { comp: "Bando de [Inimigos] bloqueia caminho", t1: "Barulho / Penas", t2: "Ao fundo" },
"6-6": { comp: "Névoa espessa confunde grupo", t1: "Vapor / Folha", t2: "Silencioso" }
};

const cenasSelva = {
"1-1": { lugar: "Troncos enormes cobertos de musgo", curiosidade: "Rugido distante", obstaculo: "Lianas bloqueiam o caminho" },
"1-2": { lugar: "Ar úmido e pesado", curiosidade: "Flores de cores intensas", obstaculo: "Lodo escorregadio" },
"1-3": { lugar: "Raízes expostas em todo o solo", curiosidade: "Rastro de animal grande", obstaculo: "Árvore caída bloqueia passagem" },
"1-4": { lugar: "Clareira escondida", curiosidade: "Lago pequeno e claro", obstaculo: "Insetos mordem incessantemente" },
"1-5": { lugar: "Copa densa que bloqueia o sol", curiosidade: "Cascata próxima", obstaculo: "Barranco íngreme" },
"1-6": { lugar: "Tronco oco gigante", curiosidade: "Marcas de garras antigas", obstaculo: "Lianas prendem os pés" },

"2-1": { lugar: "Rio estreito cortando a mata", curiosidade: "Cânticos distantes", obstaculo: "Pedras escorregadias" },
"2-2": { lugar: "Troncos com fungos brilhantes", curiosidade: "Fumaça fraca ao longe", obstaculo: "Lodo espesso prende as pernas" },
"2-3": { lugar: "Vegetação densa e alta", curiosidade: "Som de tambores distantes", obstaculo: "Enxame de mosquitos" },
"2-4": { lugar: "Clareira de caça antiga", curiosidade: "Carcaça recente", obstaculo: "Fenda coberta por folhas" },
"2-5": { lugar: "Colina coberta por raízes", curiosidade: "Som de algo grande se movendo", obstaculo: "Caminho íngreme e estreito" },
"2-6": { lugar: "Troncos queimados", curiosidade: "Fedor de podridão", obstaculo: "Lianas descem como armadilhas" },

"3-1": { lugar: "Lagoa escura e parada", curiosidade: "Sapos coaxando alto", obstaculo: "Pântano profundo à frente" },
"3-2": { lugar: "Árvores retorcidas", curiosidade: "Folhas que parecem se mover", obstaculo: "Lama até os joelhos" },
"3-3": { lugar: "Trilha escondida", curiosidade: "Som de água corrente", obstaculo: "Insetos venenosos atacam" },
"3-4": { lugar: "Pedra coberta por runas", curiosidade: "Vegetação crescendo em espiral", obstaculo: "Caminho bloqueado por raízes" },
"3-5": { lugar: "Colina verdejante", curiosidade: "Ninho gigante nas copas", obstaculo: "Terra cede sob os pés" },
"3-6": { lugar: "Copa aberta revelando o céu", curiosidade: "Luz dourada", obstaculo: "Macacos irritados à frente" },

"4-1": { lugar: "Árvores imensas entrelaçadas", curiosidade: "Lianas suspensas", obstaculo: "Lago profundo ao lado" },
"4-2": { lugar: "Cachoeira alta", curiosidade: "Cristais coloridos entre as pedras", obstaculo: "Escalada perigosa" },
"4-3": { lugar: "Vegetação avermelhada", curiosidade: "Flores carnívoras", obstaculo: "Trilha coberta por espinhos" },
"4-4": { lugar: "Tronco oco com cheiro estranho", curiosidade: "Som metálico", obstaculo: "Lianas descendo do alto" },
"4-5": { lugar: "Grande clareira", curiosidade: "Ninho de pássaro enorme", obstaculo: "Caminho inundado" },
"4-6": { lugar: "Raízes entrelaçadas formando ponte", curiosidade: "Som de tambores distantes", obstaculo: "Nevoeiro espesso" },

"5-1": { lugar: "Árvore colossal no centro", curiosidade: "Luzes flutuantes", obstaculo: "Riacho profundo cruza o caminho" },
"5-2": { lugar: "Troncos partidos", curiosidade: "Fumaça ao longe", obstaculo: "Lama escorregadia" },
"5-3": { lugar: "Ar saturado de névoa", curiosidade: "Som de algo rastejando", obstaculo: "Insetos mordem sem parar" },
"5-4": { lugar: "Clareira iluminada", curiosidade: "Lago raso", obstaculo: "Jacarés espreitam próximos" },
"5-5": { lugar: "Raízes gigantes", curiosidade: "Ninho de serpente enorme", obstaculo: "Caminho tomado por espinhos" },
"5-6": { lugar: "Tronco caído sobre o rio", curiosidade: "Som de passos na água", obstaculo: "Ponte natural instável" },

"6-1": { lugar: "Selva fechada e abafada", curiosidade: "Luzes de insetos", obstaculo: "Trilha invisível sob a folhagem" },
"6-2": { lugar: "Grande lago de águas verdes", curiosidade: "Sapos e insetos por toda parte", obstaculo: "Lodo traiçoeiro" },
"6-3": { lugar: "Pedras cobertas de musgo", curiosidade: "Som de algo respirando próximo", obstaculo: "Lianas prendem o caminho" },
"6-4": { lugar: "Árvore com inscrições antigas", curiosidade: "Som distante de flauta", obstaculo: "Lama profunda" },
"6-5": { lugar: "Vegetação densa e úmida", curiosidade: "Folhas com brilho estranho", obstaculo: "Tronco caído bloqueia trilha" },
"6-6": { lugar: "Clareira misteriosa", curiosidade: "Luz verde vinda do chão", obstaculo: "Raízes se movem levemente" }
};

const complicacoesSelva = {
"1-1": { comp: "Tempestade tropical começa a cair", t1: "Chuva / Vento", t2: "Intensa" },
"1-2": { comp: "Enxame de insetos ataca o grupo", t1: "Insetos / Som", t2: "Ensurdecedor" },
"1-3": { comp: "Raízes se movem e prendem um personagem", t1: "Raízes / Terra", t2: "Viva" },
"1-4": { comp: "[Serpentes Gigantes] aparecem", t1: "Lianas / Folhas", t2: "Perigoso" },
"1-5": { comp: "Tronco cai bloqueando o caminho", t1: "Árvore / Lama", t2: "Pesado" },
"1-6": { comp: "Nevoeiro denso cobre a selva", t1: "Bruma / Vento", t2: "Misterioso" },

"2-1": { comp: "Chuva torna o solo escorregadio", t1: "Lama / Raízes", t2: "Instável" },
"2-2": { comp: "Alguém arremessa pedras", t1: "Gritos / Folhas", t2: "Confuso" },
"2-3": { comp: "Doença tropical afeta um personagem", t1: "Folhas / Água", t2: "Febril" },
"2-4": { comp: "[Aranha] surge do chão", t1: "Lianas / Troncos", t2: "Aterrorizante" },
"2-5": { comp: "Trovões fazem os animais correrem", t1: "Trovão / Chuva", t2: "Assustador" },
"2-6": { comp: "Lianas caem e se enrolam no grupo", t1: "Lianas / Ramos", t2: "Prisão" },

"3-1": { comp: "Raízes quebram o solo sob seus pés", t1: "Terra / Tronco", t2: "Instável" },
"3-2": { comp: "Tronco oco libera nuvem venenosa", t1: "Folhas / Esporos", t2: "Tóxico" },
"3-3": { comp: "[Inimigos] emboscam o grupo", t1: "Flechas / Gritos", t2: "Traiçoeiro" },
"3-4": { comp: "Relâmpago atinge uma árvore próxima", t1: "Trovão / Fogo", t2: "Perigoso" },
"3-5": { comp: "Animal gigante cruza o caminho", t1: "Patas / Água", t2: "Assustador" },
"3-6": { comp: "Chuva apaga tochas e luzes", t1: "Luz / Água", t2: "Escuro" },

"4-1": { comp: "Lianas prendem um personagem", t1: "Raízes / Ramos", t2: "Restrito" },
"4-2": { comp: "[Serpentes] descem das árvores", t1: "Veneno / Tronco", t2: "Perigoso" },
"4-3": { comp: "Vento forte balança as copas", t1: "Vento / Folhas", t2: "Intenso" },
"4-4": { comp: "[Inimigos] cercam o grupo", t1: "Insetos / Sangue", t2: "Aterrorizante" },
"4-5": { comp: "Terra cede sob os pés", t1: "Lama / Raiz", t2: "Afundando" },
"4-6": { comp: "Relâmpagos iluminam a floresta", t1: "Trovão / Luz", t2: "Assustador" },

"5-1": { comp: "[Inimigos] aparece em emboscada", t1: "Flechas / Gritos", t2: "Hostil" },
"5-2": { comp: "Árvore imensa desaba", t1: "Tronco / Raízes", t2: "Devastador" },
"5-3": { comp: "Doença se espalha entre o grupo", t1: "Esporos / Água", t2: "Infeccioso" },
"5-4": { comp: "[Inimigos] emergem", t1: "Lama / Tronco", t2: "Assustador" },
"5-5": { comp: "Tempestade cobre visão", t1: "Folhas / Vento", t2: "Confuso" },
"5-6": { comp: "Cipós descem prendendo membros", t1: "Lianas / Ramos", t2: "Restrito" },

"6-1": { comp: "Chuva torrencial inunda o caminho", t1: "Água / Lama", t2: "Perigoso" },
"6-2": { comp: "[Inimigos] cercam o grupo", t1: "Olhos / Garras", t2: "Ameaçador" },
"6-3": { comp: "Raízes se movem como serpentes", t1: "Raízes / Terra", t2: "Viva" },
"6-4": { comp: "Nevoeiro espesso causa desorientação", t1: "Bruma / Folhas", t2: "Misterioso" },
"6-5": { comp: "Som distante de tambores ressoa", t1: "Tambores / Vento", t2: "Assustador" },
"6-6": { comp: "Cipós prendem mochilas e armas", t1: "Lianas / Ramos", t2: "Incômodo" }
};

const cenasCosteiras = {
"1-1": { lugar: "Areia branca e fofa", curiosidade: "Conchas coloridas", obstaculo: "Ondas fortes dificultam avanço" },
"1-2": { lugar: "Praia com pedras", curiosidade: "Peixes saltando", obstaculo: "Pedra escorregadia bloqueia caminho" },
"1-3": { lugar: "Cliff alto", curiosidade: "Plataforma de madeira antiga", obstaculo: "Vento forte ameaça queda" },
"1-4": { lugar: "Praia deserta", curiosidade: "Carcaça de navio", obstaculo: "Naufrágio bloqueia passagem" },
"1-5": { lugar: "Recife próximo à costa", curiosidade: "Algas brilhantes", obstaculo: "Pedra afiada no caminho" },
"1-6": { lugar: "Areia molhada", curiosidade: "Marcas de aves", obstaculo: "[Inimigos] atacam grupo" },

"2-1": { lugar: "Duna alta", curiosidade: "Marcas de tartaruga", obstaculo: "Areia movediça" },
"2-2": { lugar: "Enseada escondida", curiosidade: "Barco encalhado", obstaculo: "Pedras submersas" },
"2-3": { lugar: "Penhasco rochoso", curiosidade: "Ninho de aves", obstaculo: "Risco de queda" },
"2-4": { lugar: "Praia com cavernas", curiosidade: "Formações de corais", obstaculo: "Entrada bloqueada" },
"2-5": { lugar: "Baía tranquila", curiosidade: "Peixes coloridos", obstaculo: "Água rasa e lama" },
"2-6": { lugar: "Falésias íngremes", curiosidade: "Pegadas antigas", obstaculo: "Pedras soltas descem" },

"3-1": { lugar: "Ilha pequena", curiosidade: "Árvore retorcida", obstaculo: "Caminho estreito" },
"3-2": { lugar: "Manguezal", curiosidade: "Caranguejos andando", obstaculo: "Lama espessa" },
"3-3": { lugar: "Praia rochosa", curiosidade: "Ostras presas", obstaculo: "Ondas batem forte" },
"3-4": { lugar: "Costa com cavernas", curiosidade: "Gruta submersa", obstaculo: "Entrada cheia de água" },
"3-5": { lugar: "Recife escondido", curiosidade: "Cardume de peixes", obstaculo: "Corais cortantes" },
"3-6": { lugar: "Praia ao entardecer", curiosidade: "Conchas brilhantes", obstaculo: "Maré subindo rapidamente" },

"4-1": { lugar: "Falésia isolada", curiosidade: "Pássaros em bando", obstaculo: "Pedra instável" },
"4-2": { lugar: "Areia escura", curiosidade: "Fragmentos de conchas", obstaculo: "Correnteza perigosa" },
"4-3": { lugar: "Pequena enseada", curiosidade: "Plantas aquáticas", obstaculo: "Água rasa" },
"4-4": { lugar: "Pedra saliente", curiosidade: "Marcas de animais", obstaculo: "Escorregadio" },
"4-5": { lugar: "Praia com algas", curiosidade: "Conchas grandes", obstaculo: "Mares agitados" },
"4-6": { lugar: "Dunas e coqueiros", curiosidade: "Pegadas humanas", obstaculo: "Areia instável" },

"5-1": { lugar: "Enseada rochosa", curiosidade: "Cavidade misteriosa", obstaculo: "Pedras caindo" },
"5-2": { lugar: "Praia de pedras grandes", curiosidade: "Algas secas", obstaculo: "Caminho estreito" },
"5-3": { lugar: "Cliff ao norte", curiosidade: "Ninho de gaivotas", obstaculo: "Vento forte" },
"5-4": { lugar: "Ilhota próxima", curiosidade: "Caverna pequena", obstaculo: "Água agitada" },
"5-5": { lugar: "Recife aflorante", curiosidade: "Peixes coloridos", obstaculo: "Pedras afiadas" },
"5-6": { lugar: "Praia com areia fina", curiosidade: "Cavidade de caranguejo", obstaculo: "Maré subindo" },

"6-1": { lugar: "Falésia ao sul", curiosidade: "Plantas rasteiras", obstaculo: "Pedras soltas" },
"6-2": { lugar: "Praia isolada", curiosidade: "Conchas estranhas", obstaculo: "Ondas fortes" },
"6-3": { lugar: "Caverna costeira", curiosidade: "Pintura antiga", obstaculo: "Entrada estreita" },
"6-4": { lugar: "Areia amarelada", curiosidade: "Marcas de gaivotas", obstaculo: "Maré traiçoeira" },
"6-5": { lugar: "Recife rochoso", curiosidade: "Cardume de peixes", obstaculo: "Pedras escorregadias" },
"6-6": { lugar: "Praia ao entardecer", curiosidade: "Conchas brilhantes", obstaculo: "Vento forte" }
};

// COMPLICAÇÕES COSTEIRAS
const complicacoesCosteiras = {
"1-1": { comp: "Tempestade repentina se forma", t1: "Vento / Nuvens", t2: "Violento" },
"1-2": { comp: "Ondas gigantes bloqueiam caminho", t1: "Mar / Areia", t2: "Perigoso" },
"1-3": { comp: "Pedra solta cai do penhasco", t1: "Rochas / Teto", t2: "Escorregadio" },
"1-4": { comp: "[Inimigos] atacam o grupo", t1: "Asas / Barulho", t2: "Assustador" },
"1-5": { comp: "Maré sobe rapidamente", t1: "Água / Areia", t2: "Enganoso" },
"1-6": { comp: "Névoa cobre praia", t1: "Ar / Mar", t2: "Misterioso" },

"2-1": { comp: "Correnteza esconde pedras perigosas", t1: "Água / Rocha", t2: "Rápido" },
"2-2": { comp: "Tubarões próximos da costa", t1: "Água / Sombra", t2: "Assustador" },
"2-3": { comp: "Pedras caem do penhasco", t1: "Rochas / Barulho", t2: "Perigoso" },
"2-4": { comp: "Areia movediça engole objetos", t1: "Terra / Água", t2: "Traiçoeiro" },
"2-5": { comp: "Redemoinho se forma", t1: "Água / Mar", t2: "Rápido" },
"2-6": { comp: "Golfinhos curiosos interferem", t1: "Água / Som", t2: "Leve" },

"3-1": { comp: "Pedras cortantes sob a água", t1: "Água / Rocha", t2: "Perigoso" },
"3-2": { comp: "Manguezal intransponível", t1: "Lama / Raiz", t2: "Lento" },
"3-3": { comp: "Ostras afiadas ferem pés", t1: "Água / Conchas", t2: "Rápido" },
"3-4": { comp: "Gruta parcialmente submersa", t1: "Água / Pedra", t2: "Traiçoeiro" },
"3-5": { comp: "Cardume confunde caminho", t1: "Peixes / Reflexo", t2: "Enganoso" },
"3-6": { comp: "Maré sobe e bloqueia saída", t1: "Água / Areia", t2: "Rápido" },

"4-1": { comp: "Pedras caem da falésia", t1: "Rochas / Eco", t2: "Perigoso" },
"4-2": { comp: "Correnteza esconde fendas", t1: "Água / Pedra", t2: "Rápido" },
"4-3": { comp: "Areia escura dificulta passagem", t1: "Terra / Pedra", t2: "Lento" },
"4-4": { comp: "Ondas altas bloqueiam caminho", t1: "Mar / Vento", t2: "Violento" },
"4-5": { comp: "Algas soltas prendem pés", t1: "Água / Planta", t2: "Traiçoeiro" },
"4-6": { comp: "Vento forte desvia rota", t1: "Ar / Barulho", t2: "Perigoso" },

"5-1": { comp: "Pedras afloram e cortam", t1: "Rochas / Água", t2: "Rápido" },
"5-2": { comp: "Correnteza leva objetos", t1: "Água / Mar", t2: "Traiçoeiro" },
"5-3": { comp: "Gaivotas atacam", t1: "Asas / Barulho", t2: "Assustador" },
"5-4": { comp: "Ondas inundam trilha", t1: "Água / Areia", t2: "Rápido" },
"5-5": { comp: "Reflexo do sol cega momentaneamente", t1: "Luz / Água", t2: "Enganoso" },
"5-6": { comp: "Pedras escorregam com água", t1: "Rochas / Areia", t2: "Traiçoeiro" },

"6-1": { comp: "Vento desestabiliza grupo", t1: "Ar / Pedra", t2: "Perigoso" },
"6-2": { comp: "Maré traiçoeira bloqueia saída", t1: "Água / Areia", t2: "Rápido" },
"6-3": { comp: "Gruta costeira desmorona parcialmente", t1: "Pedra / Eco", t2: "Traiçoeiro" },
"6-4": { comp: "Ondas altas atingem penhasco", t1: "Água / Barulho", t2: "Violento" },
"6-5": { comp: "Cardume dispersa rota segura", t1: "Peixes / Reflexo", t2: "Enganoso" },
"6-6": { comp: "Vento e areia cegam visão", t1: "Ar / Areia", t2: "Perigoso" }
};

// CENAS AQUÁTICAS
const cenasAquaticas = {
"1-1": { lugar: "Lago cristalino", curiosidade: "Peixes coloridos nadando", obstaculo: "Plantas aquáticas densas" },
"1-2": { lugar: "Rio largo", curiosidade: "Tronco flutuante", obstaculo: "Correnteza forte" },
"1-3": { lugar: "Cachoeira", curiosidade: "Arco-íris formado pela água", obstaculo: "Pedras escorregadias" },
"1-4": { lugar: "Manguezal", curiosidade: "Caranguejos andando", obstaculo: "Lama espessa" },
"1-5": { lugar: "Lagoa rasa", curiosidade: "Plantas aquáticas flutuantes", obstaculo: "[Inimigos] escondidos na água" },
"1-6": { lugar: "Maré cheia", curiosidade: "Conchas brilhantes", obstaculo: "Ondas imprevisíveis" },

"2-1": { lugar: "Enseada protegida", curiosidade: "Peixes nadando em cardume", obstaculo: "Pedras submersas" },
"2-2": { lugar: "Riacho cristalino", curiosidade: "Pedras com musgo", obstaculo: "Pequenas quedas d’água" },
"2-3": { lugar: "Ilha flutuante de vegetação", curiosidade: "Aves aquáticas", obstaculo: "Água funda ao redor" },
"2-4": { lugar: "Pantano", curiosidade: "Névoa leve", obstaculo: "Lodo pegajoso" },
"2-5": { lugar: "Recife submerso", curiosidade: "Corais coloridos", obstaculo: "Correntes fortes" },
"2-6": { lugar: "Lago profundo", curiosidade: "Peixe gigante visível", obstaculo: "Profundidade traiçoeira" },

"3-1": { lugar: "Baía isolada", curiosidade: "Barco abandonado", obstaculo: "Pedras escondidas" },
"3-2": { lugar: "Rio sinuoso", curiosidade: "Rochas com inscrições", obstaculo: "Água turva" },
"3-3": { lugar: "Cachoeira estreita", curiosidade: "Arbustos próximos à água", obstaculo: "Correnteza rápida" },
"3-4": { lugar: "Lago com ilha central", curiosidade: "Ninho de aves aquáticas", obstaculo: "Trilha submersa" },
"3-5": { lugar: "Mar raso", curiosidade: "Conchas enormes", obstaculo: "Água fria" },
"3-6": { lugar: "Estuário", curiosidade: "Plantas flutuantes", obstaculo: "Mistura de correntezas" },

"4-1": { lugar: "Caverna submersa", curiosidade: "Formações de calcário", obstaculo: "Entrada estreita" },
"4-2": { lugar: "Lago escondido", curiosidade: "Água cristalina", obstaculo: "Pedras escorregadias" },
"4-3": { lugar: "Mangue denso", curiosidade: "Árvores tortuosas", obstaculo: "Lodo profundo" },
"4-4": { lugar: "Mar calmo", curiosidade: "Cardume de peixes", obstaculo: "Ondas imprevisíveis" },
"4-5": { lugar: "Rio largo com ilhas", curiosidade: "Ninhos de aves", obstaculo: "Correnteza traíra" },
"4-6": { lugar: "Lagoa com vegetação", curiosidade: "Plantas flutuantes", obstaculo: "Caminho submerso irregular" },

"5-1": { lugar: "Pantano profundo", curiosidade: "Pequenos animais aquáticos", obstaculo: "Lodo traiçoeiro" },
"5-2": { lugar: "Recife próximo à costa", curiosidade: "Peixes coloridos", obstaculo: "Corais cortantes" },
"5-3": { lugar: "Rio estreito", curiosidade: "Plantas aquáticas", obstaculo: "Correnteza rápida" },
"5-4": { lugar: "Lagoa flutuante", curiosidade: "Ninhos de aves", obstaculo: "Água instável" },
"5-5": { lugar: "Maré baixa", curiosidade: "Conchas expostas", obstaculo: "Água rasa e lama" },
"5-6": { lugar: "Estuário largo", curiosidade: "Água turva", obstaculo: "Correntezas cruzadas" },

"6-1": { lugar: "Cachoeira alta", curiosidade: "Arco-íris permanente", obstaculo: "Rochas escorregadias" },
"6-2": { lugar: "Ilha pequena no lago", curiosidade: "Árvores isoladas", obstaculo: "Água profunda" },
"6-3": { lugar: "Manguezal com trilhas", curiosidade: "Caranguejos e aves", obstaculo: "Lodo pegajoso" },
"6-4": { lugar: "Baía tranquila", curiosidade: "Peixes saltando", obstaculo: "Ondas imprevisíveis" },
"6-5": { lugar: "Rio largo com pedras", curiosidade: "Plantas flutuantes", obstaculo: "Correnteza traiçoeira" },
"6-6": { lugar: "Lago profundo com ilha", curiosidade: "Peixes grandes", obstaculo: "Água escura" }
};

// COMPLICAÇÕES AQUÁTICAS
const complicacoesAquaticas = {
"1-1": { comp: "Tempestade repentina levanta ondas", t1: "Água / Vento", t2: "Violento" },
"1-2": { comp: "Correnteza arrasta objetos", t1: "Água / Pedra", t2: "Rápido" },
"1-3": { comp: "Pedras escorregadias bloqueiam passagem", t1: "Rochas / Água", t2: "Perigoso" },
"1-4": { comp: "[Inimigos aquáticos] atacam o grupo", t1: "Água / Barulho", t2: "Assustador" },
"1-5": { comp: "Plantas aquáticas prendem pés", t1: "Água / Planta", t2: "Traiçoeiro" },
"1-6": { comp: "Maré repentina bloqueia saída", t1: "Água / Reflexo", t2: "Rápido" },

"2-1": { comp: "Pedras submersas cortam pés", t1: "Água / Rocha", t2: "Perigoso" },
"2-2": { comp: "Quedas d’água dificultam passagem", t1: "Água / Barulho", t2: "Rápido" },
"2-3": { comp: "Água funda esconde perigo", t1: "Água / Escuridão", t2: "Traiçoeiro" },
"2-4": { comp: "Lodo profundo atrasa grupo", t1: "Lama / Água", t2: "Lento" },
"2-5": { comp: "Correnteza forte desvia rota", t1: "Água / Reflexo", t2: "Perigoso" },
"2-6": { comp: "Profundidade esconde [inimigos]", t1: "Água / Sombra", t2: "Assustador" },

"3-1": { comp: "Pedras escondidas cortam pés", t1: "Água / Rocha", t2: "Rápido" },
"3-2": { comp: "Água turva esconde obstáculos", t1: "Água / Barulho", t2: "Traiçoeiro" },
"3-3": { comp: "Correnteza rápida empurra grupo", t1: "Água / Reflexo", t2: "Rápido" },
"3-4": { comp: "Trilha submersa é instável", t1: "Água / Terra", t2: "Perigoso" },
"3-5": { comp: "Água fria atrapalha movimentos", t1: "Água / Temperatura", t2: "Desconfortável" },
"3-6": { comp: "Correntes se cruzam e confundem rota", t1: "Água / Reflexo", t2: "Perigoso" },

"4-1": { comp: "Entrada da caverna estreita desmorona", t1: "Rochas / Água", t2: "Perigoso" },
"4-2": { comp: "Pedras escorregadias dificultam passagem", t1: "Rochas / Água", t2: "Rápido" },
"4-3": { comp: "Lodo profundo atrasa movimento", t1: "Lama / Água", t2: "Lento" },
"4-4": { comp: "Ondas inesperadas bloqueiam rota", t1: "Água / Vento", t2: "Violento" },
"4-5": { comp: "Correnteza traiçoeira desvia grupo", t1: "Água / Reflexo", t2: "Perigoso" },
"4-6": { comp: "Água escura esconde perigos", t1: "Água / Sombra", t2: "Assustador" },

"5-1": { comp: "Lodo profundo prende pés e equipamentos", t1: "Lama / Água", t2: "Traiçoeiro" },
"5-2": { comp: "Corais cortantes ferem", t1: "Água / Rocha", t2: "Perigoso" },
"5-3": { comp: "Correnteza rápida empurra grupo", t1: "Água / Reflexo", t2: "Rápido" },
"5-4": { comp: "Água instável dificulta equilíbrio", t1: "Água / Terra", t2: "Traiçoeiro" },
"5-5": { comp: "Água rasa esconde obstáculos", t1: "Água / Reflexo", t2: "Perigoso" },
"5-6": { comp: "Correntezas cruzadas confundem direção", t1: "Água / Reflexo", t2: "Perigoso" },

"6-1": { comp: "Rochas escorregadias ameaçam queda", t1: "Água / Rocha", t2: "Perigoso" },
"6-2": { comp: "Água funda esconde armadilhas", t1: "Água / Sombra", t2: "Traiçoeiro" },
"6-3": { comp: "Lodo prende pés do grupo", t1: "Lama / Água", t2: "Lento" },
"6-4": { comp: "Ondas inesperadas batem no grupo", t1: "Água / Vento", t2: "Violento" },
"6-5": { comp: "Correnteza traiçoeira muda rota", t1: "Água / Reflexo", t2: "Perigoso" },
"6-6": { comp: "Água escura esconde [inimigos]", t1: "Água / Sombra", t2: "Assustador" }
};

// CENAS COLINAS
const cenasColinas = {
"1-1": { lugar: "Colina verdejante", curiosidade: "Pássaros cantando", obstaculo: "Caminho íngreme" },
"1-2": { lugar: "Encosta suave", curiosidade: "Pedras brilhantes", obstaculo: "Ponte natural quebrada" },
"1-3": { lugar: "Topo da colina", curiosidade: "Vento constante", obstaculo: "Pedra escorregadia" },
"1-4": { lugar: "Campo florido", curiosidade: "Borboletas coloridas", obstaculo: "Descida perigosa" },
"1-5": { lugar: "Colina rochosa", curiosidade: "Ninhos de águias", obstaculo: "Rochas soltas" },
"1-6": { lugar: "Planalto amplo", curiosidade: "Grama dourada", obstaculo: "Tempestade à distância" },

"2-1": { lugar: "Encosta arborizada", curiosidade: "Sombra fresca", obstaculo: "Trilha sinuosa" },
"2-2": { lugar: "Colina baixa", curiosidade: "Som de riacho", obstaculo: "Rio estreito à frente" },
"2-3": { lugar: "Campo aberto", curiosidade: "Marcas de roda antigas", obstaculo: "Lama profunda" },
"2-4": { lugar: "Monte pequeno", curiosidade: "Canto distante", obstaculo: "Trilha tomada por raízes" },
"2-5": { lugar: "Encosta rochosa", curiosidade: "Musgo brilhante", obstaculo: "Pedra desmoronando" },
"2-6": { lugar: "Colina isolada", curiosidade: "Som de passos", obstaculo: "Rastro de animal grande" },

"3-1": { lugar: "Planície alta", curiosidade: "Grama baixa", obstaculo: "Chuva repentina" },
"3-2": { lugar: "Campo ondulado", curiosidade: "Mariposas azuis", obstaculo: "Caminho coberto de lama" },
"3-3": { lugar: "Encosta suave", curiosidade: "Pedra antiga esculpida", obstaculo: "Deslizamento recente" },
"3-4": { lugar: "Topo de colina", curiosidade: "Som de coruja", obstaculo: "Raio atinge o chão" },
"3-5": { lugar: "Campina larga", curiosidade: "Flor violeta rara", obstaculo: "Animal morto no caminho" },
"3-6": { lugar: "Encosta estreita", curiosidade: "Vento frio forte", obstaculo: "Trilha bloqueada" },

"4-1": { lugar: "Campo de pedras", curiosidade: "Insetos zunindo", obstaculo: "Lago pequeno barrando o caminho" },
"4-2": { lugar: "Colina amarelada", curiosidade: "Sons distantes de cascos", obstaculo: "Caminho rachado" },
"4-3": { lugar: "Planície alta", curiosidade: "Vegetação rasteira", obstaculo: "Nevoeiro súbito" },
"4-4": { lugar: "Encosta suave", curiosidade: "Cheiro de chuva", obstaculo: "Rio largo" },
"4-5": { lugar: "Campo verde", curiosidade: "Nuvem baixa", obstaculo: "Caminho com buracos" },
"4-6": { lugar: "Colina solitária", curiosidade: "Grama trêmula", obstaculo: "Vento forte empurra o grupo" },

"5-1": { lugar: "Campina larga", curiosidade: "Folhas secas no chão", obstaculo: "Poça funda de lama" },
"5-2": { lugar: "Colina com pedras lisas", curiosidade: "Rastro de cavalo", obstaculo: "Ponte instável" },
"5-3": { lugar: "Campo aberto", curiosidade: "Canto distante de ave", obstaculo: "Rio profundo" },
"5-4": { lugar: "Topo plano", curiosidade: "Som de trovão ao longe", obstaculo: "Ladeira íngreme" },
"5-5": { lugar: "Encosta com flores", curiosidade: "Rastro de carroça", obstaculo: "Caminho com espinhos" },
"5-6": { lugar: "Colina dupla", curiosidade: "Cheiro de fumaça", obstaculo: "Pedras bloqueando trilha" },

"6-1": { lugar: "Planície verde", curiosidade: "Nuvens densas", obstaculo: "Vento contra o grupo" },
"6-2": { lugar: "Colina suave", curiosidade: "Sons de sinos distantes", obstaculo: "Árvore caída no caminho" },
"6-3": { lugar: "Campo plano", curiosidade: "Rastro de sangue", obstaculo: "Caminho alagado" },
"6-4": { lugar: "Colina coberta de musgo", curiosidade: "Vento frio", obstaculo: "Chuva forte" },
"6-5": { lugar: "Encosta ventosa", curiosidade: "Grama dourada", obstaculo: "Deslizamento parcial" },
"6-6": { lugar: "Topo alto", curiosidade: "Nuvens claras", obstaculo: "Relâmpago atinge perto" }
};

// COMPLICAÇÕES COLINAS
const complicacoesColinas = {
"1-1": { comp: "Deslizamento de terra repentino", t1: "Terra / Pedra", t2: "Perigoso" },
"1-2": { comp: "Vento forte sopra das colinas", t1: "Vento / Poeira", t2: "Intenso" },
"1-3": { comp: "Chuva transforma o solo em lama", t1: "Água / Lama", t2: "Difícil" },
"1-4": { comp: "[Inimigos] emboscam o grupo", t1: "Lanças / Poeira", t2: "Assustador" },
"1-5": { comp: "Encosta desmorona parcialmente", t1: "Pedra / Grama", t2: "Perigoso" },
"1-6": { comp: "Relâmpago atinge árvore próxima", t1: "Trovão / Fogo", t2: "Assustador" },

"2-1": { comp: "Névoa densa cobre o caminho", t1: "Névoa / Ar", t2: "Misterioso" },
"2-2": { comp: "Caminho se divide em duas trilhas", t1: "Trilha / Grama", t2: "Confuso" },
"2-3": { comp: "Rebanho selvagem cruza o caminho", t1: "Animais / Poeira", t2: "Surpreendente" },
"2-4": { comp: "[Inimigos] cercam o grupo", t1: "Dentes / Sombras", t2: "Assustador" },
"2-5": { comp: "Pedra solta rola ladeira abaixo", t1: "Pedras / Encosta", t2: "Perigoso" },
"2-6": { comp: "Tempestade de vento se aproxima", t1: "Vento / Chuva", t2: "Intenso" },

"3-1": { comp: "Trilha desaba sob os pés", t1: "Terra / Pedra", t2: "Perigoso" },
"3-2": { comp: "Rio pequeno transborda e corta caminho", t1: "Água / Lama", t2: "Difícil" },
"3-3": { comp: "Nevoeiro sobe das encostas", t1: "Névoa / Vento", t2: "Misterioso" },
"3-4": { comp: "[Harpias] atacam do alto", t1: "Asas / Gritos", t2: "Assustador" },
"3-5": { comp: "Relâmpago rasga o céu", t1: "Tempestade / Trovão", t2: "Intenso" },
"3-6": { comp: "Pedras deslizam da encosta", t1: "Pedras / Poeira", t2: "Perigoso" },

"4-1": { comp: "Vento frio corta o vale", t1: "Vento / Névoa", t2: "Intenso" },
"4-2": { comp: "Animal ferido bloqueia o caminho", t1: "Sangue / Grama", t2: "Misterioso" },
"4-3": { comp: "Pequeno tremor de terra faz o chão tremer", t1: "Terra / Pedra", t2: "Perigoso" },
"4-4": { comp: "[Inimigos] surgem ao longe", t1: "Lanças / Gritos", t2: "Assustador" },
"4-5": { comp: "Chuvisco constante reduz visibilidade", t1: "Água / Névoa", t2: "Difícil" },
"4-6": { comp: "Corvos começam a seguir o grupo", t1: "Aves / Sombras", t2: "Misterioso" },

"5-1": { comp: "Encosta íngreme dificulta a subida", t1: "Pedra / Grama", t2: "Difícil" },
"5-2": { comp: "Vento carrega o som de vozes", t1: "Vento / Som", t2: "Misterioso" },
"5-3": { comp: "Trilha tomada por espinhos", t1: "Plantas / Espinhos", t2: "Doloroso" },
"5-4": { comp: "[Inimigos] aparecem entre as pedras", t1: "Força / Gritos", t2: "Assustador" },
"5-5": { comp: "Raio atinge uma pedra próxima", t1: "Trovão / Fumaça", t2: "Perigoso" },
"5-6": { comp: "Tempestade se forma rapidamente", t1: "Nuvens / Vento", t2: "Intenso" },

"6-1": { comp: "Nevoeiro cobre todo o vale", t1: "Névoa / Ar", t2: "Misterioso" },
"6-2": { comp: "Deslizamento parcial bloqueia caminho", t1: "Pedras / Terra", t2: "Perigoso" },
"6-3": { comp: "Vento violento arranca galhos e folhas", t1: "Vento / Poeira", t2: "Intenso" },
"6-4": { comp: "[Inimigos] atacam de surpresa", t1: "Asas / Lâminas", t2: "Assustador" },
"6-5": { comp: "Relâmpago ilumina silhuetas ao longe", t1: "Trovão / Névoa", t2: "Misterioso" },
"6-6": { comp: "Chuva torrencial causa enxurrada", t1: "Água / Lama", t2: "Perigoso" }
};

// CENAS MONTANHA
const cenasMontanha = {
"1-1": { lugar: "Pedras gigantes dos lados", curiosidade: "Ninhos de pássaros", obstaculo: "Subida íngreme é preciso escalar" },
"1-2": { lugar: "Caminho entre as pedras", curiosidade: "Pássaros voando em círculos", obstaculo: "Chão instável" },
"1-3": { lugar: "Pedras rachadas", curiosidade: "Inscrição nas pedras", obstaculo: "Desfiladeiro à frente" },
"1-4": { lugar: "Muitas pedras pequenas", curiosidade: "Carcaça de animal", obstaculo: "Parede lateral instável" },
"1-5": { lugar: "Plantas crescentes entre as pedras", curiosidade: "Acampamento abandonado", obstaculo: "[Inimigos] no caminho" },
"1-6": { lugar: "Pedra grande com forma estranha", curiosidade: "Caverna ao lado", obstaculo: "[Inimigos] distraídos" },

"2-1": { lugar: "Trilha estreita entre rochas", curiosidade: "Rastro de cabra montesa", obstaculo: "Pedras soltas bloqueiam" },
"2-2": { lugar: "Clareira entre penhascos", curiosidade: "Pedra brilhante", obstaculo: "Rampa íngreme" },
"2-3": { lugar: "Desfiladeiro raso", curiosidade: "Marcas de corrida de animais", obstaculo: "Fenda profunda" },
"2-4": { lugar: "Encosta com pedregulho", curiosidade: "Pedra marcada", obstaculo: "Rochas caindo" },
"2-5": { lugar: "Pedras cobertas de musgo", curiosidade: "Fragmento de osso", obstaculo: "Buraco escondido" },
"2-6": { lugar: "Colina pedregosa", curiosidade: "Caverna pequena", obstaculo: "Chão instável" },

"3-1": { lugar: "Penhasco alto", curiosidade: "Inscrição antiga", obstaculo: "Desnível perigoso" },
"3-2": { lugar: "Montanha com pedras pontiagudas", curiosidade: "Rastro de falcão", obstaculo: "Pedra instável" },
"3-3": { lugar: "Trilha estreita e íngreme", curiosidade: "Ninho de águia", obstaculo: "Caminho escorregadio" },
"3-4": { lugar: "Pedras soltas e quebradas", curiosidade: "Pedra antiga com runa", obstaculo: "Risco de queda" },
"3-5": { lugar: "Clareira rochosa", curiosidade: "Pedra com musgo", obstaculo: "Buraco profundo" },
"3-6": { lugar: "Caminho sinuoso entre rochas", curiosidade: "Rastro de animal selvagem", obstaculo: "Parede instável" },

"4-1": { lugar: "Colina rochosa", curiosidade: "Pedra marcada", obstaculo: "Chão irregular" },
"4-2": { lugar: "Montanha com pedras empilhadas", curiosidade: "Rastro de pegadas", obstaculo: "Pedras rolando" },
"4-3": { lugar: "Desfiladeiro estreito", curiosidade: "Pedra luminosa", obstaculo: "Risco de queda" },
"4-4": { lugar: "Pedras altas e finas", curiosidade: "Marcas de batalha", obstaculo: "Trilha interrompida" },
"4-5": { lugar: "Encosta com pequenas árvores", curiosidade: "Ninho de corvo", obstaculo: "Parede instável" },
"4-6": { lugar: "Montanha rachada", curiosidade: "Caverna pequena com luz", obstaculo: "Pedra grande bloqueia" },

"5-1": { lugar: "Trilha pedregosa", curiosidade: "Rastro de roedores", obstaculo: "Pedras escorregadias" },
"5-2": { lugar: "Encosta íngreme", curiosidade: "Pedra com runa", obstaculo: "Buraco oculto" },
"5-3": { lugar: "Montanha coberta de pedras", curiosidade: "Pedaço de ossos", obstaculo: "[Inimigos] rondam" },
"5-4": { lugar: "Colina com pedras soltas", curiosidade: "Rastro de cabra", obstaculo: "Buraco profundo" },
"5-5": { lugar: "Pedras altas alinhadas", curiosidade: "Caverna parcial", obstaculo: "[Inimigos] rondam" },
"5-6": { lugar: "Desfiladeiro largo", curiosidade: "Marcas antigas de ferro", obstaculo: "Risco de queda" },

"6-1": { lugar: "Trilha estreita em penhasco", curiosidade: "Ninho abandonado", obstaculo: "Chão irregular" },
"6-2": { lugar: "Encosta com pedras quebradas", curiosidade: "Pedra brilhante", obstaculo: "Parede instável" },
"6-3": { lugar: "Colina pedregosa", curiosidade: "Fragmento de cristal", obstaculo: "Buraco escondido" },
"6-4": { lugar: "Montanha íngreme", curiosidade: "Pedra com musgo", obstaculo: "Pedras rolando" },
"6-5": { lugar: "Desfiladeiro com pedregulho", curiosidade: "Marcas de batalha", obstaculo: "Trilha interrompida" },
"6-6": { lugar: "Pedra enorme com fissura", curiosidade: "Caverna lateral", obstaculo: "[Inimigos] dormem" }
};

// COMPLICAÇÕES MONTANHA
const complicacoesMontanha = {
"1-1": { comp: "Um personagem escorrega e pode cair!", t1: "Aves / Nuvens", t2: "Duro" },
"1-2": { comp: "Desmoronamento!", t1: "Calor / Dente", t2: "Cinza" },
"1-3": { comp: "Uma pedra cai e bloqueia o caminho", t1: "Fumaça / Caverna", t2: "Quente" },
"1-4": { comp: "[Inimigos] atacam o grupo!", t1: "Pedras / Penas", t2: "Distante" },
"1-5": { comp: "[Inimigos] atacam o grupo!", t1: "Machado / Ferro", t2: "Afiado" },
"1-6": { comp: "[Inimigos] se aproximam!", t1: "Árvore / Escudo", t2: "Vertiginoso" },

"2-1": { comp: "Pedra solta rola colina abaixo", t1: "Rocha / Poeira", t2: "Rápido" },
"2-2": { comp: "Trilha estreita ameaça queda", t1: "Vento / Eco", t2: "Alto" },
"2-3": { comp: "Deslizamento de pedras pequenas", t1: "Barulho / Pedra", t2: "Longe" },
"2-4": { comp: "Risco de avalanche súbita", t1: "Neve / Rocha", t2: "Perigoso" },
"2-5": { comp: "Pedra instável bloqueia caminho", t1: "Luz / Fenda", t2: "Afiado" },
"2-6": { comp: "Tronco solto bloqueia passagem", t1: "Galho / Sombra", t2: "Escorregadio" },

"3-1": { comp: "Desfiladeiro estreito dificulta avanço", t1: "Risco / Pedra", t2: "Rápido" },
"3-2": { comp: "Pedra gigante cai de penhasco", t1: "Poeira / Eco", t2: "Longe" },
"3-3": { comp: "Risco de queda de estalactite", t1: "Caverna / Rocha", t2: "Vertiginoso" },
"3-4": { comp: "[Abutres] circulam acima", t1: "Vento / Penas", t2: "Distante" },
"3-5": { comp: "[Inimigos] rondam encosta", t1: "Pedra / Marcas", t2: "Afiado" },
"3-6": { comp: "Rochas soltas bloqueiam trilha", t1: "Barulho / Tronco", t2: "Duro" },

"4-1": { comp: "Deslizamento de neve parcial", t1: "Neve / Poeira", t2: "Rápido" },
"4-2": { comp: "Pedra solta no caminho", t1: "Pedra / Musgo", t2: "Longe" },
"4-3": { comp: "Trilha instável ameaça queda", t1: "Vento / Sombra", t2: "Vertiginoso" },
"4-4": { comp: "[Inimigos] atacam colina", t1: "Árvore / Escudo", t2: "Alto" },
"4-5": { comp: "Pedra rachada ameaça cair", t1: "Fenda / Rocha", t2: "Afiado" },
"4-6": { comp: "Tronco bloqueia passagem", t1: "Galho / Folha", t2: "Escorregadio" },

"5-1": { comp: "Rochas rolando descem encosta", t1: "Poeira / Rocha", t2: "Rápido" },
"5-2": { comp: "Pedra grande se solta", t1: "Fenda / Luz", t2: "Longe" },
"5-3": { comp: "Trilha escorregadia", t1: "Vento / Terra", t2: "Vertiginoso" },
"5-4": { comp: "[Abutres] cercam o grupo", t1: "Penas / Som", t2: "Distante" },
"5-5": { comp: "[Inimigos] perseguem", t1: "Rastro / Pedra", t2: "Afiado" },
"5-6": { comp: "Pedra instável bloqueia caminho", t1: "Pedra / Eco", t2: "Duro" },

"6-1": { comp: "Risco de avalanche", t1: "Vento / Neve", t2: "Rápido" },
"6-2": { comp: "Desfiladeiro íngreme", t1: "Borda / Rocha", t2: "Longe" },
"6-3": { comp: "Pedra gigante ameaça cair", t1: "Pedra / Sombra", t2: "Vertiginoso" },
"6-4": { comp: "[Inimigos] surgem", t1: "Árvore / Escudo", t2: "Alto" },
"6-5": { comp: "Rachadura súbita no solo", t1: "Fenda / Poeira", t2: "Afiado" },
"6-6": { comp: "Trilha estreita dificulta avanço", t1: "Galho / Musgo", t2: "Escorregadio" }
};

// CENAS DESERTO
const cenasDeserto = {
"1-1": { lugar: "Duna alta", curiosidade: "Parece ter água ali (ou não?)", obstaculo: "Areia cobre a visão" },
"1-2": { lugar: "Dunas baixas", curiosidade: "Uma planta colorida", obstaculo: "Pés ficam presos na areia" },
"1-3": { lugar: "Chão mais firme", curiosidade: "Alguns animais pequenos", obstaculo: "Andando em círculos" },
"1-4": { lugar: "Areia muito macia", curiosidade: "Aves sobrevoam o local", obstaculo: "Vento muito forte" },
"1-5": { lugar: "Alguns cactos e plantas rasteiras", curiosidade: "Esqueleto de um aventureiro", obstaculo: "Miragens confundem o grupo" },
"1-6": { lugar: "Região mais plana", curiosidade: "Ruínas antigas", obstaculo: "Parede de dunas muito altas à frente" },

"2-1": { lugar: "Duna íngreme", curiosidade: "Pedra quente ao sol", obstaculo: "Areia escorregadia" },
"2-2": { lugar: "Dunas onduladas", curiosidade: "Planta resistente ao calor", obstaculo: "Pés afundam na areia" },
"2-3": { lugar: "Pedra saliente no deserto", curiosidade: "Pequenos roedores", obstaculo: "Vento corta o rosto" },
"2-4": { lugar: "Areia fina e movediça", curiosidade: "Aves migratórias", obstaculo: "Tempestade de areia" },
"2-5": { lugar: "Oásis seco", curiosidade: "Esqueleto de animal", obstaculo: "Riacho de areia bloqueia caminho" },
"2-6": { lugar: "Região com pedras dispersas", curiosidade: "Runa antiga no solo", obstaculo: "Duna alta bloqueia avanço" },

"3-1": { lugar: "Duna solitária", curiosidade: "Planta rara", obstaculo: "Lama de areia difícil de atravessar" },
"3-2": { lugar: "Dunas extensas", curiosidade: "Marcas de animais", obstaculo: "Areia cobre trilha" },
"3-3": { lugar: "Pedra exposta", curiosidade: "Pequenos insetos", obstaculo: "Vento intenso empurra areia" },
"3-4": { lugar: "Areia amarelada", curiosidade: "Aves planando sobre o horizonte", obstaculo: "Tempestade de areia se aproxima" },
"3-5": { lugar: "Cactos isolados", curiosidade: "Restos de cabana abandonada", obstaculo: "Parede de dunas impede passagem" },
"3-6": { lugar: "Planície de areia clara", curiosidade: "Rastro de viajante", obstaculo: "Risco de desmoronamento de dunas" },

"4-1": { lugar: "Duna com vegetação escassa", curiosidade: "Pedra com inscrições", obstaculo: "Areia instável" },
"4-2": { lugar: "Dunas baixas e largas", curiosidade: "Pequenos animais", obstaculo: "Andando em círculos" },
"4-3": { lugar: "Areia clara e quente", curiosidade: "Ruína parcialmente soterrada", obstaculo: "Vento forte" },
"4-4": { lugar: "Duna muito alta", curiosidade: "Planta resistente ao calor", obstaculo: "Parede de areia impede passagem" },
"4-5": { lugar: "Pedra solta entre dunas", curiosidade: "Rastro de animal", obstaculo: "Risco de areia movediça" },
"4-6": { lugar: "Planície arenosa", curiosidade: "Pedra luminosa", obstaculo: "Miragem confunde visão" },

"5-1": { lugar: "Duna inclinada", curiosidade: "Planta rasteira", obstaculo: "Areia cobre trilha" },
"5-2": { lugar: "Dunas de formato estranho", curiosidade: "Rastro de animal", obstaculo: "Pés afundam" },
"5-3": { lugar: "Pedras esparsas no deserto", curiosidade: "Marcas antigas de carroça", obstaculo: "Vento intenso" },
"5-4": { lugar: "Areia fofa e profunda", curiosidade: "Aves circulando", obstaculo: "Vento forte levanta areia" },
"5-5": { lugar: "Oásis pequeno", curiosidade: "Esqueleto de aventureiro", obstaculo: "Miragem engana grupo" },
"5-6": { lugar: "Região plana com pedras", curiosidade: "Ruínas antigas", obstaculo: "Duna alta bloqueia passagem" },

"6-1": { lugar: "Duna isolada", curiosidade: "Planta resistente", obstaculo: "Parede de areia instável" },
"6-2": { lugar: "Dunas longas", curiosidade: "Pequenos roedores", obstaculo: "Areia cobre caminho" },
"6-3": { lugar: "Pedra quente ao sol", curiosidade: "Rastro de viajante", obstaculo: "Vento intenso" },
"6-4": { lugar: "Areia fina", curiosidade: "Aves sobrevoam", obstaculo: "Vento forte" },
"6-5": { lugar: "Planície de dunas baixas", curiosidade: "Restos de cabana", obstaculo: "Miragem confunde" },
"6-6": { lugar: "Região mais plana", curiosidade: "Runa antiga", obstaculo: "Duna muito alta à frente" }
};

// COMPLICAÇÕES DESERTO
const complicacoesDeserto = {
"1-1": { comp: "Uma ilusão faz alguém ficar assustado", t1: "Areia / Templo", t2: "Antigo" },
"1-2": { comp: "Areia movediça", t1: "Sol / Ruínas", t2: "Escaldante" },
"1-3": { comp: "Areia movediça", t1: "Vento / Deuses", t2: "Misterioso" },
"1-4": { comp: "[Abutres] atacam o grupo!", t1: "Lua / Animal", t2: "Gigante" },
"1-5": { comp: "[Verme Gigante] surge na frente do grupo!", t1: "Miragem / Ossos", t2: "Inacreditável" },
"1-6": { comp: "[Inimigos] se aproximam!", t1: "Oásis / Povo", t2: "Resistente" },

"2-1": { comp: "Vento forte levanta areia", t1: "Areia / Dunas", t2: "Intenso" },
"2-2": { comp: "Tempestade de areia cobre visão", t1: "Sol / Poeira", t2: "Perigoso" },
"2-3": { comp: "Duna cede sob pés", t1: "Vento / Roca", t2: "Misterioso" },
"2-4": { comp: "[Inimigos] cercam o grupo", t1: "Lua / Poeira", t2: "Assustador" },
"2-5": { comp: "Miragem confunde caminho", t1: "Miragem / Luz", t2: "Enganoso" },
"2-6": { comp: "[Abutres] voam baixo", t1: "Oásis / Pedra", t2: "Imponente" },

"3-1": { comp: "Areia movediça quase engole", t1: "Lama / Areia", t2: "Escorregadio" },
"3-2": { comp: "Duna desmorona à frente", t1: "Sol / Pedra", t2: "Perigoso" },
"3-3": { comp: "Vento quente dificulta respiração", t1: "Vento / Poeira", t2: "Misterioso" },
"3-4": { comp: "[Abutres] atacam repentinamente", t1: "Lua / Asas", t2: "Assustador" },
"3-5": { comp: "Verme de areia bloqueia caminho", t1: "Miragem / Ossos", t2: "Inacreditável" },
"3-6": { comp: "Dunas altas quase cobrem grupo", t1: "Oásis / Pedra", t2: "Resistente" },

"4-1": { comp: "Areia solta cobre pegadas", t1: "Areia / Sol", t2: "Intenso" },
"4-2": { comp: "Duna instável ameaça cair", t1: "Sol / Rocha", t2: "Perigoso" },
"4-3": { comp: "Vento levanta nuvem de poeira", t1: "Vento / Dunas", t2: "Misterioso" },
"4-4": { comp: "[Inimigos] rondam o grupo", t1: "Lua / Penas", t2: "Assustador" },
"4-5": { comp: "Verme gigante se aproxima", t1: "Miragem / Luz", t2: "Inacreditável" },
"4-6": { comp: "Inimigos surgem", t1: "Oásis / Pedra", t2: "Resistente" },

"5-1": { comp: "Areia fina dificulta andar", t1: "Areia / Poeira", t2: "Escorregadio" },
"5-2": { comp: "Duna se move com vento", t1: "Sol / Dunas", t2: "Perigoso" },
"5-3": { comp: "Vento quente cega parcialmente", t1: "Vento / Luz", t2: "Misterioso" },
"5-4": { comp: "[Inimigos] atacam", t1: "Lua / Asas", t2: "Assustador" },
"5-5": { comp: "Verme gigante emerge do deserto", t1: "Miragem / Pedra", t2: "Inacreditável" },
"5-6": { comp: "Inimigos atacam", t1: "Oásis / Pedra", t2: "Resistente" },

"6-1": { comp: "Duna cede sob peso do grupo", t1: "Areia / Rocha", t2: "Escorregadio" },
"6-2": { comp: "Tempestade de areia avança", t1: "Sol / Poeira", t2: "Perigoso" },
"6-3": { comp: "Vento forte desvia trilha", t1: "Vento / Dunas", t2: "Misterioso" },
"6-4": { comp: "[Abutres] voam baixo", t1: "Lua / Penas", t2: "Assustador" },
"6-5": { comp: "Verme gigante dormindo", t1: "Miragem / Luz", t2: "Inacreditável" },
"6-6": { comp: "Abutres voam sobre grupo", t1: "Oásis / Pedra", t2: "Resistente" }
};

// CENAS PANTANO
const cenasPantano = {
"1-1": { lugar: "Árvores secas", curiosidade: "Rastro de animal", obstaculo: "Lama impede o grupo de se mover" },
"1-2": { lugar: "Mato alto sobre as águas", curiosidade: "Pássaros voando em círculos", obstaculo: "Grande lago à frente" },
"1-3": { lugar: "Cheiro fétido das águas", curiosidade: "Casa de madeira em ruínas", obstaculo: "Neblina densa impede de enxergar" },
"1-4": { lugar: "O chão é só lama", curiosidade: "Carcaça de animal", obstaculo: "Nuvem de mosquitos" },
"1-5": { lugar: "Árvores estranhas", curiosidade: "Acampamento abandonado", obstaculo: "[Inimigo] no caminho" },
"1-6": { lugar: "Peixes nadando na lama", curiosidade: "Planta colorida e misteriosa", obstaculo: "[Inimigo] no caminho" },

"2-1": { lugar: "Lagoa rasa", curiosidade: "Ramo quebrado", obstaculo: "Caminho escorregadio" },
"2-2": { lugar: "Mangue com raízes expostas", curiosidade: "Rastro de sapo", obstaculo: "Lama profunda" },
"2-3": { lugar: "Pântano coberto de musgo", curiosidade: "Galho com limo", obstaculo: "Neblina baixa" },
"2-4": { lugar: "Trilha lamacenta", curiosidade: "Ruína de madeira", obstaculo: "Buraco escondido" },
"2-5": { lugar: "Árvores tortuosas", curiosidade: "Rastro de jacaré", obstaculo: "[Inimigos] espreita" },
"2-6": { lugar: "Água parada com flores", curiosidade: "Pântano com cogumelos", obstaculo: "[Inimigos] observa" },

"3-1": { lugar: "Mato alto e denso", curiosidade: "Rastro de cervo", obstaculo: "Lama pegajosa" },
"3-2": { lugar: "Lagoa escura", curiosidade: "Pedra coberta de limo", obstaculo: "Galho bloqueia caminho" },
"3-3": { lugar: "Pântano fétido", curiosidade: "Ruínas abandonadas", obstaculo: "Neblina espessa" },
"3-4": { lugar: "Chão encharcado", curiosidade: "Rastro de ave aquática", obstaculo: "Nuvem de insetos" },
"3-5": { lugar: "Árvores antigas e secas", curiosidade: "Acampamento abandonado", obstaculo: "[Inimigos] ronda" },
"3-6": { lugar: "Água turva com algas", curiosidade: "Planta luminosa", obstaculo: "[Inimigos] bloqueia trilha" },

"4-1": { lugar: "Lagoa com pedras cobertas de musgo", curiosidade: "Pedra marcada", obstaculo: "Lama profunda" },
"4-2": { lugar: "Trilha alagada", curiosidade: "Rastro de sapo", obstaculo: "Lago raso à frente" },
"4-3": { lugar: "Mangue fechado", curiosidade: "Ruínas submersas", obstaculo: "Neblina baixa" },
"4-4": { lugar: "Pântano com raízes expostas", curiosidade: "Ramo quebrado", obstaculo: "Nuvem de mosquitos" },
"4-5": { lugar: "Árvores retorcidas", curiosidade: "Rastro de jacaré", obstaculo: "[Inimigo] patrulha" },
"4-6": { lugar: "Lagoa com plantas estranhas", curiosidade: "Planta colorida", obstaculo: "[Inimigo] observa" },

"5-1": { lugar: "Chão lamacento", curiosidade: "Rastro de sapo", obstaculo: "Lama pegajosa" },
"5-2": { lugar: "Mangue úmido", curiosidade: "Pedra coberta de limo", obstaculo: "Lago raso" },
"5-3": { lugar: "Pântano denso", curiosidade: "Ruína de cabana", obstaculo: "Neblina densa" },
"5-4": { lugar: "Lagoa escura", curiosidade: "Rastro de ave aquática", obstaculo: "Nuvem de mosquitos" },
"5-5": { lugar: "Árvores altas e finas", curiosidade: "Acampamento abandonado", obstaculo: "[Inimigo] espreita" },
"5-6": { lugar: "Água parada com flores", curiosidade: "Rastro de peixe", obstaculo: "[Inimigo] ronda" },

"6-1": { lugar: "Trilha coberta de limo", curiosidade: "Pedra antiga", obstaculo: "Lama profunda" },
"6-2": { lugar: "Lagoa rasa", curiosidade: "Rastro de sapo", obstaculo: "Lago à frente" },
"6-3": { lugar: "Mangue fechado", curiosidade: "Galho quebrado", obstaculo: "Neblina baixa" },
"6-4": { lugar: "Pântano fétido", curiosidade: "Rastro de animal", obstaculo: "Nuvem de insetos" },
"6-5": { lugar: "Árvores tortuosas", curiosidade: "Acampamento abandonado", obstaculo: "[Inimigo] bloqueia" },
"6-6": { lugar: "Água turva com algas", curiosidade: "Planta colorida", obstaculo: "[Inimigo] bloqueia caminho" }
};

// COMPLICAÇÕES PANTANO
const complicacoesPantano = {
"1-1": { comp: "Sanguessugas em seus pés", t1: "Lama / Espada", t2: "Abandonado" },
"1-2": { comp: "Chuva pesada começa a cair", t1: "Chuva / Musgo", t2: "Sujo" },
"1-3": { comp: "Lama nos seus pés começa a puxar para baixo", t1: "Gases / Placa", t2: "Flamejante" },
"1-4": { comp: "[Inimigos] atacam o grupo!", t1: "Frio / Sanguessuga", t2: "Apodrecido" },
"1-5": { comp: "[Insetos Gigantes] aparecem!", t1: "Neblina / Galhos", t2: "Fedorento" },
"1-6": { comp: "[Inimigos] atacam o grupo!", t1: "Árvore / Casebre", t2: "Perdido" },

"2-1": { comp: "Raízes escorregadias prendem pés", t1: "Lama / Folha", t2: "Lento" },
"2-2": { comp: "Poça profunda quase engole personagem", t1: "Água / Musgo", t2: "Pesado" },
"2-3": { comp: "Névoa tóxica encobre caminho", t1: "Gases / Água", t2: "Perigoso" },
"2-4": { comp: "[Jacarés] emergem das águas", t1: "Frio / Pedra", t2: "Assustador" },
"2-5": { comp: "Insetos atacam em enxame", t1: "Neblina / Galho", t2: "Fedorento" },
"2-6": { comp: "Tronco instável bloqueia caminho", t1: "Árvore / Lama", t2: "Perdido" },

"3-1": { comp: "Lama pegajosa atrasa grupo", t1: "Lodo / Tronco", t2: "Lento" },
"3-2": { comp: "Pântano instável ameaça queda", t1: "Água / Espuma", t2: "Pesado" },
"3-3": { comp: "Riacho repentino corta passagem", t1: "Gases / Terra", t2: "Perigoso" },
"3-4": { comp: "[Inimigos] rondam acima", t1: "Frio / Pena", t2: "Assustador" },
"3-5": { comp: "Insetos gigantes zumbem", t1: "Nevoeiro / Folha", t2: "Fedorento" },
"3-6": { comp: "Tronco coberto de limo bloqueia", t1: "Lama / Galho", t2: "Perdido" },

"4-1": { comp: "Chão encharcado quase engole", t1: "Lodo / Musgo", t2: "Lento" },
"4-2": { comp: "Névoa espessa reduz visão", t1: "Água / Poeira", t2: "Pesado" },
"4-3": { comp: "Riacho lamacento impede avanço", t1: "Gases / Tronco", t2: "Perigoso" },
"4-4": { comp: "[Inimigos] cercam grupo", t1: "Frio / Terra", t2: "Assustador" },
"4-5": { comp: "Insetos zumbem intensamente", t1: "Neblina / Musgo", t2: "Fedorento" },
"4-6": { comp: "Raiz solta bloqueia passagem", t1: "Árvore / Lama", t2: "Perdido" },

"5-1": { comp: "Lama densa atrasa progresso", t1: "Lodo / Folha", t2: "Lento" },
"5-2": { comp: "Poça profunda ameaça engolir", t1: "Água / Tronco", t2: "Pesado" },
"5-3": { comp: "Chão instável ameaça queda", t1: "Gases / Musgo", t2: "Perigoso" },
"5-4": { comp: "[Inimigos] atacam inesperadamente", t1: "Frio / Pena", t2: "Assustador" },
"5-5": { comp: "Insetos voadores bloqueiam visão", t1: "Neblina / Galho", t2: "Fedorento" },
"5-6": { comp: "Tronco instável ameaça queda", t1: "Lama / Casebre", t2: "Perdido" },

"6-1": { comp: "Chão pegajoso prende sapatos", t1: "Lodo / Terra", t2: "Lento" },
"6-2": { comp: "Névoa densa cobre caminho", t1: "Água / Lodo", t2: "Pesado" },
"6-3": { comp: "Lama escorregadia ameaça cair", t1: "Gases / Tronco", t2: "Perigoso" },
"6-4": { comp: "[Jacarés] emergem de repente", t1: "Frio / Espuma", t2: "Assustador" },
"6-5": { comp: "Insetos atacam em enxame", t1: "Neblina / Folha", t2: "Fedorento" },
"6-6": { comp: "Ramos e raízes bloqueiam caminho", t1: "Árvore / Musgo", t2: "Perdido" }
};


const piPlanicieMons = [
  {descricao: "Lobos caçam em grupo nas planícies", combate:"Abater o alfa e dispersar", paz:"Afastá-los com fogo e controlar presas", ganchos:"Fazendeiros pedem ajuda; destruição de plantações", variacoes:"Alfa controlado por humano; filhotes escondidos"},
  {descricao: "Rebanho de bestas controladas por centauros", combate:"Derrubar o chefe centauro", paz:"Negociar limites de pasto", ganchos:"Ferreiro quer chifre raro; centauros conhecem rotas", variacoes:"Aliança com druidas; líderes corruptos"},
  {descricao: "Predador alado nidifica em monte antigo", combate:"Destruir o ninho", paz:"Remover ovos para local seguro", ganchos:"Ovo é valioso; artefato no ninho", variacoes:"Visão mágica; ovos de espécie diferente"},
  {descricao: "Corvos gigantes banqueteiam carcaças", combate:"Abater líderes e dispersar", paz:"Fornecer carcaças controladas", ganchos:"Eremita coleta penas raras", variacoes:"Corvos mensageiros; falcão místico no topo"},
  {descricao: "Torre arruinada com bandidos e besta domesticada", combate:"Capturar líder", paz:"Subornar / negociar rendição", ganchos:"Estandarte é símbolo perdido; mapa escondido", variacoes:"Criaturas guardiãs; sala secreta inquisitorial"},
  {descricao: "Antílopes passam aqui; predadores aguardam", combate:"Eliminar predadores", paz:"Redirecionar rota via engenharia local", ganchos:"Tribo depende da rota; caçadores ilegais", variacoes:"Atrai elementais de vento; migração violenta"},
  {descricao: "Humanos brutamontes cobram pedágio", combate:"Derrotar o chefe", paz:"Oferecer serviços por proteção", ganchos:"Mercador endividado; caravanas atacadas", variacoes:"Falso estandarte nobre; aliado místico"},
  {descricao: "Ossadas antigas; espíritos protegem o local", combate:"Enfrentar espíritos", paz:"Realizar ritos funerários", ganchos:"Corvo conhece segredos reais", variacoes:"Ossadas se recompõem; jazida de sal"},
  {descricao: "Aves territoriais impedem pastores", combate:"Matar líderes do bando", paz:"Trocar carne por penas", ganchos:"Chefe de família pede ajuda; colecionador quer ovos", variacoes:"Olhar petrificante; monólito sagrado"},
  {descricao: "Água salobra atrai predadores aquáticos", combate:"Emboscar predadores", paz:"Construir pontes / cercas", ganchos:"Vilarejos dependem do oásis; rota secreta", variacoes:"Água curativa temporária; parasitas mágicos"},
  {descricao: "Dois clãs brigam por território", combate:"Escolher lado ou enfrentar ambos", paz:"Mediar trégua", ganchos:"Prisioneiro valioso; chefes misteriosos", variacoes:"Pacto com espíritos; disputa por relíquia"},
  {descricao: "Águia colossal domina correntes de vento", combate:"Abater a mãe", paz:"Oferecer presas / negociar", ganchos:"Aprendiz quer plumas; mago usa ventos", variacoes:"Guardiã de altar; familiar de semideus"}
];

const piPlanicieNPC = [
  {descricao: "Um mercador viaja com uma carroça cheia de mercadorias e histórias.",
   combate: "Roubar sua carga ou forçá-lo a revelar seus segredos.",
   paz: "Ajudá-lo a consertar a carroça ou protegê-lo de saqueadores.",
   ganchos: "O comerciante vende um item raro ou mágico de origem duvidosa.",
   variacoes: "Carroça é amaldiçoada; mercador é um demônio disfarçado."
  },

  {descricao: "Cuida de rebanhos em campos abertos, teme algo que ronda à noite.",
   combate: "Ameaçar ou matar o pastor para tomar seus animais.",
   paz: "Ajudar a identificar a criatura que ameaça o rebanho.",
   ganchos: "As criaturas noturnas fazem parte de um ritual esquecido.",
   variacoes: "A criatura é ilusória; o pastor está possuído."
  },

  {descricao: "Espreita viajantes sob ordens de um senhor distante.",
   combate: "Emboscá-lo ou destruir sua base.",
   paz: "Convencê-lo a mudar de lealdade.",
   ganchos: "Ele busca provas de uma invasão iminente.",
   variacoes: "Ele está sendo vigiado; carrega cartas secretas."
  },

  {descricao: "Afirma ter visões de algo enterrado sob as planícies.",
   combate: "Matá-lo ou tomar posse do local.",
   paz: "Ajudar a escavar o que está soterrado.",
   ganchos: "O que jaz sob a terra é um artefato antigo ou um mal selado.",
   variacoes: "As visões vêm de uma entidade; escavação atrai cultistas."
  },

  {descricao: "Um pequeno grupo perdido busca orientação.",
   combate: "Saqueá-los ou expulsá-los.",
   paz: "Guiá-los até o caminho correto.",
   ganchos: "Transportam um prisioneiro valioso sem saber.",
   variacoes: "O prisioneiro é inocente; guardas chegam procurando."
  },

  {descricao: "Um velho cavaleiro aposentado protege viajantes.",
   combate: "Duelar com ele por fama.",
   paz: "Ouvir suas histórias e ajudá-lo em seu último desejo.",
   ganchos: "Ele guarda um mapa antigo de rotas perdidas.",
   variacoes: "Velho é um fantasma; mapa mostra algo impossível."
  },

  {descricao: "Um músico viaja levando canções e rumores.",
   combate: "Roubá-lo ou silenciá-lo.",
   paz: "Aprender uma canção mágica com ele.",
   ganchos: "Ele sabe o paradeiro de um aliado perdido.",
   variacoes: "Canção abre um portal; bardo está sendo seguido."
  },

  {descricao: "Viaja com uma forja portátil e temperamento forte.",
   combate: "Tomar suas ferramentas e segredos.",
   paz: "Forjar juntos uma arma simbólica.",
   ganchos: "Forja metais caídos do céu.",
   variacoes: "Martelo é mágico; fogo é elemental vivo."
  },

  {descricao: "Procura um criminoso entre os heróis.",
   combate: "Enfrentá-lo em combate direto.",
   paz: "Convencê-lo de um engano.",
   ganchos: "O alvo é inocente ou um antigo aliado dos heróis.",
   variacoes: "O caçador é corrupto; o alvo é perigoso de verdade."
  },

  {descricao: "Encontrado à beira da estrada, sangrando.",
   combate: "Ignorá-lo ou matá-lo.",
   paz: "Salvá-lo e ganhar um aliado.",
   ganchos: "Desertou após uma missão maldita.",
   variacoes: "Ele guarda um segredo; está sendo caçado."
  },

  {descricao: "Estuda ruínas sob o solo das planícies.",
   combate: "Roubar seus achados ou destruí-los.",
   paz: "Ajudá-lo a decifrar glifos.",
   ganchos: "Descobre algo que muda a história.",
   variacoes: "As ruínas despertam; espíritos protegem o local."
  },

  {descricao: "Místico que lê o destino nas rajadas de vento.",
   combate: "Romper seu círculo ritual.",
   paz: "Consultá-lo em busca de presságios.",
   ganchos: "Prevê uma catástrofe nas planícies.",
   variacoes: "Ele fala a verdade; ou ele é o causador da catástrofe."
  }
];


const piPlanicieGeo = [
  {descricao: "Um vasto cânion cortando o terreno como uma ferida antiga.",
   combate: "Monstros espreitam nas fendas.",
   paz: "Construir ponte ou rota segura.",
   ganchos: "Alguém caiu no abismo e precisa de resgate.",
   variacoes: "Gases causam alucinações; ecos falam nomes."
  },

  {descricao: "Um círculo de pedras erguidas por forças naturais.",
   combate: "Criaturas de pedra se animam.",
   paz: "Decifrar o padrão e ativar energia benigna.",
   ganchos: "A formação brilha à noite com energia arcana.",
   variacoes: "As pedras mudam de posição a cada lua cheia."
  },

  {descricao: "Um lago seco com ossadas expostas.",
   combate: "Hienas e mortos famintos rondam.",
   paz: "Investigar ruínas submersas reveladas.",
   ganchos: "Uma caravana desapareceu neste lago.",
   variacoes: "O lago volta a encher em rituais lunares."
  },

  {descricao: "Flores dançam com o vento em padrões hipnóticos.",
   combate: "Insetos gigantes surgem do pólen.",
   paz: "Coletar amostras raras com cuidado.",
   ganchos: "A flor cura ou envenena dependendo da hora do dia.",
   variacoes: "O vento forma vozes que dizem nomes."
  },

  {descricao: "Uma cratera de impacto imensa.",
   combate: "Criaturas mutantes vivem dentro.",
   paz: "Estudar os cristais sem tocar.",
   ganchos: "Um novo meteoro caiu em outro lugar.",
   variacoes: "O solo pulsa como se respirasse."
  },

  {descricao: "Fenda profunda emanando calor e fumaça.",
   combate: "Monstros subterrâneos emergem.",
   paz: "Selar a fenda com magia.",
   ganchos: "Algo está tentando sair.",
   variacoes: "O calor aumenta diariamente."
  },

  {descricao: "Pedras flutuantes suspensas por magia residual.",
   combate: "Espíritos guardiões atacam intrusos.",
   paz: "Equilibrar as energias mágicas.",
   ganchos: "Um artefato repousa no topo.",
   variacoes: "Altura das pedras muda com o nascer do sol."
  },

  {descricao: "Região onde o som ecoa de modo impossível.",
   combate: "Criaturas se comunicam pelo som.",
   paz: "Descobrir origem do eco.",
   ganchos: "Um som antigo pede ajuda.",
   variacoes: "Ecos assumem vozes familiares."
  },

  {descricao: "Círculo de grama que nunca cresce.",
   combate: "Uma fera invisível protege o local.",
   paz: "Mapear o fenômeno.",
   ganchos: "É um selo sobre algo enterrado.",
   variacoes: "Ele aparece e desaparece."
  },

  {descricao: "Colina que atrai tempestades.",
   combate: "Raios animam cadáveres antigos.",
   paz: "Descarregar energia com ritual.",
   ganchos: "Um eremita sumiu estudando-a.",
   variacoes: "A colina se move lentamente."
  },

  {descricao: "Oásis verde em meio à aridez.",
   combate: "Criaturas ilusórias enganam viajantes.",
   paz: "Purificar a água.",
   ganchos: "O oásis muda de lugar.",
   variacoes: "A água concede visões."
  },

  {descricao: "Campo de fósseis gigantes expostos.",
   combate: "Escavadores despertaram algo.",
   paz: "Escavar com cuidado e documentar.",
   ganchos: "Ossos podem conter poder antigo.",
   variacoes: "O local emite sons à noite."
  }
];

const piFlorestaMons = [
  {descricao:"Bosque de árvores pendentes onde criaturas penduram presas.",
   combate:"Queimar tocas e eliminar predadores.",
   paz:"Restaurar trilhas e oferecer pendentes rituais.",
   ganchos:"Crianças desaparecem; xamãs temem expansão.",
   variacoes:"Criaturas tecem com seiva; árvores movem-se."
  },

  {descricao:"Espíritos arbóreos retaliam após desmatamento.",
   combate:"Lutar contra dríades e plantas.",
   paz:"Restauração ecológica e ritos.",
   ganchos:"Lenhadores expulsos; dríade guarda memorial.",
   variacoes:"Dríades corrompidas; trilhas alteram memórias."
  },

  {descricao:"Aranhas camufladas caçam nas árvores.",
   combate:"Incendiar teias e enfrentar a matriarca.",
   paz:"Remover ovo-matriz.",
   ganchos:"Herbário quer seda; batedores desaparecem.",
   variacoes:"Seda usada em poções; aranhas telepáticas."
  },

  {descricao:"Ruínas cobertas por raízes guardam mortos-vivos.",
   combate:"Selar criptas e destruir guardiões.",
   paz:"Ritos para descanso dos restos.",
   ganchos:"Tomo antigo perdido; mapa mural.",
   variacoes:"Culto druídico antigo; raízes sensitivas."
  },

  {descricao:"Aves migram para cantar canções estranhas.",
   combate:"Espantar predadores.",
   paz:"Tornar local um santuário protegido.",
   ganchos:"Bardo quer gravar canto; ornitólogo paga.",
   variacoes:"Canto invoca espírito; ligado a profecias."
  },

  {descricao:"Bando de fora-da-lei cobra pedágio na trilha.",
   combate:"Desmantelar o bando.",
   paz:"Negociar ou destruir rede de apoio.",
   ganchos:"Caravana atacada; documentos roubados.",
   variacoes:"Aliados de lobos; líder guiado por druida."
  },

  {descricao:"Fungos refletivos causam ilusões.",
   combate:"Destruir fonte das ilusões.",
   paz:"Criar antídotos ou guias rituais.",
   ganchos:"Alquimista busca esporos; peregrinos desviam.",
   variacoes:"Esporos dão visões; bosque se move à noite."
  },

  {descricao:"Jacarés gigantes e plantas sugadoras emboscam viajantes.",
   combate:"Remover predadores.",
   paz:"Criar passarelas seguras.",
   ganchos:"Peçonha rara; pescadores desaparecem.",
   variacoes:"Pântano tem mente ancestral; guardião adormecido."
  },

  {descricao:"Comunidade que aplica justiça severa do bosque.",
   combate:"Confronto direto se contrariados.",
   paz:"Tribunais locais ou reparação.",
   ganchos:"Forasteiro julgado; testemunhas procuradas.",
   variacoes:"Líder é ranger antigo; segredos do clã."
  },

  {descricao:"Pássaros parasitas criam covil subterrâneo.",
   combate:"Destruir o covil.",
   paz:"Recuperar ovos e devolver.",
   ganchos:"Família pede ajuda; caça furtiva.",
   variacoes:"Controlam corvos; roubam relíquias."
  },

  {descricao:"Altar tomado por entidade.",
   combate:"Lutar contra o ente.",
   paz:"Rituais de purificação.",
   ganchos:"Sacerdote sumiu; culto rival deseja o altar.",
   variacoes:"Quando limpo dá bênçãos; ligado a nascimentos."
  },

  {descricao:"Duas tribos corrompidas lutam por nó de cipós.",
   combate:"Escolher lado ou destruir ambos.",
   paz:"Mediar uso do nó.",
   ganchos:"Artefato-semente preso; criança é refém.",
   variacoes:"Cipós inteligentes; nó abre passagem secreta."
  }
];

const piFlorestaNPC = [
  {descricao:"Caçador recluso evita contato.",
   combate:"Caçá-lo ou emboscá-lo.",
   paz:"Ajudá-lo a eliminar uma fera.",
   ganchos:"Ele caçou algo que nunca deveria ter visto.",
   variacoes:"Pode ser exilado, licantropo ou druida disfarçado."
  },

  {descricao:"Guardião da clareira protege bosque sagrado.",
   combate:"Quebrar o círculo de proteção.",
   paz:"Ajudar a restaurar o equilíbrio natural.",
   ganchos:"Algo está corrompendo a floresta.",
   variacoes:"Espírito antigo, elfo ou druida ancestral."
  },

  {descricao:"Lenhador amaldiçoado pela madeira que corta.",
   combate:"Destruir sua cabana e libertá-lo.",
   paz:"Realizar o ritual de purificação.",
   ganchos:"Cada árvore cortada o prende mais.",
   variacoes:"Possuído ou punido por espíritos."
  },

  {descricao:"Alquimista verde cria poções raras.",
   combate:"Roubar seus frascos e segredos.",
   paz:"Trocar ingredientes raros.",
   ganchos:"Busca uma flor que floresce com sangue.",
   variacoes:"Ermitão gentil ou manipulador."
  },

  {descricao:"Menina selvagem vive entre animais.",
   combate:"Capturá-la ou usá-la como isca.",
   paz:"Ganhar sua confiança.",
   ganchos:"Sabe caminho para ruínas escondidas.",
   variacoes:"Pode ser humana, fada ou espírito."
  },

  {descricao:"Patrulheiro ferido protege trilhas antigas.",
   combate:"Disputa territorial.",
   paz:"Curá-lo e aprender segredos.",
   ganchos:"Guardava um artefato natural.",
   variacoes:"Leal ou desertor."
  },

  {descricao:"Xamã arbóreo ouve árvores ocas.",
   combate:"Queimar sua árvore sagrada.",
   paz:"Participar de um ritual com ele.",
   ganchos:"Prevê praga verde.",
   variacoes:"Louco ou canal de um deus."
  },

  {descricao:"Família perdida vive isolada com medo.",
   combate:"Tomar suprimentos.",
   paz:"Descobrir quem os persegue.",
   ganchos:"Descendentes de nobres caçados.",
   variacoes:"Perseguidos por demônios ou guardas."
  },

  {descricao:"Coletor de ossos cria amuletos.",
   combate:"Destruir acampamento.",
   paz:"Ajudar a montar um amuleto poderoso.",
   ganchos:"Ossadas de antigos heróis.",
   variacoes:"Necromante, artista ou charlatão."
  },

  {descricao:"Aventureiro preso em teias ou armadilhas.",
   combate:"Deixá-lo morrer.",
   paz:"Libertá-lo.",
   ganchos:"Caçava monstro lendário.",
   variacoes:"Pode ser qualquer classe."
  },

  {descricao:"Caçadora de feras persegue besta mítica.",
   combate:"Roubar seu troféu.",
   paz:"Ajudá-la na caçada.",
   ganchos:"A fera é protetora.",
   variacoes:"Heroína, mercenária ou vingadora."
  },

  {descricao:"O Sussurrante — voz incorpórea.",
   combate:"Silenciar entidade.",
   paz:"Ouvir e libertar.",
   ganchos:"Preso entre mundos.",
   variacoes:"Espírito de druida ou maldição."
  }
];

const piFlorestaGeo = [
  {descricao:"Árvore colossal visível a quilômetros.",
   combate:"Guardiões vegetais a protegem.",
   paz:"Estudar suas propriedades.",
   ganchos:"Seiva curativa lendária.",
   variacoes:"Tronco esconde passagem para outro plano."
  },

  {descricao:"Lago espelhado sem reflexos.",
   combate:"Espíritos da água atacam.",
   paz:"Descobrir origem do fenômeno.",
   ganchos:"Um item existe 'do outro lado'.",
   variacoes:"Mostra cenas do passado."
  },

  {descricao:"Vale em névoa eterna.",
   combate:"Criaturas caçam pelo som.",
   paz:"Criar trilhas com sinais sonoros.",
   ganchos:"Explorador deixou mensagens ecoantes.",
   variacoes:"Névoa sussurra segredos."
  },

  {descricao:"Árvores com casca metálica.",
   combate:"Insetos metálicos defendem.",
   paz:"Extrair sem dano.",
   ganchos:"Forjas querem madeira viva.",
   variacoes:"Metal regenera."
  },

  {descricao:"Bosque onde o tempo flui diferente.",
   combate:"Feras envelhecem/rejuvenescem.",
   paz:"Decifrar padrão temporal.",
   ganchos:"Viajante retornou após 100 anos.",
   variacoes:"Tempo muda conforme humor da floresta."
  },

  {descricao:"Rio de seiva dourada.",
   combate:"Bichos transformados.",
   paz:"Coletar amostras.",
   ganchos:"Rio surge e some.",
   variacoes:"Seiva endurece como âmbar."
  },

  {descricao:"Buraco sem fundo coberto de raízes.",
   combate:"Lianas atacam curiosos.",
   paz:"Medir profundidade com magia.",
   ganchos:"Dizem levar ao Submundo.",
   variacoes:"Vento constante sopra de dentro."
  },

  {descricao:"Clareira onde tudo dorme.",
   combate:"Lobos espirituais patrulham.",
   paz:"Atravessar no ciclo correto.",
   ganchos:"Clareira é portal onírico.",
   variacoes:"Sonhos tomam forma física."
  },

  {descricao:"Campo de cogumelos gigantes.",
   combate:"Esporos tóxicos.",
   paz:"Coletar com cuidado.",
   ganchos:"Cura de doença rara vem daqui.",
   variacoes:"Local muda de lugar."
  },

  {descricao:"Troncos queimados eternamente.",
   combate:"Feras flamejantes.",
   paz:"Encontrar fonte do fogo.",
   ganchos:"Fogo divino caiu aqui.",
   variacoes:"Chama arde sob a terra."
  },

  {descricao:"Penhasco coberto de raízes vivas.",
   combate:"Raízes puxam corpos.",
   paz:"Desatar espírito preso.",
   ganchos:"Druida foi engolido.",
   variacoes:"Penhasco muda de forma."
  },

  {descricao:"Poço natural que brilha à noite.",
   combate:"Espíritos refletem.",
   paz:"Pedir visões.",
   ganchos:"Mostra destino de quem olha.",
   variacoes:"Visões cobram preço."
  }
];

const piSelvaMons = [
  {descricao:"Tigre iridescente domina uma clareira.",
   combate:"Matar ou banir o tigre.",
   paz:"Afastar com ferro e fogo sagrado.",
   ganchos:"Sua pele vale fortuna; uma tribo o reverencia.",
   variacoes:"Guarda um altar; servo de um xamã."
  },

  {descricao:"Aves raras realizam cortejos magníficos.",
   combate:"Proteger aves de caçadores.",
   paz:"Criar acordo de proteção.",
   ganchos:"Ornitólogo paga; cultistas querem essência.",
   variacoes:"Canção invoca espíritos; sementes mágicas."
  },

  {descricao:"Macacos inteligentes roubam itens.",
   combate:"Derrubar o líder e recuperar itens.",
   paz:"Trocar itens por frutas e brinquedos.",
   ganchos:"Um amuleto nobre roubado está com eles.",
   variacoes:"Macacos metamorfos; ladrão humano infiltrado."
  },

  {descricao:"Plantas carnívoras e anfíbios capturam viajantes.",
   combate:"Lutar contra plantas e predadores.",
   paz:"Criar passarelas seguras.",
   ganchos:"Ervas curativas exclusivas crescem aqui.",
   variacoes:"Planta dá visões; organismos mágicos coexistem."
  },

  {descricao:"Vila suspensa cobra tributos dos viajantes.",
   combate:"Subverter ou derrubar seus líderes.",
   paz:"Negociar portagem ou tratado.",
   ganchos:"Filho desapareceu; guerra iminente.",
   variacoes:"Biblioteca viva; pacto com espíritos das árvores."
  },

  {descricao:"Túmulo com guardiões esqueléticos sob raízes.",
   combate:"Purificar ossos e destruir guardiões.",
   paz:"Realizar cerimônia de descanso.",
   ganchos:"Kit de xamã oferece cura em troca.",
   variacoes:"Xamã traidor; totems vivos protegem o local."
  },

  {descricao:"Névoa animada oculta predadores.",
   combate:"Sobreviver à emboscada.",
   paz:"Queimar ervas e marcar o caminho.",
   ganchos:"Pescador desapareceu aqui.",
   variacoes:"Névoa consciente; protege relíquia antiga."
  },

  {descricao:"Queda d’água sagrada com guardiões.",
   combate:"Enfrentar guardiões da fonte.",
   paz:"Realizar ritual espiritual.",
   ganchos:"Oráculo pode oferecer visão.",
   variacoes:"Água cura mas troca memórias; portal interno."
  },

  {descricao:"Fungos alucinógenos mutantes por toda parte.",
   combate:"Lutar contra criaturas mutadas.",
   paz:"Coletar e neutralizar focos.",
   ganchos:"Alquimista quer toxina; surtos estão se espalhando.",
   variacoes:"Fungos comunicam por visões temporárias."
  },

  {descricao:"Pedra ritual de sinalização espiritual.",
   combate:"Duelo ritual ou disputa por território.",
   paz:"Participar da cerimônia e respeitar tradição.",
   ganchos:"Item sagrado foi roubado.",
   variacoes:"Fenda planar; gongo ativa energias antigas."
  },

  {descricao:"Lianas conscientes arrastam vítimas.",
   combate:"Rasgar raízes e libertar prisioneiros.",
   paz:"Rituais para cortar vínculo espiritual.",
   ganchos:"Prisioneiro valioso está preso.",
   variacoes:"Lianas são tentáculos vivos; raízes valiosas."
  },

  {descricao:"Tribos brigam por frutas luminescentes.",
   combate:"Escolher lado ou destruição mútua.",
   paz:"Propor partilha ritual.",
   ganchos:"Uma criança foi sequestrada na disputa.",
   variacoes:"Um clã serve espíritos; outro usa tecnologia."
  }
];

const piSelvaNPC = [
  {descricao:"Explorador louco coberto de lama.",
   combate:"Silenciá-lo antes que atraia feras.",
   paz:"Ajudá-lo a sair da selva.",
   ganchos:"Diz ter visto um templo dourado.",
   variacoes:"Amaldiçoado ou possuído por espírito."
  },

  {descricao:"Curandeira tribal das ervas secretas.",
   combate:"Roubar suas ervas.",
   paz:"Ganhar confiança com oferendas.",
   ganchos:"Pede ajuda contra doença espiritual.",
   variacoes:"Benevolente ou enganadora."
  },

  {descricao:"Guerreiro sobrevivente de massacre.",
   combate:"Duelar pela honra.",
   paz:"Ajudar a recuperar seu legado.",
   ganchos:"Seu clã guarda artefato ancestral.",
   variacoes:"Nobre ou selvagem endurecido."
  },

  {descricao:"Cartógrafo insano que tenta mapear a selva.",
   combate:"Destruir seus mapas.",
   paz:"Ajudá-lo a traçar rota segura.",
   ganchos:"Mapa leva a um altar esquecido.",
   variacoes:"Guiado por espíritos."
  },

  {descricao:"Espírito do cacau antigo.",
   combate:"Cortar raízes e bani-lo.",
   paz:"Oferecer sacrifício de frutas.",
   ganchos:"Prosperidade em troca de favor mortal.",
   variacoes:"Bondoso ou tentador."
  },

  {descricao:"Capitão naufragado na selva.",
   combate:"Saqueá-lo.",
   paz:"Ajudar a reconstruir embarcação.",
   ganchos:"Procura tesouro às margens do rio.",
   variacoes:"Humano, fantasma ou amaldiçoado."
  },

  {descricao:"Caçador de relíquias de templos antigos.",
   combate:"Roubar escavações.",
   paz:"Negociar parceria.",
   ganchos:"Relíquia pertencia a deus esquecido.",
   variacoes:"Arqueólogo ou ladrão de túmulos."
  },

  {descricao:"Sacerdote da Lua em rituais noturnos.",
   combate:"Impedir sacrifício.",
   paz:"Participar do ritual.",
   ganchos:"Prevê eclipse mágico.",
   variacoes:"Fanático ou iluminado."
  },

  {descricao:"Nômade das árvores que evita o chão.",
   combate:"Destruir pontes suspensas.",
   paz:"Ajudá-lo contra invasores.",
   ganchos:"Raízes da selva estão corrompidas.",
   variacoes:"Humano, elfo ou híbrido."
  },

  {descricao:"Espírito do pântano seco.",
   combate:"Expulsá-lo com fogo.",
   paz:"Libertá-lo da forma corrompida.",
   ganchos:"Guarda memórias de civilização perdida.",
   variacoes:"Benevolente ou vingativo."
  },

  {descricao:"Domadora de serpentes encantadas.",
   combate:"Matá-la e pegar o veneno.",
   paz:"Aprender técnicas e truques.",
   ganchos:"Precisa capturar serpente divina.",
   variacoes:"Humana ou meio-elfo."
  },

  {descricao:"Missionário perdido tentando converter selvagens.",
   combate:"Silenciá-lo.",
   paz:"Resgatá-lo.",
   ganchos:"Revela segredos de culto antigo.",
   variacoes:"Fanático."
  }
];

const piSelvaGeo = [
  {descricao:"Árvores imensas entrelaçadas formando pontes.",
   combate:"Serpentes e macacos guardam galhos.",
   paz:"Usar as passagens como travessia.",
   ganchos:"Tribo isolada vive no topo.",
   variacoes:"Movem-se levemente à noite."
  },

  {descricao:"Vale com vegetação carnívora.",
   combate:"Plantas tentam capturar presas.",
   paz:"Domar ou evitar os cipós.",
   ganchos:"Artefato preso nas raízes.",
   variacoes:"Plantas mudam cor com cheiro de sangue."
  },

  {descricao:"Cachoeira reversa que sobe ao céu.",
   combate:"Criaturas aquáticas flutuam ao redor.",
   paz:"Estudar fluxo mágico.",
   ganchos:"Dizem levar a ilha no céu.",
   variacoes:"Varia com fases da lua."
  },

  {descricao:"Pântano escondido de flores luminosas.",
   combate:"Insetos venenosos defendem local.",
   paz:"Coletar pólen de cura rara.",
   ganchos:"Curandeiro desapareceu aqui.",
   variacoes:"Flores brilham forte perto de magia."
  },

  {descricao:"Bosque onde o som desaparece.",
   combate:"Predadores caçam no silêncio.",
   paz:"Mapear fenômeno e passar seguro.",
   ganchos:"Ritual silencioso deve ser feito aqui.",
   variacoes:"Som retorna de uma vez e atordoa."
  },

  {descricao:"Clareira de pedras quentes eternas.",
   combate:"Lagartos elementais aparecem.",
   paz:"Controlar calor com runas.",
   ganchos:"Coração de vulcão adormecido.",
   variacoes:"Solo pulsa como se respirasse."
  },

  {descricao:"Rio que muda de curso todas as noites.",
   combate:"Criaturas aquáticas guardam margens.",
   paz:"Navegar com bússola mágica.",
   ganchos:"Templo foi engolido.",
   variacoes:"Águas sussurram palavras antigas."
  },

  {descricao:"Árvores ocas que sussurram vozes humanas.",
   combate:"Espíritos presos atacam.",
   paz:"Libertar as almas.",
   ganchos:"Explorador enlouqueceu ao ouvir seu nome.",
   variacoes:"Cada voz pertence a um desaparecido."
  },

  {descricao:"Penhasco com fungos gigantes.",
   combate:"Esporos criam visões ilusórias.",
   paz:"Coletar com cuidado.",
   ganchos:"Fungo é chave para remédio ancestral.",
   variacoes:"Alguns fungos têm formato de rostos."
  },

  {descricao:"Templo natural coberto por raízes.",
   combate:"Animais o veneram e defendem.",
   paz:"Compreender rituais naturais.",
   ganchos:"Relíquia dorme sob raízes.",
   variacoes:"Sons de batimento cardíaco ecoam."
  },

  {descricao:"Ponte de cipós sobre abismo infinito.",
   combate:"Seres camuflados caçam nela.",
   paz:"Reconstruir travessia.",
   ganchos:"Guia morreu tentando cruzar.",
   variacoes:"A ponte cresce a cada lua."
  },

  {descricao:"Árvore oca com lago interno.",
   combate:"Criaturas bioluminescentes guardam.",
   paz:"Investigar reflexos no lago.",
   ganchos:"Viajante viu 'outro mundo' dentro.",
   variacoes:"Árvore muda de lugar conforme estação."
  }
];

const piCosteiroMons = [
  {descricao:"Criatura de areia e vento assola a costa.",
   combate:"Expulsar e selar suas tocas.",
   paz:"Rituais de quebra-mares e oferendas ao vento.",
   ganchos:"O porto está perdendo viajantes e comércio.",
   variacoes:"Criatura é invocada por contrabandistas."
  },

  {descricao:"Bando armado domina falésia e cobra pedágio.",
   combate:"Tomar a falésia pela força.",
   paz:"Negociar taxas de passagem.",
   ganchos:"Caravanas vêm sendo atacadas; um nobre financia o bando.",
   variacoes:"Falésia possui túneis; falcões treinados vigiam o mar."
  },

  {descricao:"Criaturas marinhas atacam pescadores no cais.",
   combate:"Caçar os crustáceos agressivos.",
   paz:"Reestruturar pesca e repovoamento.",
   ganchos:"Pescadores faliram; contrabandistas surgiram.",
   variacoes:"Cavernas submersas levam a ruínas antigas."
  },

  {descricao:"Fanáticos fazem sacrifícios no litoral.",
   combate:"Enfrentar culto e interromper rituais.",
   paz:"Purificar templo e devolver equilíbrio.",
   ganchos:"Famílias buscam resgatar vítimas.",
   variacoes:"Relíquia submersa; sacerdotes servem entidade marinha."
  },

  {descricao:"Navios encalhados e saqueadores vagam entre destroços.",
   combate:"Combater saqueadores e espíritos marítimos.",
   paz:"Realizar enterros rituais.",
   ganchos:"Tesouro do capitão desaparecido.",
   variacoes:"Farol submerso; ilha muda com maré."
  },

  {descricao:"Bruxas controlam praias e cantam às marés.",
   combate:"Enfrentar seita da costa.",
   paz:"Firmar pacto de proteção.",
   ganchos:"Criança desaparecida; pesca sumiu.",
   variacoes:"Controlam correntes; metamorfoses sazonais."
  },

  {descricao:"Tubarões atacam embarcações costeiras.",
   combate:"Caçar tubarões dominantes.",
   paz:"Respeitar ciclo de migração.",
   ganchos:"Capitão busca vingança; pérola rara encontrada.",
   variacoes:"Tubarões seguem um navio fantasma."
  },

  {descricao:"Contrabandistas escondem bens em cavernas costeiras.",
   combate:"Invadir o esconderijo.",
   paz:"Subornar ou negociar troca de rotas.",
   ganchos:"Artefato proibido circula.",
   variacoes:"Líder é ex-oficial; cavernas são protegidas por runas."
  },

  {descricao:"Pássaro ígneo constrói ninho na rocha marítima.",
   combate:"Defender ou expulsar criatura.",
   paz:"Proteger o ninho e trocar penas.",
   ganchos:"Penas curam doença rara.",
   variacoes:"Ser é espírito; ninho altera a maré local."
  },

  {descricao:"Ossadas marítimas se animam com energia das marés.",
   combate:"Exorcizar restos e enterrar com ritos.",
   paz:"Cerimônias para silêncio eterno.",
   ganchos:"Relíquia escondida no crânio de uma criatura.",
   variacoes:"Ossos se movem conforme maré sobe."
  },

  {descricao:"Faroleiro controla marés por artifício mágico.",
   combate:"Tomar ou restaurar a torre.",
   paz:"Convencer faroleiro a parar o ritual.",
   ganchos:"Mapa perdido ligado a naufrágio.",
   variacoes:"Farol é portal; faroleiro é 'tocado' pelo oceano."
  },

  {descricao:"Medusas infestam águas rasas.",
   combate:"Remover colônias.",
   paz:"Instalar redes protetoras.",
   ganchos:"Veneno é raro; pescador foi transformado.",
   variacoes:"Medusas guiam almas; podem ser domesticadas."
  }
];

const piCosteiroNPC = [
  {descricao:"Pescador desaparecido vive isolado.",
   combate:"Caçá-lo como traidor.",
   paz:"Entender por que fugiu.",
   ganchos:"Ele viu algo terrível sob o cais.",
   variacoes:"Pode estar vivo, morto ou possuído."
  },

  {descricao:"Capitã Mercante desafia rotas perigosas.",
   combate:"Saqueá-la ou tomar o navio.",
   paz:"Ajudá-la a escapar de piratas.",
   ganchos:"Transporta passageiro misterioso.",
   variacoes:"Humana, tritã ou disfarçada."
  },

  {descricao:"Jovem Profeta de marés.",
   combate:"Impedi-lo de interferir.",
   paz:"Consultar suas previsões.",
   ganchos:"Prevê desastre costeiro iminente.",
   variacoes:"Profeta verdadeiro ou manipulado."
  },

  {descricao:"Velho Salgado, marinheiro cheio de histórias.",
   combate:"Tomar seus segredos à força.",
   paz:"Ouvir sua lenda.",
   ganchos:"Criatura que devora faróis é real.",
   variacoes:"Pode ser sábio, bêbado ou louco."
  },

  {descricao:"Feiticeira da Areia com controle do vento e sal.",
   combate:"Confrontá-la.",
   paz:"Solicitar bênçãos.",
   ganchos:"Pode dar poder em troca de vida.",
   variacoes:"Bela e sombria."
  },

  {descricao:"Contrabandista que opera nas marés.",
   combate:"Tomar sua rota.",
   paz:"Negociar passagem segura.",
   ganchos:"Transporta algo muito além do permitido.",
   variacoes:"Humano, elfo ou meio-pirata."
  },

  {descricao:"Pescador de Sombras coleta criaturas irreais.",
   combate:"Matar as sombras.",
   paz:"Ajudá-lo a conter o horror que invocou.",
   ganchos:"Sombras ganham forma a cada pesca.",
   variacoes:"Humano, amaldiçoado ou bruxo."
  },

  {descricao:"Capitão Fantasma ronda a costa.",
   combate:"Exorcizar.",
   paz:"Descobrir motivo de retorno.",
   ganchos:"Artefato proibido a bordo.",
   variacoes:"Trágico ou vingativo."
  },

  {descricao:"Mercadora de Porto controla rumores.",
   combate:"Saquear armazém.",
   paz:"Comprar informação.",
   ganchos:"Rede de espiões age na costa.",
   variacoes:"Inocente ou agente duplo."
  },

  {descricao:"Caçador de Monstros Marinhos.",
   combate:"Desafiá-lo em duelo.",
   paz:"Ajudá-lo na caçada.",
   ganchos:"A presa é protetora das marés.",
   variacoes:"Obcecado ou heróico."
  },

  {descricao:"Garoto do Farol mantém chama eterna.",
   combate:"Invadir o farol.",
   paz:"Proteger o garoto e seu segredo.",
   ganchos:"Ele guarda fogo mágico herdado.",
   variacoes:"Humano, espírito ou autômato."
  },

  {descricao:"Monge das Dunas medita ao vento.",
   combate:"Provar a fé em combate.",
   paz:"Aprender mantra do mar.",
   ganchos:"Prediz chegada de um messias marítimo.",
   variacoes:"Louco, sábio ou charlatão."
  }
];

const piCosteiroGeo = [
  {descricao:"Penhascos que choram água salgada.",
   combate:"Gárgulas marinhas protegem o local.",
   paz:"Coletar líquido mágico.",
   ganchos:"Cura feridas mas causa sonhos vividos.",
   variacoes:"Poças brilham sob a lua."
  },

  {descricao:"Rochas com fósseis impossíveis.",
   combate:"Caranguejos mutantes defendem.",
   paz:"Extrair fragmentos com cuidado.",
   ganchos:"Pesquisador quer provar eras antigas.",
   variacoes:"Alguns fósseis se movem."
  },

  {descricao:"Arco natural sobre o mar.",
   combate:"Seres alados o protegem.",
   paz:"Travessia aérea segura.",
   ganchos:"Naufrágio sob o arco guarda tesouro.",
   variacoes:"Brilha sob luar."
  },

  {descricao:"Praia de areia negra magnetizada.",
   combate:"Criaturas metálicas surgem do solo.",
   paz:"Usar magnetismo para defesa.",
   ganchos:"Bússolas enlouquecem por aqui.",
   variacoes:"A areia canta sob os passos."
  },

  {descricao:"Grutas onde o vento fala.",
   combate:"Sereias imitam náufragos.",
   paz:"Decifrar eco ritual.",
   ganchos:"Um grito pede ajuda toda noite.",
   variacoes:"Som responde perguntas."
  },

  {descricao:"Colunas de pedra em forma de seres antigos.",
   combate:"Espíritos nelas presos.",
   paz:"Libertar ou aprisionar.",
   ganchos:"Uma coluna moveu-se recentemente.",
   variacoes:"Sombras se estendem demais."
  },

  {descricao:"Enseada de água rosada.",
   combate:"Criaturas translúcidas guardam águas.",
   paz:"Analisar reação alchemical.",
   ganchos:"Alquimista busca fonte.",
   variacoes:"Muda cor ao pôr do sol."
  },

  {descricao:"Recife de luz esmeralda.",
   combate:"Golfinhos o defendem.",
   paz:"Usar luz para navegação.",
   ganchos:"Tesouro refletido na luz.",
   variacoes:"Luz forma runas na superfície."
  },

  {descricao:"Farol natural de pedra brilhante.",
   combate:"Elementais de fogo habitam interior.",
   paz:"Sintonizar energia.",
   ganchos:"Guia viajantes perdidos.",
   variacoes:"Às vezes aponta para o céu."
  },

  {descricao:"Naufrágio fossilizado.",
   combate:"Criaturas vivas entre madeira petrificada.",
   paz:"Examinar relíquias em segurança.",
   ganchos:"Fantasma vigia o leme.",
   variacoes:"Navio está preso entre eras."
  },

  {descricao:"Dunas que cantam com o vento.",
   combate:"Areias vivas formam figuras.",
   paz:"Registrar melodias para rituais.",
   ganchos:"Hino antigo ecoa nelas.",
   variacoes:"Canto muda com maré."
  },

  {descricao:"Rocha solitária cercada por mar calmo.",
   combate:"Guardião dorme sob ondas.",
   paz:"Evitar acordá-lo.",
   ganchos:"Mapa aponta exatamente aqui.",
   variacoes:"O mar nunca se agita neste ponto."
  }
];

const piMarinhoMons = [
  {descricao:"Serpe gigante vive entre recifes; barcos desaparecem.",
   combate:"Enfrentar a criatura ou destruir seu covil.",
   paz:"Sacrifício ou alterar rotas marítimas.",
   ganchos:"Capitão perdeu navio; vila sem pesca.",
   variacoes:"Serpe é guardiã e possui filhotes."
  },

  {descricao:"Peixes luminosos atraem predadores mágicos.",
   combate:"Caçar predadores.",
   paz:"Guiar cardume para águas seguras.",
   ganchos:"Escamas produzem poção rara.",
   variacoes:"Cardume é consciente e canta histórias."
  },

  {descricao:"Fenda abissal suga navios para outro plano.",
   combate:"Enfrentar monstros abissais.",
   paz:"Selar fenda com rito marinho.",
   ganchos:"Templo afundado guarda relíquia.",
   variacoes:"Fenda muda de lugar e aceita oferendas."
  },

  {descricao:"Ilha de carapaças habitada por saqueadores.",
   combate:"Tomar ilha à força.",
   paz:"Negociar direitos de pesca.",
   ganchos:"Metal marítimo raro é extraído ali.",
   variacoes:"Ilha se move; carapaças possuem runas."
  },

  {descricao:"Navios encalhados cercados por espíritos.",
   combate:"Enfrentar piratas fantasmagóricos.",
   paz:"Rezar e devolver restos ao mar.",
   ganchos:"Cartas indicam tesouro submerso.",
   variacoes:"Navio inteiro submerso contém carga arcana."
  },

  {descricao:"Anêmonas gigantes destroem redes.",
   combate:"Arrancar colônias e lutar contra bestas.",
   paz:"Redirecionar correntes.",
   ganchos:"Ingrediente alquímico raro cresce nelas.",
   variacoes:"Anêmonas pactuam com demônios pequenos."
  },

  {descricao:"Saqueadores cobram passagem pelo recife.",
   combate:"Retomar controle.",
   paz:"Subornar ou firmar acordo.",
   ganchos:"Marinheiro capturado e carga proibida.",
   variacoes:"Líder é tritão ou híbrido."
  },

  {descricao:"Lulas gigantes protegem cavernas de coral precioso.",
   combate:"Enfrentar tentáculos.",
   paz:"Oferecer peixe para afastá-las.",
   ganchos:"Corais são usados para magia.",
   variacoes:"Lulas são inteligentes; uma usa amuleto."
  },

  {descricao:"Fonte hidrotermal altera vida marinha.",
   combate:"Criaturas mutantes emergem.",
   paz:"Selar ou purificar fonte.",
   ganchos:"Energia útil à alquimia; pescadores adoecem.",
   variacoes:"Fonte cura ferimentos OU causa mutações."
  },

  {descricao:"Comunidade em jangadas rejeita impostos.",
   combate:"Intervenção militar.",
   paz:"Negociar autonomia.",
   ganchos:"Caixa de tributo perdida.",
   variacoes:"Líder é profeta; contrabando secreto."
  },

  {descricao:"Torre antiga ainda ativa mecanismos.",
   combate:"Autômatos e armadilhas.",
   paz:"Reativar para passagem segura.",
   ganchos:"Relógio do mar controla ondas.",
   variacoes:"Torre é portal guardado por espírito oceânico."
  },

  {descricao:"Baleias cruzam corredor marítimo.",
   combate:"Lutar contra predadores.",
   paz:"Proteger rota sagrada de migração.",
   ganchos:"Carapaça valiosa cai durante travessia.",
   variacoes:"Migração altera clima e atrai monstros."
  }
];

const piMarinhoNPC = [
  {descricao:"Pescador solitário vive em jangada falando com o mar.",
   combate:"Afundar a jangada.",
   paz:"Ouvir as vozes do mar com ele.",
   ganchos:"Mar sussurra o nome de algo preso nas profundezas.",
   variacoes:"Louco ou profeta."
  },

  {descricao:"Capitão naufragado sobreviveu sozinho.",
   combate:"Saqueá-lo.",
   paz:"Ajudá-lo a recuperar seu navio.",
   ganchos:"Navio agora é habitado por fantasmas.",
   variacoes:"Humano, fantasma ou amaldiçoado."
  },

  {descricao:"Nereida misteriosa negocia segredos.",
   combate:"Enfrentá-la.",
   paz:"Trocar informações.",
   ganchos:"Sabe sobre marés negras.",
   variacoes:"Aliada ou predadora."
  },

  {descricao:"Pirata arrependido busca redenção.",
   combate:"Atacá-lo por tesouro.",
   paz:"Ouvir confissão.",
   ganchos:"Foi traído por capitão morto-vivo.",
   variacoes:"Espírito ou mortal."
  },

  {descricao:"Caçador de pérolas enfrenta cavernas profundas.",
   combate:"Tomar suas pérolas.",
   paz:"Ajudá-lo a resgatar aprendiz.",
   ganchos:"Encontrou pérola viva com vontade própria.",
   variacoes:"Abençoado ou amaldiçoado."
  },

  {descricao:"Monge das Marés vive em ilha que surge na lua cheia.",
   combate:"Expulsá-lo.",
   paz:"Aprender preces das ondas.",
   ganchos:"Prevê tempestade de mil anos.",
   variacoes:"Louco ou sábio."
  },

  {descricao:"Guardião do Farol Afogado mantém chama eterna.",
   combate:"Invadir farol.",
   paz:"Ajudá-lo a manter chama viva.",
   ganchos:"Farol guia almas perdidas.",
   variacoes:"Humano, espírito ou autômato."
  },

  {descricao:"Navegadora cega lê mar pelos ventos.",
   combate:"Enganá-la.",
   paz:"Deixar-se guiar.",
   ganchos:"Conhece caminho para ilha invisível.",
   variacoes:"Humana ou elfa do mar."
  },

  {descricao:"Batedor do Abismo enviado por reino submerso.",
   combate:"Caçá-lo.",
   paz:"Firmar tratado.",
   ganchos:"Busca artefato roubado dos abissais.",
   variacoes:"Tritão, humano ou híbrido."
  },

  {descricao:"Espíritos náufragos clamam por libertação.",
   combate:"Lutar contra aparições.",
   paz:"Realizar ritual de acalmar ondas.",
   ganchos:"Guardam segredo de um mapa perdido.",
   variacoes:"Trágicos ou vingativos."
  },

  {descricao:"Mercadora de sal negocia itens raros do fundo.",
   combate:"Roubar mercadorias.",
   paz:"Comprar item único.",
   ganchos:"Seu sal pode selar demônios.",
   variacoes:"Bruxa ou comerciante sagaz."
  },

  {descricao:"Ermitão coralino vive entre corais conscientes.",
   combate:"Destruir corais protetores.",
   paz:"Aprender simbiose mágica.",
   ganchos:"Estuda infecção coralina que consome mares.",
   variacoes:"Mago, cientista ou guardião."
  }
];

const piMarinhoGeo = [
  {descricao:"Coluna de bolhas eternas.",
   combate:"Criaturas vivem dentro delas.",
   paz:"Investigar fonte submersa.",
   ganchos:"Tesouro preso no centro.",
   variacoes:"Bolhas sussurram vozes antigas."
  },

  {descricao:"Redemoinho que leva a outro trecho do oceano.",
   combate:"Criaturas guardam passagem.",
   paz:"Usar magia para estabilizar.",
   ganchos:"Chamado 'Portal das Correntes'.",
   variacoes:"Liga dimensões paralelas."
  },

  {descricao:"Recife em espiral perfeita.",
   combate:"Polvos e sereias guardam o local.",
   paz:"Estudar padrão natural.",
   ganchos:"Serve como bússola natural.",
   variacoes:"Emite som audível sob água."
  },

  {descricao:"Campo de algas bioluminescentes.",
   combate:"Criaturas hipnóticas se escondem.",
   paz:"Coletar amostras cuidadosamente.",
   ganchos:"Mapa aparece entre luzes à noite.",
   variacoes:"Luzes reagem a emoções."
  },

  {descricao:"Iceberg negro que não derrete.",
   combate:"Criaturas frias se aninham nele.",
   paz:"Investigar composição.",
   ganchos:"Sela espírito antigo.",
   variacoes:"Temperatura cai nas redondezas."
  },

  {descricao:"Fenda abissal expelindo vapor quente.",
   combate:"Monstros emergem.",
   paz:"Selar abertura.",
   ganchos:"Submarino desapareceu aqui.",
   variacoes:"Luzes vermelhas brilham no fundo."
  },

  {descricao:"Banco de peixes que forma palavras.",
   combate:"Predadores os seguem.",
   paz:"Observar sem interferir.",
   ganchos:"Mensagens predizem eventos.",
   variacoes:"Palavras mudam conforme observador."
  },

  {descricao:"Caverna submersa que emite música.",
   combate:"Sereias aprisionadas cantam.",
   paz:"Libertá-las.",
   ganchos:"Música guia navios perdidos.",
   variacoes:"Tom muda com maré."
  },

  {descricao:"Ilha móvel formada por conchas vivas.",
   combate:"Criaturas dormentes nela.",
   paz:"Navegar junto dela.",
   ganchos:"Farol desapareceu ao seu passar.",
   variacoes:"Às vezes mergulha por dias."
  },

  {descricao:"Tempestade eterna fixa no mar.",
   combate:"Seres elementais dançam nas nuvens.",
   paz:"Acalmar núcleo mágico.",
   ganchos:"Navios fantasmas atravessam.",
   variacoes:"Raios caem em ritmo constante."
  },

  {descricao:"Corrente quente que corta os mares.",
   combate:"Tubarões escoltam corrente.",
   paz:"Viajar rapidamente montando rota.",
   ganchos:"Criatura colossal nada nela.",
   variacoes:"Corrente canta como uma voz."
  },

  {descricao:"Pilar de sal cristalizado emergindo do mar.",
   combate:"Criaturas petrificadas ao redor.",
   paz:"Estudar origem alquímica.",
   ganchos:"Capitão virou estátua ao tocá-lo.",
   variacoes:"Pilar cresce a cada maré."
  }
];

const piColinaMons = [
  {descricao:"Roedores gigantes derrubam encostas.",
   combate:"Invadir tocas e matar prole.",
   paz:"Reassentar usando repulsivos.",
   ganchos:"Minério raro exposto; ovelhas desaparecem.",
   variacoes:"Parasita útil vive neles; tocas contêm ossários."
  },

  {descricao:"Milícias ocupam torres antigas.",
   combate:"Retomar torres.",
   paz:"Barganhar proteção.",
   ganchos:"Mensagens estratégicas estão sendo interceptadas.",
   variacoes:"Torres servem a um mago; catapultas antigas funcionam."
  },

  {descricao:"Pedras vibram atraindo criaturas sonoras.",
   combate:"Enfrentar criaturas atraídas.",
   paz:"Silenciar pedras com ritos.",
   ganchos:"Maestro procura a 'nota perdida'.",
   variacoes:"Pedras amplificam magia; ecos parecem vozes."
  },

  {descricao:"Gaviões gigantes dominam céus das colinas.",
   combate:"Remover ninhos.",
   paz:"Usar iscas e oferendas para negociar território.",
   ganchos:"Plumas usadas em amuletos poderosos.",
   variacoes:"Líder é semi-inteligente e vigia rotas."
  },

  {descricao:"Ferreiro ermitão guarda forja com mercenários.",
   combate:"Tomar a forja.",
   paz:"Firmar pacto ou comprar trabalho.",
   ganchos:"Uma lâmina única está quase concluída.",
   variacoes:"Ferreiro é elemental; a forja exige alma em sacrifício."
  },

  {descricao:"Trolls controlam a pedreira.",
   combate:"Expulsar ou destruir o acampamento.",
   paz:"Negociar tributo ou barreiras.",
   ganchos:"Minerador desapareceu recentemente.",
   variacoes:"Servem a uma bruxa; cavernas profundas abaixo."
  },

  {descricao:"Névoa revela espectros de batalhas passadas.",
   combate:"Lutar contra espíritos rancorosos.",
   paz:"Executar ritos nos altares esquecidos.",
   ganchos:"Relíquia ancestral ligada à traição antiga.",
   variacoes:"Névoa mostra passado; alguns espíritos conversam."
  },

  {descricao:"Exilados vivem como fora-da-lei.",
   combate:"Reprimir ou tomar controle.",
   paz:"Oferecer anistia e reintegração.",
   ganchos:"Um informante procurado vive entre eles.",
   variacoes:"Cultivam ervas raras; líder é ex-oficial."
  },

  {descricao:"Pedra-alter tomada por criatura dominante.",
   combate:"Reaver o trono da criatura.",
   paz:"Rito de reconquista.",
   ganchos:"Pedra concede bênção aos pastos próximos.",
   variacoes:"Trono é foco mágico escrito em runas antigas."
  },

  {descricao:"Pequenas pragas infestam plantações.",
   combate:"Caçar ou capturar pragas.",
   paz:"Introduzir predadores naturais.",
   ganchos:"Agricultores desesperados por ajuda.",
   variacoes:"Pragas transmitem doenças, mas podem ser domesticadas."
  },

  {descricao:"Fissura habitada por criaturas subterrâneas.",
   combate:"Descer e limpar câmaras.",
   paz:"Redirecionar água e selar rachaduras.",
   ganchos:"Medalha encontrada em esqueleto antigo.",
   variacoes:"Passagem conecta outras cavernas; gás mágico exalado."
  },

  {descricao:"Corujas gigantes caçam sob luar.",
   combate:"Expulsar ou eliminar.",
   paz:"Realizar ritos noturnos para assegurar terras.",
   ganchos:"Um oráculo fala por meio delas.",
   variacoes:"Uma coruja é espírito encarnado."
  }
];

const piColinaNPC = [
  {descricao:"Pastor de cabras guarda rebanho em encostas.",
   combate:"Roubar rebanho.",
   paz:"Ajudá-lo com predadores.",
   ganchos:"Cabras possuem runas antigas no pelo.",
   variacoes:"Camponês simples ou druida disfarçado."
  },

  {descricao:"Vigia das colinas observa sinais no céu.",
   combate:"Destruir torre de vigia.",
   paz:"Ajudá-lo a decifrar presságios.",
   ganchos:"Ele prevê invasão por algo alado.",
   variacoes:"Profeta, lunático ou mensageiro divino."
  },

  {descricao:"Mineiro ferido emergiu de túneis profundos.",
   combate:"Tomar a mina.",
   paz:"Selar túneis desmoronados.",
   ganchos:"Algo antigo foi libertado nas escavações.",
   variacoes:"Humano ou gnomo."
  },

  {descricao:"Templário errante busca santuário escondido.",
   combate:"Desafiá-lo em nome da fé.",
   paz:"Guiá-lo até o templo.",
   ganchos:"Templo guarda segredo solar.",
   variacoes:"Devoto sincero ou fanático perigoso."
  },

  {descricao:"Herborista reclusa coleta ervas raras.",
   combate:"Saquear suas reservas.",
   paz:"Ajudá-la a achar flor lendária.",
   ganchos:"Flor pode curar *ou* envenenar.",
   variacoes:"Curandeira bondosa ou bruxa manipuladora."
  },

  {descricao:"Explorador dos ventos estuda correntes mágicas.",
   combate:"Destruir equipamento.",
   paz:"Aprender sobre ressonâncias de eco.",
   ganchos:"O vento sussurra nomes de mortos.",
   variacoes:"Cientista excêntrico ou xamã místico."
  },

  {descricao:"Senhor local cobra impostos pela segurança.",
   combate:"Enfrentar milícia.",
   paz:"Negociar passagem.",
   ganchos:"Esconde segredo sobre tributos.",
   variacoes:"Governante justo ou tirano corrupto."
  },

  {descricao:"Arqueiro solitário vigia fronteiras.",
   combate:"Duelo mortal.",
   paz:"Ajuda contra caçadores rivais.",
   ganchos:"Busca criatura lendária nas colinas.",
   variacoes:"Humano ou elfo."
  },

  {descricao:"Artista de pedra esculpe rostos em penhascos.",
   combate:"Destruir esculturas.",
   paz:"Entender significado espiritual.",
   ganchos:"Rostos são vítimas petrificadas.",
   variacoes:"Louco ou amaldiçoado."
  },

  {descricao:"Nômade das rochas viaja com tenda ritual.",
   combate:"Saqueá-lo.",
   paz:"Trocar histórias ou objetos.",
   ganchos:"Carrega mensagem perdida no tempo.",
   variacoes:"Oráculo ou andarilho comum."
  },

  {descricao:"Ferreiro errante forja em cavernas abertas.",
   combate:"Roubar armas.",
   paz:"Forjar aliança.",
   ganchos:"Metal caiu do céu.",
   variacoes:"Servo de anões ou espírito antigo."
  },

  {descricao:"Viúva das colinas lamenta desastre antigo.",
   combate:"Evitar ou destruí-la.",
   paz:"Consolá-la.",
   ganchos:"Suas lágrimas invocam chuva e morte.",
   variacoes:"Humana ou espírito."
  }
];

const piColinaGeo = [
  {descricao:"Círculo de colinas simétricas.",
   combate:"Espíritos de terra as guardam.",
   paz:"Estudar alinhamento.",
   ganchos:"Local é foco de poder antigo.",
   variacoes:"Cada colina tem uma voz própria."
  },

  {descricao:"Colina que parece um rosto gigante.",
   combate:"Rochas animadas atacam invasores.",
   paz:"Descobrir identidade representada.",
   ganchos:"Dizem que ela 'fala' com o vento.",
   variacoes:"Expressão muda sutilmente ao longo do dia."
  },

  {descricao:"Campo de pedras ressonantes.",
   combate:"Criaturas sensíveis ao som vivem ali.",
   paz:"Sintonizar frequências seguras.",
   ganchos:"Bardo busca inspiração nas vibrações.",
   variacoes:"Sons despertam memórias antigas."
  },

  {descricao:"Colina oca com som de batimentos.",
   combate:"Feras subterrâneas protegem o local.",
   paz:"Examinar interior com cautela.",
   ganchos:"É túmulo de algo ainda vivo.",
   variacoes:"Batidas aceleram com presença humana."
  },

  {descricao:"Platô coberto por cristais brilhantes.",
   combate:"Criaturas de luz guardam o platô.",
   paz:"Minerar com cuidado ritual.",
   ganchos:"Um cristal guarda espírito antigo.",
   variacoes:"Brilho muda conforme emoções próximas."
  },

  {descricao:"Vale coberto por névoa constante.",
   combate:"Espectros ou bandidos espreitam.",
   paz:"Navegar pelo som marcado.",
   ganchos:"Vilarejo desapareceu aqui.",
   variacoes:"Névoa tem perfume doce e hipnótico."
  },

  {descricao:"Colina que se move levemente.",
   combate:"Criaturas vivem sobre ela.",
   paz:"Marcar movimento para estudo.",
   ganchos:"Templo tenta 'segui-la'.",
   variacoes:"Algo gigante dorme em seu núcleo."
  },

  {descricao:"Fonte natural no topo de colina.",
   combate:"Feras territoriais protegem água.",
   paz:"Purificar fonte com ritos.",
   ganchos:"Água concede coragem ou insanidade.",
   variacoes:"Fluxo aumenta na lua cheia."
  },

  {descricao:"Campo de ossos fossilizados.",
   combate:"Esqueletos podem se erguer.",
   paz:"Estudo arqueológico.",
   ganchos:"Ossos são de gigantes antigos.",
   variacoes:"Alguns brilham suavemente à noite."
  },

  {descricao:"Pedreira viva que se regenera.",
   combate:"Golens nascem dela.",
   paz:"Selar fendas para controle.",
   ganchos:"Aldeia usa pedra infinita.",
   variacoes:"Pedra 'sangra' ao ser cortada."
  },

  {descricao:"Monte coberto por flores únicas.",
   combate:"Insetos protetores atacam.",
   paz:"Colher sem danificar.",
   ganchos:"Ingrediente para antídoto raro.",
   variacoes:"Flores mudam cor ao longo do dia."
  },

  {descricao:"Colina de magnetita pulsante.",
   combate:"Armas vibram perigosamente.",
   paz:"Usar como bússola.",
   ganchos:"Artefato preso interfere em magia.",
   variacoes:"Raios atingem a colina repetidamente."
  }
];

const piMontanhaMons = [
  {
    descricao: "Dragão médio guarda tesouro em caverna.",
    combate: "Enfrentar ou negociar com o dragão.",
    paz: "Sacrifício de gado ou devolver item roubado.",
    ganchos: "Uma espada ancestral está no covil.",
    variacoes: "Dragão guardião da região; pode ter filhotes."
  },
  {
    descricao: "Faixa íngreme instável cheia de predadores.",
    combate: "Lutar evitando avalanches.",
    paz: "Mapear encostas e reforçar trilhas.",
    ganchos: "Caravana soterrada aguarda resgate.",
    variacoes: "Mago controla avalanches; minério raro exposto."
  },
  {
    descricao: "Guerreiro controla passagem estratégica.",
    combate: "Tomar fortaleza na encosta.",
    paz: "Pagar pedágio ou prestar serviço.",
    ganchos: "Passagem é única; pergaminho militar guardado.",
    variacoes: "Guerreiro é ex-general; golems guardiões ajudam."
  },
  {
    descricao: "Magias de fogo são amplificadas na região.",
    combate: "Lutar contra salamandras e elementais flamejantes.",
    paz: "Selar fonte de calor ou negociar com elemental.",
    ganchos: "Metal antigo útil em forjas mágicas.",
    variacoes: "Local também amplifica magias de tempo; instável."
  },
  {
    descricao: "Inscrições atraem cultistas e monstros.",
    combate: "Confrontar cultistas.",
    paz: "Realizar os ritos corretos de proteção.",
    ganchos: "Prova espiritual para paladino ou clérigo.",
    variacoes: "Pilares podem abrir portais."
  },
  {
    descricao: "Mineiros foram expulsos por monstros.",
    combate: "Limpar mina tomada.",
    paz: "Negociar direito de exploração.",
    ganchos: "Mineral raro e herdeiro desaparecido.",
    variacoes: "Mina conecta rede de cavernas profundas."
  },
  {
    descricao: "Altar no vento controla tempestades.",
    combate: "Enfrentar fanáticos defensores.",
    paz: "Realizar oferenda adequada.",
    ganchos: "Tempestades ameaçam comércio da região.",
    variacoes: "Altar concede bênçãos climáticas."
  },
  {
    descricao: "Tribo pastoreia cabras em penhascos.",
    combate: "Lutar contra guerreiros montanheses.",
    paz: "Negociar por comida, armas ou informações.",
    ganchos: "Amuleto tribal está perdido; político quer apoio.",
    variacoes: "Tribo tem laços com elementais."
  },
  {
    descricao: "Torre de vigia ocupada por um vidente.",
    combate: "Retomar torre.",
    paz: "Convencer o vidente a cooperar.",
    ganchos: "Profecia envolve diretamente o grupo.",
    variacoes: "Torre mostra futuros possíveis em visões."
  },
  {
    descricao: "Cristais intoxicam ou fortalecem.",
    combate: "Enfrentar guardiões cristalinos.",
    paz: "Colher com extrema cautela.",
    ganchos: "Mercador paga muito pelos cristais.",
    variacoes: "Cristais alteram personalidade ou emoções."
  },
  {
    descricao: "Guerreiros enlouquecidos habitam platô.",
    combate: "Lutar valorando disciplina e honra.",
    paz: "Restaurar ordem mental através de ritos.",
    ganchos: "Tomos de técnica marcial perdidos.",
    variacoes: "Mestre é um autômato antigo."
  },
  {
    descricao: "Túmulo profanado gera espíritos vingativos.",
    combate: "Purificar e banir espíritos.",
    paz: "Restaurar honra do túmulo.",
    ganchos: "Armadura heroica perdida; descendente implora ajuda.",
    variacoes: "Herói aparece em sonhos oferecendo conselhos."
  }
];

const piMontanhaNPC = [
  {
    descricao: "Monge do pico vive em templo isolado.",
    combate: "Invadir ou destruir templo.",
    paz: "Buscar sabedoria ou treinamento.",
    ganchos: "O templo guarda um portal selado.",
    variacoes: "Sábio iluminado ou fanático perigoso."
  },
  {
    descricao: "Escalador perdido busca artefato.",
    combate: "Impedir sua escalada.",
    paz: "Ajudá-lo a alcançar o cume.",
    ganchos: "O artefato é vivo e consciente.",
    variacoes: "Explorador legítimo ou ladrão."
  },
  {
    descricao: "Ancião das rochas fala com montanhas.",
    combate: "Silenciá-lo.",
    paz: "Ouvir a voz da montanha.",
    ganchos: "A montanha pede sacrifício.",
    variacoes: "Profeta verdadeiro ou possuído."
  },
  {
    descricao: "Caçadora de grifos rastreia criaturas aladas.",
    combate: "Roubar caça ou troféu.",
    paz: "Ajudá-la a capturar um grifo.",
    ganchos: "O grifo guarda um segredo antigo.",
    variacoes: "Humana ou meio-elfa."
  },
  {
    descricao: "Mineiro de cristais vive em fendas profundas.",
    combate: "Roubar cristais preciosos.",
    paz: "Negociar fragmento.",
    ganchos: "Cristais fazem parte de uma entidade viva.",
    variacoes: "Anão, humano ou autômato."
  },
  {
    descricao: "Eremita cego escuta o vento como guia.",
    combate: "Atacá-lo.",
    paz: "Buscar profecia ou conselho.",
    ganchos: "Consegue ver o futuro através dos sons.",
    variacoes: "Cego real ou vidente sobrenatural."
  },
  {
    descricao: "Guardiã dos ecos mantém silêncio sagrado.",
    combate: "Quebrar tabu do eco.",
    paz: "Respeitar pacto de silêncio.",
    ganchos: "Vozes antigas desejam retornar.",
    variacoes: "Espírito ancestral ou humana."
  },
  {
    descricao: "Pastor de ovelhas vaga por encostas frias.",
    combate: "Roubar rebanho.",
    paz: "Ajudá-lo com predadores.",
    ganchos: "Um dos animais fala.",
    variacoes: "Druida disfarçado."
  },
  {
    descricao: "Forjador de tempestades molda armas com trovões.",
    combate: "Invadir forja.",
    paz: "Aprender a técnica ancestral.",
    ganchos: "Uma arma relampejante precisa de novo dono.",
    variacoes: "Humano ou elemental."
  },
  {
    descricao: "Sacerdote da neve mantém gelo vivo.",
    combate: "Destruir seu altar.",
    paz: "Compreender fé e rituais.",
    ganchos: "Ritual dele pode alterar clima da região.",
    variacoes: "Santo ou fanático."
  },
  {
    descricao: "Caçador de dragões vive apenas para caçar monstros.",
    combate: "Desafiá-lo.",
    paz: "Ajudá-lo na caçada final.",
    ganchos: "Monstro é protetor antigo das montanhas.",
    variacoes: "Herói ou assassino obcecado."
  },
  {
    descricao: "Nômade do gelo viaja entre picos gelados.",
    combate: "Roubar mantos.",
    paz: "Ajudá-lo a cruzar montanha.",
    ganchos: "Carrega fragmento de gelo vivo.",
    variacoes: "Humano ou elemental."
  }
];

const piMontanhaGeo = [
  {
    descricao: "Pico eternamente coberto por trovões.",
    combate: "Elementais do ar guardam o topo.",
    paz: "Acalmar tempestade com ritual.",
    ganchos: "Monastério destruído no topo.",
    variacoes: "Raios formam palavras nas pedras."
  },
  {
    descricao: "Desfiladeiro profundo e escuro.",
    combate: "Bestas aladas caçam viajantes.",
    paz: "Construir pontes seguras.",
    ganchos: "Alguém caiu e precisa de resgate.",
    variacoes: "Sons ecoam por dias após emitidos."
  },
  {
    descricao: "Túnel natural com vento constante.",
    combate: "Criaturas voadoras usam como ninho.",
    paz: "Mapear e reforçar corredores.",
    ganchos: "O vento canta músicas antigas.",
    variacoes: "Melodias revelam histórias esquecidas."
  },
  {
    descricao: "Lago congelado no pico da montanha.",
    combate: "Criaturas dormem sob gelo.",
    paz: "Derreter com extremo cuidado.",
    ganchos: "Algo pulsa sob o lago.",
    variacoes: "O gelo reflete o futuro."
  },
  {
    descricao: "Rochas flutuantes orbitam a crista.",
    combate: "Harpias guardam o local.",
    paz: "Controlar energia para subir.",
    ganchos: "Flutuação ocorre sobre um selo mágico.",
    variacoes: "Rochas movem-se como planetas."
  },
  {
    descricao: "Pico vermelho sangra lava.",
    combate: "Salamandras e elementais vigilantes.",
    paz: "Conter fluxo ritualisticamente.",
    ganchos: "Aldeia próxima corre perigo.",
    variacoes: "Fluxo aumenta na lua cheia."
  },
  {
    descricao: "Arco natural entre montanhas.",
    combate: "Gigantes guardam passagem.",
    paz: "Atravessar em silêncio ritual.",
    ganchos: "Portal antigo guardado ali.",
    variacoes: "Arco fecha-se como mandíbula."
  },
  {
    descricao: "Abismo emite calor e vozes.",
    combate: "Demônios presos tentam escapar.",
    paz: "Evitar rituais que o abram.",
    ganchos: "Um culto tenta libertá-los.",
    variacoes: "Vozes pedem ajuda com sinceridade."
  },
  {
    descricao: "Platô nevado com pedras em espiral.",
    combate: "Espíritos antigos circulam local.",
    paz: "Ofertar respeitos ao círculo.",
    ganchos: "Herói antigo está selado ali.",
    variacoes: "As pedras movem-se lentamente."
  },
  {
    descricao: "Pico que cresce um pouco a cada ano.",
    combate: "Dragões observam progresso.",
    paz: "Medir crescimento como estudo.",
    ganchos: "Oráculo vive no topo.",
    variacoes: "Montanha é ser vivo petrificado."
  },
  {
    descricao: "Túnel vertical até o céu.",
    combate: "Criaturas aladas guardam.",
    paz: "Subir estudando o ar rarefeito.",
    ganchos: "Item caiu 'do alto' por ele.",
    variacoes: "Conecta planos celestes."
  },
  {
    descricao: "Vale onde ecos soam múltiplos e estranhos.",
    combate: "Predadores imitam sons humanos.",
    paz: "Decifrar ecos reais.",
    ganchos: "Eco antigo contém profecia.",
    variacoes: "Sons são vozes de seres já extintos."
  }
];

const piDesertoMons = [
  {
    descricao: "Escorpiões gigantes enterram presas em dunas.",
    combate: "Eliminar rainha e a colônia.",
    paz: "Redirecionar com fumaça, sinais ou barreiras de pedra.",
    ganchos: "Veneno vale fortuna; caravanas desapareceram.",
    variacoes: "Escorpiões feitos de cristal; fosfato raro no local."
  },
  {
    descricao: "Aparição de caravana ilusória ou morta.",
    combate: "Se forem corpóreos: combate. Se ilusórios: dissipar magia.",
    paz: "Ignorar ou seguir a miragem até o fim.",
    ganchos: "Um item raro pode ser negociado; um sobrevivente conta segredos.",
    variacoes: "A miragem é um reflexo de outro plano."
  },
  {
    descricao: "Água vital do oásis está contaminada.",
    combate: "Guardiões aquáticos atacam intrusos.",
    paz: "Realizar rituais de purificação.",
    ganchos: "A vila depende dessa água; um curandeiro pode cobrar caro.",
    variacoes: "O oásis cura em troca de sacrifícios espirituais."
  },
  {
    descricao: "Túmulos antigos soterrados sob dunas.",
    combate: "Lutar contra guardiões de areia.",
    paz: "Executar ritos de descanso para os mortos.",
    ganchos: "Fragmento de mapa ou herança antiga.",
    variacoes: "Túmulo se torna uma tempestade de areia se profanado."
  },
  {
    descricao: "Bandidos emboscam caravanas em trechos ocultos.",
    combate: "Desmantelar o acampamento.",
    paz: "Negociar pedágio ou infiltrar-se como aliados.",
    ganchos: "Caravana importante foi saqueada.",
    variacoes: "Líder é ex-oficial e protegido por criaturas do deserto."
  },
  {
    descricao: "Rochas emanam vapores que enlouquecem viajantes.",
    combate: "Criaturas flamejantes ou elementais surgem.",
    paz: "Neutralizar vapores com água ou magia lunar.",
    ganchos: "Mineral raro encontrado ali.",
    variacoes: "Rochas são cântaros elementais que armazenam energia."
  },
  {
    descricao: "Tribo montada controla rotas comerciais.",
    combate: "Enfrentar cavaleiros das dunas.",
    paz: "Comércio, desafio ou prova de honra.",
    ganchos: "A filha do líder foi raptada.",
    variacoes: "Tribo se dissolve em areia ao anoitecer."
  },
  {
    descricao: "Fenda solar emite luz sagrada ou destrutiva.",
    combate: "Culto fanático protege o local.",
    paz: "Participar do rito solar.",
    ganchos: "A profecia envolve um eclipse próximo.",
    variacoes: "Fenda mostra visões do futuro queimado."
  },
  {
    descricao: "Ventos carregam vozes que enlouquecem viajantes.",
    combate: "Enfrentar ecos e sombras no vento.",
    paz: "Selar fendas sonoras com pedra ritual.",
    ganchos: "Uma mensagem perdida pede ajuda.",
    variacoes: "Ecos devolvem memórias ou revelam caminhos."
  },
  {
    descricao: "Oásis se move com o deserto.",
    combate: "Tribo disputa controle do oásis.",
    paz: "Estabelecer partilha entre povos.",
    ganchos: "Artefato de navegação perdido.",
    variacoes: "Oásis é um ser vivo antigo."
  },
  {
    descricao: "Torre soterrada coberta por areia e runas.",
    combate: "Elementais e ladrões defendem o topo.",
    paz: "Recuperar relíquias antigas.",
    ganchos: "Mapa do deserto escondido em pergaminhos.",
    variacoes: "A torre gira com os ventos como um relógio."
  },
  {
    descricao: "Planície de ossadas antigas.",
    combate: "Mortos-vivos despertam com o vento.",
    paz: "Rituais para encerramento e enterro.",
    ganchos: "Ossos formam mapa de cidade perdida.",
    variacoes: "Ossos brilham e são usados em rituais sombrios."
  }
];

const piDesertoNPC = [
  {
    descricao: "Nômade da areia vaga entre ruínas.",
    combate: "Roubar suprimentos ou montaria.",
    paz: "Trocar informações e rotas de viagem.",
    ganchos: "Conhece a localização de um oásis sagrado.",
    variacoes: "Comerciante honesto ou andarilho místico."
  },
  {
    descricao: "Oráculo cego lê o futuro nas tempestades.",
    combate: "Silenciar profecias perigosas.",
    paz: "Consultar visões e mensagens do vento.",
    ganchos: "Fala sobre um futuro de 'Sol Negro'.",
    variacoes: "Profeta real ou manipulado por entidade."
  },
  {
    descricao: "Mercador de areia vende vidros, sal e artefatos.",
    combate: "Saquear mercadorias.",
    paz: "Negociar item raro.",
    ganchos: "Um dos itens é amaldiçoado.",
    variacoes: "Vítima da maldição ou cúmplice dela."
  },
  {
    descricao: "Caçadora de escaravelhos coleta carapaças mágicas.",
    combate: "Disputar território de caça.",
    paz: "Ajudar na coleta dos insetos raros.",
    ganchos: "Escaravelhos se multiplicam sozinhos.",
    variacoes: "Pode ser druida ou bruxa ritualista."
  },
  {
    descricao: "Guerreiro exilado sobrevive nas ruínas.",
    combate: "Duelo ou emboscada.",
    paz: "Ouvir sua história e ajudar.",
    ganchos: "Guarda segredo de um rei morto.",
    variacoes: "Traidor arrependido ou guardião fiel."
  },
  {
    descricao: "Monge do sol medita entre dunas quentes.",
    combate: "Destruir seu santuário.",
    paz: "Aprender suas técnicas solares.",
    ganchos: "Prediz retorno de um deus antigo.",
    variacoes: "Iluminado ou herege."
  },
  {
    descricao: "Caçador de tempestades domina ventos.",
    combate: "Confrontar sua força.",
    paz: "Ajudá-lo a repelir tempestade viva.",
    ganchos: "Tempestade fala com ele e pede algo.",
    variacoes: "Humano ou elemental parcialmente."
  },
  {
    descricao: "Criança da areia sobrevive sozinha.",
    combate: "Ignorar seu pedido de ajuda.",
    paz: "Protegê-la.",
    ganchos: "Ela é mensageira de uma maldição antiga.",
    variacoes: "Humana ou espírito disfarçado."
  },
  {
    descricao: "Senhor das Dunas lidera caravanas armadas.",
    combate: "Batalha direta.",
    paz: "Negociar passagem e tributos.",
    ganchos: "Planeja dominar todo o deserto.",
    variacoes: "Humano, meio-gênio ou tirano místico."
  },
  {
    descricao: "Feiticeira do vidro modela areia derretida.",
    combate: "Destruir esculturas vivas.",
    paz: "Observar ou participar do ritual.",
    ganchos: "Uma de suas esculturas ganhou consciência.",
    variacoes: "Bela ou monstruosa, dependendo da luz."
  },
  {
    descricao: "Explorador de ruínas procura cidades perdidas.",
    combate: "Roubar suas descobertas.",
    paz: "Ajudá-lo em escavações.",
    ganchos: "Portal antigo descoberto.",
    variacoes: "Aventureiro honrado ou fanático obcecado."
  },
  {
    descricao: "Guardião das estrelas lê constelações.",
    combate: "Quebrar seu observatório.",
    paz: "Consultar mapa astral antigo.",
    ganchos: "Prediz evento cósmico iminente.",
    variacoes: "Louco ou sábio verdadeiro."
  }
];

const piDesertoGeo = [
  {
    descricao: "Duna gigante em forma de serpente.",
    combate: "Serpentes elementais dormem abaixo.",
    paz: "Evitar vibrações e acampamentos próximos.",
    ganchos: "Acredita-se que ela caminhará um dia.",
    variacoes: "Às vezes respira lentamente."
  },
  {
    descricao: "Oásis de areia líquida.",
    combate: "Criaturas afundam viajantes.",
    paz: "Criar travessia com tábuas e magia.",
    ganchos: "Um viajante desapareceu nele.",
    variacoes: "Brilha suavemente à noite."
  },
  {
    descricao: "Planície de vidro fundido.",
    combate: "Calor extremo e reflexos fatais.",
    paz: "Proteção ocular e caminhar ao amanhecer.",
    ganchos: "Criada por feitiço solar antigo.",
    variacoes: "Reflete memórias de quem observa."
  },
  {
    descricao: "Torres de sal que crescem lentamente.",
    combate: "Criaturas cristalinas vigiam o lugar.",
    paz: "Extrair pequenas lascas com cuidado.",
    ganchos: "Usadas em rituais divinos.",
    variacoes: "Crescem ouvindo cânticos religiosos."
  },
  {
    descricao: "Caverna subterrânea de ar frio.",
    combate: "Bestas abissais dormem no fundo.",
    paz: "Permite passagem segura entre regiões.",
    ganchos: "Mapa menciona este lugar como refúgio.",
    variacoes: "O vento canta nomes esquecidos."
  },
  {
    descricao: "Duna móvel cobre e revela ruínas.",
    combate: "Insetos gigantes defendem o local.",
    paz: "Marcar deslocamento ao longo da semana.",
    ganchos: "Templo perdido está sob ela.",
    variacoes: "Move-se com o nascer do sol."
  },
  {
    descricao: "Lago de mercúrio prateado.",
    combate: "Vapores venenosos intoxicam viajantes.",
    paz: "Estudar natureza alquímica.",
    ganchos: "É conhecido como o Espelho dos Deuses.",
    variacoes: "Mostra imagens invertidas do mundo."
  },
  {
    descricao: "Colunas de pedra vibrante.",
    combate: "Criaturas cegas usam o som para caçar.",
    paz: "Mover-se em absoluto silêncio.",
    ganchos: "Nômades usam o som como guia.",
    variacoes: "Racham se um som alto é emitido."
  },
  {
    descricao: "Poço de vento eterno.",
    combate: "Areia giratória fere como lâminas.",
    paz: "Usar vento como energia.",
    ganchos: "O poço esconde uma tumba antiga.",
    variacoes: "O barulho parece um choro humano."
  },
  {
    descricao: "Planície de ossos queimados.",
    combate: "Espíritos famintos assombram viajantes.",
    paz: "Abençoar o solo para descansar as almas.",
    ganchos: "Campo de batalha ancestral.",
    variacoes: "Ossos brilham quando a lua cheia nasce."
  },
  {
    descricao: "Rocha suspensa por força desconhecida.",
    combate: "Criaturas usam sombra como emboscada.",
    paz: "Escalar ou estudar estrutura mágica.",
    ganchos: "Lenda diz que ela pesa a alma.",
    variacoes: "Desce lentamente ao pôr do sol."
  },
  {
    descricao: "Fenda com fogo azul eterno.",
    combate: "Salamandras guardam o fogo.",
    paz: "Coletar pequena chama divina.",
    ganchos: "Fogo nunca se apaga.",
    variacoes: "Chama é alimentada por almas antigas."
  }
];

const piPantanoMons = [
  {
    descricao: "Crocodilo colossal embosca quem se aproxima da água.",
    combate: "Matar ou afastar a besta nas águas profundas.",
    paz: "Redirecionar áreas de pesca e instalar sinalizadores.",
    ganchos: "Pescador raptado; pele vale muito dinheiro.",
    variacoes: "Escamas possuem magia; pode ser espírito guardião."
  },
  {
    descricao: "Enclave fanático realiza sacrifícios no pântano.",
    combate: "Confrontar ou dispersar cultistas.",
    paz: "Conversão, acordo ou auxílio espiritual.",
    ganchos: "Relíquia antiga ligada ao pântano.",
    variacoes: "Culto demoníaco ou curativo."
  },
  {
    descricao: "Névoa viva altera a fome, mente e sensações.",
    combate: "Parasitas e criaturas surgem dentro da névoa.",
    paz: "Rituais e símbolos dissipam os efeitos.",
    ganchos: "Alquimista quer amostras para estudo.",
    variacoes: "A névoa cura memórias ou é um portal líquido."
  },
  {
    descricao: "Vila controlada por capatazes violentos.",
    combate: "Libertar os aldeões à força.",
    paz: "Negociar proteção e liderança.",
    ganchos: "Crianças desaparecidas; rede de segredos.",
    variacoes: "Culto do sapo ou rede de contrabando."
  },
  {
    descricao: "Rãs gigantes dominam áreas inteiras.",
    combate: "Dispersar anfíbios e destruir ninhos.",
    paz: "Sacrifícios, música ou rituais calmantes.",
    ganchos: "Peles e glândulas valem muito em alquimia.",
    variacoes: "Rãs metamorfos; monólito canalizador de magia."
  },
  {
    descricao: "Poço de corpos ecoa espíritos inquietos.",
    combate: "Enfrentar mortos e espectros.",
    paz: "Realizar rito de passagem adequado.",
    ganchos: "Diário revela um segredo perigoso.",
    variacoes: "Portal espiritual ou barganhas de almas."
  },
  {
    descricao: "Escravistas emboscam viajantes.",
    combate: "Tomar acampamento e libertar cativos.",
    paz: "Infiltração silenciosa.",
    ganchos: "Parente está entre os presos.",
    variacoes: "Proteção oficial ou militar envolvida."
  },
  {
    descricao: "Lodo cura carne, mas destrói metal.",
    combate: "Criaturas do charco protegem a fonte.",
    paz: "Extração controlada do lodo.",
    ganchos: "Cura se torna recurso de alto valor.",
    variacoes: "Lodo concede visões; flor rara cresce nele."
  },
  {
    descricao: "Garças predadoras atacam margens.",
    combate: "Expulsar ou caçar aves.",
    paz: "Trocar recursos ou oferecer alimento ritual.",
    ganchos: "Penas com propriedades curativas.",
    variacoes: "Garça-xamã governa uma ilha mística."
  },
  {
    descricao: "Culto domina mão de obra local.",
    combate: "Revolta violenta.",
    paz: "Desprogramar doutrinação.",
    ganchos: "Pessoa importante está presa.",
    variacoes: "Culto funciona como fachada para criminosos."
  },
  {
    descricao: "Plantas imitam vozes humanas.",
    combate: "Plantas carnívoras emboscam viajantes.",
    paz: "Ensinar grupos a reconhecer o canto falso.",
    ganchos: "Canções podem afastá-las ou encantá-las.",
    variacoes: "Vozes revelam segredos antigos."
  },
  {
    descricao: "Duas espécies do pântano estão em guerra.",
    combate: "Escolher um lado e lutar.",
    paz: "Medir forças e criar equilíbrio simbiótico.",
    ganchos: "Raiz-titã desperta tremores.",
    variacoes: "Conflito molda o terreno ao redor."
  }
];

const piPantanoNPC = [
  {
    descricao: "Bruxa do lodo vive cercada por névoa e segredos.",
    combate: "Queimar sua cabana ritual.",
    paz: "Ajudá-la em um ritual antigo.",
    ganchos: "Ela precisa de algo que o grupo possui.",
    variacoes: "Amável ou cruel."
  },
  {
    descricao: "Caçador de sapos coleta criaturas raras.",
    combate: "Confiscar suas capturas.",
    paz: "Ajudá-lo a encontrar o Sapo Rei.",
    ganchos: "As criaturas falam.",
    variacoes: "Insano ou estudioso."
  },
  {
    descricao: "Ermitão vive dentro de um tronco oco.",
    combate: "Afogá-lo ou expulsá-lo.",
    paz: "Aprender segredos escondidos no brejo.",
    ganchos: "Guarda mapas submersos.",
    variacoes: "Sábio ou amaldiçoado."
  },
  {
    descricao: "Morto falante responde perguntas.",
    combate: "Destruí-lo para silenciar mistérios.",
    paz: "Perguntar com cautela.",
    ganchos: "Conhece localização de tesouro.",
    variacoes: "Espírito ou feitiço animado."
  },
  {
    descricao: "Dama aparece em água parada como reflexo.",
    combate: "Quebrar o espelho sobrenatural.",
    paz: "Aceitar seu convite para 'ver mais'.",
    ganchos: "Mostra um futuro possível.",
    variacoes: "Guiadora ou enganadora."
  },
  {
    descricao: "Lenhador perdido nas névoas.",
    combate: "Tomar sua carroça e suprimentos.",
    paz: "Guiá-lo para fora.",
    ganchos: "Ele presenciou algo proibido.",
    variacoes: "Vivo, morto ou enlouquecido."
  },
  {
    descricao: "Caçadora de sombras enfrenta espíritos.",
    combate: "Confrontá-la em ritual.",
    paz: "Ajudá-la a purificar um local.",
    ganchos: "O pântano guarda um portal para sombras.",
    variacoes: "Druida ou guerreira."
  },
  {
    descricao: "Guardião das lanternas mantém luzes nas trilhas.",
    combate: "Apagar lanternas pode libertar algo.",
    paz: "Seguir as luzes para um santuário.",
    ganchos: "A luz guia almas perdidas.",
    variacoes: "Humano ou espírito."
  },
  {
    descricao: "Curandeira do charco faz poções poderosas.",
    combate: "Roubar ingredientes raros.",
    paz: "Negociar antídotos.",
    ganchos: "Falta um ingrediente proibido.",
    variacoes: "Curandeira ou golpista."
  },
  {
    descricao: "Fantasma do caçador assombra o brejo.",
    combate: "Exorcizar o espírito.",
    paz: "Recontar sua história e libertá-lo.",
    ganchos: "Foi traído e pede vingança.",
    variacoes: "Trágico ou vingativo."
  },
  {
    descricao: "Menina do brejo brinca entre as margens.",
    combate: "Ignorá-la causa maldição.",
    paz: "Segui-la até seu segredo.",
    ganchos: "Conduz a altar esquecido.",
    variacoes: "Espírito ou guardiã."
  },
  {
    descricao: "Rei do pântano clama soberania total.",
    combate: "Desafiá-lo por domínio.",
    paz: "Firmar pacto de proteção.",
    ganchos: "Guarda relíquias afundadas.",
    variacoes: "Louco, faérico ou morto-vivo."
  }
];

const piPantanoGeo = [
  {
    descricao: "Lago coberto por névoa ácida.",
    combate: "Monstros viscosos surgem ao toque.",
    paz: "Neutralizar vapores com reagentes.",
    ganchos: "Alquimista procura essa névoa.",
    variacoes: "Evapora ao nascer do sol."
  },
  {
    descricao: "Tronco de árvore gigantesca serve como ponte.",
    combate: "Criaturas moram dentro do tronco.",
    paz: "Reparar travessia com cordas.",
    ganchos: "Corpo encontrado sob a madeira.",
    variacoes: "O tronco pulsa levemente."
  },
  {
    descricao: "Poço de águas negras sem fundo.",
    combate: "Espectros emergem das profundezas.",
    paz: "Selar com runas.",
    ganchos: "Portal para outro plano.",
    variacoes: "Água reflete seu maior medo."
  },
  {
    descricao: "Campo de flores com odor de podridão.",
    combate: "Plantas carnívoras emboscam vítimas.",
    paz: "Identificar odor correto para repelir.",
    ganchos: "Ingrediente para antídoto raríssimo.",
    variacoes: "Aroma atrai mortos-vivos."
  },
  {
    descricao: "Ilha flutuante coberta de limo.",
    combate: "Crocodilos sagrados defendem o local.",
    paz: "Usar a ilha como balsa móvel.",
    ganchos: "Templo afundou sob ela.",
    variacoes: "Move-se lentamente no pântano."
  },
  {
    descricao: "Gêiseres de lama fervente.",
    combate: "Elementais surgem durante erupções.",
    paz: "Controlar pressão para obter minerais.",
    ganchos: "Tesouro engolido pela lama.",
    variacoes: "Jorram em ritmo de batida cardíaca."
  },
  {
    descricao: "Clareira onde o tempo está congelado.",
    combate: "Criaturas presas retornam se libertas.",
    paz: "Quebrar feitiço com oferendas antigas.",
    ganchos: "Um herói está congelado ali.",
    variacoes: "Tempo flui apenas à noite."
  },
  {
    descricao: "Árvores ocas que choram sangue.",
    combate: "Espíritos tristes atacam intrusos.",
    paz: "Bênção ritual pode purificar o local.",
    ganchos: "Druida desaparecido ali.",
    variacoes: "Sangue é medicinal."
  },
  {
    descricao: "Rio que corre ao contrário.",
    combate: "Criaturas aquáticas se adaptaram.",
    paz: "Estudar fluxo incomum.",
    ganchos: "Origem vem de fonte amaldiçoada.",
    variacoes: "Flui normal apenas à noite."
  },
  {
    descricao: "Círculo de pedras cobertas de musgo brilhante.",
    combate: "Espíritos guardam o círculo.",
    paz: "Realizar oferenda pacífica.",
    ganchos: "Protege viajantes de maus espíritos.",
    variacoes: "Brilho muda conforme o clima."
  },
  {
    descricao: "Lama que sussurra segredos.",
    combate: "Aparições tentam lurar viajantes.",
    paz: "Ouvir apenas por pouco tempo.",
    ganchos: "Revela nomes de mortos.",
    variacoes: "Vozes se contradizem."
  },
  {
    descricao: "Torre feita de ossos e cipós.",
    combate: "Plantas guardiãs atacam invasores.",
    paz: "Purificar ou escalar com cautela.",
    ganchos: "Bruxa vive no topo.",
    variacoes: "A torre cresce lentamente todo ano."
  }
];

const piTundraMons = [
  {
    descricao: "Manada de umalaks (bisões colossais) migra protegida por xamãs-fera.",
    combate: "Caçar o líder-touro.",
    paz: "Guiar a manada para uma rota segura.",
    ganchos: "Carne vale fortuna; vila depende da migração.",
    variacoes: "O umalak Alfa possui chifres de gelo mágico."
  },
  {
    descricao: "Lobos de gelo invisíveis na neblina caçam viajantes.",
    combate: "Lutar pela sobrevivência.",
    paz: "Oferecer carne e manter fogueiras acesas.",
    ganchos: "Caçador local desapareceu rastreando-os.",
    variacoes: "A matilha é guiada por um espírito ancestral."
  },
  {
    descricao: "Gigante do gelo reclama terras antigas.",
    combate: "Duelo ritual.",
    paz: "Negociar oferenda tradicional.",
    ganchos: "Ruínas sob a neve revelam mural.",
    variacoes: "O gigante é guardião de uma prisão arcana."
  },
  {
    descricao: "Urso cristalizado se alimenta de sonhos.",
    combate: "Combate em terreno escorregadio.",
    paz: "Tratar feridas espirituais.",
    ganchos: "O urso levou a alma de alguém importante.",
    variacoes: "Seu rugido causa amnésia momentânea."
  },
  {
    descricao: "Sereias árticas se escondem sob o lago congelado.",
    combate: "Quebrar o gelo para alcançá-las.",
    paz: "Entoar cântico antigo.",
    ganchos: "Uma sereia sequestrou um pescador.",
    variacoes: "Guardam um portal subaquático."
  },
  {
    descricao: "Carroceiros mortos-vivos vagam puxando trenós espectrais.",
    combate: "Destruir as rédeas amaldiçoadas.",
    paz: "Rezar pelos mortos.",
    ganchos: "O trenó carrega uma relíquia selada.",
    variacoes: "Deixam rastros brilhantes na neve."
  },
  {
    descricao: "Elementais de nevasca rondam encostas.",
    combate: "Dispersar o núcleo gélido.",
    paz: "Oferecer calor ritual.",
    ganchos: "A vila será engolida por uma tempestade espiritual.",
    variacoes: "Eles sussurram nomes de pessoas falecidas."
  },
  {
    descricao: "Saqueadores do gelo emboscam caravanas.",
    combate: "Atacar o acampamento.",
    paz: "Negociar território.",
    ganchos: "Mercadores desesperados pedem ajuda.",
    variacoes: "O líder é descendente de nobres caídos."
  },
  {
    descricao: "Foca titânica defende ferozmente seus filhotes.",
    combate: "Batalha na água congelada.",
    paz: "Proteger crias e rotas de pesca.",
    ganchos: "Uma cria foi capturada por caçadores.",
    variacoes: "A mãe compreende emoções humanas."
  },
  {
    descricao: "Túmulo de rei congelado convoca espectros.",
    combate: "Purificar criptas.",
    paz: "Rituais de linhagem.",
    ganchos: "Coroa ancestral pode despertar um exército.",
    variacoes: "O gelo sussurra ordens antigas."
  },
  {
    descricao: "Águia colossal captura viajantes como oferenda.",
    combate: "Confronto aéreo.",
    paz: "Oferecer alimento ou símbolo espiritual.",
    ganchos: "Um filhote caiu do ninho sagrado.",
    variacoes: "É mensageira de deuses ventanias."
  },
  {
    descricao: "Duas tribos de yétis guerreiam por território.",
    combate: "Escolher lado ou dispersar o conflito.",
    paz: "Negociar caça e fronteiras.",
    ganchos: "Uma criança humana foi adotada pelos yétis.",
    variacoes: "Eles possuem arte xamânica avançada."
  }
];

const piTundraNPC = [
  {
    descricao: "Caçadora da aurora busca uma fera lendária.",
    combate: "Enfrentá-la pela presa.",
    paz: "Ajudá-la na caçada.",
    ganchos: "A fera é um guardião divino.",
    variacoes: "Pode ser heroína ou fanática."
  },
  {
    descricao: "Velho dos ventos lê o futuro nas tempestades.",
    combate: "Silenciá-lo.",
    paz: "Ouvir seus presságios.",
    ganchos: "Prevê a queda de um vilarejo.",
    variacoes: "Lúcido ou amaldiçoado."
  },
  {
    descricao: "Sobrevivente meio congelado encontrado na neve.",
    combate: "Acabar com seu sofrimento.",
    paz: "Salvá-lo e ouvir segredos.",
    ganchos: "Viu algo despertando sob o gelo.",
    variacoes: "Humano ou espírito preso."
  },
  {
    descricao: "Mercadora de pele branca transporta bens raros.",
    combate: "Roubar sua caravana.",
    paz: "Trocar mercadorias.",
    ganchos: "Possui um mapa proibido.",
    variacoes: "Traficante ou guardiã cultural."
  },
  {
    descricao: "Colecionadora de ossos de gelo pesquisa esqueletos antigos.",
    combate: "Tomar suas descobertas.",
    paz: "Ajudá-la na escavação.",
    ganchos: "Ossos pertencem a titãs.",
    variacoes: "Cientista ou necromante."
  },
  {
    descricao: "Monge do silêncio invernal guarda um templo soterrado.",
    combate: "Profanar o templo.",
    paz: "Seguir sua meditação.",
    ganchos: "O templo guarda um artefato de frio eterno.",
    variacoes: "Santo ou vazio por dentro."
  },
  {
    descricao: "Pastor das baleias terrestres cuida de criaturas dóceis gigantes.",
    combate: "Caçar as baleias.",
    paz: "Proteger o rebanho.",
    ganchos: "Uma baleia desapareceu.",
    variacoes: "As baleias são telepatas."
  },
  {
    descricao: "Criança da nevasca aparece apenas durante tempestades.",
    combate: "Reagir à ameaça desconhecida.",
    paz: "Segui-la.",
    ganchos: "Conduz até ruína antiga.",
    variacoes: "Espírito ou fantasma guia."
  },
  {
    descricao: "Rei das Peles governa tribo montanhosa.",
    combate: "Destroná-lo.",
    paz: "Formar aliança.",
    ganchos: "Busca apoio contra invasores.",
    variacoes: "Justo ou tirano."
  },
  {
    descricao: "Tecelã de neve cria mantos que controlam calor.",
    combate: "Roubar seu tear.",
    paz: "Ajudá-la a coletar lã aurora.",
    ganchos: "A lã é protegida por uma fera rara.",
    variacoes: "Humana ou fada."
  },
  {
    descricao: "Eremita do penhasco branco vive ouvindo ecos espirituais.",
    combate: "Silenciá-lo.",
    paz: "Ouvir os ecos.",
    ganchos: "Revela destino do grupo.",
    variacoes: "Possuído ou vidente."
  },
  {
    descricao: "Andarilho congelado não sente frio.",
    combate: "Testar sua maldição.",
    paz: "Conversar sobre seu passado.",
    ganchos: "Carrega um segredo enterrado.",
    variacoes: "Humano, espírito ou avatar do inverno."
  }
];

const piTundraGeo = [
  {
    descricao: "Vale onde auroras tocam o chão.",
    combate: "Espíritos dançam agressivamente.",
    paz: "Absorver energia branca.",
    ganchos: "Auroras revelam mapas antigos.",
    variacoes: "Mudam conforme emoções."
  },
  {
    descricao: "Lago congelado que mostra o passado ao toque.",
    combate: "Espectros guardam o lago.",
    paz: "Meditar sobre história.",
    ganchos: "Revela evento esquecido.",
    variacoes: "Memórias podem aprisionar."
  },
  {
    descricao: "Cânion que ecoa vozes do futuro.",
    combate: "Criaturas miméticas atacam.",
    paz: "Interpretar ecos.",
    ganchos: "Profecias incompletas indicam perigo.",
    variacoes: "Uma voz fala diretamente com um aventureiro."
  },
  {
    descricao: "Floresta de pináculos de gelo vivos.",
    combate: "Golems de gelo vigiam tudo.",
    paz: "Coletar gelo antigo.",
    ganchos: "Esses cristais são usados em forjas rúnicas.",
    variacoes: "Eles crescem ouvindo melodias."
  },
  {
    descricao: "Caverna onde o vento sussurra nomes.",
    combate: "Som atrai predadores.",
    paz: "Conversar com o vento.",
    ganchos: "Nome desaparecido está ali guardado.",
    variacoes: "O vento responde perguntas."
  },
  {
    descricao: "Planície congelada com pegadas colossais.",
    combate: "Criatura segue as pegadas.",
    paz: "Registrar trilha.",
    ganchos: "Pegadas levam a uma porta selada.",
    variacoes: "As pegadas reaparecem sempre novas."
  },
  {
    descricao: "Fonte termal cercada de flores azuis.",
    combate: "Animais territoriais guardam o local.",
    paz: "Banho medicinal poderoso.",
    ganchos: "Cura uma doença rara.",
    variacoes: "Flores brilham sob o luar."
  },
  {
    descricao: "Montanha que muda de forma a cada aurora.",
    combate: "Harpias dominam o topo.",
    paz: "Estudar mudanças.",
    ganchos: "Entrada para labirinto interno.",
    variacoes: "Formato reflete sonhos humanos."
  },
  {
    descricao: "Neve que sangra ao ser pisada.",
    combate: "Sanguessugas espirituais despertam.",
    paz: "Coletar pigmento raro.",
    ganchos: "Usado em rituais videntes.",
    variacoes: "A cor muda com quem pisa."
  },
  {
    descricao: "Glaciar com cidade inteira selada dentro.",
    combate: "Mortos-vivos adormecidos.",
    paz: "Desenterrar com cuidado.",
    ganchos: "Família quer recuperar um ancestral.",
    variacoes: "A cidade muda de posição lentamente."
  },
  {
    descricao: "Poço profundo onde o vento ruge como fera.",
    combate: "Criatura subterrânea desperta.",
    paz: "Medir profundidade e estudar som.",
    ganchos: "Lenda diz que guarda um profeta.",
    variacoes: "O vento responde perguntas."
  },
  {
    descricao: "Vale onde o tempo passa devagar.",
    combate: "Feras gigantes lentas e resistentes.",
    paz: "Observar efeitos temporais.",
    ganchos: "Um herói viveu aqui por 200 anos sem envelhecer.",
    variacoes: "Tempo acelera ao pôr do sol."
  }
];

const piMagico = [
  {
    descricao: "Torre de Observação Arcana que permite ver e ouvir qualquer lugar do mundo.",
    combate: "Romper a barreira mágica e derrotar guardiões rúnicos.",
    paz: "Negociar acesso com o atual controlador da torre.",
    ganchos: "A torre está espionando alguém importante; ou foi tomada por uma facção secreta.",
    variacoes: "Alcance limitado, focado em planos espirituais ou apenas memórias do passado."
  },
  {
    descricao: "Portal de Transporte Antigo que conecta diretamente a outra ruína distante.",
    combate: "Tomar o portal de quem o controla, normalmente um grupo armado.",
    paz: "Buscar o ritual de autorização, senha arcana ou oferenda de ativação.",
    ganchos: "O portal do outro lado está quebrado, corrompido ou ocupado por algo hostil.",
    variacoes: "Destino muda com fases da lua; só funciona em horários específicos."
  },
  {
    descricao: "Portal Planar que leva a outro mundo, dimensão ou reino espiritual.",
    combate: "Fechar o portal ou confrontar criaturas que atravessaram.",
    paz: "Cravar runas de estabilização para uso seguro.",
    ganchos: "Algo do outro plano está tentando invadir este.",
    variacoes: "O outro plano pode ser hostil, paradisíaco ou completamente alienígena."
  },
  {
    descricao: "Plataforma de Desintegração — tudo que passa por ela é destruído.",
    combate: "Desativar o núcleo arcano que a alimenta.",
    paz: "Dominar o ritual de ativação que distingue o que será destruído.",
    ganchos: "Único modo de destruir um artefato maligno ou criatura imortal.",
    variacoes: "Ao invés de destruir, na verdade transporta para um plano-prisão."
  },
  {
    descricao: "Câmara Amplificadora de Magia, onde todo feitiço se torna mais poderoso.",
    combate: "Derrotar guardiões ou usuários que monopolizam o local.",
    paz: "Estabelecer um pacto de estudo e compartilhamento de poder.",
    ganchos: "Um mago está se tornando perigoso demais usando este lugar.",
    variacoes: "Amplia, distorce, corrompe ou inverte efeitos de magia."
  },
  {
    descricao: "Sifão de Energia que transfere poder vital, mágico ou espiritual entre alvos.",
    combate: "Destruir o cristal sifonador e seus condutores.",
    paz: "Estabelecer limites éticos ou litúrgicos em seu uso.",
    ganchos: "Único modo de curar uma praga, mas requer um grande sacrifício.",
    variacoes: "Pode transferir memórias, habilidades ou anos de vida."
  },
  {
    descricao: "Anel de Invocação Permanente usado para chamar criaturas de outro plano ou reino.",
    combate: "Cortar o ritual antes que a invocação se complete.",
    paz: "Controlar o círculo com símbolos, nomes verdadeiros ou contratos.",
    ganchos: "Uma criatura já invocada está solta e influenciando a região.",
    variacoes: "Chamadas amigáveis, hostis, irracionais ou famintas por memórias."
  },
  {
    descricao: "Santuário de Eco Temporal onde passado, presente e futuro podem ser vistos.",
    combate: "Espantar espectros temporais ou paradoxos vivos.",
    paz: "Aceitar visões sem tentar alterá-las.",
    ganchos: "O santuário revela uma morte inevitável ligada ao grupo.",
    variacoes: "Mostra apenas possibilidades, sonhos ou vidas alternativas."
  },
  {
    descricao: "Poço da Reescrita — permite alterar parte de um destino ou juramento.",
    combate: "Destruir ou selar o poço antes que uma tirania se rescreva.",
    paz: "Oferecer algo de valor profundo (memória, laço, nome).",
    ganchos: "Alguém já alterou sua história, mudando o curso da região.",
    variacoes: "Reescrita parcial, temporária ou cruelmente imprevisível."
  },
  {
    descricao: "Relógio de Congelamento onde o tempo pode parar completamente por instantes.",
    combate: "Quebrar o mecanismo que distorce o fluxo temporal.",
    paz: "Sincronizar o relógio com um evento celestial.",
    ganchos: "Um vilão quer congelar uma cidade inteira para conquista-la.",
    variacoes: "Congela apenas emoções, apenas clima ou apenas memórias."
  },
  {
    descricao: "Arboreto de Cristal, árvore viva feita de energia arcana.",
    combate: "Resistir às formas cristalinas defensivas e guardiãs.",
    paz: "Cultivar um ramo ou semente mágica com cuidado ritualístico.",
    ganchos: "A árvore está morrendo e afetando o clima ou os espíritos ao redor.",
    variacoes: "Dá frutos de magia, sonhos ou cura — mas sempre com custo."
  },
  {
    descricao: "Forja Estelar gravada em pedra caída do céu, usada para criar artefatos únicos.",
    combate: "Derrotar os ferreiros espectrais que a protegem.",
    paz: "Honrar o juramento ancestral dos criadores.",
    ganchos: "Uma arma capaz de matar um deus pode ser forjada aqui.",
    variacoes: "A forja ativa só durante meteoros ou auroras raras."
  }
];

const piMilitar = [
  {
    descricao: "Quartel de soldados veteranos treinando em formação.",
    combate: "Atacar o quartel é suicídio. Porém, derrotar um comandante em duelo ritual pode render respeito.",
    paz: "Oferecer serviço, negociar passagem ou apresentar carta oficial.",
    ganchos: "Um dos soldados é parente ou inimigo de alguém importante; equipamento roubado foi rastreado até aqui.",
    variacoes: "Quartel disciplinado, quartel corrupto, quartel em clima de guerra."
  },
  {
    descricao: "Armazém de equipamento militar com armas e suprimentos.",
    combate: "Poucos guardas; é possível atacar e fugir, mas quem sobreviver irá caçar o grupo.",
    paz: "Infiltrar-se como mensageiros ou guardas; subornar o responsável.",
    ganchos: "Há um item raro perdido entre suprimentos comuns.",
    variacoes: "Suprimentos velhos e enferrujados, arsenal recém-abastecido, estoque secreto trancado."
  },
  {
    descricao: "Fortificação militar em fronteira estratégica.",
    combate: "Ataque direto é impossível sem exército.",
    paz: "Posar como diplomatas, peregrinos, comerciantes ou batedores.",
    ganchos: "Um prisioneiro importante está mantido ali.",
    variacoes: "Muralhas deterioradas, guarnição arrogante, base esperando ataque iminente."
  },
  {
    descricao: "Posto de patrulha que vigia vales e estradas.",
    combate: "Emboscar um pequeno esquadrão pode ser possível.",
    paz: "Convencer, negociar ou trocar informações sobre perigos.",
    ganchos: "Os patrulheiros descobriram algo recente e perigoso.",
    variacoes: "Posto abandonado, posto nervoso após ataques, posto dividido por conflitos internos."
  },
  {
    descricao: "Torre de vigia com visão de quilômetros.",
    combate: "Poucos guardas; derrubar a torre revelaria a região ao caos.",
    paz: "Posar como mensageiros; solicitar abrigo; trocar notícias.",
    ganchos: "Mensagens falsas circulam; alguém está sabotando comunicações.",
    variacoes: "Sinais com bandeiras, espelhos mágicos, corvos treinados."
  },
  {
    descricao: "Acampamento militar temporário armado perto de uma estrada.",
    combate: "Tropas cansadas podem cair em emboscada, mas reforços chegam rápido.",
    paz: "Fornecer informações úteis, oferecer ajuda ou recursos.",
    ganchos: "O acampamento está se preparando para uma invasão iminente.",
    variacoes: "Tendas improvisadas, táticas disciplinares brutais, oficiais indecisos."
  },
  {
    descricao: "Campos de treinamento onde soldados praticam combate.",
    combate: "Possível derrotar campeões em arena por respeito.",
    paz: "Aprender táticas, recrutar aliados ou participar de treinos.",
    ganchos: "Um campeão militar desapareceu misteriosamente.",
    variacoes: "Treino brutal, treino ritualístico, treino cerimonial."
  },
  {
    descricao: "Estrutura de mensageiros militares (corvos, sinais, runas).",
    combate: "Interromper mensagens coloca toda a região em alerta.",
    paz: "Trocar informações, pedir uso da rede, entregar ordens falsas.",
    ganchos: "Mensagem vital está para ser enviada — ou interceptada.",
    variacoes: "Corvos especiais, sinais de fogo, cristais comunicadores."
  },
  {
    descricao: "Local de execução militar ou campo disciplinar.",
    combate: "Guardas leais protegem prisioneiros e carrascos.",
    paz: "Convencer a autoridade militar; infiltração; falsificação de ordens.",
    ganchos: "Um prisioneiro inocente, nobre ou aliado será executado em breve.",
    variacoes: "Execução pública, enforcamento silencioso, julgamento ritual."
  },
  {
    descricao: "Mercenários acampados aguardando contrato.",
    combate: "Podem ser fortes, mas motivados por ouro acima de tudo.",
    paz: "Negociar, contratar ou convencer com histórias, honra ou favores.",
    ganchos: "O líder mercenário possui informação crítica sobre uma guerra.",
    variacoes: "Mercenários de honra, mercenários traidores, mercenários amaldiçoados."
  },
  {
    descricao: "Caravanas militares transportando suprimentos.",
    combate: "Emboscada é possível, mas guardas retaliam agressivamente.",
    paz: "Escoltar, ajudar com problemas da estrada, negociar abrigo.",
    ganchos: "A carga contém armas sagradas ou contrabando ilegal.",
    variacoes: "Carruagens blindadas, transporte secreto, comboio ritual."
  },
  {
    descricao: "Campo de prisioneiros mantidos pelo exército.",
    combate: "Derrotar os guardas pode libertar prisioneiros revoltosos.",
    paz: "Negociar resgate, falsificar libertação, investigar injustiças.",
    ganchos: "Um dos prisioneiros é chave para outra trama.",
    variacoes: "Campo cruel, campo benevolente, campo à beira de motim."
  }
];

const temploProfanado = {
  "1-1": {
    lugar: "Nave principal com pilares quebrados",
    curiosidade: "Velas derretidas formam símbolos",
    obstaculo: "[Encontro] se reúne em oração profana"
  },
  "1-2": {
    lugar: "Corredor estreito coberto de poeira",
    curiosidade: "Cheiro de incenso queimado",
    obstaculo: "Piso instável ameaça desabar"
  },
  "1-3": {
    lugar: "Capela lateral destruída",
    curiosidade: "Estátua caída sem cabeça",
    obstaculo: "[Encontro] espreita entre escombros"
  },
  "1-4": {
    lugar: "Antiga sala de oferendas",
    curiosidade: "Tábua ritual manchada de sangue seco",
    obstaculo: "Esporos no ar causam tosse e fadiga"
  },
  "1-5": {
    lugar: "Escadaria inclinada para baixo",
    curiosidade: "Sons ecoam mas ninguém está lá",
    obstaculo: "[Encontro] surge de baixo, lentamente"
  },
  "1-6": {
    lugar: "Sacristia saqueada",
    curiosidade: "Ampolas quebradas, líquido preto",
    obstaculo: "Armadilha de lâmina oculta (d4 dano)"
  },

  "2-1": {
    lugar: "Claustro com colunas altas",
    curiosidade: "Restos de tecido sacerdotal",
    obstaculo: "Marca clara de que [Encontro] passou recentemente"
  },
  "2-2": {
    lugar: "Arco de pedra com runas apagadas",
    curiosidade: "Um símbolo brilhante pulsa fraco",
    obstaculo: "Toque desperta dor espiritual (perde 1 de Vantagem Espiritual se houver)"
  },
  "2-3": {
    lugar: "Sala circular com altar menor",
    curiosidade: "Ossos alinhados em padrões",
    obstaculo: "[Encontro] aguarda em silêncio"
  },
  "2-4": {
    lugar: "Quarto de estudos",
    curiosidade: "Livros queimados, exceto um intacto",
    obstaculo: "Poeira sufocante reduz movimento por 1 cena"
  },
  "2-5": {
    lugar: "Corredor com vitrais quebrados",
    curiosidade: "Fragmentos mostram olhos observando",
    obstaculo: "[Encontro] observa de trás da luz quebrada"
  },
  "2-6": {
    lugar: "Refeitório abandonado",
    curiosidade: "Marques de facas na pedra",
    obstaculo: "Mesas e cadeiras bloqueiam passagem (tempo para remover)"
  },

  "3-1": {
    lugar: "Sala com fonte seca",
    curiosidade: "Água negra ainda pinga das paredes",
    obstaculo: "A água reage quando [Encontro] se aproxima"
  },
  "3-2": {
    lugar: "Biblioteca arruinada",
    curiosidade: "Páginas soltas descrevem heresia",
    obstaculo: "Quem toca os textos sente enjoo (desvantagem na próxima rolagem)"
  },
  "3-3": {
    lugar: "Câmara de oração",
    curiosidade: "Jóias falsas espalhadas",
    obstaculo: "[Encontro] está ajoelhado, mas percebe você"
  },
  "3-4": {
    lugar: "Sala ritualística",
    curiosidade: "Círculos de sal e sangue",
    obstaculo: "Cruzar o círculo pode causar dor (1 dano espiritual)"
  },
  "3-5": {
    lugar: "Coro elevado",
    curiosidade: "Órgão quebrado ainda ecoa sozinho",
    obstaculo: "O som chama [Encontro] até aqui"
  },
  "3-6": {
    lugar: "Passadiço suspenso",
    curiosidade: "Correntes enferrujadas rangem",
    obstaculo: "A estrutura ameaça cair (teste para atravessar)"
  },

  "4-1": {
    lugar: "Cripta dos sacerdotes",
    curiosidade: "Túmulos abertos",
    obstaculo: "[Encontro] desperta aqui"
  },
  "4-2": {
    lugar: "Túnel apertado",
    curiosidade: "Rachaduras revelam luz avermelhada",
    obstaculo: "Claustrofobia (teste para não entrar em pânico leve)"
  },
  "4-3": {
    lugar: "Sala do sino",
    curiosidade: "Sino partido no chão",
    obstaculo: "Som metálico atrai [Encontro] na cena seguinte"
  },
  "4-4": {
    lugar: "Escadaria dupla",
    curiosidade: "Ventos frios subindo dela",
    obstaculo: "Degraus quebrados dificultam descer"
  },
  "4-5": {
    lugar: "Poço de oferendas",
    curiosidade: "Fumaça saindo de dentro",
    obstaculo: "Algo sobe do poço: [Encontro]"
  },
  "4-6": {
    lugar: "Câmara de ossos",
    curiosidade: "Ossos organizados artisticamente",
    obstaculo: "Piso de ossos range e alerta [Encontro]"
  },

  "5-1": {
    lugar: "Sala de penitência",
    curiosidade: "Correntes penduradas",
    obstaculo: "[Encontro] acorrentado desperta"
  },
  "5-2": {
    lugar: "Sala onde o teto colapsou",
    curiosidade: "Buraco deixa ver o céu",
    obstaculo: "Cascata de pedras pode cair (d4 dano se falhar)"
  },
  "5-3": {
    lugar: "Galeria de estátuas",
    curiosidade: "Algumas têm rostos iguais aos dos PCs",
    obstaculo: "Sensação de ser observado (tensão aumenta)"
  },
  "5-4": {
    lugar: "Velho dormitório",
    curiosidade: "Cama apodrecida com desenhos infantis",
    obstaculo: "[Encontro] retorna aqui regularmente"
  },
  "5-5": {
    lugar: "Armazém de vinhos",
    curiosidade: "Barrís vazios manchados",
    obstaculo: "Um deles explode, espalhando gás irritante (tosse, -1 ação inicial)"
  },
  "5-6": {
    lugar: "Sala de anotação sagrada",
    curiosidade: "Pergaminhos sobre sacrifícios",
    obstaculo: "[Encontro] está estudando quando o grupo entra"
  },

  "6-1": {
    lugar: "Anti-câmara do Santuário",
    curiosidade: "Portas colossais semi-abertas",
    obstaculo: "Você sente que o Chefe está próximo"
  },
  "6-2": {
    lugar: "Santuário Desfigurado (Sala Final)",
    curiosidade: "Grande altar corrompido",
    obstaculo: "Aqui fica o Mestre da Masmorra"
  },
  "6-3": {
    lugar: "Sala da relíquia",
    curiosidade: "Uma peça do templo original intacta",
    obstaculo: "A relíquia chama espiritualmente [Encontro]"
  },
  "6-4": {
    lugar: "Sala de purificação inundada",
    curiosidade: "Água escura até a cintura",
    obstaculo: "Movimento lento + frio intenso"
  },
  "6-5": {
    lugar: "Salão de coro destruído",
    curiosidade: "Ecos de canto sagrado distorcido",
    obstaculo: "O canto atrai [Encontro] imediatamente"
  },
  "6-6": {
    lugar: "Coração do Templo",
    curiosidade: "Estátua viva, pulsando carne",
    obstaculo: "Aqui o Chefe executa seu ritual"
  }
};

const cidadelaAbandonada = {
  "1-1": {
    lugar: "Pátio interno tomado por mato",
    curiosidade: "Estátuas de anões quebradas",
    obstaculo: "[Encontro] observa das sombras"
  },
  "1-2": {
    lugar: "Muralhas externas rachadas",
    curiosidade: "Símbolos antigos de linhagem",
    obstaculo: "Pedra solta pode cair (d4)"
  },
  "1-3": {
    lugar: "Torre lateral caída",
    curiosidade: "Uma bandeira quase intacta",
    obstaculo: "[Encontro] patrulha o local"
  },
  "1-4": {
    lugar: "Pórtico de entrada",
    curiosidade: "Portões reforçados, agora tortos",
    obstaculo: "Espinhos de ferro podem ferir"
  },
  "1-5": {
    lugar: "Corredor estreito de pedra",
    curiosidade: "Sinais de batalha nas paredes",
    obstaculo: "Rastros frescos de [Encontro]"
  },
  "1-6": {
    lugar: "Armazém vazio",
    curiosidade: "Caixas quebradas, farinha espalhada",
    obstaculo: "O chão escorrega (movimento reduzido)"
  },

  "2-1": {
    lugar: "Antigo refeitório",
    curiosidade: "Mesas reforçadas, algumas intactas",
    obstaculo: "[Encontro] devora algo aqui"
  },
  "2-2": {
    lugar: "Forja destruída",
    curiosidade: "Restos de carvão e martelos enferrujados",
    obstaculo: "Ferrugem tóxica (tosse, -1 ação inicial)"
  },
  "2-3": {
    lugar: "Grande salão de banquetes",
    curiosidade: "Tapeçarias desbotadas",
    obstaculo: "Som ecoa e chama [Encontro]"
  },
  "2-4": {
    lugar: "Escadaria monumental",
    curiosidade: "Degraus gastos e lisos",
    obstaculo: "Quem correr pode cair (d4)"
  },
  "2-5": {
    lugar: "Galeria de retratos",
    curiosidade: "Rostos riscados com ódio",
    obstaculo: "[Encontro] se esconde entre cortinas"
  },
  "2-6": {
    lugar: "Sala de vigia",
    curiosidade: "Tambores e chifres quebrados",
    obstaculo: "Avisar pode chamar reforço (se houver encontro)"
  },

  "3-1": {
    lugar: "Arsenal",
    curiosidade: "Suportes vazios e armas quebradas",
    obstaculo: "[Encontro] recolhe armas daqui"
  },
  "3-2": {
    lugar: "Sala de treino",
    curiosidade: "Manequins apodrecidos",
    obstaculo: "Poeira sufocante (teste ou -1 cena)"
  },
  "3-3": {
    lugar: "Fonte de água seca",
    curiosidade: "Musgo e raízes cobrem tudo",
    obstaculo: "[Encontro] se aproxima atraído por ruídos"
  },
  "3-4": {
    lugar: "Ponte interna sobre pátio",
    curiosidade: "Madeira velha, range alto",
    obstaculo: "A travessia pode revelar o grupo"
  },
  "3-5": {
    lugar: "Estábulos abandonados",
    curiosidade: "Ossos de cavalos pequenos",
    obstaculo: "[Encontro] fareja aqui"
  },
  "3-6": {
    lugar: "Túnel de manutenção",
    curiosidade: "Escuro, úmido e apertado",
    obstaculo: "Claustrofobia leve"
  },

  "4-1": {
    lugar: "Torre de vigia",
    curiosidade: "Escada em espiral quebrada",
    obstaculo: "[Encontro] está no topo"
  },
  "4-2": {
    lugar: "Barracas dos guardas",
    curiosidade: "Cotas e escudos danificados",
    obstaculo: "Barulho fácil de gerar alerta"
  },
  "4-3": {
    lugar: "Biblioteca da cidadela",
    curiosidade: "Livros moídos pelo tempo",
    obstaculo: "Pó sufoca (teste ou desvantagem próxima cena)"
  },
  "4-4": {
    lugar: "Sala de reuniões",
    curiosidade: "Mesa grande com mapas rasgados",
    obstaculo: "[Encontro] analisa os mapas"
  },
  "4-5": {
    lugar: "Oficina de engenho",
    curiosidade: "Ferramentas cirúrgicas e mecânicas",
    obstaculo: "Mecanismo preso pode disparar metal (d4)"
  },
  "4-6": {
    lugar: "Câmaras inferiores",
    curiosidade: "O ar é pesado e úmido",
    obstaculo: "[Encontro] habita a escuridão"
  },

  "5-1": {
    lugar: "Prisão da cidadela",
    curiosidade: "Grades torcidas",
    obstaculo: "Prisioneiro sobrevivente *ou* [Encontro], dependendo do clima"
  },
  "5-2": {
    lugar: "Cozinha abandonada",
    curiosidade: "Panelas grandes, fuligem espessa",
    obstaculo: "Gás velho pode inflamar (perigo ao usar fogo)"
  },
  "5-3": {
    lugar: "Sala dos brasões",
    curiosidade: "Brasões arrancados do muro",
    obstaculo: "A sala ecoa um chamado para [Encontro]"
  },
  "5-4": {
    lugar: "Poço interno",
    curiosidade: "Água escura e parada",
    obstaculo: "Quem beber sofre enjoo"
  },
  "5-5": {
    lugar: "Escadaria para a torre central",
    curiosidade: "Ventos fortes que uivam",
    obstaculo: "Ventos carregam vozes de [Encontro]"
  },
  "5-6": {
    lugar: "Quarto de hóspedes",
    curiosidade: "Beliches podres",
    obstaculo: "[Encontro] dorme ou finge dormir"
  },

  "6-1": {
    lugar: "Antesala do Salão do Trono",
    curiosidade: "Tapetes rasgados",
    obstaculo: "Indício claro do Chefe à frente"
  },
  "6-2": {
    lugar: "Salão do Trono (Sala Final)",
    curiosidade: "Trono quebrado + brasão manchado",
    obstaculo: "Aqui está o Mestre da Cidadela"
  },
  "6-3": {
    lugar: "Tesouraria selada",
    curiosidade: "Cofres abertos e vazios",
    obstaculo: "Algo abriu — e pode voltar: [Encontro]"
  },
  "6-4": {
    lugar: "Arco para a cripta real",
    curiosidade: "Símbolos desgastados",
    obstaculo: "Tocar nos símbolos causa calafrio espiritual"
  },
  "6-5": {
    lugar: "Grande sala de música",
    curiosidade: "Harpas sem cordas",
    obstaculo: "Som do vento atrai [Encontro]"
  },
  "6-6": {
    lugar: "Núcleo da cidadela",
    curiosidade: "Um mapa mural intacto",
    obstaculo: "A sala vibra com presença do Chefe secundário ou ritual iniciando"
  }
};

const antigoLaboratorio = {
  "1-1": {
    lugar: "Sala principal com mesas quebradas",
    curiosidade: "Frascos vazios espalhados pelo chão",
    obstaculo: "[Encontro] manipula algo instável"
  },
  "1-2": {
    lugar: "Corredor fumegante",
    curiosidade: "Vapor escapa de rachaduras no chão",
    obstaculo: "Respirar aqui irrita os pulmões (-1 na próxima rolagem)"
  },
  "1-3": {
    lugar: "Sala de alquimia",
    curiosidade: "Resíduos secos de líquidos coloridos",
    obstaculo: "[Encontro] espreita atrás de estantes"
  },
  "1-4": {
    lugar: "Depósito de reagentes",
    curiosidade: "Prateleiras caídas e vidro quebrado",
    obstaculo: "Estilhaços podem ferir os pés (d4)"
  },
  "1-5": {
    lugar: "Forno arcano apagado",
    curiosidade: "Runas calcinadas na parede",
    obstaculo: "[Encontro] tenta reacender o forno"
  },
  "1-6": {
    lugar: "Corredor estreito",
    curiosidade: "Muro manchado de substâncias ácidas",
    obstaculo: "Parede corroída ameaça desabar"
  },

  "2-1": {
    lugar: "Estufa interna abandonada",
    curiosidade: "Plantas ressecadas e retorcidas",
    obstaculo: "[Encontro] se esconde na vegetação morta"
  },
  "2-2": {
    lugar: "Sala de dissecação",
    curiosidade: "Mesa com ganchos e correntes",
    obstaculo: "O ar pesado causa náusea leve"
  },
  "2-3": {
    lugar: "Sala circular com círculo arcano",
    curiosidade: "Círculo apagado porém ativo",
    obstaculo: "[Encontro] desperta se o círculo for tocado"
  },
  "2-4": {
    lugar: "Armazém de ingredientes raros",
    curiosidade: "Etiquetas escritas em linguagem desconhecida",
    obstaculo: "Armário cai ao ser aberto (d4)"
  },
  "2-5": {
    lugar: "Túnel de acesso inferior",
    curiosidade: "Chão coberto de limo",
    obstaculo: "Movimento reduzido pela metade"
  },
  "2-6": {
    lugar: "Passarela suspensa",
    curiosidade: "Sinos de cristal pendem do teto",
    obstaculo: "O primeiro som chama [Encontro]"
  },

  "3-1": {
    lugar: "Observatório interno",
    curiosidade: "Janela quebrada revela o céu",
    obstaculo: "[Encontro] contempla algo lá fora"
  },
  "3-2": {
    lugar: "Sala de experimentos biológicos",
    curiosidade: "Jaulas retorcidas e abertas",
    obstaculo: "O cheiro atrai [Encontro]"
  },
  "3-3": {
    lugar: "Oficina de próteses",
    curiosidade: "Ganchos, engrenagens, correias de couro",
    obstaculo: "Acionar mecanismos causa dano (d4)"
  },
  "3-4": {
    lugar: "Poço de resíduo alquímico",
    curiosidade: "Superfície líquida brilha em todas as cores",
    obstaculo: "Tocar causa queimaduras químicas"
  },
  "3-5": {
    lugar: "Arquivo de pesquisas",
    curiosidade: "Livros parcialmente intactos",
    obstaculo: "[Encontro] protege esse conhecimento"
  },
  "3-6": {
    lugar: "Sala de artefatos",
    curiosidade: "Itens presos em cristais âmbar",
    obstaculo: "O toque liberta algo adormecido [Encontro]"
  },

  "4-1": {
    lugar: "Corredor serpenteado",
    curiosidade: "Parede coberta de grafites arcanos",
    obstaculo: "Grafites provocam vertigem (teste)"
  },
  "4-2": {
    lugar: "Sala de incubação",
    curiosidade: "Cápsulas vazias e abertas",
    obstaculo: "[Encontro] saiu daqui recentemente"
  },
  "4-3": {
    lugar: "Câmara de conversão arcana",
    curiosidade: "Mesa circular com marcas de garra",
    obstaculo: "Só entrar desperta [Encontro]"
  },
  "4-4": {
    lugar: "Laboratório de sombras",
    curiosidade: "Luzes oscilam sozinhas",
    obstaculo: "Som distante chama [Encontro] para a cena"
  },
  "4-5": {
    lugar: "Antessala selada",
    curiosidade: "Porta reforçada trancada",
    obstaculo: "Demora para abrir (atrai 1 rolagem extra de encontro)"
  },
  "4-6": {
    lugar: "Sala com espelhos alquímicos",
    curiosidade: "Reflexos se movem sozinhos",
    obstaculo: "O espelho tenta atrair a alma (perigo espiritual leve)"
  },

  "5-1": {
    lugar: "Armazém profundo",
    curiosidade: "Caixas lacradas com símbolos perigosos",
    obstaculo: "[Encontro] está trancado em uma delas"
  },
  "5-2": {
    lugar: "Coletor de essências",
    curiosidade: "Mangueiras estouradas e fluidos secos",
    obstaculo: "O cheiro entorpece (ação atrasada)"
  },
  "5-3": {
    lugar: "Laboratório de testes energéticos",
    curiosidade: "Marcas de explosão pelo chão",
    obstaculo: "O primeiro toque produz faísca (d4)"
  },
  "5-4": {
    lugar: "Galeria de protótipos",
    curiosidade: "Peças mecânicas incompletas",
    obstaculo: "[Encontro] tentava montar algo"
  },
  "5-5": {
    lugar: "Corredor inundado",
    curiosidade: "Água negra até os joelhos",
    obstaculo: "Movimento reduzido + frio drena vigor"
  },
  "5-6": {
    lugar: "Sala de estudo do mestre",
    curiosidade: "Anotações extensas e obsessivas",
    obstaculo: "A leitura revela rastro claro para o Chefe"
  },

  "6-1": {
    lugar: "Antessala final",
    curiosidade: "Todas as paredes tremem levemente",
    obstaculo: "Sensação forte de aproximação do Chefe"
  },
  "6-2": {
    lugar: "Sala Final: Laboratório Central",
    curiosidade: "Altar científico com instrumentos profanos",
    obstaculo: "Aqui está o Mestre da Masmorra"
  },
  "6-3": {
    lugar: "Câmara de energia",
    curiosidade: "Um cristal pulsa com luz vermelha",
    obstaculo: "A aproximação atrai [Encontro]"
  },
  "6-4": {
    lugar: "Repositório de fórmulas",
    curiosidade: "Frascos etiquetados com símbolos de perigo",
    obstaculo: "Acidente pode gerar veneno aéreo"
  },
  "6-5": {
    lugar: "Núcleo alquímico",
    curiosidade: "Rede de tubos vibrando",
    obstaculo: "Pode explodir se perturbado (perigo compartilhado)"
  },
  "6-6": {
    lugar: "Centro de Transmutação Maior",
    curiosidade: "Estátua de carne e pedra respirando",
    obstaculo: "O Chefe executa um ritual aqui"
  }
};

const calaboucoArruinado = {
  "1-1": {
    lugar: "Entrada despedaçada",
    curiosidade: "Portão caído e enferrujado",
    obstaculo: "[Encontro] ronda próximo ao portão"
  },
  "1-2": {
    lugar: "Corredor iluminado por frestas",
    curiosidade: "Poeira flutua nos fachos de luz",
    obstaculo: "Chão instável pode ceder (teste)"
  },
  "1-3": {
    lugar: "Sala de guarda abandonada",
    curiosidade: "Armaduras enferrujadas em pé",
    obstaculo: "[Encontro] animado pelas memórias da guerra"
  },
  "1-4": {
    lugar: "Escadaria desabada",
    curiosidade: "Degraus quebrados e escorregadios",
    obstaculo: "Descida lenta atrai [Encontro]"
  },
  "1-5": {
    lugar: "Corredor com flechas nas paredes",
    curiosidade: "Mecanismos antigos ainda ativos",
    obstaculo: "Aciona armadilha de flechas (d4)"
  },
  "1-6": {
    lugar: "Alçapão aberto no chão",
    curiosidade: "Desce a um nível desconhecido",
    obstaculo: "Queda causa ferimentos (d6)"
  },

  "2-1": {
    lugar: "Antessala de vigília",
    curiosidade: "Mobiliário comido pelo tempo",
    obstaculo: "[Encontro] recusa abandonar o posto"
  },
  "2-2": {
    lugar: "Sala de interrogatório",
    curiosidade: "Mesa manchada e correntes penduradas",
    obstaculo: "Ambiente opressivo (−1 próximos testes mentais)"
  },
  "2-3": {
    lugar: "Salão com brasões quebrados",
    curiosidade: "Brasões de antigos lordes espalhados",
    obstaculo: "[Encontro] defende a honra do nome"
  },
  "2-4": {
    lugar: "Corredor inundado",
    curiosidade: "Água parada e turva",
    obstaculo: "Movimento reduzido pela metade"
  },
  "2-5": {
    lugar: "Poço central",
    curiosidade: "Balde quebrado e corda puída",
    obstaculo: "Tocar a corda chama atenção de [Encontro]"
  },
  "2-6": {
    lugar: "Arsenal desmoronado",
    curiosidade: "Armas tortas e corroídas ao chão",
    obstaculo: "Revirar provoca corte leve (d4)"
  },

  "3-1": {
    lugar: "Saleta de refeições",
    curiosidade: "Mesas caídas e pratos rachados",
    obstaculo: "[Encontro] mastiga algo que não deveria"
  },
  "3-2": {
    lugar: "Salão de reunião",
    curiosidade: "Riscado com palavras de desespero",
    obstaculo: "Eco estranho chama [Encontro]"
  },
  "3-3": {
    lugar: "Cocheira interna",
    curiosidade: "Estábulos vazios e fétidos",
    obstaculo: "O cheiro nauseante atrasa ações"
  },
  "3-4": {
    lugar: "Corredor com correntes no teto",
    curiosidade: "Algumas ainda balançam sozinhas",
    obstaculo: "[Encontro] surge ao som das correntes"
  },
  "3-5": {
    lugar: "Antigo dormitório coletivo",
    curiosidade: "Camas de pedra, cobertores podres",
    obstaculo: "Revisar demais atrai 1 rolagem extra de encontro"
  },
  "3-6": {
    lugar: "Sala com altar lascado",
    curiosidade: "Inscrições apagadas com violência",
    obstaculo: "[Encontro] se enfurece ao ver alguém tocar o altar"
  },

  "4-1": {
    lugar: "Prisão rompida",
    curiosidade: "Grades quebradas e celas abertas",
    obstaculo: "Barulho dos passos ecoa longe (atrai encontro em 1d4 turnos)"
  },
  "4-2": {
    lugar: "Corredor de ecos constantes",
    curiosidade: "A voz ecoa diferente de quem fala",
    obstaculo: "Confusão leve (−1 percepção)"
  },
  "4-3": {
    lugar: "Sala de torturas",
    curiosidade: "Instrumentos destruídos porém ameaçadores",
    obstaculo: "[Encontro] permanece invisível até atacar"
  },
  "4-4": {
    lugar: "Poço de ossos",
    curiosidade: "Montes de ossos empilhados",
    obstaculo: "Pisar provoca avalanche de ossos (barulho alto)"
  },
  "4-5": {
    lugar: "Sala de sentinelas",
    curiosidade: "Escudos pendurados na parede",
    obstaculo: "[Encontro] tenta emboscar por trás"
  },
  "4-6": {
    lugar: "Corredor de gárgulas desgastadas",
    curiosidade: "Olhos vazios parecem seguir o grupo",
    obstaculo: "Uma desperta se provocada"
  },

  "5-1": {
    lugar: "Armazém de mantimentos",
    curiosidade: "Caixas vazias e barris ressecados",
    obstaculo: "[Encontro] se esconde dentro de um barril"
  },
  "5-2": {
    lugar: "Poço seco",
    curiosidade: "Túnel estreito descendo além da visão",
    obstaculo: "Descer sem cuidado causa queda"
  },
  "5-3": {
    lugar: "Câmara colapsada",
    curiosidade: "Pedras grandes bloqueiam passagem",
    obstaculo: "Remover pedras atrai 1 rolagem extra de encontro"
  },
  "5-4": {
    lugar: "Corredor com tapeçarias antigas",
    curiosidade: "As estampas parecem mudar com a luz",
    obstaculo: "Olhar fixo causa vertigem (teste)"
  },
  "5-5": {
    lugar: "Sala do eco profundo",
    curiosidade: "Som reverbera de maneira impossível",
    obstaculo: "[Encontro] responde ao eco"
  },
  "5-6": {
    lugar: "Antessala do Chefe",
    curiosidade: "Marcas de batalha nas paredes",
    obstaculo: "Ar preso e pesado pressagia o confronto"
  },

  "6-1": {
    lugar: "Corredor do trono caído",
    curiosidade: "Trono quebrado tombado no chão",
    obstaculo: "Sua presença evoca lembranças antigas"
  },
  "6-2": {
    lugar: "Sala Final: Tribunal Arruinado",
    curiosidade: "Estrado de pedra rachado",
    obstaculo: "O Chefe discursa antes de lutar"
  },
  "6-3": {
    lugar: "Câmara de velas derretidas",
    curiosidade: "Vale de cera endurecida",
    obstaculo: "[Encontro] surge silencioso entre as velas"
  },
  "6-4": {
    lugar: "Arquivos queimados",
    curiosidade: "Pilhas de pergaminhos destruídos",
    obstaculo: "Tentar recuperar algo chama atenção"
  },
  "6-5": {
    lugar: "Sala do Sino Silente",
    curiosidade: "Um sino enorme e rachado",
    obstaculo: "Bater no sino convoca [Encontro] imediatamente"
  },
  "6-6": {
    lugar: "Capela Profanada",
    curiosidade: "Imagem destruída do antigo guardião",
    obstaculo: "O Chefe cumpre seu ritual aqui"
  }
};

const cavernaComum = {
  "1-1": {
    lugar: "Entrada irregular",
    curiosidade: "Poeira fina e marcas de arrasto no chão",
    obstaculo: "[Encontro] observando à distância"
  },
  "1-2": {
    lugar: "Corredor estreito",
    curiosidade: "Gotas pingando em ritmo constante",
    obstaculo: "Passagem exige se espremer (perde tempo)"
  },
  "1-3": {
    lugar: "Câmara úmida",
    curiosidade: "Parede coberta de musgo",
    obstaculo: "Chão escorregadio (teste ou queda leve)"
  },
  "1-4": {
    lugar: "Galeria larga",
    curiosidade: "Minério brilhando na parede",
    obstaculo: "Remover minério atrai [Encontro]"
  },
  "1-5": {
    lugar: "Túnel bifurcado",
    curiosidade: "Marcações antigas indicando caminhos",
    obstaculo: "Decidir mal leva ao encontro imediato"
  },
  "1-6": {
    lugar: "Sumidouro seco",
    curiosidade: "Barulho de vento estranho",
    obstaculo: "Descida arriscada (queda 1d6)"
  },

  "2-1": {
    lugar: "Poço raso",
    curiosidade: "Água limpa refletindo o teto",
    obstaculo: "Ruído na água chama atenção de [Encontro]"
  },
  "2-2": {
    lugar: "Túnel de raízes",
    curiosidade: "Raízes pendem como cortinas",
    obstaculo: "Tocar raízes libera poeira irritante"
  },
  "2-3": {
    lugar: "Caverna com estalactites",
    curiosidade: "Pingares audíveis ecoam",
    obstaculo: "[Encontro] se move entre sombras do teto"
  },
  "2-4": {
    lugar: "Passagem colapsada",
    curiosidade: "Pedras recentes no chão",
    obstaculo: "Tentar escavar chama [Encontro]"
  },
  "2-5": {
    lugar: "Câmara de fungos",
    curiosidade: "Fungos bioluminescentes",
    obstaculo: "Inalar esporos causa tontura (−1 percepção)"
  },
  "2-6": {
    lugar: "Poço profundo",
    curiosidade: "Rio subterrâneo flui abaixo",
    obstaculo: "Sopro de ar anuncia algo grande próximo"
  },

  "3-1": {
    lugar: "Caminho sinuoso",
    curiosidade: "Teto baixo",
    obstaculo: "Grupo deve se abaixar (reduz movimento)"
  },
  "3-2": {
    lugar: "Paredes marcadas",
    curiosidade: "Marcas de picareta antigas",
    obstaculo: "Área instável (barulho chama [Encontro])"
  },
  "3-3": {
    lugar: "Acampamento antigo",
    curiosidade: "Restos de fogueira e trapos",
    obstaculo: "[Encontro] retorna se mexer nos objetos"
  },
  "3-4": {
    lugar: "Câmara com pedra lisa",
    curiosidade: "Parede polida por mãos antigas",
    obstaculo: "Sussurros ecoam sem fonte clara"
  },
  "3-5": {
    lugar: "Passagem de água",
    curiosidade: "Goteira formando correnteza",
    obstaculo: "Movimento reduzido pela metade"
  },
  "3-6": {
    lugar: "Caverna com eco estranho",
    curiosidade: "Som retorna distorcido",
    obstaculo: "Eco atrai [Encontro]"
  },

  "4-1": {
    lugar: "Poço de lama",
    curiosidade: "Cheiro terroso forte",
    obstaculo: "Lama prende pés (mov −1)"
  },
  "4-2": {
    lugar: "Teto repleto de morcegos",
    curiosidade: "Sons agudos",
    obstaculo: "Se perturbados → [Encontro]"
  },
  "4-3": {
    lugar: "Estreito vertical",
    curiosidade: "Deve escalar com cuidado",
    obstaculo: "Cair causa dano 1d6 e barulho (atrai encontro)"
  },
  "4-4": {
    lugar: "Sala com stalagmites",
    curiosidade: "Parecem figuras humanas",
    obstaculo: "Fendas ocultam [Encontro] à espreita"
  },
  "4-5": {
    lugar: "Rio subterrâneo",
    curiosidade: "Luz refletida nas águas",
    obstaculo: "Travessia exige corda ou nado"
  },
  "4-6": {
    lugar: "Câmara com ossos dispersos",
    curiosidade: "Ossos de vários tamanhos",
    obstaculo: "[Encontro] caça na área"
  },

  "5-1": {
    lugar: "Câmara de fungos negros",
    curiosidade: "Fungo treme à presença do grupo",
    obstaculo: "Tocar libera nuvem tóxica leve"
  },
  "5-2": {
    lugar: "Túnel com vento",
    curiosidade: "Sopro constante",
    obstaculo: "Som do vento camufla passos de [Encontro]"
  },
  "5-3": {
    lugar: "Cova escavada à mão",
    curiosidade: "Túneis cavados por mãos nuas",
    obstaculo: "Algo ainda cavando (encontro iminente)"
  },
  "5-4": {
    lugar: "Caverna com represas de pedra",
    curiosidade: "Pequenos diques improvisados",
    obstaculo: "Remover pedra altera fluxo e atrai encontro"
  },
  "5-5": {
    lugar: "Pedra suspensa como ponte",
    curiosidade: "Ponte natural fina e instável",
    obstaculo: "Escorregar pode atrair [Encontro]"
  },
  "5-6": {
    lugar: "Túnel de rocha brilhante",
    curiosidade: "Parede iridescente",
    obstaculo: "Toque deixa marca luminosa (grupo visível à distância)"
  },

  "6-1": {
    lugar: "Corredor largo em declive",
    curiosidade: "Eco de água mais abaixo",
    obstaculo: "Ar mais frio e úmido"
  },
  "6-2": {
    lugar: "Câmara central",
    curiosidade: "Luz de fendas acima",
    obstaculo: "Sinais claros de território de [Encontro Chefe]"
  },
  "6-3": {
    lugar: "Caverna com lago profundo",
    curiosidade: "Água escura sem fundo",
    obstaculo: "Tocar água atrai [Encontro] grande"
  },
  "6-4": {
    lugar: "Câmara com marcas antigas",
    curiosidade: "Desenhos sugerindo caça submersa",
    obstaculo: "Observar demais causa medo leve"
  },
  "6-5": {
    lugar: "Altar natural de pedra",
    curiosidade: "Parede com riscos tribais",
    obstaculo: "[Encontro] protetor deste lugar"
  },
  "6-6": {
    lugar: "Antro Final — Ninho ou Toca do Guardião",
    curiosidade: "Cheiro pesado e trilhas marcadas",
    obstaculo: "Aqui está o Chefe da Caverna"
  }
};

const criptaAssombrada = {
  "1-1": {
    lugar: "Entrada de pedra partida",
    curiosidade: "Velas apagadas ainda cheiram a cera",
    obstaculo: "[Encontro] observa no escuro"
  },
  "1-2": {
    lugar: "Corredor estreito",
    curiosidade: "Marcas de unhas nas paredes",
    obstaculo: "Toque das paredes causa frio intenso"
  },
  "1-3": {
    lugar: "Antessala de luto",
    curiosidade: "Velas tombadas em círculos",
    obstaculo: "[Encontro] manifesta sussurrando nomes"
  },
  "1-4": {
    lugar: "Escadaria para baixo",
    curiosidade: "Eco de passos que não são do grupo",
    obstaculo: "Descida longa causa exaustão leve"
  },
  "1-5": {
    lugar: "Túmulos familiares",
    curiosidade: "Placas com nomes raspados",
    obstaculo: "[Encontro] ergue-se de um dos túmulos"
  },
  "1-6": {
    lugar: "Capela desmoronada",
    curiosidade: "Ícone quebrado no altar",
    obstaculo: "Joelhos pesam (−1 movimento) ao atravessar"
  },

  "2-1": {
    lugar: "Sala da lamparina",
    curiosidade: "Chama que não produz calor",
    obstaculo: "[Encontro] sente a luz e se aproxima"
  },
  "2-2": {
    lugar: "Corredor de sombras paralelas",
    curiosidade: "Sombra do grupo se move diferente",
    obstaculo: "Confusão mental leve (−1 percepção)"
  },
  "2-3": {
    lugar: "Túmulo aberto",
    curiosidade: "Terra fresca apesar dos anos",
    obstaculo: "[Encontro] recém-despertado"
  },
  "2-4": {
    lugar: "Câmara lacrada",
    curiosidade: "Selo místico rachado",
    obstaculo: "Tentar abrir chama atenção de [Encontro]"
  },
  "2-5": {
    lugar: "Nicho de ossos empilhados",
    curiosidade: "Alguns ossos rolam sozinhos",
    obstaculo: "Nuvem de poeira sufocante"
  },
  "2-6": {
    lugar: "Escadaria circular",
    curiosidade: "Inscrições em idioma esquecido",
    obstaculo: "Cair aqui causa dano (d6) e barulho (atrai encontro)"
  },

  "3-1": {
    lugar: "Salão do lamento",
    curiosidade: "Sons de choro ecoam sem origem",
    obstaculo: "[Encontro] aparece se o grupo fizer ruído"
  },
  "3-2": {
    lugar: "Corredor com símbolos de proteção",
    curiosidade: "Riscados às pressas",
    obstaculo: "Proteção instável (falha pode libertar algo)"
  },
  "3-3": {
    lugar: "Câmara de sarcófagos",
    curiosidade: "Sarcófagos abertos e vazios",
    obstaculo: "[Encontro] se move entre as tampas"
  },
  "3-4": {
    lugar: "Cripta com altar de pedra",
    curiosidade: "Altar coberto de mãos impressas",
    obstaculo: "Tocar o altar drena energia (−1 PV)"
  },
  "3-5": {
    lugar: "Sala da lamparina eterna",
    curiosidade: "Fogo pálido que não apaga",
    obstaculo: "Se apagado convoca [Encontro]"
  },
  "3-6": {
    lugar: "Corredor inundado",
    curiosidade: "Água gelada até os joelhos",
    obstaculo: "Movimento reduzido pela metade"
  },

  "4-1": {
    lugar: "Sepulcro anônimo",
    curiosidade: "Poeira acumulada em camadas grossas",
    obstaculo: "[Encontro] surge em silêncio total"
  },
  "4-2": {
    lugar: "Corredor com vozes distantes",
    curiosidade: "Sussurros repetem a última frase dita",
    obstaculo: "Desconcentração (testes sociais -1)"
  },
  "4-3": {
    lugar: "Túmulo de estadista",
    curiosidade: "Insígnia real destruída",
    obstaculo: "[Encontro] guarda a memória do rei"
  },
  "4-4": {
    lugar: "Câmara com mosaicos quebrados",
    curiosidade: "Imagens parecem se mover",
    obstaculo: "Observar por muito tempo paralisa brevemente"
  },
  "4-5": {
    lugar: "Nicho de ouro corroído",
    curiosidade: "Peças de oferendas antigas",
    obstaculo: "Tocar provoca sino espectral (atrai encontro)"
  },
  "4-6": {
    lugar: "Túnel estreito e sufocante",
    curiosidade: "Parede úmida e fria",
    obstaculo: "Passagem exige se espremer (perde turno)"
  },

  "5-1": {
    lugar: "Sala com ataúdes lacrados",
    curiosidade: "Runas de vedação completas",
    obstaculo: "Quebrar runa libera [Encontro] poderoso"
  },
  "5-2": {
    lugar: "Poço de velas apagadas",
    curiosidade: "Cheiro de incenso antigo",
    obstaculo: "Acendê-las atrai espíritos (encontro em 1d4 turnos)"
  },
  "5-3": {
    lugar: "Câmara de velório",
    curiosidade: "Restos de flores pétreas",
    obstaculo: "[Encontro] acompanha o grupo em silêncio até agir"
  },
  "5-4": {
    lugar: "Cripta com coluna rompida",
    curiosidade: "Pedras quase desabando",
    obstaculo: "Movimentar errado causa desabamento parcial (d6)"
  },
  "5-5": {
    lugar: "Sala do retrato ancestral",
    curiosidade: "Quadro imenso com olhos fundos",
    obstaculo: "[Encontro] desperta se observado por 1 turno"
  },
  "5-6": {
    lugar: "Escadaria final",
    curiosidade: "A luz some completamente",
    obstaculo: "Descida marca o fim (próximo é chefe)"
  },

  "6-1": {
    lugar: "Antecâmara do Guardião",
    curiosidade: "Ar frio e estático",
    obstaculo: "Sons não ecoam aqui"
  },
  "6-2": {
    lugar: "Sala Final: Tumba do Guardião",
    curiosidade: "Túmulo central adornado",
    obstaculo: "O Chefe se ergue lentamente para enfrentar o grupo"
  },
  "6-3": {
    lugar: "Sala dos sinos silenciosos",
    curiosidade: "Sinos pendurados sem cordas",
    obstaculo: "[Encontro] aparece se qualquer objeto tocar metal"
  },
  "6-4": {
    lugar: "Arquivos funerários",
    curiosidade: "Placas e registros corroídos",
    obstaculo: "Ler registros revela aviso perturbador (−1 moral)"
  },
  "6-5": {
    lugar: "Câmara da chama negra",
    curiosidade: "Fogo frio tremula",
    obstaculo: "Se soprar a chama → invocar chefe menor"
  },
  "6-6": {
    lugar: "Capela da Redenção Sombria",
    curiosidade: "Vitral quebrado com cena invertida",
    obstaculo: "O Chefe realiza seu ritual aqui"
  }
};




