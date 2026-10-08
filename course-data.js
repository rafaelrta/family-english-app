/* =========================================================
   ENGLISH FAMILY
   COURSE-DATA.JS
   Banco principal do curso A1 → C1
   ========================================================= */

(function () {

  "use strict";


  /* =======================================================
   CONFIGURAÇÃO DOS NÍVEIS
   ======================================================= */

const LEVELS = {

  /* =====================================================
     A1 — BEGINNER
     ===================================================== */

  A1: {

    title: "A1 — Beginner",

    description:
      "Fundamentos do inglês para comunicação básica.",

    modules: [

      {
        title: "Getting Started",

        lessons: [

          [
            "Hello and Introductions",
            "Cumprimentos, apresentações e primeiras conversas."
          ],

          [
            "Personal Information",
            "Nome, idade, origem, profissão e informações pessoais."
          ],

          [
            "Family and People",
            "Família, pessoas e relações."
          ],

          [
            "Numbers, Time and Dates",
            "Números, horários, dias, meses e datas."
          ],

          [
            "Everyday Objects",
            "Objetos e situações do cotidiano."
          ]

        ]

      },

      {
        title: "Everyday English",

        lessons: [

          [
            "Daily Activities",
            "Rotinas, hábitos e atividades diárias."
          ],

          [
            "Food and Drinks",
            "Comidas, bebidas e preferências."
          ],

          [
            "Home and Places",
            "Casa, cômodos e lugares."
          ],

          [
            "Work and School",
            "Trabalho, escola e atividades de estudo."
          ],

          [
            "Free Time",
            "Hobbies, lazer e tempo livre."
          ]

        ]

      },

      {
        title: "Basic Communication",

        lessons: [

          [
            "Present Simple",
            "Hábitos, rotinas e fatos cotidianos."
          ],

          [
            "There Is and There Are",
            "Existência, localização e descrição de lugares."
          ],

          [
            "Can and Can't",
            "Habilidades, possibilidades e limitações."
          ],

          [
            "Questions and Answers",
            "Perguntas, respostas e comunicação básica."
          ],

          [
            "A1 Review and Communication",
            "Consolidação prática de todo o nível A1."
          ]

        ]

      }

    ]

  },


  /* =====================================================
     A2 — ELEMENTARY
     ===================================================== */

  A2: {

    title: "A2 — Elementary",

    description:
      "Comunicação cotidiana, experiências, leitura e expansão gramatical.",

    modules: [

      {
        title: "Everyday Life",

        lessons: [

          [
            "Daily Routine",
            "Rotinas e hábitos."
          ],

          [
            "A Busy Day",
            "Um dia movimentado e acontecimentos passados."
          ],

          [
            "An Unexpected Afternoon",
            "Situações inesperadas e acontecimentos."
          ],

          [
            "A Change of Plans",
            "Mudanças de planos e decisões."
          ],

          [
            "Coming Soon",
            "Planos, intenções e acontecimentos futuros."
          ]

        ]

      },

      {
        title: "Experiences and Plans",

        lessons: [

          [
            "Last Weekend",
            "Experiências recentes e passado."
          ],

          [
            "A Memorable Trip",
            "Viagens, experiências e acontecimentos marcantes."
          ],

          [
            "Future Plans",
            "Planos e intenções futuras."
          ],

          [
            "Making Arrangements",
            "Compromissos, encontros e organização."
          ],

          [
            "Life Experiences",
            "Experiências de vida e Present Perfect."
          ]

        ]

      },

      {
        title: "Real-Life English",

        lessons: [

          [
            "Shopping",
            "Compras, preços, comparação e negociação simples."
          ],

          [
            "At the Restaurant",
            "Pedidos, refeições e situações em restaurantes."
          ],

          [
            "Travel Problems",
            "Problemas, soluções e situações durante viagens."
          ],

          [
            "Health and Advice",
            "Saúde, sintomas, recomendações e conselhos."
          ],

          [
            "A2 Final Challenge",
            "Consolidação prática do nível A2."
          ]

        ]

      }

    ]

  },


  /* =====================================================
     B1 — INTERMEDIATE
     ===================================================== */

  B1: {

    title: "B1 — Intermediate",

    description:
      "Comunicação independente, narrativas, opiniões e situações reais.",

    modules: [

      {
        title: "Life and Experiences",

        lessons: [

          [
            "Life Changes",
            "Mudanças pessoais, profissionais e de vida."
          ],

          [
            "Work Experiences",
            "Experiências profissionais e situações no trabalho."
          ],

          [
            "Learning from Mistakes",
            "Erros, consequências e aprendizado."
          ],

          [
            "Important Decisions",
            "Decisões, escolhas e consequências."
          ],

          [
            "Personal Goals",
            "Objetivos, planos e desenvolvimento pessoal."
          ]

        ]

      },

      {
        title: "Society and Communication",

        lessons: [

          [
            "Technology in Daily Life",
            "Tecnologia e seus efeitos no cotidiano."
          ],

          [
            "Social Media",
            "Redes sociais, comportamento e comunicação."
          ],

          [
            "Modern Communication",
            "Formas modernas de comunicação."
          ],

          [
            "People and Society",
            "Relacionamentos, sociedade e comportamento."
          ],

          [
            "The World Around Us",
            "Comunidade, mundo e questões do cotidiano."
          ]

        ]

      },

      {
        title: "Stories and Opinions",

        lessons: [

          [
            "Telling a Story",
            "Narrativas, acontecimentos e experiências."
          ],

          [
            "Giving Opinions",
            "Expressando opiniões e justificativas."
          ],

          [
            "Agreeing and Disagreeing",
            "Concordância, discordância e argumentação."
          ],

          [
            "Solving Problems",
            "Análise de problemas e busca de soluções."
          ],

          [
            "B1 Final Challenge",
            "Consolidação prática do nível B1."
          ]

        ]

      }

    ]

  },


  /* =====================================================
     B2 — UPPER INTERMEDIATE
     ===================================================== */

  B2: {

    title: "B2 — Upper Intermediate",

    description:
      "Comunicação avançada, argumentação, análise e compreensão complexa.",

    modules: [

      {
        title: "Advanced Everyday English",

        lessons: [

          [
            "Complex Routines",
            "Rotinas complexas e situações do cotidiano."
          ],

          [
            "Workplace Communication",
            "Comunicação profissional e ambiente de trabalho."
          ],

          [
            "Managing Time",
            "Organização, prioridades e administração do tempo."
          ],

          [
            "Difficult Conversations",
            "Conversas difíceis, conflitos e resolução."
          ],

          [
            "Making Decisions",
            "Decisões complexas e análise de alternativas."
          ]

        ]

      },

      {
        title: "Ideas and Arguments",

        lessons: [

          [
            "Building an Argument",
            "Construção de argumentos e justificativas."
          ],

          [
            "Advantages and Disadvantages",
            "Comparação, vantagens e desvantagens."
          ],

          [
            "Cause and Effect",
            "Relações de causa, consequência e impacto."
          ],

          [
            "Comparing Perspectives",
            "Diferentes pontos de vista e perspectivas."
          ],

          [
            "Critical Thinking",
            "Análise crítica, evidências e conclusões."
          ]

        ]

      },

      {
        title: "Communication in Context",

        lessons: [

          [
            "News and Information",
            "Notícias, informações e interpretação."
          ],

          [
            "Culture and Society",
            "Cultura, sociedade e diferenças."
          ],

          [
            "Technology and the Future",
            "Tecnologia, inovação e futuro."
          ],

          [
            "Professional Situations",
            "Situações profissionais e comunicação formal."
          ],

          [
            "B2 Final Challenge",
            "Consolidação prática do nível B2."
          ]

        ]

      }

    ]

  },


  /* =====================================================
     C1 — ADVANCED
     ===================================================== */

  C1: {

    title: "C1 — Advanced",

    description:
      "Fluência avançada, precisão, interpretação, argumentação e comunicação sofisticada.",

    modules: [

      {
        title: "Advanced Reading",

        lessons: [

          [
            "Complex Texts",
            "Leitura e interpretação de textos complexos."
          ],

          [
            "Implicit Meaning",
            "Inferência e identificação de significados implícitos."
          ],

          [
            "Tone and Context",
            "Tom, contexto, intenção e interpretação."
          ],

          [
            "Academic Language",
            "Vocabulário e estruturas acadêmicas."
          ],

          [
            "Advanced Vocabulary",
            "Vocabulário avançado e precisão lexical."
          ]

        ]

      },

      {
        title: "Advanced Communication",

        lessons: [

          [
            "Professional Discussions",
            "Discussões profissionais e comunicação sofisticada."
          ],

          [
            "Presenting Ideas",
            "Apresentação, organização e defesa de ideias."
          ],

          [
            "Negotiation",
            "Negociação, concessões e busca de acordos."
          ],

          [
            "Persuasion",
            "Persuasão, argumentos e influência."
          ],

          [
            "Leadership Communication",
            "Comunicação de liderança e tomada de decisões."
          ]

        ]

      },

      {
        title: "Fluency and Mastery",

        lessons: [

          [
            "Complex Conversations",
            "Conversas complexas e espontâneas."
          ],

          [
            "Expressing Nuance",
            "Nuances, precisão e diferentes graus de significado."
          ],

          [
            "Debate and Argumentation",
            "Debate, argumentação e contra-argumentação."
          ],

          [
            "Advanced Problem Solving",
            "Problemas complexos e construção de soluções."
          ],

          [
            "C1 Final Challenge",
            "Consolidação e avaliação final do nível C1."
          ]

        ]

      }

    ]

  }

};


  /* =======================================================
     CONTEÚDO ESPECIAL — A2 M1 L1
     Mantém a aula que já existia na v1.3.0
     ======================================================= */

  const A2_M1_L1_CONTENT = {

    level: "A2",
    module: 1,
    lesson: 1,

    title: "Daily Routine",

    subtitle:
      "Talking about everyday routines",

    estimatedMinutes: 15,

    objectives: [

      "Talk about your daily routine.",
      "Use common routine verbs.",
      "Understand the Present Simple.",
      "Build simple sentences about everyday life."

    ],

    introduction: {

      title: "Let's talk about your day",

      text:
        "Every day we do many things. We wake up, have breakfast, go to work or school, have lunch, come home and go to bed. In English, we can use the Present Simple to talk about routines and habits."

    },

    vocabulary: [

      {
        word: "wake up",
        translation: "acordar",
        category: "daily routine",
        example: "I wake up at seven."
      },

      {
        word: "get up",
        translation: "levantar-se",
        category: "daily routine",
        example: "I get up at seven thirty."
      },

      {
        word: "have breakfast",
        translation: "tomar café da manhã",
        category: "daily routine",
        example: "I have breakfast at eight."
      },

      {
        word: "go to work",
        translation: "ir para o trabalho",
        category: "daily routine",
        example: "I go to work at nine."
      },

      {
        word: "have lunch",
        translation: "almoçar",
        category: "daily routine",
        example: "I have lunch at noon."
      },

      {
        word: "come home",
        translation: "voltar para casa",
        category: "daily routine",
        example: "I come home at six."
      },

      {
        word: "have dinner",
        translation: "jantar",
        category: "daily routine",
        example: "I have dinner with my family."
      },

      {
        word: "go to bed",
        translation: "ir para a cama",
        category: "daily routine",
        example: "I go to bed at eleven."
      }

    ],

    grammar: {

      title: "Present Simple",

      explanation:
        "We use the Present Simple to talk about routines, habits and things that happen regularly.",

      examples: [

        "I wake up at seven.",
        "I go to work every day.",
        "I have lunch at noon.",
        "She works in the morning.",
        "He goes to bed at eleven."

      ],

      rule:
        "With he, she and it, the verb usually receives -s or -es."

    },

    reading: {

      title: "My Daily Routine",

      text:
        "I usually wake up at seven o'clock. I get up and have breakfast with my family. Then I get ready for work. I go to work in the morning and have lunch at noon. In the afternoon, I finish work and come home. In the evening, I have dinner with my family. After dinner, I usually relax and read a book. I go to bed at eleven o'clock.",

      translation:
        "Eu geralmente acordo às sete horas. Eu me levanto e tomo café da manhã com minha família. Depois, eu me preparo para o trabalho. Eu vou para o trabalho de manhã e almoço ao meio-dia. À tarde, termino o trabalho e volto para casa. À noite, janto com minha família. Depois do jantar, geralmente relaxo e leio um livro. Vou para a cama às onze horas."

    },

    comprehension: [

      {
        id: "q1",
        question: "What time does the person usually wake up?",
        options: [
          "At six o'clock.",
          "At seven o'clock.",
          "At eight o'clock.",
          "At nine o'clock."
        ],
        answer: 1,
        explanation:
          "The text says: 'I usually wake up at seven o'clock.'"
      },

      {
        id: "q2",
        question: "Who does the person have breakfast with?",
        options: [
          "Friends.",
          "Colleagues.",
          "Family.",
          "Nobody."
        ],
        answer: 2,
        explanation:
          "The text says: 'I get up and have breakfast with my family.'"
      },

      {
        id: "q3",
        question: "When does the person have lunch?",
        options: [
          "In the morning.",
          "At noon.",
          "In the evening.",
          "At night."
        ],
        answer: 1,
        explanation:
          "The text says: 'I have lunch at noon.'"
      },

      {
        id: "q4",
        question: "What does the person usually do after dinner?",
        options: [
          "Go to work.",
          "Go to school.",
          "Relax and read a book.",
          "Have lunch."
        ],
        answer: 2,
        explanation:
          "The text says: 'After dinner, I usually relax and read a book.'"
      }

    ],

    translation: [

      {
        id: "t1",
        question:
          "Traduza para o inglês: 'Eu acordo às sete horas.'",
        answer:
          "I wake up at seven o'clock.",
        alternatives: [
          "I wake up at seven.",
          "I wake up at 7 o'clock."
        ]
      },

      {
        id: "t2",
        question:
          "Traduza para o inglês: 'Eu almoço ao meio-dia.'",
        answer:
          "I have lunch at noon.",
        alternatives: [
          "I have lunch at twelve.",
          "I have lunch at 12."
        ]
      },

      {
        id: "t3",
        question:
          "Traduza para o inglês: 'Eu vou para a cama às onze horas.'",
        answer:
          "I go to bed at eleven o'clock.",
        alternatives: [
          "I go to bed at eleven."
        ]
      }

    ],

    grammarExercises: [

      {
        id: "g1",
        question: "Choose the correct sentence.",
        options: [
          "She work every day.",
          "She works every day.",
          "She working every day.",
          "She works every days."
        ],
        answer: 1,
        explanation:
          "With 'she', the verb 'work' becomes 'works' in the Present Simple."
      },

      {
        id: "g2",
        question: "Choose the correct sentence.",
        options: [
          "He go to work at eight.",
          "He goes to work at eight.",
          "He going to work at eight.",
          "He goes work at eight."
        ],
        answer: 1,
        explanation:
          "With 'he', 'go' becomes 'goes'."
      },

      {
        id: "g3",
        question: "Choose the correct sentence.",
        options: [
          "I has breakfast at seven.",
          "I have breakfast at seven.",
          "I having breakfast at seven.",
          "I haves breakfast at seven."
        ],
        answer: 1,
        explanation:
          "With 'I', we use the base form 'have'."
      }

    ],

    activeRecall: [

      {
        id: "r1",
        question: "Complete: I _____ up at seven.",
        answer: "wake"
      },

      {
        id: "r2",
        question: "Complete: I _____ lunch at noon.",
        answer: "have"
      },

      {
        id: "r3",
        question: "Complete: I _____ to bed at eleven.",
        answer: "go"
      }

    ]

  };


  /* =======================================================
     CONTEÚDO GERADO PARA AS DEMAIS AULAS
     ======================================================= */

  const VOCABULARY_BY_LEVEL = {

    A1: [
      ["hello", "olá"],
      ["family", "família"],
      ["friend", "amigo"],
      ["house", "casa"],
      ["school", "escola"],
      ["work", "trabalho"],
      ["food", "comida"],
      ["water", "água"]
    ],

    A2: [
      ["usually", "geralmente"],
      ["already", "já"],
      ["yesterday", "ontem"],
      ["tomorrow", "amanhã"],
      ["plan", "plano"],
      ["experience", "experiência"],
      ["problem", "problema"],
      ["advice", "conselho"]
    ],

    B1: [
      ["experience", "experiência"],
      ["decision", "decisão"],
      ["improve", "melhorar"],
      ["although", "embora"],
      ["however", "entretanto"],
      ["opportunity", "oportunidade"],
      ["goal", "objetivo"],
      ["challenge", "desafio"]
    ],

    B2: [
      ["argument", "argumento"],
      ["evidence", "evidência"],
      ["perspective", "perspectiva"],
      ["consequence", "consequência"],
      ["advantage", "vantagem"],
      ["disadvantage", "desvantagem"],
      ["impact", "impacto"],
      ["issue", "questão"]
    ],

    C1: [
      ["nuance", "nuance"],
      ["perspective", "perspectiva"],
      ["assumption", "suposição"],
      ["interpretation", "interpretação"],
      ["significant", "significativo"],
      ["convey", "transmitir"],
      ["distinction", "distinção"],
      ["insight", "percepção profunda"]
    ]

  };


  const GRAMMAR_BY_LEVEL = {

    A1: [
      "Verb to be",
      "Personal pronouns",
      "Possessive adjectives",
      "Present Simple",
      "There is / There are",
      "Can / Can't",
      "Question words"
    ],

    A2: [
      "Present Simple",
      "Present Continuous",
      "Past Simple",
      "Future with going to",
      "Will",
      "Comparatives",
      "Superlatives",
      "Modal verbs"
    ],

    B1: [
      "Present Perfect",
      "Past Continuous",
      "Past Perfect",
      "First Conditional",
      "Second Conditional",
      "Relative clauses",
      "Gerunds and infinitives",
      "Reported speech"
    ],

    B2: [
      "Advanced conditionals",
      "Passive voice",
      "Modal verbs of deduction",
      "Complex relative clauses",
      "Inversion",
      "Causative structures",
      "Advanced reported speech"
    ],

    C1: [
      "Advanced discourse structures",
      "Mixed conditionals",
      "Inversion for emphasis",
      "Cleft sentences",
      "Advanced passive structures",
      "Nominalisation",
      "Complex clause structures"
    ]

  };


  function createGenericContent(
    level,
    moduleNumber,
    lessonNumber,
    title,
    description
  ) {

    const vocabulary =
      VOCABULARY_BY_LEVEL[level] || [];

    const grammar =
      GRAMMAR_BY_LEVEL[level] || [];

    const selectedVocabulary =
      vocabulary.slice(
        (lessonNumber - 1) % 4,
        ((lessonNumber - 1) % 4) + 5
      );

    const grammarTopic =
      grammar[
        (lessonNumber - 1) %
        grammar.length
      ];


    const words =
      selectedVocabulary.length
        ? selectedVocabulary
        : [["learn", "aprender"]];


    return {

      level,
      module: moduleNumber,
      lesson: lessonNumber,

      title,

      subtitle:
        description,

      estimatedMinutes:
        15,

      objectives: [

        `Understand the topic: ${title}.`,

        `Learn useful ${level} vocabulary.`,

        `Practice ${grammarTopic}.`,

        "Improve reading and active recall."

      ],

      introduction: {

        title:
          `Let's study: ${title}`,

        text:
          `In this lesson, you will explore ${title.toLowerCase()}. The goal is to understand the main ideas, learn useful expressions, practice grammar and use English in meaningful situations.`

      },

      vocabulary:
        words.map(
          item => ({

            word:
              item[0],

            translation:
              item[1],

            category:
              title,

            example:
              `This lesson helps you use "${item[0]}" in context.`

          })
        ),

      grammar: {

        title:
          grammarTopic,

        explanation:
          `This lesson introduces and practices ${grammarTopic}. Pay attention to how the structure is used in real communication.`,

        rule:
          `Use ${grammarTopic} according to the meaning and context of the sentence.`,

        examples: [

          `This lesson gives you practice with ${grammarTopic}.`,

          `I use English to communicate clearly.`,

          `People use language differently depending on the situation.`

        ]

      },

      reading: {

        title:
          title,

        text:
          `English is part of everyday life. In this lesson, we explore ${title.toLowerCase()} and think about how people communicate in different situations. Learning a language is a process of understanding ideas, noticing patterns and practicing regularly. The more you read and use English, the easier it becomes to recognize vocabulary, grammar and meaning in context.`,

        translation:
          `O inglês faz parte da vida cotidiana. Nesta aula, exploramos ${description.toLowerCase()} e pensamos sobre como as pessoas se comunicam em diferentes situações. Aprender um idioma é um processo de compreender ideias, perceber padrões e praticar regularmente. Quanto mais você lê e usa o inglês, mais fácil fica reconhecer vocabulário, gramática e significado no contexto.`

      },

      comprehension: [

        {

          id:
            `${level}-M${moduleNumber}-L${lessonNumber}-Q1`,

          question:
            "What is the main purpose of this lesson?",

          options: [

            "To practice English and understand the topic.",

            "To stop studying English.",

            "To memorize random numbers.",

            "To avoid communication."

          ],

          answer: 0,

          explanation:
            "The lesson combines reading, vocabulary, grammar and active practice."

        },

        {

          id:
            `${level}-M${moduleNumber}-L${lessonNumber}-Q2`,

          question:
            "Why is regular practice important?",

          options: [

            "Because practice helps learners improve.",

            "Because English never changes.",

            "Because reading is unnecessary.",

            "Because vocabulary does not matter."

          ],

          answer: 0,

          explanation:
            "Regular practice helps learners recognize and use English more naturally."

        }

      ],

      translation: [

        {

          id:
            `${level}-M${moduleNumber}-L${lessonNumber}-T1`,

          question:
            "Traduza para o inglês: 'Eu estudo inglês todos os dias.'",

          answer:
            "I study English every day.",

          alternatives: [

            "I study English every day"

          ]

        }

      ],

      grammarExercises: [

        {

          id:
            `${level}-M${moduleNumber}-L${lessonNumber}-G1`,

          question:
            "Choose the best sentence.",

          options: [

            "I study English regularly.",

            "I studying English regularly.",

            "I studies English regularly.",

            "I English study regularly."

          ],

          answer:
            0,

          explanation:
            "The first sentence uses the correct basic word order."

        }

      ],

      activeRecall: [

        {

          id:
            `${level}-M${moduleNumber}-L${lessonNumber}-R1`,

          question:
            "Complete: I _____ English every day.",

          answer:
            "study"

        }

      ]

    };

  }


  /* =======================================================
     CONSTRUÇÃO DO BANCO FINAL
     ======================================================= */

  const COURSE_DATA = {};


  Object.keys(LEVELS).forEach(
    level => {

      COURSE_DATA[level] = {};

      LEVELS[level].modules.forEach(
        (moduleData, moduleIndex) => {

          const moduleNumber =
            moduleIndex + 1;

          const lessons = [];

          moduleData.lessons.forEach(
            (lessonData, lessonIndex) => {

              const lessonNumber =
                lessonIndex + 1;

              const title =
                lessonData[0];

              const description =
                lessonData[1];

              let content;

              if (
                level === "A2" &&
                moduleNumber === 1 &&
                lessonNumber === 1
              ) {

                content =
                  A2_M1_L1_CONTENT;

              }

              else {

                content =
                  createGenericContent(
                    level,
                    moduleNumber,
                    lessonNumber,
                    title,
                    description
                  );

              }

              lessons.push({

                id:
                  `${level}-M${moduleNumber}-L${lessonNumber}`,

                title,

                description,

                type:
                  "reading",

                status:
                  level === "A2" &&
                  moduleNumber === 1 &&
                  lessonNumber === 1
                    ? "current"
                    : "locked",

                content

              });

            }
          );


          lessons.push({

            id:
              `${level}-M${moduleNumber}-REVIEW`,

            title:
              "Revisão Geral",

            description:
              `Revisão do Módulo ${moduleNumber}.`,

            type:
              "review",

            status:
              "locked"

          });


          lessons.push({

            id:
              `${level}-M${moduleNumber}-TEST`,

            title:
              "Avaliação do Módulo",

            description:
              `Avaliação do Módulo ${moduleNumber}.`,

            type:
              "test",

            status:
              "locked"

          });


          COURSE_DATA[level][moduleNumber] = {

            title:
              `Módulo ${moduleNumber} — ${moduleData.title}`,

            lessons

          };

        }
      );

    }
  );


  /* =======================================================
     EXPORTAR PARA O APP.JS
     ======================================================= */

  window.ENGLISH_FAMILY_COURSE_DATA =
    COURSE_DATA;


  console.log(
    "[English Family] Course Data A1 → C1 carregado."
  );

})();
