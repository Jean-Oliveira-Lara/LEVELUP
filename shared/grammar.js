// Gramática do intensivo: um tema por semana (semanas 1 a 15) + revisão geral na semana 16.
// Cada exercício: { q, options, answer (índice da opção certa), explain }

export const GRAMMAR_TOPICS = [
  {
    id: 'present-simple-continuous',
    week: 1,
    title: 'Present Simple × Present Continuous',
    summary: 'Rotina e verdades (simple) contra o que está acontecendo agora ou nesta fase (continuous).',
    sections: [
      {
        heading: 'Present Simple: rotina, hábitos e fatos',
        text: 'Use para o que acontece sempre, com frequência ou é verdade geral. Na 3ª pessoa (he/she/it) o verbo ganha -s. Negativa e pergunta usam do/does.',
        examples: [
          { en: 'I work from 8 to 5.', pt: 'Eu trabalho das 8 às 5.' },
          { en: 'She studies at night.', pt: 'Ela estuda à noite.' },
          { en: "He doesn't drink coffee.", pt: 'Ele não bebe café.' },
          { en: 'Do you play video games?', pt: 'Você joga videogame?' },
        ],
      },
      {
        heading: 'Present Continuous: agora e fase temporária',
        text: 'am/is/are + verbo com -ing. Use para o que está acontecendo neste momento ou numa fase passageira da vida.',
        examples: [
          { en: "I'm studying English right now.", pt: 'Estou estudando inglês agora.' },
          { en: "She's working on a new project this month.", pt: 'Ela está trabalhando num projeto novo este mês.' },
          { en: 'Are you listening?', pt: 'Você está ouvindo?' },
        ],
      },
      {
        heading: 'Palavras que dão a dica',
        text: 'Simple: always, usually, often, sometimes, never, every day. Continuous: now, right now, at the moment, today, this week.',
        examples: [],
      },
    ],
    tips: [
      'Verbos de estado (like, love, want, know, need, believe) quase nunca vão para -ing: "I want", não "I am wanting".',
      'Erro clássico de brasileiro: esquecer o -s. "He work" está errado; o certo é "He works".',
    ],
    exercises: [
      { q: 'My brother ___ in a bank.', options: ['work', 'works', 'is work', 'working'], answer: 1, explain: 'Fato/rotina na 3ª pessoa: works.' },
      { q: 'Be quiet! The baby ___.', options: ['sleeps', 'sleep', 'is sleeping', 'are sleeping'], answer: 2, explain: 'Está acontecendo agora: is sleeping.' },
      { q: '___ you speak Spanish?', options: ['Are', 'Does', 'Do', 'Is'], answer: 2, explain: 'Pergunta no present simple com "you": Do.' },
      { q: 'She ___ like horror movies.', options: ["don't", "doesn't", "isn't", "aren't"], answer: 1, explain: 'Negativa na 3ª pessoa do simple: doesn\'t + verbo base.' },
      { q: "I ___ a lot this week because of the project.", options: ['work', 'am working', 'works', 'worked'], answer: 1, explain: 'Fase temporária ("this week"): am working.' },
      { q: 'I ___ what you mean.', options: ['am understanding', 'understand', 'understanding', 'understands'], answer: 1, explain: 'Understand é verbo de estado: fica no simple.' },
      { q: 'Water ___ at 100 degrees Celsius.', options: ['boils', 'is boiling', 'boil', 'boiling'], answer: 0, explain: 'Verdade geral: present simple.' },
      { q: 'What ___ you doing now?', options: ['do', 'does', 'are', 'is'], answer: 2, explain: 'Agora + doing: are you doing.' },
    ],
  },
  {
    id: 'past-simple',
    week: 2,
    title: 'Past Simple',
    summary: 'Ações que começaram e terminaram no passado: ontem, semana passada, em 2020.',
    sections: [
      {
        heading: 'Afirmativa',
        text: 'Verbos regulares ganham -ed (worked, played, studied). Os irregulares têm forma própria e precisam ser decorados (go → went, see → saw, have → had).',
        examples: [
          { en: 'I watched a movie last night.', pt: 'Eu assisti um filme ontem à noite.' },
          { en: 'We went to the beach in January.', pt: 'Nós fomos à praia em janeiro.' },
        ],
      },
      {
        heading: 'Negativa e pergunta com did',
        text: 'Use did/didn\'t + verbo na forma BASE. O passado já está no "did", então o verbo principal não muda.',
        examples: [
          { en: "I didn't go to work yesterday.", pt: 'Eu não fui trabalhar ontem.' },
          { en: 'Did you see the game?', pt: 'Você viu o jogo?' },
        ],
      },
      {
        heading: 'Irregulares que mais aparecem',
        text: 'be → was/were · go → went · have → had · do → did · get → got · make → made · say → said · see → saw · come → came · take → took · know → knew · think → thought · buy → bought · find → found · tell → told.',
        examples: [],
      },
    ],
    tips: [
      'Nunca "did went" nem "didn\'t saw": depois de did o verbo volta para a forma base.',
      'Was para I/he/she/it; were para you/we/they.',
    ],
    exercises: [
      { q: 'Yesterday I ___ to the gym.', options: ['go', 'goed', 'went', 'gone'], answer: 2, explain: 'Go é irregular: went.' },
      { q: '___ you call her last night?', options: ['Do', 'Did', 'Were', 'Was'], answer: 1, explain: 'Pergunta no passado: Did + verbo base.' },
      { q: "She didn't ___ the message.", options: ['saw', 'see', 'seen', 'sees'], answer: 1, explain: 'Depois de didn\'t: forma base (see).' },
      { q: 'We ___ very tired after the trip.', options: ['was', 'were', 'did', 'are'], answer: 1, explain: 'We → were.' },
      { q: 'I ___ a new laptop last month.', options: ['buyed', 'bought', 'buy', 'brought'], answer: 1, explain: 'Buy → bought (brought é passado de bring).' },
      { q: 'He ___ English for two years in school.', options: ['studyed', 'studied', 'studies', 'study'], answer: 1, explain: 'Consoante + y → ied: studied.' },
      { q: 'Where ___ you yesterday?', options: ['did', 'was', 'were', 'are'], answer: 2, explain: 'Verbo to be no passado com you: were.' },
      { q: 'They ___ us the truth.', options: ["didn't told", "didn't tell", "don't told", "not told"], answer: 1, explain: "didn't + forma base: didn't tell." },
    ],
  },
  {
    id: 'future',
    week: 3,
    title: 'Futuro: will, going to e present continuous',
    summary: 'Três jeitos de falar do futuro, cada um com uma intenção diferente.',
    sections: [
      {
        heading: 'Will: decisão na hora, promessa, previsão de opinião',
        text: 'will + verbo base. Use para decidir algo no momento em que fala, prometer, oferecer ajuda ou dar opinião sobre o futuro.',
        examples: [
          { en: "I'm hungry. I'll order a pizza.", pt: 'Estou com fome. Vou pedir uma pizza. (decidi agora)' },
          { en: "I'll help you with that.", pt: 'Eu te ajudo com isso.' },
          { en: 'I think it will rain.', pt: 'Acho que vai chover.' },
        ],
      },
      {
        heading: 'Going to: plano já decidido ou evidência',
        text: 'am/is/are + going to + verbo base. Use para intenções que você já tinha antes de falar, ou quando há uma evidência clara.',
        examples: [
          { en: "I'm going to study four hours a day.", pt: 'Vou estudar quatro horas por dia. (já decidi)' },
          { en: "Look at those clouds! It's going to rain.", pt: 'Olha essas nuvens! Vai chover.' },
        ],
      },
      {
        heading: 'Present continuous: compromisso marcado',
        text: 'Para algo já agendado, com hora/data combinada, o mais natural é o present continuous.',
        examples: [{ en: "I'm meeting a client tomorrow at 10.", pt: 'Vou encontrar um cliente amanhã às 10.' }],
      },
    ],
    tips: [
      'Na fala, "going to" vira "gonna": "I\'m gonna call you".',
      'Will não se usa com plano antigo: se você já tinha decidido, prefira going to.',
    ],
    exercises: [
      { q: 'The phone is ringing. — OK, I ___ it.', options: ['am going to answer', "'ll answer", 'answer', 'answered'], answer: 1, explain: 'Decisão na hora: will.' },
      { q: "We ___ visit my parents next weekend. We decided last month.", options: ['will', 'are going to', 'go', 'went'], answer: 1, explain: 'Plano decidido antes: going to.' },
      { q: "Watch out! You ___ fall!", options: ["'ll", "'re going to", 'fall', 'are falling'], answer: 1, explain: 'Evidência clara agora: going to.' },
      { q: "I ___ my dentist at 3 pm tomorrow.", options: ['see', "'m seeing", 'saw', 'will to see'], answer: 1, explain: 'Compromisso marcado: present continuous.' },
      { q: "Don't worry, I ___ tell anyone.", options: ["won't", "don't", "am not", "not"], answer: 0, explain: 'Promessa: won\'t (will not).' },
      { q: 'I think Brazil ___ the next World Cup.', options: ['is winning', 'wins', 'will win', 'won'], answer: 2, explain: 'Previsão de opinião (I think): will.' },
      { q: 'What ___ you going to do after class?', options: ['do', 'will', 'are', 'is'], answer: 2, explain: 'are you going to.' },
      { q: 'She ___ going to buy a car this year.', options: ['are', 'is', 'will', 'does'], answer: 1, explain: 'She → is going to.' },
    ],
  },
  {
    id: 'present-perfect',
    week: 4,
    title: 'Present Perfect',
    summary: 'Experiências de vida e ações do passado ligadas ao presente, sem dizer quando.',
    sections: [
      {
        heading: 'Forma',
        text: 'have/has + particípio (worked, been, seen, done, eaten). He/she/it usam has.',
        examples: [
          { en: "I've been to Rio twice.", pt: 'Eu já fui ao Rio duas vezes.' },
          { en: "She hasn't finished the project yet.", pt: 'Ela ainda não terminou o projeto.' },
          { en: 'Have you ever eaten sushi?', pt: 'Você já comeu sushi?' },
        ],
      },
      {
        heading: 'Quando usar',
        text: 'Experiência sem tempo definido (ever/never), algo que acabou de acontecer (just), que já aconteceu (already) ou ainda não (yet), e resultado presente.',
        examples: [
          { en: "I've just arrived.", pt: 'Acabei de chegar.' },
          { en: "I've lost my keys.", pt: 'Perdi minhas chaves. (e ainda estão perdidas)' },
        ],
      },
      {
        heading: 'Present perfect × past simple',
        text: 'Se você diz QUANDO (yesterday, in 2022, last week), use past simple. Sem tempo definido, present perfect.',
        examples: [
          { en: 'I saw that movie last week.', pt: 'Vi esse filme semana passada. (tempo dito)' },
          { en: "I've seen that movie.", pt: 'Já vi esse filme. (sem tempo)' },
        ],
      },
    ],
    tips: [
      '"Já" em pergunta costuma ser "ever": "Have you ever...?" = "Você já...?".',
      'Nunca present perfect com yesterday/last/ago: "I have seen him yesterday" está errado.',
    ],
    exercises: [
      { q: '___ you ever been to another country?', options: ['Did', 'Have', 'Has', 'Were'], answer: 1, explain: 'Experiência de vida: Have you ever been.' },
      { q: 'She ___ her homework yet.', options: ["didn't finish", "hasn't finished", "haven't finished", "not finished"], answer: 1, explain: 'Yet + she: hasn\'t finished.' },
      { q: 'I ___ him yesterday at the mall.', options: ['have seen', 'saw', 'has seen', 'seen'], answer: 1, explain: 'Yesterday = tempo definido: past simple.' },
      { q: "We've ___ had lunch. We aren't hungry.", options: ['yet', 'ever', 'already', 'ago'], answer: 2, explain: 'Already = já (afirmativa).' },
      { q: 'He has ___ to Japan three times.', options: ['went', 'go', 'been', 'gone'], answer: 2, explain: 'Experiência de ida e volta: has been.' },
      { q: "I've never ___ a horse.", options: ['ride', 'rode', 'ridden', 'riding'], answer: 2, explain: 'Particípio de ride: ridden.' },
      { q: "They ___ just left. You missed them!", options: ['has', 'have', 'did', 'are'], answer: 1, explain: 'They → have just left.' },
      { q: 'I lost my phone two days ___.', options: ['ago', 'yet', 'already', 'since'], answer: 0, explain: 'Ago marca tempo definido no passado (past simple).' },
    ],
  },
  {
    id: 'past-continuous-used-to',
    week: 5,
    title: 'Past Continuous e used to',
    summary: 'Contar histórias: o que estava acontecendo e o que você costumava fazer.',
    sections: [
      {
        heading: 'Past continuous: estava fazendo',
        text: 'was/were + verbo -ing. Use para uma ação em andamento no passado, muitas vezes interrompida por outra (past simple).',
        examples: [
          { en: 'I was driving when you called.', pt: 'Eu estava dirigindo quando você ligou.' },
          { en: 'What were you doing at 10 pm?', pt: 'O que você estava fazendo às 22h?' },
        ],
      },
      {
        heading: 'Used to: costumava',
        text: 'used to + verbo base para hábitos ou estados do passado que não acontecem mais. Negativa/pergunta: didn\'t use to / did you use to.',
        examples: [
          { en: 'I used to play soccer every weekend.', pt: 'Eu costumava jogar futebol todo fim de semana.' },
          { en: "She didn't use to like coffee.", pt: 'Ela não gostava de café (antes).' },
        ],
      },
    ],
    tips: [
      'While + past continuous, when + past simple: "While I was cooking, the power went out."',
      'Para hábito atual, NÃO use "use to". Use o present simple com usually: "I usually wake up at 6".',
    ],
    exercises: [
      { q: 'I ___ TV when the lights went out.', options: ['watched', 'was watching', 'were watching', 'watch'], answer: 1, explain: 'Ação em andamento interrompida: was watching.' },
      { q: 'They ___ playing cards at midnight.', options: ['was', 'were', 'did', 'are'], answer: 1, explain: 'They → were.' },
      { q: 'I ___ live in São Paulo, but now I live in Curitiba.', options: ['use to', 'used to', 'was used to', 'using to'], answer: 1, explain: 'Estado passado que mudou: used to.' },
      { q: 'Did you ___ play video games as a kid?', options: ['used to', 'use to', 'using', 'uses to'], answer: 1, explain: 'Na pergunta com did: use to (sem -d).' },
      { q: 'While she ___, someone knocked on the door.', options: ['showered', 'was showering', 'is showering', 'shower'], answer: 1, explain: 'While + ação em andamento: was showering.' },
      { q: 'What ___ you doing when I texted you?', options: ['did', 'was', 'were', 'are'], answer: 2, explain: 'You → were you doing.' },
      { q: "He ___ smoke, but he quit last year.", options: ['used to', 'uses to', 'was used', 'use'], answer: 0, explain: 'Hábito passado que acabou: used to.' },
      { q: 'I ___ my keys while I was running.', options: ['was losing', 'lost', 'lose', 'have lost'], answer: 1, explain: 'Ação curta que acontece no meio da outra: past simple.' },
    ],
  },
  {
    id: 'comparatives-superlatives',
    week: 6,
    title: 'Comparativos e superlativos',
    summary: 'Comparar coisas: maior que, o melhor, tão bom quanto.',
    sections: [
      {
        heading: 'Adjetivos curtos (1 sílaba, ou 2 terminando em -y)',
        text: 'Comparativo: -er + than. Superlativo: the + -est. Terminados em -y trocam por -ier/-iest.',
        examples: [
          { en: 'My car is faster than yours.', pt: 'Meu carro é mais rápido que o seu.' },
          { en: 'This is the cheapest option.', pt: 'Esta é a opção mais barata.' },
          { en: 'Today is busier than yesterday.', pt: 'Hoje está mais corrido que ontem.' },
        ],
      },
      {
        heading: 'Adjetivos longos',
        text: 'more/the most + adjetivo.',
        examples: [
          { en: 'English is more useful than I thought.', pt: 'Inglês é mais útil do que eu pensava.' },
          { en: "It's the most expensive restaurant in town.", pt: 'É o restaurante mais caro da cidade.' },
        ],
      },
      {
        heading: 'Irregulares e igualdade',
        text: 'good → better → the best · bad → worse → the worst · far → farther → the farthest. Igualdade: as + adjetivo + as.',
        examples: [{ en: "He's as tall as his father.", pt: 'Ele é tão alto quanto o pai.' }],
      },
    ],
    tips: ['Nunca "more better" nem "more faster": é só "better", "faster".', 'Than = do que. Then = então.'],
    exercises: [
      { q: 'A Ferrari is ___ than a Fiat Uno.', options: ['more fast', 'faster', 'fastest', 'more faster'], answer: 1, explain: 'Adjetivo curto: faster.' },
      { q: 'This is ___ day of my life!', options: ['the better', 'the best', 'the goodest', 'best'], answer: 1, explain: 'Superlativo de good: the best.' },
      { q: 'Learning English is ___ than I expected.', options: ['easyer', 'more easy', 'easier', 'easiest'], answer: 2, explain: '-y vira -ier: easier.' },
      { q: "It's the ___ expensive phone in the store.", options: ['more', 'most', 'much', 'very'], answer: 1, explain: 'Superlativo de adjetivo longo: the most.' },
      { q: 'My English is ___ than last year. Much better!', options: ['worse', 'gooder', 'better', 'best'], answer: 2, explain: 'Comparativo de good: better.' },
      { q: "She's as smart ___ her sister.", options: ['than', 'as', 'like', 'that'], answer: 1, explain: 'Igualdade: as ... as.' },
      { q: 'Traffic today is ___ than yesterday. Terrible!', options: ['bad', 'badder', 'worse', 'worst'], answer: 2, explain: 'Comparativo de bad: worse.' },
      { q: 'Curitiba is ___ than Salvador in winter.', options: ['colder', 'more cold', 'coldest', 'cold'], answer: 0, explain: 'Adjetivo curto: colder.' },
    ],
  },
  {
    id: 'modals',
    week: 7,
    title: 'Modais: can, could, should, must, have to',
    summary: 'Habilidade, pedidos, conselhos e obrigações.',
    sections: [
      {
        heading: 'Can / could',
        text: 'Can: habilidade ou permissão no presente. Could: habilidade no passado ou pedido mais educado. Sempre + verbo base, sem "to".',
        examples: [
          { en: 'I can code in JavaScript.', pt: 'Eu sei programar em JavaScript.' },
          { en: 'Could you send me the file?', pt: 'Você poderia me mandar o arquivo?' },
        ],
      },
      {
        heading: 'Should: conselho',
        text: 'Should = deveria. Para dar conselho ou opinião.',
        examples: [{ en: 'You should practice speaking every day.', pt: 'Você deveria praticar a fala todo dia.' }],
      },
      {
        heading: 'Must / have to: obrigação',
        text: 'Must: obrigação forte, muitas vezes vinda de quem fala ou regra escrita. Have to: obrigação externa, a mais usada na fala. Atenção: "don\'t have to" = não precisa; "mustn\'t" = não pode, é proibido.',
        examples: [
          { en: 'I have to work on Saturday.', pt: 'Eu tenho que trabalhar no sábado.' },
          { en: "You don't have to come.", pt: 'Você não precisa vir.' },
          { en: "You mustn't smoke here.", pt: 'Você não pode fumar aqui.' },
        ],
      },
    ],
    tips: ['Modais não ganham -s: "She can", nunca "She cans".', 'Nada de "to" depois de can/should/must: "I can to go" está errado.'],
    exercises: [
      { q: '___ you help me with this, please?', options: ['Should', 'Could', 'Must', 'Have'], answer: 1, explain: 'Pedido educado: Could you.' },
      { q: 'You look tired. You ___ go to bed early.', options: ['should', 'can', 'could to', 'have'], answer: 0, explain: 'Conselho: should.' },
      { q: "Tomorrow is Sunday, so I ___ wake up early.", options: ["mustn't", "don't have to", "can't", "shouldn't to"], answer: 1, explain: 'Não precisa (não é obrigatório): don\'t have to.' },
      { q: 'She ___ speak three languages.', options: ['can', 'cans', 'can to', 'is can'], answer: 0, explain: 'Modal sem -s e sem to: can speak.' },
      { q: 'When I was ten, I ___ swim.', options: ["couldn't", "can't", "mustn't", "shouldn't"], answer: 0, explain: 'Habilidade no passado: couldn\'t.' },
      { q: 'You ___ drive without a license. It\'s illegal.', options: ["don't have to", "mustn't", "needn't", "could"], answer: 1, explain: 'Proibido: mustn\'t.' },
      { q: 'I ___ finish this report by Friday. My boss said so.', options: ['have to', 'can', 'should to', 'could'], answer: 0, explain: 'Obrigação externa: have to.' },
      { q: 'He ___ to wear a uniform at work.', options: ['must', 'has', 'have', 'should'], answer: 1, explain: 'Have to na 3ª pessoa: has to.' },
    ],
  },
  {
    id: 'phrasal-verbs',
    week: 8,
    title: 'Phrasal verbs essenciais',
    summary: 'Verbo + partícula com sentido próprio. São a base do inglês falado.',
    sections: [
      {
        heading: 'O que são',
        text: 'Combinação de verbo + preposição/advérbio que muda o sentido. Nativos usam o tempo todo, então sem eles a conversa fica travada.',
        examples: [
          { en: 'I wake up at 6.', pt: 'Eu acordo às 6.' },
          { en: 'Can you pick me up at the airport?', pt: 'Você pode me buscar no aeroporto?' },
        ],
      },
      {
        heading: 'Os 15 que você mais vai ouvir',
        text: 'wake up (acordar) · get up (levantar) · find out (descobrir) · give up (desistir) · look for (procurar) · look forward to (estar ansioso por) · figure out (entender, resolver) · turn on/off (ligar/desligar) · set up (configurar, montar) · run out of (ficar sem) · come back (voltar) · go on (continuar) · hang out (sair, ficar junto) · catch up (botar o papo/trabalho em dia) · work out (malhar; dar certo).',
        examples: [
          { en: "Don't give up!", pt: 'Não desista!' },
          { en: 'We ran out of coffee.', pt: 'Acabou o café.' },
          { en: "I can't figure out this bug.", pt: 'Não consigo entender esse bug.' },
        ],
      },
    ],
    tips: [
      'Aprenda phrasal verbs em frases, não soltos: coloque nos flashcards com o exemplo.',
      'Look forward to + -ing: "I\'m looking forward to seeing you".',
    ],
    exercises: [
      { q: 'I need to ___ what time the store closes.', options: ['find out', 'give up', 'wake up', 'turn off'], answer: 0, explain: 'Find out = descobrir.' },
      { q: "Learning English is hard, but don't ___.", options: ['set up', 'give up', 'look for', 'come back'], answer: 1, explain: 'Give up = desistir.' },
      { q: "I'm ___ my keys. Have you seen them?", options: ['looking for', 'looking forward', 'finding out', 'working out'], answer: 0, explain: 'Look for = procurar.' },
      { q: 'Please ___ the lights when you leave.', options: ['turn off', 'turn up', 'get up', 'go on'], answer: 0, explain: 'Turn off = desligar.' },
      { q: 'We ___ gas on the highway. So stressful!', options: ['ran out of', 'came back', 'set up', 'hung out'], answer: 0, explain: 'Run out of = ficar sem.' },
      { q: "I'm looking forward to ___ you next week.", options: ['see', 'seeing', 'saw', 'to see'], answer: 1, explain: 'Look forward to + -ing.' },
      { q: 'It took me two hours to ___ the new laptop.', options: ['set up', 'give up', 'run out', 'look for'], answer: 0, explain: 'Set up = configurar.' },
      { q: 'I go to the gym to ___ three times a week.', options: ['work out', 'figure out', 'find out', 'hang out'], answer: 0, explain: 'Work out = malhar.' },
    ],
  },
  {
    id: 'conditionals-1-2',
    week: 9,
    title: 'Condicionais: first e second',
    summary: 'Se acontecer (real) × se acontecesse (imaginário).',
    sections: [
      {
        heading: 'First conditional: possibilidade real',
        text: 'If + present simple, will + verbo base. Para situações que podem acontecer de verdade.',
        examples: [
          { en: "If I study every day, I'll be fluent in six months.", pt: 'Se eu estudar todo dia, vou ficar fluente em seis meses.' },
          { en: "If it rains, we won't go.", pt: 'Se chover, não vamos.' },
        ],
      },
      {
        heading: 'Second conditional: hipótese ou sonho',
        text: 'If + past simple, would + verbo base. Para situações imaginárias ou improváveis no presente/futuro. Com to be, o padrão é "were" para todas as pessoas.',
        examples: [
          { en: 'If I had more money, I would travel the world.', pt: 'Se eu tivesse mais dinheiro, eu viajaria o mundo.' },
          { en: 'If I were you, I would accept the offer.', pt: 'Se eu fosse você, eu aceitaria a proposta.' },
        ],
      },
    ],
    tips: ['Nunca "will" logo depois do "if": "If it will rain" está errado.', '"If I were you" é a forma clássica de dar conselho.'],
    exercises: [
      { q: 'If you ___ hard, you will pass the test.', options: ['will study', 'study', 'studied', 'would study'], answer: 1, explain: 'First conditional: if + present simple.' },
      { q: "If I ___ rich, I'd buy a house on the beach.", options: ['am', 'will be', 'were', 'be'], answer: 2, explain: 'Second conditional com to be: were.' },
      { q: "If it rains tomorrow, we ___ the barbecue.", options: ['cancel', "'ll cancel", 'would cancel', 'cancelled'], answer: 1, explain: 'Possibilidade real: will.' },
      { q: 'What would you do if you ___ the lottery?', options: ['win', 'won', 'will win', 'wins'], answer: 1, explain: 'Hipótese: if + past simple.' },
      { q: 'If I were you, I ___ talk to him.', options: ['will', 'would', 'am', 'did'], answer: 1, explain: 'Conselho com "If I were you": would.' },
      { q: "She ___ angry if you don't call her.", options: ['would be', "'ll be", 'is being', 'were'], answer: 1, explain: 'Situação real: will be.' },
      { q: 'If I ___ how to cook, I would make dinner.', options: ['know', 'knew', 'will know', 'known'], answer: 1, explain: 'Hipótese (não sabe cozinhar): knew.' },
      { q: 'If you heat ice, it ___.', options: ['melts', 'would melt', 'melted', 'will melted'], answer: 0, explain: 'Fato científico (zero conditional): present + present.' },
    ],
  },
  {
    id: 'present-perfect-continuous',
    week: 10,
    title: 'Present Perfect Continuous, for e since',
    summary: 'Algo que começou no passado e continua até agora.',
    sections: [
      {
        heading: 'Forma e uso',
        text: 'have/has been + verbo -ing. Destaca a duração de algo que começou antes e continua (ou acabou de parar).',
        examples: [
          { en: "I've been studying English for two months.", pt: 'Estou estudando inglês há dois meses.' },
          { en: "She's been working here since 2023.", pt: 'Ela trabalha aqui desde 2023.' },
          { en: 'How long have you been waiting?', pt: 'Há quanto tempo você está esperando?' },
        ],
      },
      {
        heading: 'For × since',
        text: 'For + período (for two hours, for a year). Since + ponto de início (since Monday, since 2020, since I was a kid).',
        examples: [],
      },
    ],
    tips: [
      'Brasileiro costuma dizer "I study English for two months". O certo é "I\'ve been studying...".',
      'Com verbos de estado (know, have, be), use present perfect simples: "I\'ve known him for years".',
    ],
    exercises: [
      { q: "I've been living in Curitiba ___ 2019.", options: ['for', 'since', 'ago', 'during'], answer: 1, explain: 'Ponto de início: since.' },
      { q: "She's been working on this bug ___ three hours.", options: ['since', 'for', 'ago', 'from'], answer: 1, explain: 'Período: for.' },
      { q: 'How long ___ you been learning English?', options: ['do', 'did', 'have', 'are'], answer: 2, explain: 'How long have you been...' },
      { q: "I ___ here for 20 minutes. Where are you?", options: ['wait', "'ve been waiting", 'was waiting', 'am waiting'], answer: 1, explain: 'Começou e continua: present perfect continuous.' },
      { q: "I've ___ him since we were kids.", options: ['been knowing', 'known', 'knew', 'know'], answer: 1, explain: 'Know é verbo de estado: present perfect simples.' },
      { q: "He's tired because he ___ all day.", options: ["'s been running", 'runs', 'ran yesterday', 'is run'], answer: 0, explain: 'Atividade recente com efeito agora.' },
      { q: "They've been dating ___ six months.", options: ['since', 'for', 'ago', 'in'], answer: 1, explain: 'Período: for.' },
      { q: "It ___ raining since this morning.", options: ['has been', 'have been', 'is', 'was been'], answer: 0, explain: 'It → has been.' },
    ],
  },
  {
    id: 'passive',
    week: 11,
    title: 'Voz passiva',
    summary: 'Quando o foco é a ação ou o resultado, não quem fez.',
    sections: [
      {
        heading: 'Forma',
        text: 'verbo to be (no tempo certo) + particípio. Quem fez, se importar, vem com "by".',
        examples: [
          { en: 'English is spoken all over the world.', pt: 'Inglês é falado no mundo todo.' },
          { en: 'The app was created in 2026.', pt: 'O app foi criado em 2026.' },
          { en: 'The website will be launched next week.', pt: 'O site será lançado semana que vem.' },
          { en: 'This song was written by my friend.', pt: 'Essa música foi escrita pelo meu amigo.' },
        ],
      },
      {
        heading: 'Quando usar',
        text: 'Quando não se sabe quem fez, não importa, ou é óbvio. Muito comum em notícias, textos técnicos e no trabalho.',
        examples: [{ en: 'My car was stolen.', pt: 'Meu carro foi roubado.' }],
      },
    ],
    tips: ['O tempo verbal fica todo no "to be": is made (presente), was made (passado), has been made (present perfect).'],
    exercises: [
      { q: 'This bridge ___ in 1950.', options: ['built', 'was built', 'is building', 'has build'], answer: 1, explain: 'Passado na passiva: was built.' },
      { q: 'Coffee ___ in Brazil.', options: ['grows', 'is grown', 'was grow', 'grown'], answer: 1, explain: 'Fato geral na passiva: is grown.' },
      { q: 'The results ___ tomorrow.', options: ['will announce', 'will be announced', 'are announce', 'announced'], answer: 1, explain: 'Futuro na passiva: will be announced.' },
      { q: 'My phone ___ stolen last night!', options: ['is', 'was', 'were', 'has'], answer: 1, explain: 'Singular no passado: was stolen.' },
      { q: 'The emails ___ sent yet.', options: ["haven't been", "hasn't been", "didn't", "weren't be"], answer: 0, explain: 'Plural + yet: haven\'t been sent.' },
      { q: 'This book was written ___ a Brazilian author.', options: ['from', 'of', 'by', 'with'], answer: 2, explain: 'Agente da passiva: by.' },
      { q: 'Portuguese ___ in Brazil and Portugal.', options: ['speaks', 'is spoken', 'spoke', 'is speaking'], answer: 1, explain: 'Passiva no presente: is spoken.' },
      { q: 'The meeting has ___ cancelled.', options: ['be', 'been', 'being', 'was'], answer: 1, explain: 'Present perfect passivo: has been cancelled.' },
    ],
  },
  {
    id: 'gerund-infinitive',
    week: 12,
    title: 'Gerúndio (-ing) ou infinitivo (to)',
    summary: 'Depois de certos verbos vem -ing; depois de outros, to + verbo.',
    sections: [
      {
        heading: 'Verbos seguidos de -ing',
        text: 'enjoy, finish, avoid, mind, keep, suggest, practice, consider, miss. E sempre depois de preposição.',
        examples: [
          { en: 'I enjoy playing racing games.', pt: 'Eu curto jogar jogos de corrida.' },
          { en: 'Keep practicing!', pt: 'Continue praticando!' },
          { en: "I'm good at solving problems.", pt: 'Sou bom em resolver problemas.' },
        ],
      },
      {
        heading: 'Verbos seguidos de to + verbo',
        text: 'want, need, decide, plan, hope, learn, promise, agree, would like, try (tentar com esforço).',
        examples: [
          { en: 'I want to be fluent.', pt: 'Eu quero ser fluente.' },
          { en: 'She decided to quit her job.', pt: 'Ela decidiu largar o emprego.' },
        ],
      },
      {
        heading: '-ing como sujeito',
        text: 'Quando uma ação é o sujeito da frase, use -ing.',
        examples: [{ en: 'Learning English opens doors.', pt: 'Aprender inglês abre portas.' }],
      },
    ],
    tips: ['Stop + -ing = parar de fazer. Stop + to = parar PARA fazer: "I stopped smoking" × "I stopped to smoke".'],
    exercises: [
      { q: 'I enjoy ___ to podcasts on the bus.', options: ['listen', 'to listen', 'listening', 'listened'], answer: 2, explain: 'Enjoy + -ing.' },
      { q: 'I want ___ English fluently.', options: ['speaking', 'to speak', 'speak', 'spoke'], answer: 1, explain: 'Want + to.' },
      { q: 'She finished ___ the report at midnight.', options: ['to write', 'writing', 'write', 'wrote'], answer: 1, explain: 'Finish + -ing.' },
      { q: "We've decided ___ to Portugal.", options: ['moving', 'to move', 'move', 'moved'], answer: 1, explain: 'Decide + to.' },
      { q: "I'm interested in ___ more about AI.", options: ['learn', 'to learn', 'learning', 'learned'], answer: 2, explain: 'Depois de preposição (in): -ing.' },
      { q: 'Would you mind ___ the window?', options: ['to close', 'closing', 'close', 'closed'], answer: 1, explain: 'Mind + -ing.' },
      { q: '___ every day is the secret to fluency.', options: ['Practice to', 'To practicing', 'Practicing', 'Practiced'], answer: 2, explain: 'Ação como sujeito: -ing.' },
      { q: 'He promised ___ me back.', options: ['calling', 'to call', 'call', 'called'], answer: 1, explain: 'Promise + to.' },
    ],
  },
  {
    id: 'relative-clauses',
    week: 13,
    title: 'Relative clauses: who, which, that, where',
    summary: 'Ligar frases e dar detalhes sem repetir palavras.',
    sections: [
      {
        heading: 'Quem usar',
        text: 'who: pessoas · which: coisas · that: pessoas ou coisas (bem comum na fala) · where: lugares · whose: de quem (posse).',
        examples: [
          { en: 'The guy who lives next door is a developer.', pt: 'O cara que mora ao lado é desenvolvedor.' },
          { en: 'This is the app that I told you about.', pt: 'Esse é o app de que eu te falei.' },
          { en: "That's the café where we met.", pt: 'Esse é o café onde nos conhecemos.' },
          { en: 'She has a friend whose father is a pilot.', pt: 'Ela tem uma amiga cujo pai é piloto.' },
        ],
      },
      {
        heading: 'Quando dá para omitir',
        text: 'Se who/which/that for o OBJETO da frase (vem outro sujeito depois), pode cortar. "The movie (that) I watched was great."',
        examples: [],
      },
    ],
    tips: ['Na fala, "that" resolve quase tudo para pessoas e coisas.'],
    exercises: [
      { q: 'The woman ___ called you is my boss.', options: ['which', 'who', 'where', 'whose'], answer: 1, explain: 'Pessoa: who.' },
      { q: "This is the laptop ___ I bought last week.", options: ['who', 'where', 'which', 'whose'], answer: 2, explain: 'Coisa: which (ou that).' },
      { q: 'Curitiba is the city ___ I live.', options: ['which', 'where', 'who', 'that'], answer: 1, explain: 'Lugar: where.' },
      { q: "I have a friend ___ brother plays in the NBA.", options: ['who', 'whose', 'which', 'that'], answer: 1, explain: 'Posse: whose.' },
      { q: 'Which word can be removed? "The book that I read was boring."', options: ['book', 'that', 'read', 'was'], answer: 1, explain: '"That" é objeto (vem "I" depois), então pode sair.' },
      { q: 'Do you know the restaurant ___ we had dinner?', options: ['where', 'which', 'who', 'whose'], answer: 0, explain: 'Lugar: where.' },
      { q: "He's the developer ___ created this framework.", options: ['which', 'that', 'where', 'whose'], answer: 1, explain: 'That serve para pessoas também.' },
      { q: 'The song ___ is playing now is my favorite.', options: ['who', 'which', 'where', 'whose'], answer: 1, explain: 'Coisa: which.' },
    ],
  },
  {
    id: 'reported-speech',
    week: 14,
    title: 'Reported speech',
    summary: 'Contar o que outra pessoa disse.',
    sections: [
      {
        heading: 'O verbo "volta" um tempo',
        text: 'Ao relatar com said/told no passado, o tempo verbal normalmente recua: present → past, will → would, can → could, present perfect/past → past perfect.',
        examples: [
          { en: '"I am tired." → He said (that) he was tired.', pt: 'Ele disse que estava cansado.' },
          { en: '"I will call you." → She said she would call me.', pt: 'Ela disse que me ligaria.' },
          { en: '"I can help." → He said he could help.', pt: 'Ele disse que podia ajudar.' },
        ],
      },
      {
        heading: 'Say × tell',
        text: 'Tell precisa de pessoa logo depois (told me, told him). Say não leva pessoa direto (said that..., said to me).',
        examples: [{ en: 'She told me she was busy. / She said she was busy.', pt: 'Ela me disse que estava ocupada.' }],
      },
      {
        heading: 'Perguntas relatadas',
        text: 'Viram frase afirmativa, sem do/did: "Where do you live?" → He asked where I lived. Sim/não usa if: He asked if I was ready.',
        examples: [],
      },
    ],
    tips: ['Na conversa informal, se ainda for verdade, nativos muitas vezes não recuam o tempo: "He said he likes pizza".'],
    exercises: [
      { q: '"I like coffee." → She said she ___ coffee.', options: ['like', 'liked', 'will like', 'has liked'], answer: 1, explain: 'Present → past: liked.' },
      { q: '"I will be late." → He said he ___ be late.', options: ['will', 'would', 'is', 'was'], answer: 1, explain: 'Will → would.' },
      { q: 'She ___ me that she was moving.', options: ['said', 'told', 'say', 'spoke'], answer: 1, explain: 'Told + pessoa (me).' },
      { q: '"Can you drive?" → He asked ___ I could drive.', options: ['that', 'if', 'do', 'what'], answer: 1, explain: 'Pergunta de sim/não: if.' },
      { q: '"Where do you work?" → She asked me where I ___.', options: ['do work', 'worked', 'did work', 'work did'], answer: 1, explain: 'Pergunta relatada vira afirmativa: worked.' },
      { q: 'He ___ that he was hungry.', options: ['told', 'said', 'told to', 'tell'], answer: 1, explain: 'Said sem pessoa depois.' },
      { q: '"I can\'t come." → She said she ___ come.', options: ["can't", "couldn't", "won't", "didn't"], answer: 1, explain: "Can't → couldn't." },
      { q: '"I\'ve finished." → He said he ___ finished.', options: ['has', 'had', 'have', 'is'], answer: 1, explain: 'Present perfect → past perfect: had finished.' },
    ],
  },
  {
    id: 'third-conditional-wish',
    week: 15,
    title: 'Third conditional e wish',
    summary: 'Falar de arrependimentos e de como as coisas poderiam ter sido.',
    sections: [
      {
        heading: 'Third conditional: passado que não aconteceu',
        text: 'If + past perfect, would have + particípio. Imagina um passado diferente.',
        examples: [
          { en: 'If I had studied more, I would have passed.', pt: 'Se eu tivesse estudado mais, teria passado.' },
          { en: "If we had left earlier, we wouldn't have missed the flight.", pt: 'Se tivéssemos saído mais cedo, não teríamos perdido o voo.' },
        ],
      },
      {
        heading: 'Wish: queria que...',
        text: 'Wish + past simple: desejo sobre o presente. Wish + past perfect: arrependimento sobre o passado. Wish + would: reclamar de algo que alguém faz.',
        examples: [
          { en: 'I wish I spoke English fluently.', pt: 'Queria falar inglês fluente. (agora)' },
          { en: 'I wish I had started earlier.', pt: 'Queria ter começado antes.' },
          { en: 'I wish you would stop talking during the movie.', pt: 'Queria que você parasse de falar durante o filme.' },
        ],
      },
    ],
    tips: ['Na fala, "would have" vira "would\'ve" (soa como "wouldof").'],
    exercises: [
      { q: 'If I ___ the alarm, I would have woken up on time.', options: ['heard', 'had heard', 'would hear', 'hear'], answer: 1, explain: 'Third conditional: if + past perfect.' },
      { q: "If she had asked me, I ___ helped her.", options: ['would', 'will have', 'would have', 'had'], answer: 2, explain: 'Resultado no passado imaginário: would have.' },
      { q: 'I wish I ___ more free time. (agora)', options: ['have', 'had', 'had had', 'will have'], answer: 1, explain: 'Desejo sobre o presente: wish + past simple.' },
      { q: "I wish I ___ that. I'm sorry. (passado)", options: ["didn't say", "hadn't said", "don't say", "won't say"], answer: 1, explain: 'Arrependimento do passado: wish + past perfect.' },
      { q: "We ___ lost if we had played better.", options: ["wouldn't have", "won't have", "didn't", "hadn't"], answer: 0, explain: 'Third conditional negativo: wouldn\'t have.' },
      { q: 'If they had invested in 2010, they ___ rich now... (mistura)', options: ['would be', 'will be', 'had been', 'are'], answer: 0, explain: 'Passado diferente com resultado no presente: would be (mixed conditional).' },
      { q: 'I wish it ___ raining. I want to go out.', options: ['stops', 'would stop', 'stopped to', 'has stopped'], answer: 1, explain: 'Querer que algo mude: wish + would.' },
      { q: 'If you had told me, I ___ come.', options: ['would', 'will', "would've", "had"], answer: 2, explain: "Would've = would have." },
    ],
  },
]

export const REVIEW_TOPIC = {
  id: 'revisao-geral',
  week: 16,
  title: 'Revisão geral',
  summary: 'Semana final do intensivo: exercícios sorteados de todos os temas.',
  sections: [
    {
      heading: 'Como usar esta semana',
      text: 'A cada rodada, o app sorteia 12 exercícios de todos os temas. Errou? Volte ao tema do erro e releia a explicação. Faça várias rodadas por dia.',
      examples: [],
    },
  ],
  tips: ['Nesta fase, o mais importante é usar a gramática falando: repare nos erros que o Claude aponta nas conversas.'],
  exercises: [],
}

export const ALL_TOPICS = [...GRAMMAR_TOPICS, REVIEW_TOPIC]

/** Tema da semana do intensivo (depois da 16, segue na revisão geral). */
export function topicForWeek(week) {
  return ALL_TOPICS.find((t) => t.week === week) ?? REVIEW_TOPIC
}

/** Sorteia exercícios de todos os temas para a revisão geral. */
export function reviewExercises(count = 12, random = Math.random) {
  const pool = GRAMMAR_TOPICS.flatMap((t) => t.exercises.map((e) => ({ ...e, topic: t.title })))
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(0, count)
}
