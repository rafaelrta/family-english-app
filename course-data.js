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
   GERADOR DE CONTEÚDO ESPECÍFICO
   ======================================================= */

function createGenericContent(
  level,
  moduleNumber,
  lessonNumber,
  title,
  description
) {

  /* =====================================================
     CONTEÚDO ESPECÍFICO — A1
     ===================================================== */

  const A1_CONTENT = {

    /* ===================================================
       MÓDULO 1 — GETTING STARTED
       =================================================== */

    1: {

      1: {
        subtitle: "Greetings, introductions and first conversations",

        objectives: [
          "Use basic greetings in English.",
          "Introduce yourself and another person.",
          "Ask and answer simple personal questions.",
          "Understand a short introductory conversation."
        ],

        introduction: {
          title: "Hello! Nice to meet you!",
          text:
            "English communication often begins with a greeting and a simple introduction. In this lesson, you will learn how to say hello, introduce yourself, ask someone's name and respond naturally."
        },

        vocabulary: [
          {
            word: "hello",
            translation: "olá",
            category: "greetings",
            example: "Hello! How are you?"
          },
          {
            word: "hi",
            translation: "oi",
            category: "greetings",
            example: "Hi! Nice to meet you."
          },
          {
            word: "good morning",
            translation: "bom dia",
            category: "greetings",
            example: "Good morning, Anna."
          },
          {
            word: "good afternoon",
            translation: "boa tarde",
            category: "greetings",
            example: "Good afternoon!"
          },
          {
            word: "good evening",
            translation: "boa noite",
            category: "greetings",
            example: "Good evening, Mr. Smith."
          },
          {
            word: "name",
            translation: "nome",
            category: "personal information",
            example: "My name is John."
          },
          {
            word: "nice to meet you",
            translation: "prazer em conhecer você",
            category: "introductions",
            example: "Nice to meet you!"
          }
        ],

        grammar: {
          title: "Verb To Be — I am / You are",
          explanation:
            "The verb to be is one of the most important verbs in English. We use am with I and are with you.",
          examples: [
            "I am Rafael.",
            "I am Brazilian.",
            "You are my friend.",
            "You are welcome."
          ],
          rule:
            "I → am. You → are."
        },

        reading: {
          title: "A New Friend",
          text:
            "Hello! My name is Daniel. I am from Brazil. I am a student. Today I meet a new friend at school. Her name is Emma. She is from Canada. We say hello and talk about our names. It is nice to meet a new person.",
          translation:
            "Olá! Meu nome é Daniel. Eu sou do Brasil. Eu sou estudante. Hoje conheço uma nova amiga na escola. O nome dela é Emma. Ela é do Canadá. Nós dizemos olá e falamos sobre nossos nomes. É bom conhecer uma pessoa nova."
        },

        comprehension: [
          {
            id: "A1-M1-L1-Q1",
            question: "What is the boy's name?",
            options: ["Daniel", "John", "Emma", "Peter"],
            answer: 0,
            explanation: "His name is Daniel."
          },
          {
            id: "A1-M1-L1-Q2",
            question: "Where is Daniel from?",
            options: ["Canada", "Brazil", "England", "The USA"],
            answer: 1,
            explanation: "Daniel is from Brazil."
          },
          {
            id: "A1-M1-L1-Q3",
            question: "What is the girl's name?",
            options: ["Anna", "Maria", "Emma", "Sarah"],
            answer: 2,
            explanation: "Her name is Emma."
          }
        ],

        translation: [
          {
            id: "A1-M1-L1-T1",
            question: "Traduza para o inglês: 'Meu nome é Daniel.'",
            answer: "My name is Daniel.",
            alternatives: ["My name's Daniel."]
          },
          {
            id: "A1-M1-L1-T2",
            question: "Traduza para o inglês: 'Eu sou do Brasil.'",
            answer: "I am from Brazil.",
            alternatives: ["I'm from Brazil."]
          }
        ],

        grammarExercises: [
          {
            id: "A1-M1-L1-G1",
            question: "Choose the correct sentence.",
            options: [
              "I are Rafael.",
              "I am Rafael.",
              "I is Rafael.",
              "I be Rafael."
            ],
            answer: 1,
            explanation: "With I, we use am."
          },
          {
            id: "A1-M1-L1-G2",
            question: "Choose the correct sentence.",
            options: [
              "You am my friend.",
              "You is my friend.",
              "You are my friend.",
              "You be my friend."
            ],
            answer: 2,
            explanation: "With you, we use are."
          }
        ],

        activeRecall: [
          {
            id: "A1-M1-L1-R1",
            question: "Complete: My _____ is Rafael.",
            answer: "name"
          },
          {
            id: "A1-M1-L1-R2",
            question: "Complete: I _____ from Brazil.",
            answer: "am"
          }
        ]
      },


      2: {
        subtitle: "Name, age, country, city and basic personal information",

        objectives: [
          "Give basic personal information.",
          "Ask someone's age and origin.",
          "Use simple sentences with the verb to be.",
          "Understand a short personal profile."
        ],

        introduction: {
          title: "Tell me about yourself",
          text:
            "When we meet someone, we often exchange basic information. We can talk about our name, age, country, city and occupation."
        },

        vocabulary: [
          { word: "age", translation: "idade", category: "personal information", example: "What is your age?" },
          { word: "country", translation: "país", category: "personal information", example: "What country are you from?" },
          { word: "city", translation: "cidade", category: "personal information", example: "I live in São Paulo." },
          { word: "Brazilian", translation: "brasileiro(a)", category: "nationality", example: "I am Brazilian." },
          { word: "student", translation: "estudante", category: "occupation", example: "I am a student." },
          { word: "teacher", translation: "professor(a)", category: "occupation", example: "She is a teacher." },
          { word: "live", translation: "morar", category: "personal information", example: "I live in Brazil." }
        ],

        grammar: {
          title: "Questions with To Be",
          explanation:
            "We can use the verb to be to ask basic personal questions.",
          examples: [
            "What is your name?",
            "How old are you?",
            "Where are you from?",
            "Are you a student?"
          ],
          rule:
            "Questions with to be usually begin with the verb: Are you...? Is he...?"
        },

        reading: {
          title: "About Me",
          text:
            "My name is Lucas. I am twenty years old. I am Brazilian and I live in São Paulo. I am a student. My friend Ana is twenty-one years old. She is also Brazilian, but she lives in Rio de Janeiro.",
          translation:
            "Meu nome é Lucas. Eu tenho vinte anos. Sou brasileiro e moro em São Paulo. Sou estudante. Minha amiga Ana tem vinte e um anos. Ela também é brasileira, mas mora no Rio de Janeiro."
        },

        comprehension: [
          {
            id: "A1-M1-L2-Q1",
            question: "How old is Lucas?",
            options: ["18", "19", "20", "21"],
            answer: 2,
            explanation: "Lucas is twenty years old."
          },
          {
            id: "A1-M1-L2-Q2",
            question: "Where does Lucas live?",
            options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
            answer: 1,
            explanation: "Lucas lives in São Paulo."
          },
          {
            id: "A1-M1-L2-Q3",
            question: "What is Lucas's nationality?",
            options: ["Canadian", "American", "Brazilian", "English"],
            answer: 2,
            explanation: "Lucas is Brazilian."
          }
        ],

        translation: [
          {
            id: "A1-M1-L2-T1",
            question: "Traduza: 'Eu tenho vinte anos.'",
            answer: "I am twenty years old.",
            alternatives: ["I'm twenty years old."]
          },
          {
            id: "A1-M1-L2-T2",
            question: "Traduza: 'Eu moro em São Paulo.'",
            answer: "I live in São Paulo.",
            alternatives: []
          }
        ],

        grammarExercises: [
          {
            id: "A1-M1-L2-G1",
            question: "Choose the correct question.",
            options: [
              "Where you are from?",
              "Where are you from?",
              "Where from are you?",
              "Where is you from?"
            ],
            answer: 1,
            explanation: "The correct structure is Where are you from?"
          },
          {
            id: "A1-M1-L2-G2",
            question: "Choose the correct sentence.",
            options: [
              "She are Brazilian.",
              "She am Brazilian.",
              "She is Brazilian.",
              "She be Brazilian."
            ],
            answer: 2,
            explanation: "With she, we use is."
          }
        ],

        activeRecall: [
          {
            id: "A1-M1-L2-R1",
            question: "Complete: Where _____ you from?",
            answer: "are"
          },
          {
            id: "A1-M1-L2-R2",
            question: "Complete: I _____ in Brazil.",
            answer: "live"
          }
        ]
      },


      3: {
        subtitle: "Family members and describing people",

        objectives: [
          "Name common family members.",
          "Describe simple relationships.",
          "Use possessive adjectives.",
          "Understand a short family description."
        ],

        introduction: {
          title: "My family",
          text:
            "Family is an important part of everyday conversation. In English, we can talk about parents, children, brothers, sisters and other relatives."
        },

        vocabulary: [
          { word: "mother", translation: "mãe", category: "family", example: "My mother is a teacher." },
          { word: "father", translation: "pai", category: "family", example: "My father works at home." },
          { word: "brother", translation: "irmão", category: "family", example: "My brother is young." },
          { word: "sister", translation: "irmã", category: "family", example: "My sister is a student." },
          { word: "son", translation: "filho", category: "family", example: "Their son is five." },
          { word: "daughter", translation: "filha", category: "family", example: "Their daughter is ten." },
          { word: "parents", translation: "pais", category: "family", example: "My parents live here." }
        ],

        grammar: {
          title: "Possessive Adjectives",
          explanation:
            "Possessive adjectives show who something belongs to.",
          examples: [
            "My mother",
            "Your father",
            "His brother",
            "Her sister"
          ],
          rule:
            "my = meu/minha, your = seu/sua, his = dele, her = dela."
        },

        reading: {
          title: "My Family",
          text:
            "My name is Julia. I have a small family. My parents live with me. My mother is a teacher and my father is a driver. I have one brother. His name is Leo. He is twelve years old. We are very close.",
          translation:
            "Meu nome é Julia. Eu tenho uma família pequena. Meus pais moram comigo. Minha mãe é professora e meu pai é motorista. Eu tenho um irmão. O nome dele é Leo. Ele tem doze anos. Nós somos muito próximos."
        },

        comprehension: [
          {
            id: "A1-M1-L3-Q1",
            question: "Who is Julia's brother?",
            options: ["Leo", "John", "Peter", "David"],
            answer: 0,
            explanation: "Her brother's name is Leo."
          },
          {
            id: "A1-M1-L3-Q2",
            question: "What is Julia's mother?",
            options: ["A driver", "A student", "A teacher", "A doctor"],
            answer: 2,
            explanation: "Her mother is a teacher."
          }
        ],

        translation: [
          {
            id: "A1-M1-L3-T1",
            question: "Traduza: 'Minha mãe é professora.'",
            answer: "My mother is a teacher.",
            alternatives: []
          },
          {
            id: "A1-M1-L3-T2",
            question: "Traduza: 'Meu irmão tem doze anos.'",
            answer: "My brother is twelve years old.",
            alternatives: []
          }
        ],

        grammarExercises: [
          {
            id: "A1-M1-L3-G1",
            question: "Choose the correct sentence.",
            options: [
              "My mother is a teacher.",
              "Mine mother is a teacher.",
              "Me mother is a teacher.",
              "My mother are a teacher."
            ],
            answer: 0,
            explanation: "My is the correct possessive adjective."
          },
          {
            id: "A1-M1-L3-G2",
            question: "Choose the correct sentence.",
            options: [
              "Her brother is twelve.",
              "His brother is twelve.",
              "She brother is twelve.",
              "Hers brother is twelve."
            ],
            answer: 0,
            explanation: "Her refers to a female owner."
          }
        ],

        activeRecall: [
          {
            id: "A1-M1-L3-R1",
            question: "Complete: _____ mother is a teacher.",
            answer: "My"
          },
          {
            id: "A1-M1-L3-R2",
            question: "Complete: _____ brother is twelve.",
            answer: "My"
          }
        ]
      },


      4: {
        subtitle: "Numbers, clock time, days, months and dates",

        objectives: [
          "Use basic numbers in English.",
          "Tell the time.",
          "Talk about days and months.",
          "Understand simple dates."
        ],

        introduction: {
          title: "Numbers and time",
          text:
            "Numbers and time are essential in everyday communication. We use them when talking about age, schedules, appointments, prices and dates."
        },

        vocabulary: [
          { word: "one", translation: "um", category: "numbers", example: "I have one brother." },
          { word: "ten", translation: "dez", category: "numbers", example: "It is ten o'clock." },
          { word: "twenty", translation: "vinte", category: "numbers", example: "She is twenty years old." },
          { word: "today", translation: "hoje", category: "time", example: "Today is Monday." },
          { word: "tomorrow", translation: "amanhã", category: "time", example: "See you tomorrow." },
          { word: "Monday", translation: "segunda-feira", category: "days", example: "I work on Monday." },
          { word: "January", translation: "janeiro", category: "months", example: "My birthday is in January." }
        ],

        grammar: {
          title: "It is... / It's...",
          explanation:
            "We use It is or It's to tell the time and talk about dates and simple time expressions.",
          examples: [
            "It is seven o'clock.",
            "It's ten thirty.",
            "Today is Monday."
          ],
          rule:
            "It's is the common contracted form of It is."
        },

        reading: {
          title: "My Schedule",
          text:
            "Today is Monday. I wake up at seven o'clock. I go to work at eight. I have lunch at twelve. I finish work at five. Tomorrow is Tuesday and I have an English class at seven in the evening.",
          translation:
            "Hoje é segunda-feira. Eu acordo às sete horas. Vou para o trabalho às oito. Almoço ao meio-dia. Termino o trabalho às cinco. Amanhã é terça-feira e tenho uma aula de inglês às sete da noite."
        },

        comprehension: [
          {
            id: "A1-M1-L4-Q1",
            question: "What day is today?",
            options: ["Monday", "Tuesday", "Wednesday", "Friday"],
            answer: 0,
            explanation: "Today is Monday."
          },
          {
            id: "A1-M1-L4-Q2",
            question: "What time does the person go to work?",
            options: ["7:00", "8:00", "12:00", "5:00"],
            answer: 1,
            explanation: "The person goes to work at eight."
          }
        ],

        translation: [
          {
            id: "A1-M1-L4-T1",
            question: "Traduza: 'Hoje é segunda-feira.'",
            answer: "Today is Monday.",
            alternatives: []
          },
          {
            id: "A1-M1-L4-T2",
            question: "Traduza: 'São sete horas.'",
            answer: "It is seven o'clock.",
            alternatives: ["It's seven o'clock."]
          }
        ],

        grammarExercises: [
          {
            id: "A1-M1-L4-G1",
            question: "Choose the correct sentence.",
            options: [
              "It are seven o'clock.",
              "It is seven o'clock.",
              "It am seven o'clock.",
              "It be seven o'clock."
            ],
            answer: 1,
            explanation: "The correct structure is It is."
          },
          {
            id: "A1-M1-L4-G2",
            question: "Choose the correct sentence.",
            options: [
              "Today are Monday.",
              "Today am Monday.",
              "Today is Monday.",
              "Today be Monday."
            ],
            answer: 2,
            explanation: "Today is Monday is correct."
          }
        ],

        activeRecall: [
          {
            id: "A1-M1-L4-R1",
            question: "Complete: Today _____ Monday.",
            answer: "is"
          },
          {
            id: "A1-M1-L4-R2",
            question: "Complete: It _____ seven o'clock.",
            answer: "is"
          }
        ]
      },


      5: {
        subtitle: "Common objects and things around us",

        objectives: [
          "Identify common everyday objects.",
          "Use this and that.",
          "Describe simple objects.",
          "Understand a basic description of a room."
        ],

        introduction: {
          title: "Things around me",
          text:
            "We use English to identify objects around us. In this lesson, you will learn useful everyday nouns and simple ways to describe them."
        },

        vocabulary: [
          { word: "book", translation: "livro", category: "objects", example: "This is my book." },
          { word: "phone", translation: "telefone/celular", category: "objects", example: "My phone is here." },
          { word: "table", translation: "mesa", category: "objects", example: "The book is on the table." },
          { word: "chair", translation: "cadeira", category: "objects", example: "The chair is next to the table." },
          { word: "computer", translation: "computador", category: "objects", example: "This is my computer." },
          { word: "door", translation: "porta", category: "objects", example: "The door is open." },
          { word: "window", translation: "janela", category: "objects", example: "The window is closed." }
        ],

        grammar: {
          title: "This and That",
          explanation:
            "This refers to something near us. That refers to something farther away.",
          examples: [
            "This is my book.",
            "This is a phone.",
            "That is a window.",
            "That is my computer."
          ],
          rule:
            "This = isto/este/esta. That = aquilo/aquele/aquela."
        },

        reading: {
          title: "My Room",
          text:
            "This is my room. There is a bed, a table and a chair. My computer is on the table. My books are next to the computer. There is a window near the bed. The room is small but comfortable.",
          translation:
            "Este é o meu quarto. Há uma cama, uma mesa e uma cadeira. Meu computador está sobre a mesa. Meus livros estão ao lado do computador. Há uma janela perto da cama. O quarto é pequeno, mas confortável."
        },

        comprehension: [
          {
            id: "A1-M1-L5-Q1",
            question: "Where is the computer?",
            options: [
              "On the bed.",
              "On the table.",
              "Under the chair.",
              "Near the door."
            ],
            answer: 1,
            explanation: "The computer is on the table."
          },
          {
            id: "A1-M1-L5-Q2",
            question: "How is the room?",
            options: [
              "Large and empty.",
              "Small but comfortable.",
              "Dark and dirty.",
              "Very old."
            ],
            answer: 1,
            explanation: "The text says the room is small but comfortable."
          }
        ],

        translation: [
          {
            id: "A1-M1-L5-T1",
            question: "Traduza: 'Este é o meu livro.'",
            answer: "This is my book.",
            alternatives: []
          },
          {
            id: "A1-M1-L5-T2",
            question: "Traduza: 'A janela está aberta.'",
            answer: "The window is open.",
            alternatives: []
          }
        ],

        grammarExercises: [
          {
            id: "A1-M1-L5-G1",
            question: "Choose the correct sentence.",
            options: [
              "This are my book.",
              "This is my book.",
              "This am my book.",
              "This be my book."
            ],
            answer: 1,
            explanation: "With this, use is for a singular object."
          },
          {
            id: "A1-M1-L5-G2",
            question: "Which word refers to something farther away?",
            options: [
              "This",
              "These",
              "That",
              "My"
            ],
            answer: 2,
            explanation: "That refers to a singular object farther away."
          }
        ],

        activeRecall: [
          {
            id: "A1-M1-L5-R1",
            question: "Complete: _____ is my book.",
            answer: "This"
          },
          {
            id: "A1-M1-L5-R2",
            question: "Complete: _____ is a window.",
            answer: "That"
          }
        ]
      }

    },


    /* ===================================================
       MÓDULO 2 — EVERYDAY ENGLISH
       =================================================== */

    2: {

      1: {
        subtitle: "Daily routines and common activities",

        objectives: [
          "Talk about daily activities.",
          "Use common routine verbs.",
          "Understand simple Present Simple sentences.",
          "Read a short daily routine."
        ],

        introduction: {
          title: "Everyday activities",
          text:
            "We use English every day to talk about what we do. This lesson introduces common activities such as waking up, eating, working, studying and sleeping."
        },

        vocabulary: [
          { word: "wake up", translation: "acordar", category: "routine", example: "I wake up at seven." },
          { word: "get up", translation: "levantar-se", category: "routine", example: "I get up at seven thirty." },
          { word: "eat", translation: "comer", category: "routine", example: "I eat breakfast." },
          { word: "work", translation: "trabalhar", category: "routine", example: "I work in the morning." },
          { word: "study", translation: "estudar", category: "routine", example: "I study English." },
          { word: "sleep", translation: "dormir", category: "routine", example: "I sleep at eleven." }
        ],

        grammar: {
          title: "Present Simple — I / You",
          explanation:
            "The Present Simple is used for routines and habits.",
          examples: [
            "I work every day.",
            "I study English.",
            "You work in the morning.",
            "You study at night."
          ],
          rule:
            "With I and you, use the base form of the verb."
        },

        reading: {
          title: "My Day",
          text:
            "I wake up at seven every morning. I have breakfast and go to work. In the afternoon, I come home and study English. At night, I have dinner and watch television. I go to bed at eleven.",
          translation:
            "Eu acordo às sete todas as manhãs. Tomo café da manhã e vou para o trabalho. À tarde, volto para casa e estudo inglês. À noite, janto e assisto televisão. Vou para a cama às onze."
        },

        comprehension: [
          {
            id: "A1-M2-L1-Q1",
            question: "What does the person study?",
            options: ["Math", "English", "Science", "History"],
            answer: 1,
            explanation: "The person studies English."
          },
          {
            id: "A1-M2-L1-Q2",
            question: "What time does the person go to bed?",
            options: ["9", "10", "11", "12"],
            answer: 2,
            explanation: "The person goes to bed at eleven."
          }
        ],

        translation: [
          {
            id: "A1-M2-L1-T1",
            question: "Traduza: 'Eu estudo inglês.'",
            answer: "I study English.",
            alternatives: []
          },
          {
            id: "A1-M2-L1-T2",
            question: "Traduza: 'Eu trabalho todos os dias.'",
            answer: "I work every day.",
            alternatives: []
          }
        ],

        grammarExercises: [
          {
            id: "A1-M2-L1-G1",
            question: "Choose the correct sentence.",
            options: [
              "I studies English.",
              "I study English.",
              "I studying English.",
              "I am study English."
            ],
            answer: 1,
            explanation: "With I, use study."
          }
        ],

        activeRecall: [
          {
            id: "A1-M2-L1-R1",
            question: "Complete: I _____ English.",
            answer: "study"
          }
        ]
      },


      2: {
        subtitle: "Food, drinks and simple preferences",

        objectives: [
          "Name common foods and drinks.",
          "Talk about what you like.",
          "Use simple food expressions.",
          "Understand a basic meal description."
        ],

        introduction: {
          title: "Food and drinks",
          text:
            "Food is part of everyday communication. We can talk about what we eat, what we drink and what we like."
        },

        vocabulary: [
          { word: "bread", translation: "pão", category: "food", example: "I eat bread for breakfast." },
          { word: "rice", translation: "arroz", category: "food", example: "I like rice." },
          { word: "chicken", translation: "frango", category: "food", example: "We have chicken for dinner." },
          { word: "fruit", translation: "fruta", category: "food", example: "I eat fruit every day." },
          { word: "water", translation: "água", category: "drinks", example: "I drink water." },
          { word: "coffee", translation: "café", category: "drinks", example: "She drinks coffee." },
          { word: "juice", translation: "suco", category: "drinks", example: "He likes orange juice." }
        ],

        grammar: {
          title: "Like and Don't Like",
          explanation:
            "We use like to talk about preferences and don't like to talk about things we do not enjoy.",
          examples: [
            "I like coffee.",
            "I like fruit.",
            "I don't like tea.",
            "I don't like fish."
          ],
          rule:
            "I/You + like or don't like + noun."
        },

        reading: {
          title: "My Favorite Food",
          text:
            "I like simple food. I like rice, chicken and vegetables. I also like fruit. I drink water every day. In the morning, I usually drink coffee. I don't like very sweet drinks.",
          translation:
            "Eu gosto de comida simples. Gosto de arroz, frango e vegetais. Também gosto de frutas. Bebo água todos os dias. De manhã, geralmente tomo café. Não gosto de bebidas muito doces."
        },

        comprehension: [
          {
            id: "A1-M2-L2-Q1",
            question: "What does the person like?",
            options: ["Rice and chicken", "Only fish", "Only tea", "Sweet drinks"],
            answer: 0,
            explanation: "The person likes rice and chicken."
          },
          {
            id: "A1-M2-L2-Q2",
            question: "What does the person drink every day?",
            options: ["Juice", "Milk", "Water", "Tea"],
            answer: 2,
            explanation: "The person drinks water every day."
          }
        ],

        translation: [
          {
            id: "A1-M2-L2-T1",
            question: "Traduza: 'Eu gosto de café.'",
            answer: "I like coffee.",
            alternatives: []
          },
          {
            id: "A1-M2-L2-T2",
            question: "Traduza: 'Eu não gosto de chá.'",
            answer: "I don't like tea.",
            alternatives: ["I do not like tea."]
          }
        ],

        grammarExercises: [
          {
            id: "A1-M2-L2-G1",
            question: "Choose the correct sentence.",
            options: [
              "I likes coffee.",
              "I like coffee.",
              "I liking coffee.",
              "I am like coffee."
            ],
            answer: 1,
            explanation: "With I, use like."
          }
        ],

        activeRecall: [
          {
            id: "A1-M2-L2-R1",
            question: "Complete: I _____ coffee.",
            answer: "like"
          }
        ]
      },


      3: {
        subtitle: "Rooms, furniture and places at home",

        objectives: [
          "Name common rooms in a house.",
          "Identify basic furniture.",
          "Use there is and there are.",
          "Describe a simple home."
        ],

        introduction: {
          title: "My home",
          text:
            "We can describe where we live by talking about rooms, furniture and objects."
        },

        vocabulary: [
          { word: "house", translation: "casa", category: "home", example: "My house is small." },
          { word: "kitchen", translation: "cozinha", category: "rooms", example: "The kitchen is clean." },
          { word: "bedroom", translation: "quarto", category: "rooms", example: "My bedroom is upstairs." },
          { word: "bathroom", translation: "banheiro", category: "rooms", example: "The bathroom is small." },
          { word: "living room", translation: "sala de estar", category: "rooms", example: "We watch TV in the living room." },
          { word: "bed", translation: "cama", category: "furniture", example: "The bed is comfortable." },
          { word: "sofa", translation: "sofá", category: "furniture", example: "The sofa is in the living room." }
        ],

        grammar: {
          title: "There Is and There Are",
          explanation:
            "There is is used with one thing. There are is used with two or more things.",
          examples: [
            "There is a kitchen.",
            "There is a bed.",
            "There are two bedrooms.",
            "There are three chairs."
          ],
          rule:
            "There is + singular. There are + plural."
        },

        reading: {
          title: "Our House",
          text:
            "Our house is small. There is a kitchen, a living room and two bedrooms. There is a sofa in the living room. There are two beds upstairs. There is also a small garden behind the house.",
          translation:
            "Nossa casa é pequena. Há uma cozinha, uma sala de estar e dois quartos. Há um sofá na sala. Há duas camas no andar de cima. Há também um pequeno jardim atrás da casa."
        },

        comprehension: [
          {
            id: "A1-M2-L3-Q1",
            question: "How many bedrooms are there?",
            options: ["One", "Two", "Three", "Four"],
            answer: 1,
            explanation: "There are two bedrooms."
          },
          {
            id: "A1-M2-L3-Q2",
            question: "Where is the sofa?",
            options: ["In the kitchen", "In the garden", "In the living room", "In the bedroom"],
            answer: 2,
            explanation: "The sofa is in the living room."
          }
        ],

        translation: [
          {
            id: "A1-M2-L3-T1",
            question: "Traduza: 'Há uma cozinha.'",
            answer: "There is a kitchen.",
            alternatives: []
          },
          {
            id: "A1-M2-L3-T2",
            question: "Traduza: 'Há dois quartos.'",
            answer: "There are two bedrooms.",
            alternatives: []
          }
        ],

        grammarExercises: [
          {
            id: "A1-M2-L3-G1",
            question: "Choose the correct sentence.",
            options: [
              "There are a kitchen.",
              "There is a kitchen.",
              "There am a kitchen.",
              "There be a kitchen."
            ],
            answer: 1,
            explanation: "Kitchen is singular, so use There is."
          }
        ],

        activeRecall: [
          {
            id: "A1-M2-L3-R1",
            question: "Complete: There _____ a kitchen.",
            answer: "is"
          }
        ]
      },


      4: {
        subtitle: "Basic vocabulary for work and school",

        objectives: [
          "Talk about school and work.",
          "Identify common occupations and activities.",
          "Use simple Present Simple sentences.",
          "Understand a basic work and study routine."
        ],

        introduction: {
          title: "Work and school",
          text:
            "Work and school are important parts of everyday life. We can describe what we do and where we study or work."
        },

        vocabulary: [
          { word: "school", translation: "escola", category: "education", example: "I go to school." },
          { word: "student", translation: "estudante", category: "education", example: "I am a student." },
          { word: "teacher", translation: "professor", category: "education", example: "She is a teacher." },
          { word: "office", translation: "escritório", category: "work", example: "I work in an office." },
          { word: "job", translation: "emprego/trabalho", category: "work", example: "I have a new job." },
          { word: "worker", translation: "trabalhador", category: "work", example: "He is a hard worker." },
          { word: "class", translation: "aula", category: "education", example: "My class starts at eight." }
        ],

        grammar: {
          title: "Present Simple — He / She",
          explanation:
            "With he and she, regular Present Simple verbs usually receive -s.",
          examples: [
            "I work here.",
            "She works here.",
            "I study English.",
            "He studies English."
          ],
          rule:
            "He/She/It usually takes -s or -es in the Present Simple."
        },

        reading: {
          title: "At Work and School",
          text:
            "Maria is a teacher. She works at a school. She starts work at eight o'clock. Her brother Pedro is a student. He studies English at night. They both like learning new things.",
          translation:
            "Maria é professora. Ela trabalha em uma escola. Ela começa a trabalhar às oito horas. Seu irmão Pedro é estudante. Ele estuda inglês à noite. Os dois gostam de aprender coisas novas."
        },

        comprehension: [
          {
            id: "A1-M2-L4-Q1",
            question: "What is Maria's job?",
            options: ["Student", "Teacher", "Doctor", "Driver"],
            answer: 1,
            explanation: "Maria is a teacher."
          },
          {
            id: "A1-M2-L4-Q2",
            question: "When does Pedro study English?",
            options: ["In the morning", "At noon", "At night", "At school"],
            answer: 2,
            explanation: "Pedro studies English at night."
          }
        ],

        translation: [
          {
            id: "A1-M2-L4-T1",
            question: "Traduza: 'Ela trabalha em uma escola.'",
            answer: "She works at a school.",
            alternatives: []
          },
          {
            id: "A1-M2-L4-T2",
            question: "Traduza: 'Ele estuda inglês.'",
            answer: "He studies English.",
            alternatives: []
          }
        ],

        grammarExercises: [
          {
            id: "A1-M2-L4-G1",
            question: "Choose the correct sentence.",
            options: [
              "She work at a school.",
              "She works at a school.",
              "She working at a school.",
              "She workes at a school."
            ],
            answer: 1,
            explanation: "Work becomes works with she."
          }
        ],

        activeRecall: [
          {
            id: "A1-M2-L4-R1",
            question: "Complete: She _____ at a school.",
            answer: "works"
          }
        ]
      },


      5: {
        subtitle: "Hobbies, sports and free-time activities",

        objectives: [
          "Talk about hobbies.",
          "Describe free-time activities.",
          "Use like + activity.",
          "Understand a short text about leisure."
        ],

        introduction: {
          title: "What do you do in your free time?",
          text:
            "Free time is an opportunity to relax and enjoy activities. We can talk about sports, music, movies, books and hobbies."
        },

        vocabulary: [
          { word: "read", translation: "ler", category: "free time", example: "I read books." },
          { word: "watch", translation: "assistir", category: "free time", example: "I watch movies." },
          { word: "play", translation: "jogar/tocar", category: "free time", example: "I play soccer." },
          { word: "listen", translation: "escutar", category: "free time", example: "I listen to music." },
          { word: "music", translation: "música", category: "free time", example: "I like music." },
          { word: "movie", translation: "filme", category: "free time", example: "We watch a movie." },
          { word: "sport", translation: "esporte", category: "free time", example: "Football is my favorite sport." }
        ],

        grammar: {
          title: "Like + Activities",
          explanation:
            "We can use like to talk about activities we enjoy.",
          examples: [
            "I like reading.",
            "I like music.",
            "I like watching movies.",
            "I don't like running."
          ],
          rule:
            "Use like to express a positive preference and don't like for a negative preference."
        },

        reading: {
          title: "My Free Time",
          text:
            "In my free time, I like reading books and listening to music. On weekends, I play soccer with my friends. Sometimes we watch a movie together. I don't like staying at home all day because I enjoy being active.",
          translation:
            "No meu tempo livre, gosto de ler livros e ouvir música. Nos fins de semana, jogo futebol com meus amigos. Às vezes assistimos a um filme juntos. Não gosto de ficar em casa o dia inteiro porque gosto de ser ativo."
        },

        comprehension: [
          {
            id: "A1-M2-L5-Q1",
            question: "What does the person like doing?",
            options: ["Reading and listening to music", "Sleeping all day", "Working", "Cooking"],
            answer: 0,
            explanation: "The person likes reading and listening to music."
          },
          {
            id: "A1-M2-L5-Q2",
            question: "What does the person do on weekends?",
            options: ["Studies", "Plays soccer", "Works", "Travels"],
            answer: 1,
            explanation: "The person plays soccer on weekends."
          }
        ],

        translation: [
          {
            id: "A1-M2-L5-T1",
            question: "Traduza: 'Eu gosto de ler livros.'",
            answer: "I like reading books.",
            alternatives: ["I like to read books."]
          },
          {
            id: "A1-M2-L5-T2",
            question: "Traduza: 'Eu jogo futebol nos fins de semana.'",
            answer: "I play soccer on weekends.",
            alternatives: ["I play football on weekends."]
          }
        ],

        grammarExercises: [
          {
            id: "A1-M2-L5-G1",
            question: "Choose the correct sentence.",
            options: [
              "I like reading.",
              "I likes reading.",
              "I liking reading.",
              "I am like reading."
            ],
            answer: 0,
            explanation: "With I, use like."
          }
        ],

        activeRecall: [
          {
            id: "A1-M2-L5-R1",
            question: "Complete: I like _____ books.",
            answer: "reading"
          }
        ]
      }

    },


    /* ===================================================
       MÓDULO 3 — BASIC COMMUNICATION
       =================================================== */

    3: {

      1: {
        subtitle: "Present Simple for habits and routines",

        objectives: [
          "Understand the Present Simple.",
          "Talk about regular habits.",
          "Use affirmative sentences correctly.",
          "Recognize third-person -s."
        ],

        introduction: {
          title: "Habits and routines",
          text:
            "The Present Simple is one of the most important structures in English. We use it for habits, routines and things that happen regularly."
        },

        vocabulary: [
          { word: "usually", translation: "geralmente", category: "frequency", example: "I usually wake up early." },
          { word: "always", translation: "sempre", category: "frequency", example: "She always studies." },
          { word: "sometimes", translation: "às vezes", category: "frequency", example: "We sometimes eat out." },
          { word: "never", translation: "nunca", category: "frequency", example: "He never drinks coffee." },
          { word: "every day", translation: "todos os dias", category: "frequency", example: "I study every day." },
          { word: "morning", translation: "manhã", category: "time", example: "I work in the morning." }
        ],

        grammar: {
          title: "Present Simple — Habits",
          explanation:
            "Use the Present Simple for repeated actions and routines.",
          examples: [
            "I study every day.",
            "You work in the morning.",
            "She studies every day.",
            "He works at home."
          ],
          rule:
            "I/You/We/They use the base verb. He/She/It usually adds -s or -es."
        },

        reading: {
          title: "A Regular Week",
          text:
            "I usually wake up early and study English before work. My sister works from home. She starts work at nine and finishes at five. We usually have dinner together in the evening.",
          translation:
            "Eu geralmente acordo cedo e estudo inglês antes do trabalho. Minha irmã trabalha de casa. Ela começa a trabalhar às nove e termina às cinco. Geralmente jantamos juntos à noite."
        },

        comprehension: [
          {
            id: "A1-M3-L1-Q1",
            question: "When does the person study English?",
            options: ["Before work", "After dinner", "At midnight", "At school"],
            answer: 0,
            explanation: "The person studies English before work."
          },
          {
            id: "A1-M3-L1-Q2",
            question: "Where does the sister work?",
            options: ["At school", "At home", "At a restaurant", "At a hospital"],
            answer: 1,
            explanation: "She works from home."
          }
        ],

        translation: [
          {
            id: "A1-M3-L1-T1",
            question: "Traduza: 'Eu estudo inglês todos os dias.'",
            answer: "I study English every day.",
            alternatives: []
          },
          {
            id: "A1-M3-L1-T2",
            question: "Traduza: 'Ela trabalha de casa.'",
            answer: "She works from home.",
            alternatives: []
          }
        ],

        grammarExercises: [
          {
            id: "A1-M3-L1-G1",
            question: "Choose the correct sentence.",
            options: [
              "She work from home.",
              "She works from home.",
              "She working from home.",
              "She work from homes."
            ],
            answer: 1,
            explanation: "With she, work becomes works."
          }
        ],

        activeRecall: [
          {
            id: "A1-M3-L1-R1",
            question: "Complete: She _____ from home.",
            answer: "works"
          }
        ]
      },


      2: {
        subtitle: "Describing places and objects with there is and there are",

        objectives: [
          "Describe places.",
          "Use there is correctly.",
          "Use there are correctly.",
          "Distinguish singular and plural."
        ],

        introduction: {
          title: "What is there?",
          text:
            "When we describe a room, city or place, we often need to say what exists there. English uses there is and there are for this purpose."
        },

        vocabulary: [
          { word: "street", translation: "rua", category: "places", example: "There is a shop on the street." },
          { word: "park", translation: "parque", category: "places", example: "There is a park nearby." },
          { word: "shop", translation: "loja", category: "places", example: "There is a shop here." },
          { word: "school", translation: "escola", category: "places", example: "There is a school near my house." },
          { word: "car", translation: "carro", category: "objects", example: "There is a car outside." },
          { word: "people", translation: "pessoas", category: "people", example: "There are many people here." }
        ],

        grammar: {
          title: "There Is / There Are",
          explanation:
            "Use there is for one thing and there are for more than one thing.",
          examples: [
            "There is a park.",
            "There is one school.",
            "There are two shops.",
            "There are many people."
          ],
          rule:
            "Singular → there is. Plural → there are."
        },

        reading: {
          title: "My Neighborhood",
          text:
            "My neighborhood is quiet. There is a small park near my house. There are two shops and a bakery on the main street. There is also a school nearby. There are many trees in the area.",
          translation:
            "Meu bairro é tranquilo. Há um pequeno parque perto da minha casa. Há duas lojas e uma padaria na rua principal. Também há uma escola por perto. Há muitas árvores na região."
        },

        comprehension: [
          {
            id: "A1-M3-L2-Q1",
            question: "What is near the house?",
            options: ["A hospital", "A park", "A supermarket", "A station"],
            answer: 1,
            explanation: "There is a small park near the house."
          },
          {
            id: "A1-M3-L2-Q2",
            question: "How many shops are there?",
            options: ["One", "Two", "Three", "Four"],
            answer: 1,
            explanation: "There are two shops."
          }
        ],

        translation: [
          {
            id: "A1-M3-L2-T1",
            question: "Traduza: 'Há um parque perto da minha casa.'",
            answer: "There is a park near my house.",
            alternatives: []
          }
        ],

        grammarExercises: [
          {
            id: "A1-M3-L2-G1",
            question: "Choose the correct sentence.",
            options: [
              "There is two shops.",
              "There are two shops.",
              "There am two shops.",
              "There be two shops."
            ],
            answer: 1,
            explanation: "Two shops is plural, so use there are."
          }
        ],

        activeRecall: [
          {
            id: "A1-M3-L2-R1",
            question: "Complete: There _____ two shops.",
            answer: "are"
          }
        ]
      },


      3: {
        subtitle: "Talking about abilities with can and can't",

        objectives: [
          "Talk about abilities.",
          "Use can correctly.",
          "Use can't for inability.",
          "Ask simple ability questions."
        ],

        introduction: {
          title: "What can you do?",
          text:
            "Can is used to talk about ability or possibility. Can't is used when someone is unable to do something."
        },

        vocabulary: [
          { word: "swim", translation: "nadar", category: "abilities", example: "I can swim." },
          { word: "drive", translation: "dirigir", category: "abilities", example: "She can drive." },
          { word: "cook", translation: "cozinhar", category: "abilities", example: "He can cook." },
          { word: "sing", translation: "cantar", category: "abilities", example: "I can sing." },
          { word: "dance", translation: "dançar", category: "abilities", example: "They can dance." },
          { word: "speak", translation: "falar", category: "abilities", example: "I can speak English." }
        ],

        grammar: {
          title: "Can and Can't",
          explanation:
            "Can is used for ability. Can't is the negative form.",
          examples: [
            "I can swim.",
            "She can drive.",
            "I can't dance.",
            "He can't swim."
          ],
          rule:
            "After can and can't, use the base form of the verb."
        },

        reading: {
          title: "Things I Can Do",
          text:
            "I can cook and I can drive. I can also speak a little English. My brother can swim very well, but he can't cook. My sister can dance and sing.",
          translation:
            "Eu sei cozinhar e dirigir. Também consigo falar um pouco de inglês. Meu irmão sabe nadar muito bem, mas não sabe cozinhar. Minha irmã sabe dançar e cantar."
        },

        comprehension: [
          {
            id: "A1-M3-L3-Q1",
            question: "What can the speaker do?",
            options: ["Cook and drive", "Swim only", "Dance only", "Nothing"],
            answer: 0,
            explanation: "The speaker can cook and drive."
          },
          {
            id: "A1-M3-L3-Q2",
            question: "What can't the brother do?",
            options: ["Swim", "Drive", "Cook", "Speak"],
            answer: 2,
            explanation: "The brother can't cook."
          }
        ],

        translation: [
          {
            id: "A1-M3-L3-T1",
            question: "Traduza: 'Eu sei nadar.'",
            answer: "I can swim.",
            alternatives: []
          },
          {
            id: "A1-M3-L3-T2",
            question: "Traduza: 'Eu não sei cozinhar.'",
            answer: "I can't cook.",
            alternatives: ["I cannot cook."]
          }
        ],

        grammarExercises: [
          {
            id: "A1-M3-L3-G1",
            question: "Choose the correct sentence.",
            options: [
              "I can to swim.",
              "I can swimming.",
              "I can swim.",
              "I can swims."
            ],
            answer: 2,
            explanation: "After can, use the base form of the verb."
          }
        ],

        activeRecall: [
          {
            id: "A1-M3-L3-R1",
            question: "Complete: I _____ swim.",
            answer: "can"
          }
        ]
      },


      4: {
        subtitle: "Asking and answering basic questions",

        objectives: [
          "Ask simple questions.",
          "Use common question words.",
          "Give short answers.",
          "Understand basic everyday questions."
        ],

        introduction: {
          title: "Questions are communication",
          text:
            "Asking questions is essential when learning a language. In English, words such as what, where, who, when and how help us obtain information."
        },

        vocabulary: [
          { word: "what", translation: "o que/qual", category: "question words", example: "What is your name?" },
          { word: "where", translation: "onde", category: "question words", example: "Where do you live?" },
          { word: "who", translation: "quem", category: "question words", example: "Who is she?" },
          { word: "when", translation: "quando", category: "question words", example: "When do you work?" },
          { word: "how", translation: "como", category: "question words", example: "How are you?" },
          { word: "why", translation: "por quê", category: "question words", example: "Why are you here?" }
        ],

        grammar: {
          title: "Basic Question Words",
          explanation:
            "Question words help us ask for specific information.",
          examples: [
            "What is your name?",
            "Where do you live?",
            "Who is your teacher?",
            "When do you study?",
            "How are you?"
          ],
          rule:
            "Question words normally appear at the beginning of the question."
        },

        reading: {
          title: "A Short Conversation",
          text:
  `Anna: What is your name?
John: My name is John.

Anna: Where do you live?
John: I live in São Paulo.

Anna: What do you do?
John: I am a student.`,
          translation:
            "Anna: Qual é o seu nome?  
            John: Meu nome é John.  
            Anna: Onde você mora?  
            John: Eu moro em São Paulo.  
            Anna: O que você faz?  
            John: Eu sou estudante."
        },

        comprehension: [
          {
            id: "A1-M3-L4-Q1",
            question: "What is the man's name?",
            options: ["John", "Peter", "David", "Lucas"],
            answer: 0,
            explanation: "His name is John."
          },
          {
            id: "A1-M3-L4-Q2",
            question: "Where does John live?",
            options: ["Rio", "London", "São Paulo", "New York"],
            answer: 2,
            explanation: "John lives in São Paulo."
          }
        ],

        translation: [
          {
            id: "A1-M3-L4-T1",
            question: "Traduza: 'Onde você mora?'",
            answer: "Where do you live?",
            alternatives: []
          },
          {
            id: "A1-M3-L4-T2",
            question: "Traduza: 'Qual é o seu nome?'",
            answer: "What is your name?",
            alternatives: []
          }
        ],

        grammarExercises: [
          {
            id: "A1-M3-L4-G1",
            question: "Choose the correct question.",
            options: [
              "Where you live?",
              "Where do you live?",
              "Where are live you?",
              "Where live you?"
            ],
            answer: 1,
            explanation: "Where do you live? is the correct Present Simple question."
          }
        ],

        activeRecall: [
          {
            id: "A1-M3-L4-R1",
            question: "Complete: _____ is your name?",
            answer: "What"
          }
        ]
      },


      5: {
        subtitle: "A practical review of the A1 level",

        objectives: [
          "Review the main A1 structures.",
          "Use basic English in everyday situations.",
          "Read and understand a short text.",
          "Prepare for the A1 assessment."
        ],

        introduction: {
          title: "You can communicate!",
          text:
            "You have reached the final lesson of A1. This lesson brings together greetings, personal information, family, routines, food, places, abilities and basic questions."
        },

        vocabulary: [
          { word: "introduce", translation: "apresentar", category: "communication", example: "Let me introduce myself." },
          { word: "routine", translation: "rotina", category: "daily life", example: "My routine is simple." },
          { word: "family", translation: "família", category: "people", example: "My family is important to me." },
          { word: "favorite", translation: "favorito", category: "preferences", example: "English is my favorite subject." },
          { word: "learn", translation: "aprender", category: "learning", example: "I learn English every day." },
          { word: "practice", translation: "praticar", category: "learning", example: "I practice English every day." },
          { word: "understand", translation: "entender", category: "communication", example: "I understand the question." }
        ],

        grammar: {
          title: "A1 Grammar Review",
          explanation:
            "This review combines the main structures studied in A1: verb to be, Present Simple, there is/are, can/can't and basic questions.",
          examples: [
            "I am a student.",
            "I study English.",
            "There is a park near my house.",
            "I can speak English.",
            "Where do you live?"
          ],
          rule:
            "Choose the structure according to the meaning and situation."
        },

        reading: {
          title: "My English Journey",
          text:
            "My name is Lucas and I am from Brazil. I live with my family in a small city. I work during the day and study English in the evening. I like reading and listening to music. I can understand simple English conversations. There is still a lot to learn, but I practice every day. I am happy because I can communicate more than before.",
          translation:
            "Meu nome é Lucas e sou do Brasil. Moro com minha família em uma cidade pequena. Trabalho durante o dia e estudo inglês à noite. Gosto de ler e ouvir música. Consigo entender conversas simples em inglês. Ainda há muito para aprender, mas pratico todos os dias. Estou feliz porque consigo me comunicar mais do que antes."
        },

        comprehension: [
          {
            id: "A1-M3-L5-Q1",
            question: "Where is Lucas from?",
            options: ["Canada", "Brazil", "England", "Australia"],
            answer: 1,
            explanation: "Lucas is from Brazil."
          },
          {
            id: "A1-M3-L5-Q2",
            question: "When does Lucas study English?",
            options: ["In the morning", "At noon", "In the evening", "At midnight"],
            answer: 2,
            explanation: "He studies English in the evening."
          },
          {
            id: "A1-M3-L5-Q3",
            question: "Why is Lucas happy?",
            options: [
              "He has a new car.",
              "He can communicate more than before.",
              "He does not study.",
              "He lives alone."
            ],
            answer: 1,
            explanation: "He is happy because he can communicate more than before."
          }
        ],

        translation: [
          {
            id: "A1-M3-L5-T1",
            question: "Traduza: 'Eu estudo inglês todos os dias.'",
            answer: "I study English every day.",
            alternatives: []
          },
          {
            id: "A1-M3-L5-T2",
            question: "Traduza: 'Eu consigo falar inglês.'",
            answer: "I can speak English.",
            alternatives: []
          }
        ],

        grammarExercises: [
          {
            id: "A1-M3-L5-G1",
            question: "Choose the correct sentence.",
            options: [
              "I am student.",
              "I am a student.",
              "I is a student.",
              "I are a student."
            ],
            answer: 1,
            explanation: "A singular countable profession or identity normally requires the article a."
          },
          {
            id: "A1-M3-L5-G2",
            question: "Choose the correct sentence.",
            options: [
              "She study English.",
              "She studies English.",
              "She studying English.",
              "She studies Englishs."
            ],
            answer: 1,
            explanation: "With she, study becomes studies."
          },
          {
            id: "A1-M3-L5-G3",
            question: "Choose the correct sentence.",
            options: [
              "There are a park.",
              "There is a park.",
              "There am a park.",
              "There be a park."
            ],
            answer: 1,
            explanation: "Park is singular, so use there is."
          }
        ],

        activeRecall: [
          {
            id: "A1-M3-L5-R1",
            question: "Complete: I _____ English every day.",
            answer: "study"
          },
          {
            id: "A1-M3-L5-R2",
            question: "Complete: I _____ speak English.",
            answer: "can"
          },
          {
            id: "A1-M3-L5-R3",
            question: "Complete: There _____ a park near my house.",
            answer: "is"
          }
        ]
      }

    }

  };


  /* =====================================================
     SELECIONA CONTEÚDO ESPECÍFICO DO A1
     ===================================================== */

  if (
    level === "A1" &&
    A1_CONTENT[moduleNumber] &&
    A1_CONTENT[moduleNumber][lessonNumber]
  ) {

    const specific =
      A1_CONTENT[moduleNumber][lessonNumber];

    return {

      level,
      module: moduleNumber,
      lesson: lessonNumber,

      title,

      subtitle:
        specific.subtitle || description,

      estimatedMinutes: 15,

      objectives:
        specific.objectives || [],

      introduction:
        specific.introduction || {
          title,
          text: description
        },

      vocabulary:
        specific.vocabulary || [],

      grammar:
        specific.grammar || {
          title: "Grammar",
          explanation: "",
          examples: [],
          rule: ""
        },

      reading:
        specific.reading || {
          title,
          text: "",
          translation: ""
        },

      comprehension:
        specific.comprehension || [],

      translation:
        specific.translation || [],

      grammarExercises:
        specific.grammarExercises || [],

      activeRecall:
        specific.activeRecall || []

    };

  }


  /* =====================================================
     CONTEÚDO GENÉRICO PARA OS NÍVEIS AINDA NÃO EXPANDIDOS
     ===================================================== */

  const vocabulary = VOCABULARY_BY_LEVEL[level] || [];
  const grammar = GRAMMAR_BY_LEVEL[level] || [];

  const selectedVocabulary =
    vocabulary.slice(
      (lessonNumber - 1) % 4,
      ((lessonNumber - 1) % 4) + 5
    );

  const grammarTopic =
    grammar[
      (lessonNumber - 1) % grammar.length
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

    subtitle: description,

    estimatedMinutes: 15,

    objectives: [
      `Understand the topic: ${title}.`,
      `Learn useful ${level} vocabulary.`,
      `Practice ${grammarTopic}.`,
      "Improve reading and active recall."
    ],

    introduction: {
      title: `Let's study: ${title}`,
      text:
        `In this lesson, you will explore ${title.toLowerCase()}. The goal is to understand the main ideas, learn useful expressions, practice grammar and use English in meaningful situations.`
    },

    vocabulary:

      words.map(item => ({

        word: item[0],

        translation: item[1],

        category: title,

        example:
          `This lesson helps you use "${item[0]}" in context.`

      })),

    grammar: {

      title: grammarTopic,

      explanation:
        `This lesson introduces and practices ${grammarTopic}. Pay attention to how the structure is used in real communication.`,

      rule:
        `Use ${grammarTopic} according to the meaning and context of the sentence.`,

      examples: [
        `This lesson gives you practice with ${grammarTopic}.`,
        "I use English to communicate clearly.",
        "People use language differently depending on the situation."
      ]

    },

    reading: {

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

        answer: 0,

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

        answer: "study"

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
