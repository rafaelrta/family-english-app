/* =========================================================
   ENGLISH FAMILY
   COURSE-DATA.JS
   v1.4.0

   Currículo A1 → C1
   Referência pedagógica:
   American English File

   IMPORTANTE:
   AEF = referência pedagógica.
   Conteúdo do English Family = conteúdo próprio.
   ========================================================= */


/* =========================================================
   1. REFERÊNCIA PEDAGÓGICA
   ========================================================= */

const PEDAGOGY_REFERENCE = {

  primaryReference:
    "American English File",

  publisher:
    "Oxford University Press",

  usage:
    "pedagogical_reference",

  copyrightPolicy:
    "original_content_only",

  methodology:

    [

      "reading in context",

      "vocabulary from context",

      "grammar in meaningful situations",

      "comprehension",

      "translation as support",

      "active recall",

      "spaced repetition",

      "speaking",

      "listening",

      "writing",

      "real-world communication"

    ]

};


/* =========================================================
   2. PERFIS DOS NÍVEIS
   ========================================================= */

const LEVEL_PROFILES = {

  A1: {

    title:
      "A1 — Beginner",

    description:
      "Foundation English for everyday communication.",

    referenceBand:
      "American English File beginner progression",

    difficulty:
      1,

    grammar:

      [

        "verb to be",

        "subject pronouns",

        "possessive adjectives",

        "present simple",

        "there is / there are",

        "can",

        "basic questions",

        "basic prepositions",

        "present continuous",

        "past simple introduction"

      ],

    vocabulary:

      [

        "personal information",

        "family",

        "home",

        "daily routine",

        "food",

        "work",

        "school",

        "places",

        "time",

        "weather"

      ]

  },


  A2: {

    title:
      "A2 — Elementary",

    description:
      "Elementary English for familiar situations and everyday communication.",

    referenceBand:
      "American English File elementary progression",

    difficulty:
      2,

    grammar:

      [

        "present simple",

        "present continuous",

        "past simple",

        "future plans",

        "going to",

        "will",

        "comparatives",

        "superlatives",

        "adverbs of frequency",

        "present perfect introduction",

        "modals",

        "first conditional"

      ],

    vocabulary:

      [

        "daily routines",

        "work",

        "travel",

        "health",

        "shopping",

        "technology",

        "relationships",

        "experiences",

        "plans",

        "problems and solutions"

      ]

  },


  B1: {

    title:
      "B1 — Intermediate",

    description:
      "Independent communication in common personal, professional and social situations.",

    referenceBand:
      "American English File intermediate progression",

    difficulty:
      3,

    grammar:

      [

        "past simple",

        "past continuous",

        "present perfect",

        "present perfect continuous",

        "future forms",

        "conditionals",

        "modals",

        "reported speech",

        "relative clauses",

        "gerunds and infinitives"

      ],

    vocabulary:

      [

        "work",

        "education",

        "travel",

        "technology",

        "society",

        "experiences",

        "communication",

        "problems",

        "opinions",

        "personal goals"

      ]

  },


  B2: {

    title:
      "B2 — Upper Intermediate",

    description:
      "Confident communication with increasingly complex language.",

    referenceBand:
      "American English File upper-intermediate progression",

    difficulty:
      4,

    grammar:

      [

        "advanced present perfect",

        "narrative tenses",

        "conditionals",

        "passive voice",

        "reported speech",

        "modal verbs",

        "relative clauses",

        "advanced linking",

        "complex sentences",

        "discourse markers"

      ],

    vocabulary:

      [

        "workplace",

        "culture",

        "media",

        "technology",

        "society",

        "relationships",

        "environment",

        "decision making",

        "current issues",

        "abstract ideas"

      ]

  },


  C1: {

    title:
      "C1 — Advanced",

    description:
      "Advanced comprehension and precise communication.",

    referenceBand:
      "Advanced English progression aligned with English Family objectives",

    difficulty:
      5,

    grammar:

      [

        "advanced conditionals",

        "inversion",

        "cleft sentences",

        "advanced passive",

        "advanced reported speech",

        "complex clauses",

        "modal nuances",

        "discourse structure",

        "register",

        "advanced cohesion"

      ],

    vocabulary:

      [

        "abstract concepts",

        "professional communication",

        "academic communication",

        "culture",

        "society",

        "argumentation",

        "analysis",

        "leadership",

        "ethics",

        "complex real-world situations"

      ]

  }

};


/* =========================================================
   3. CRIAÇÃO DE METADADOS DINÂMICOS
   ========================================================= */

function createDynamicMetadata(
  level,
  moduleNumber,
  lessonNumber,
  title,
  topic,
  grammar,
  vocabulary,
  skills
) {

  return {

    enabled:
      true,

    contentMode:
      "dynamic_with_fallback",

    level,

    module:
      moduleNumber,

    lesson:
      lessonNumber,

    topic,

    searchTopics:

      [

        topic,

        `${topic} everyday English`,

        `${topic} English learning`

      ],

    targetGrammar:
      grammar || [],

    targetVocabulary:
      vocabulary || [],

    targetSkills:
      skills || [

        "reading",

        "vocabulary",

        "grammar",

        "comprehension",

        "translation",

        "active_recall"

      ],

    objectives:

      [

        `Understand English about ${topic}.`,

        "Learn vocabulary in context.",

        "Practice the target grammar.",

        "Strengthen comprehension.",

        "Use active recall."

      ]

  };

}


/* =========================================================
   4. GERADOR DE AULA GENÉRICA
   ========================================================= */

function createGenericContent(
  level,
  moduleNumber,
  lessonNumber,
  title,
  description,
  topic,
  grammar,
  vocabulary
) {

  const metadata =
    createDynamicMetadata(
      level,
      moduleNumber,
      lessonNumber,
      title,
      topic,
      grammar,
      vocabulary
    );

  return {

    level,

    module:
      moduleNumber,

    lesson:
      lessonNumber,

    title,

    description,

    sourceType:
      "internal_fallback",

    dynamicContent:
      metadata,

    objectives:
      metadata.objectives,

    introduction: {

      title,

      text:
        `This lesson focuses on ${topic}. Read the text first and try to understand the context before translating.`

    },

    vocabulary:
      vocabulary.map(
        word => ({

          word,

          translation:
            "",

          category:
            topic,

          example:
            `This word is useful when talking about ${topic}.`

        })
      ),

    grammar: {

      title:
        grammar[0] ||
        getDefaultGrammarForLevel(
          level
        ),

      explanation:
        `This lesson practices ${grammar.join(", ")} in meaningful situations.`,

      rule:
        `Pay attention to how ${grammar[0] || "the target structure"} is used in complete sentences.`,

      examples:

        [

          "I use English every day.",

          "She practices English at home.",

          "They are learning together."

        ]

    },

    reading: {

      title:
        title,

      text:
        createFallbackReading(
          level,
          topic
        ),

      translation:
        "Read the English text first. Check the translation only after trying to understand the context."

    },

    comprehension:

      [

        {

          id:
            `${level}-M${moduleNumber}-L${lessonNumber}-C1`,

          question:
            "What is the main topic of the reading?",

          options:

            [

              `It is about ${topic}.`,

              "It is about a historical war.",

              "It is about cooking only.",

              "It is about mathematics."

            ],

          answer:
            0,

          explanation:
            `The reading focuses on ${topic}.`

        },

        {

          id:
            `${level}-M${moduleNumber}-L${lessonNumber}-C2`,

          question:
            "What should the learner do first?",

          options:

            [

              "Try to understand the context.",

              "Translate every word immediately.",

              "Ignore the text.",

              "Memorize random vocabulary."

            ],

          answer:
            0,

          explanation:
            "The English Family method begins with comprehension through context."

        }

      ],

    translation:

      [

        {

          id:
            `${level}-M${moduleNumber}-L${lessonNumber}-T1`,

          question:
            "Translate one important idea from the reading into Portuguese.",

          answer:
            "",

          alternatives:
            []

        }

      ],

    grammarExercises:

      [

        {

          id:
            `${level}-M${moduleNumber}-L${lessonNumber}-G1`,

          question:
            `Which sentence best demonstrates ${grammar[0] || "the target grammar"}?`,

          options:

            [

              "I practice English every day.",

              "Yesterday blue quickly table.",

              "Because seven computer.",

              "House morning running."

            ],

          answer:
            0,

          explanation:
            "The first option is a complete sentence with meaningful context."

        }

      ],

    activeRecall:

      [

        {

          id:
            `${level}-M${moduleNumber}-L${lessonNumber}-A1`,

          question:
            "Without looking back, write one thing you remember from the reading.",

          answer:
            "",

          alternatives:
            []

        }

      ]

  };

}


/* =========================================================
   5. LEITURAS DE FALLBACK
   ========================================================= */

function createFallbackReading(
  level,
  topic
) {

  const texts = {

    A1:

      `People talk about ${topic} in many everyday situations. They can use simple English to describe people, places, activities and plans. Learning useful words in context helps beginners understand more English. Regular practice can make communication easier.`,

    A2:

      `People often talk about ${topic} in everyday life. They may describe what they usually do, what happened recently, or what they are planning to do. Understanding vocabulary through context helps learners communicate with greater confidence.`,

    B1:

      `When people discuss ${topic}, they often need to describe experiences, explain problems and express opinions. Understanding the language in context makes it easier to recognize useful expressions and communicate more naturally.`,

    B2:

      `The way people discuss ${topic} can reveal differences in priorities, expectations and personal experiences. Learners who pay attention to vocabulary in context are more likely to understand how expressions are used in natural communication.`,

    C1:

      `Discussions involving ${topic} frequently require speakers to interpret context, recognize nuance and distinguish between different registers of language. Rather than relying exclusively on isolated vocabulary, advanced learners benefit from observing how meaning is constructed within complete situations.`

  };

  return (
    texts[level] ||
    texts.A2
  );

}


function getDefaultGrammarForLevel(
  level
) {

  const map = {

    A1:
      "present simple",

    A2:
      "present simple",

    B1:
      "past simple",

    B2:
      "present perfect",

    C1:
      "conditionals"

  };

  return (
    map[level] ||
    "present simple"
  );

}


/* =========================================================
   6. CURRÍCULO
   ========================================================= */

const CURRICULUM = {

  A1: {

    1: {

      title:
        "Getting Started",

      lessons:

        [

          {
            title:
              "Introducing Yourself",

            topic:
              "personal information",

            grammar:
              ["verb to be"],

            vocabulary:
              [
                "name",
                "age",
                "country",
                "city",
                "family"
              ]
          },

          {
            title:
              "My Family",

            topic:
              "family",

            grammar:
              ["possessive adjectives"],

            vocabulary:
              [
                "mother",
                "father",
                "brother",
                "sister",
                "parents"
              ]
          },

          {
            title:
              "My Home",

            topic:
              "home",

            grammar:
              ["there is / there are"],

            vocabulary:
              [
                "house",
                "room",
                "kitchen",
                "bedroom",
                "bathroom"
              ]
          },

          {
            title:
              "My Daily Life",

            topic:
              "daily routine",

            grammar:
              ["present simple"],

            vocabulary:
              [
                "wake up",
                "work",
                "study",
                "eat",
                "sleep"
              ]
          },

          {
            title:
              "Time and Schedules",

            topic:
              "time",

            grammar:
              ["questions with what time"],

            vocabulary:
              [
                "morning",
                "afternoon",
                "evening",
                "today",
                "tomorrow"
              ]
          }

        ]

    },

    2: {

      title:
        "Everyday English",

      lessons:

        [

          {
            title:
              "Food",

            topic:
              "food",

            grammar:
              ["like / don't like"],

            vocabulary:
              [
                "bread",
                "rice",
                "water",
                "coffee",
                "fruit"
              ]
          },

          {
            title:
              "At Work",

            topic:
              "work",

            grammar:
              ["can / can't"],

            vocabulary:
              [
                "job",
                "office",
                "manager",
                "meeting",
                "computer"
              ]
          },

          {
            title:
              "Around Town",

            topic:
              "places",

            grammar:
              ["prepositions of place"],

            vocabulary:
              [
                "bank",
                "school",
                "market",
                "station",
                "hospital"
              ]
          },

          {
            title:
              "The Weather",

            topic:
              "weather",

            grammar:
              ["it is"],

            vocabulary:
              [
                "sunny",
                "rainy",
                "hot",
                "cold",
                "cloudy"
              ]
          },

          {
            title:
              "Free Time",

            topic:
              "free time",

            grammar:
              ["can"],

            vocabulary:
              [
                "read",
                "watch",
                "play",
                "walk",
                "listen"
              ]
          }

        ]

    },

    3: {

      title:
        "Basic Communication",

      lessons:

        [

          {
            title:
              "What Are You Doing?",

            topic:
              "current activities",

            grammar:
              ["present continuous"],

            vocabulary:
              [
                "working",
                "studying",
                "reading",
                "eating",
                "walking"
              ]
          },

          {
            title:
              "Yesterday",

            topic:
              "past events",

            grammar:
              ["past simple"],

            vocabulary:
              [
                "yesterday",
                "visited",
                "worked",
                "went",
                "saw"
              ]
          },

          {
            title:
              "A Good Day",

            topic:
              "daily experiences",

            grammar:
              ["past simple"],

            vocabulary:
              [
                "happy",
                "tired",
                "busy",
                "interesting",
                "fun"
              ]
          },

          {
            title:
              "Plans",

            topic:
              "future plans",

            grammar:
              ["going to"],

            vocabulary:
              [
                "plan",
                "trip",
                "visit",
                "tomorrow",
                "weekend"
              ]
          },

          {
            title:
              "A1 Review",

            topic:
              "everyday communication",

            grammar:
              [
                "present simple",
                "past simple",
                "future"
              ],

            vocabulary:
              [
                "routine",
                "family",
                "work",
                "home",
                "plans"
              ]
          }

        ]

    }

  },


  A2: {

    1: {

      title:
        "Everyday Life",

      lessons:

        [

          {
            title:
              "Daily Routine",

            topic:
              "daily routines",

            grammar:
              [
                "present simple",
                "adverbs of frequency"
              ],

            vocabulary:
              [
                "usually",
                "quickly",
                "weather",
                "schedule",
                "report",
                "meeting",
                "coworker",
                "busy"
              ]
          },

          {
            title:
              "Past Experiences",

            topic:
              "past experiences",

            grammar:
              ["past simple"],

            vocabulary:
              [
                "experience",
                "mistake",
                "problem",
                "learn",
                "remember"
              ]
          },

          {
            title:
              "A Day at the Workshop",

            topic:
              "work and technical activities",

            grammar:
              [
                "present simple",
                "present continuous"
              ],

            vocabulary:
              [
                "workshop",
                "machine",
                "cable",
                "tool",
                "technician"
              ]
          },

          {
            title:
              "A Weekend Plan",

            topic:
              "future plans and travel",

            grammar:
              [
                "going to",
                "will"
              ],

            vocabulary:
              [
                "trip",
                "hotel",
                "market",
                "mountains",
                "weather"
              ]
          },

          {
            title:
              "Learning From Mistakes",

            topic:
              "mistakes and learning",

            grammar:
              [
                "past simple",
                "present perfect"
              ],

            vocabulary:
              [
                "mistake",
                "wrong",
                "delay",
                "embarrassed",
                "advice",
                "careful"
              ]
          }

        ]

    },

    2: {

      title:
        "Real-Life Situations",

      lessons:

        [

          {
            title:
              "Shopping",

            topic:
              "shopping",

            grammar:
              [
                "countable and uncountable nouns"
              ],

            vocabulary:
              [
                "price",
                "cheap",
                "expensive",
                "shop",
                "receipt"
              ]
          },

          {
            title:
              "At the Doctor",

            topic:
              "health",

            grammar:
              [
                "should",
                "have to"
              ],

            vocabulary:
              [
                "pain",
                "medicine",
                "doctor",
                "appointment",
                "healthy"
              ]
          },

          {
            title:
              "Travel Problems",

            topic:
              "travel problems",

            grammar:
              [
                "past simple",
                "questions"
              ],

            vocabulary:
              [
                "flight",
                "station",
                "ticket",
                "delay",
                "luggage"
              ]
          },

          {
            title:
              "Technology",

            topic:
              "technology",

            grammar:
              [
                "present perfect"
              ],

            vocabulary:
              [
                "phone",
                "computer",
                "application",
                "password",
                "internet"
              ]
          },

          {
            title:
              "Solving a Problem",

            topic:
              "problems and solutions",

            grammar:
              [
                "first conditional"
              ],

            vocabulary:
              [
                "problem",
                "solution",
                "possible",
                "help",
                "decision"
              ]
          }

        ]

    },

    3: {

      title:
        "Communication and Experiences",

      lessons:

        [

          {
            title:
              "Talking About Experiences",

            topic:
              "life experiences",

            grammar:
              [
                "present perfect"
              ],

            vocabulary:
              [
                "ever",
                "never",
                "already",
                "yet",
                "experience"
              ]
          },

          {
            title:
              "People and Relationships",

            topic:
              "relationships",

            grammar:
              [
                "comparatives"
              ],

            vocabulary:
              [
                "friend",
                "neighbor",
                "relative",
                "similar",
                "different"
              ]
          },

          {
            title:
              "Making Plans",

            topic:
              "plans",

            grammar:
              [
                "future forms"
              ],

            vocabulary:
              [
                "plan",
                "arrange",
                "decide",
                "probably",
                "hopefully"
              ]
          },

          {
            title:
              "Opinions",

            topic:
              "opinions",

            grammar:
              [
                "because",
                "although"
              ],

            vocabulary:
              [
                "opinion",
                "agree",
                "disagree",
                "reason",
                "idea"
              ]
          },

          {
            title:
              "A2 Final Review",

            topic:
              "real-life communication",

            grammar:
              [
                "present",
                "past",
                "future",
                "present perfect"
              ],

            vocabulary:
              [
                "routine",
                "experience",
                "problem",
                "plan",
                "opinion"
              ]
          }

        ]

    }

  },


  B1: {

    1: {

      title:
        "Personal Experiences",

      lessons:

        [

          {
            title:
              "Important Experiences",

            topic:
              "life experiences",

            grammar:
              ["present perfect"],

            vocabulary:
              [
                "experience",
                "achievement",
                "challenge",
                "opportunity",
                "memory"
              ]
          },

          {
            title:
              "A Difficult Decision",

            topic:
              "decisions",

            grammar:
              ["conditionals"],

            vocabulary:
              [
                "decision",
                "choice",
                "risk",
                "result",
                "consequence"
              ]
          },

          {
            title:
              "Work and Responsibility",

            topic:
              "work responsibilities",

            grammar:
              ["modal verbs"],

            vocabulary:
              [
                "responsibility",
                "deadline",
                "task",
                "manager",
                "team"
              ]
          },

          {
            title:
              "Learning Something New",

            topic:
              "learning",

            grammar:
              ["gerunds and infinitives"],

            vocabulary:
              [
                "learn",
                "practice",
                "skill",
                "improve",
                "mistake"
              ]
          },

          {
            title:
              "B1 Review",

            topic:
              "personal communication",

            grammar:
              [
                "past",
                "present perfect",
                "conditionals"
              ],

            vocabulary:
              [
                "experience",
                "decision",
                "responsibility",
                "skill",
                "challenge"
              ]
          }

        ]

    },

    2: {

      title:
        "Society and Communication",

      lessons:

        [

          {
            title:
              "Technology and Society",

            topic:
              "technology and society",

            grammar:
              ["present perfect"],

            vocabulary:
              [
                "technology",
                "social media",
                "privacy",
                "communication",
                "device"
              ]
          },

          {
            title:
              "Travel and Culture",

            topic:
              "travel and culture",

            grammar:
              ["past narratives"],

            vocabulary:
              [
                "culture",
                "custom",
                "tradition",
                "visitor",
                "experience"
              ]
          },

          {
            title:
              "Giving Advice",

            topic:
              "advice",

            grammar:
              ["should", "ought to"],

            vocabulary:
              [
                "advice",
                "solution",
                "suggestion",
                "problem",
                "decision"
              ]
          },

          {
            title:
              "Explaining Problems",

            topic:
              "problems and solutions",

            grammar:
              ["relative clauses"],

            vocabulary:
              [
                "issue",
                "cause",
                "effect",
                "solution",
                "result"
              ]
          },

          {
            title:
              "B1 Communication",

            topic:
              "real-world communication",

            grammar:
              [
                "linking expressions"
              ],

            vocabulary:
              [
                "however",
                "although",
                "therefore",
                "because",
                "instead"
              ]
          }

        ]

    },

    3: {

      title:
        "Independent English",

      lessons:

        [

          {
            title:
              "Expressing Opinions",

            topic:
              "opinions",

            grammar:
              ["opinion clauses"],

            vocabulary:
              [
                "believe",
                "agree",
                "disagree",
                "argue",
                "point"
              ]
          },

          {
            title:
              "Future Possibilities",

            topic:
              "future possibilities",

            grammar:
              ["conditionals"],

            vocabulary:
              [
                "possibility",
                "likely",
                "unlikely",
                "probably",
                "perhaps"
              ]
          },

          {
            title:
              "Professional Communication",

            topic:
              "professional communication",

            grammar:
              ["formal structures"],

            vocabulary:
              [
                "request",
                "confirm",
                "inform",
                "meeting",
                "document"
              ]
          },

          {
            title:
              "Solving Complex Problems",

            topic:
              "problem solving",

            grammar:
              ["reported speech"],

            vocabulary:
              [
                "analyze",
                "solution",
                "strategy",
                "result",
                "decision"
              ]
          },

          {
            title:
              "B1 Final Review",

            topic:
              "independent communication",

            grammar:
              [
                "mixed grammar"
              ],

            vocabulary:
              [
                "opinion",
                "experience",
                "decision",
                "problem",
                "solution"
              ]
          }

        ]

    }

  },


  B2: {

    1: {

      title:
        "Complex Experiences",

      lessons:

        [

          {
            title:
              "Unexpected Events",

            topic:
              "unexpected events",

            grammar:
              ["narrative tenses"],

            vocabulary:
              [
                "unexpected",
                "circumstance",
                "event",
                "reaction",
                "consequence"
              ]
          },

          {
            title:
              "Making Decisions",

            topic:
              "decision making",

            grammar:
              ["modal verbs"],

            vocabulary:
              [
                "priority",
                "option",
                "risk",
                "benefit",
                "outcome"
              ]
          },

          {
            title:
              "Workplace Communication",

            topic:
              "workplace communication",

            grammar:
              ["passive voice"],

            vocabulary:
              [
                "responsibility",
                "procedure",
                "department",
                "deadline",
                "requirement"
              ]
          },

          {
            title:
              "Media and Information",

            topic:
              "media and information",

            grammar:
              ["reported speech"],

            vocabulary:
              [
                "source",
                "claim",
                "report",
                "information",
                "evidence"
              ]
          },

          {
            title:
              "B2 Review",

            topic:
              "complex communication",

            grammar:
              [
                "mixed grammar"
              ],

            vocabulary:
              [
                "priority",
                "evidence",
                "responsibility",
                "outcome",
                "circumstance"
              ]
          }

        ]

    },

    2: {

      title:
        "Ideas and Society",

      lessons:

        [

          {
            title:
              "Culture",

            topic:
              "culture",

            grammar:
              ["relative clauses"],

            vocabulary:
              [
                "culture",
                "identity",
                "tradition",
                "community",
                "value"
              ]
          },

          {
            title:
              "Environment",

            topic:
              "environment",

            grammar:
              ["conditionals"],

            vocabulary:
              [
                "environment",
                "pollution",
                "resource",
                "climate",
                "impact"
              ]
          },

          {
            title:
              "Technology",

            topic:
              "technology",

            grammar:
              ["advanced modals"],

            vocabulary:
              [
                "innovation",
                "privacy",
                "artificial",
                "digital",
                "development"
              ]
          },

          {
            title:
              "Arguments and Evidence",

            topic:
              "arguments and evidence",

            grammar:
              ["discourse markers"],

            vocabulary:
              [
                "argument",
                "evidence",
                "claim",
                "however",
                "therefore"
              ]
          },

          {
            title:
              "B2 Communication",

            topic:
              "complex opinions",

            grammar:
              [
                "complex sentences"
              ],

            vocabulary:
              [
                "perspective",
                "argument",
                "evidence",
                "conclusion",
                "analysis"
              ]
          }

        ]

    },

    3: {

      title:
        "Advanced Communication",

      lessons:

        [

          {
            title:
              "Professional Situations",

            topic:
              "professional situations",

            grammar:
              ["formal language"],

            vocabulary:
              [
                "proposal",
                "negotiate",
                "deadline",
                "agreement",
                "objective"
              ]
          },

          {
            title:
              "Complex Problems",

            topic:
              "complex problems",

            grammar:
              ["advanced conditionals"],

            vocabulary:
              [
                "complex",
                "strategy",
                "alternative",
                "consequence",
                "solution"
              ]
          },

          {
            title:
              "Explaining Ideas",

            topic:
              "explaining ideas",

            grammar:
              ["linking devices"],

            vocabulary:
              [
                "concept",
                "explain",
                "clarify",
                "illustrate",
                "interpret"
              ]
          },

          {
            title:
              "Real-World Discussion",

            topic:
              "real-world discussion",

            grammar:
              ["discourse structure"],

            vocabulary:
              [
                "discussion",
                "perspective",
                "position",
                "argument",
                "response"
              ]
          },

          {
            title:
              "B2 Final Review",

            topic:
              "advanced communication",

            grammar:
              [
                "mixed grammar"
              ],

            vocabulary:
              [
                "analysis",
                "perspective",
                "strategy",
                "argument",
                "consequence"
              ]
          }

        ]

    }

  },


  C1: {

    1: {

      title:
        "Advanced Understanding",

      lessons:

        [

          {
            title:
              "Nuance and Meaning",

            topic:
              "nuance and meaning",

            grammar:
              ["advanced discourse"],

            vocabulary:
              [
                "nuance",
                "implication",
                "context",
                "interpretation",
                "meaning"
              ]
          },

          {
            title:
              "Complex Arguments",

            topic:
              "complex arguments",

            grammar:
              ["advanced linking"],

            vocabulary:
              [
                "argument",
                "evidence",
                "assumption",
                "conclusion",
                "counterargument"
              ]
          },

          {
            title:
              "Professional Precision",

            topic:
              "professional communication",

            grammar:
              ["register"],

            vocabulary:
              [
                "precise",
                "appropriate",
                "formal",
                "informal",
                "professional"
              ]
          },

          {
            title:
              "Analysis",

            topic:
              "analysis",

            grammar:
              ["complex clauses"],

            vocabulary:
              [
                "analyze",
                "interpret",
                "evaluate",
                "compare",
                "conclude"
              ]
          },

          {
            title:
              "C1 Review",

            topic:
              "advanced comprehension",

            grammar:
              [
                "advanced grammar"
              ],

            vocabulary:
              [
                "nuance",
                "analysis",
                "argument",
                "interpretation",
                "evidence"
              ]
          }

        ]

    },

    2: {

      title:
        "Advanced Communication",

      lessons:

        [

          {
            title:
              "Leadership",

            topic:
              "leadership",

            grammar:
              ["advanced conditionals"],

            vocabulary:
              [
                "leadership",
                "responsibility",
                "strategy",
                "vision",
                "decision"
              ]
          },

          {
            title:
              "Ethics",

            topic:
              "ethics",

            grammar:
              ["modal nuances"],

            vocabulary:
              [
                "ethical",
                "principle",
                "responsibility",
                "choice",
                "consequence"
              ]
          },

          {
            title:
              "Society",

            topic:
              "society",

            grammar:
              ["complex passive"],

            vocabulary:
              [
                "society",
                "institution",
                "policy",
                "community",
                "development"
              ]
          },

          {
            title:
              "Communication Strategy",

            topic:
              "communication strategy",

            grammar:
              ["register and tone"],

            vocabulary:
              [
                "tone",
                "audience",
                "purpose",
                "strategy",
                "message"
              ]
          },

          {
            title:
              "C1 Communication",

            topic:
              "advanced communication",

            grammar:
              [
                "mixed advanced grammar"
              ],

            vocabulary:
              [
                "audience",
                "tone",
                "purpose",
                "strategy",
                "precision"
              ]
          }

        ]

    },

    3: {

      title:
        "Mastery",

      lessons:

        [

          {
            title:
              "Critical Thinking",

            topic:
              "critical thinking",

            grammar:
              ["complex structures"],

            vocabulary:
              [
                "critical",
                "assumption",
                "evidence",
                "reasoning",
                "conclusion"
              ]
          },

          {
            title:
              "Advanced Reading",

            topic:
              "advanced reading",

            grammar:
              ["inversion"],

            vocabulary:
              [
                "interpret",
                "infer",
                "context",
                "reference",
                "argument"
              ]
          },

          {
            title:
              "Advanced Speaking",

            topic:
              "advanced speaking",

            grammar:
              ["cleft sentences"],

            vocabulary:
              [
                "clarify",
                "emphasize",
                "explain",
                "argue",
                "respond"
              ]
          },

          {
            title:
              "Advanced Writing",

            topic:
              "advanced writing",

            grammar:
              ["advanced cohesion"],

            vocabulary:
              [
                "cohesion",
                "structure",
                "paragraph",
                "argument",
                "conclusion"
              ]
          },

          {
            title:
              "C1 Final Review",

            topic:
              "English mastery",

            grammar:
              [
                "mixed advanced grammar"
              ],

            vocabulary:
              [
                "precision",
                "nuance",
                "analysis",
                "argument",
                "communication"
              ]
          }

        ]

    }

  }

};


/* =========================================================
   7. CONTEÚDO ESPECIAL — A2 M1 L1
   ========================================================= */

const A2_M1_L1_CONTENT = {

  level:
    "A2",

  module:
    1,

  lesson:
    1,

  title:
    "Daily Routine",

  sourceType:
    "internal_original",

  objectives:

    [

      "Compreender uma história curta sobre rotina diária.",

      "Identificar informações principais.",

      "Aprender vocabulário pelo contexto.",

      "Praticar present simple.",

      "Usar active recall."

    ],

  introduction: {

    title:
      "Daily Routine",

    text:
      "Leia primeiro em inglês. Tente compreender o contexto antes de procurar a tradução."

  },

  vocabulary:

    [

      {

        word:
          "usually",

        translation:
          "geralmente",

        category:
          "routine",

        example:
          "Daniel usually gets up at six thirty."

      },

      {

        word:
          "quickly",

        translation:
          "rapidamente",

        category:
          "routine",

        example:
          "He gets up quickly."

      },

      {

        word:
          "weather",

        translation:
          "tempo",

        category:
          "daily life",

        example:
          "The weather is good today."

      },

      {

        word:
          "schedule",

        translation:
          "agenda",

        category:
          "work",

        example:
          "He checks his schedule."

      },

      {

        word:
          "report",

        translation:
          "relatório",

        category:
          "work",

        example:
          "He needs to finish a report."

      },

      {

        word:
          "meeting",

        translation:
          "reunião",

        category:
          "work",

        example:
          "He has a meeting with his manager."

      },

      {

        word:
          "coworker",

        translation:
          "colega de trabalho",

        category:
          "work",

        example:
          "He helps a coworker."

      },

      {

        word:
          "busy",

        translation:
          "ocupado / corrido",

        category:
          "work",

        example:
          "Some days are very busy."

      }

    ],

  grammar: {

    title:
      "Present Simple and Adverbs of Frequency",

    explanation:
      "We use the present simple to talk about routines and habits. Adverbs such as usually, normally and often tell us how frequently something happens.",

    rule:
      "With he, she and it, the main verb normally receives -s or -es.",

    examples:

      [

        "Daniel usually wakes up at six thirty.",

        "He normally goes to work by bus.",

        "He usually reads before going to bed."

      ]

  },

  reading: {

    title:
      "Daniel's Daily Routine",

    text:
      "Every morning, Daniel wakes up at six thirty. He usually gets up quickly because he needs to leave home at seven fifteen. Daniel works at a small company near his house. He normally goes to work by bus, but today he is walking because the weather is good. Before he leaves home, Daniel has breakfast with his wife. He drinks coffee and eats bread with cheese. After breakfast, he checks his phone and puts his keys in his bag. At work, Daniel starts his day by checking his schedule. He has three important tasks today. First, he needs to finish a report. Then, he has a meeting with his manager. In the afternoon, he is going to help a coworker with a new project. Daniel likes his job, but he knows that some days are very busy. At the end of the day, he usually goes home, has dinner, and reads a book for a few minutes before going to bed.",

    translation:
      "Todas as manhãs, Daniel acorda às seis e meia. Ele geralmente se levanta rapidamente porque precisa sair de casa às sete e quinze. Daniel trabalha em uma pequena empresa perto de sua casa. Normalmente vai para o trabalho de ônibus, mas hoje está caminhando porque o tempo está bom. Antes de sair de casa, Daniel toma café da manhã com sua esposa. Ele bebe café e come pão com queijo. Depois do café da manhã, verifica o celular e coloca as chaves na bolsa. No trabalho, Daniel começa o dia verificando sua agenda. Ele tem três tarefas importantes hoje. Primeiro, precisa terminar um relatório. Depois, tem uma reunião com seu gerente. À tarde, vai ajudar um colega de trabalho com um novo projeto. Daniel gosta do trabalho, mas sabe que alguns dias são muito corridos. No final do dia, ele normalmente vai para casa, janta e lê um livro por alguns minutos antes de dormir."

  },

  comprehension:

    [

      {

        id:
          "A2-M1-L1-C1",

        question:
          "What time does Daniel usually wake up?",

        options:

          [

            "At six thirty.",

            "At seven fifteen.",

            "At eight thirty.",

            "At nine."

          ],

        answer:
          0,

        explanation:
          "Daniel usually wakes up at six thirty."

      },

      {

        id:
          "A2-M1-L1-C2",

        question:
          "How does Daniel normally go to work?",

        options:

          [

            "By bus.",

            "By car.",

            "On foot.",

            "By train."

          ],

        answer:
          0,

        explanation:
          "He normally goes to work by bus."

      },

      {

        id:
          "A2-M1-L1-C3",

        question:
          "Why is he walking today?",

        options:

          [

            "Because the weather is good.",

            "Because the bus is broken.",

            "Because he is late.",

            "Because he wants to exercise."

          ],

        answer:
          0,

        explanation:
          "He is walking because the weather is good."

      },

      {

        id:
          "A2-M1-L1-C4",

        question:
          "How many important tasks does Daniel have today?",

        options:

          [

            "Three.",

            "Two.",

            "Four.",

            "Five."

          ],

        answer:
          0,

        explanation:
          "The text says that Daniel has three important tasks."

      }

    ],

  translation:

    [

      {

        id:
          "A2-M1-L1-T1",

        question:
          "Translate into Portuguese: He normally goes to work by bus.",

        answer:
          "Ele normalmente vai para o trabalho de ônibus.",

        alternatives:
          [

            "Ele normalmente vai ao trabalho de ônibus.",

            "Normalmente ele vai para o trabalho de ônibus."

          ]

      },

      {

        id:
          "A2-M1-L1-T2",

        question:
          "Translate into Portuguese: He has three important tasks today.",

        answer:
          "Ele tem três tarefas importantes hoje.",

        alternatives:
          []

      },

      {

        id:
          "A2-M1-L1-T3",

        question:
          "Translate into Portuguese: Daniel likes his job, but some days are very busy.",

        answer:
          "Daniel gosta do trabalho dele, mas alguns dias são muito corridos.",

        alternatives:
          [

            "Daniel gosta do seu trabalho, mas alguns dias são muito corridos."

          ]

      }

    ],

  grammarExercises:

    [

      {

        id:
          "A2-M1-L1-G1",

        question:
          "Choose the correct sentence.",

        options:

          [

            "Daniel usually wakes up at six thirty.",

            "Daniel usually wake up at six thirty.",

            "Daniel usually waking up at six thirty.",

            "Daniel wake usually up at six thirty."

          ],

        answer:
          0,

        explanation:
          "With he, we use wakes in the present simple."

      },

      {

        id:
          "A2-M1-L1-G2",

        question:
          "Choose the correct sentence.",

        options:

          [

            "He normally goes to work by bus.",

            "He normally go to work by bus.",

            "He normally going to work by bus.",

            "He go normally to work by bus."

          ],

        answer:
          0,

        explanation:
          "He takes the third-person singular form: goes."

      },

      {

        id:
          "A2-M1-L1-G3",

        question:
          "Which word best describes frequency?",

        options:

          [

            "Usually",

            "Report",

            "Manager",

            "Weather"

          ],

        answer:
          0,

        explanation:
          "Usually is an adverb of frequency."

      }

    ],

  activeRecall:

    [

      {

        id:
          "A2-M1-L1-A1",

        question:
          "What time does Daniel usually wake up?",

        answer:
          "At six thirty.",

        alternatives:
          [

            "Six thirty."

          ]

      },

      {

        id:
          "A2-M1-L1-A2",

        question:
          "How does Daniel normally go to work?",

        answer:
          "By bus.",

        alternatives:
          [

            "He goes by bus."

          ]

      },

      {

        id:
          "A2-M1-L1-A3",

        question:
          "Name two things Daniel does at the end of the day.",

        answer:
          "He has dinner and reads a book.",

        alternatives:
          [

            "He goes home, has dinner and reads a book."

          ]

      }

    ],

  dynamicContent:

    createDynamicMetadata(

      "A2",

      1,

      1,

      "Daily Routine",

      "daily routines",

      [

        "present simple",

        "adverbs of frequency"

      ],

      [

        "usually",

        "quickly",

        "weather",

        "schedule",

        "report",

        "meeting",

        "coworker",

        "busy"

      ],

      [

        "reading",

        "vocabulary",

        "grammar",

        "comprehension",

        "translation",

        "active_recall"

      ]

    )

};


/* =========================================================
   8. CONSTRUÇÃO DO CURSO
   ========================================================= */

const COURSE_DATA = {};


/* =========================================================
   9. GERAR CURSO
   ========================================================= */

Object.keys(LEVEL_PROFILES)
  .forEach(
    level => {

      COURSE_DATA[level] = {};

      const curriculumLevel =
        CURRICULUM[level];

      for (
        let moduleNumber = 1;
        moduleNumber <= 3;
        moduleNumber++
      ) {

        const module =
          curriculumLevel[moduleNumber];

        const lessons =
          [];

        module.lessons.forEach(
          (
            lessonData,
            index
          ) => {

            const lessonNumber =
              index + 1;

            const id =
              `${level}-M${moduleNumber}-L${lessonNumber}`;

            let content;

            /*
             * Conteúdo especial A2 M1 L1
             */

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

                  lessonData.title,

                  `Aula sobre ${lessonData.topic}.`,

                  lessonData.topic,

                  lessonData.grammar,

                  lessonData.vocabulary

                );

            }

            lessons.push({

              id,

              title:
                lessonData.title,

              description:
                `Aula sobre ${lessonData.topic}.`,

              type:
                "reading",

              kind:
                "lesson",

              status:

                (
                  level === "A2" &&
                  moduleNumber === 1 &&
                  lessonNumber === 1
                )

                  ? "current"

                  : "locked",

              contentMode:
                "dynamic_with_fallback",

              level,

              module:
                moduleNumber,

              lesson:
                lessonNumber,

              dynamicContent:
                content.dynamicContent,

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

          kind:
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

          kind:
            "test",

          status:
            "locked"

        });


        COURSE_DATA[level][moduleNumber] = {

          title:
            module.title,

          level,

          module:
            moduleNumber,

          lessons

        };

      }

    }
  );


/* =========================================================
   10. METADADOS GERAIS
   ========================================================= */

COURSE_DATA.meta = {

  application:
    "English Family",

  version:
    "1.4.0",

  pedagogy:
    PEDAGOGY_REFERENCE,

  curriculum:
    "A1 → A2 → B1 → B2 → C1",

  contentStrategy:
    "dynamic_with_internal_fallback",

  externalContent:
    true,

  originalContent:
    true,

  offlineFallback:
    true

};


/* =========================================================
   11. EXPORTAÇÃO
   ========================================================= */

window.ENGLISH_FAMILY_COURSE_DATA =
  COURSE_DATA;


/* =========================================================
   END COURSE-DATA.JS v1.4.0
   ========================================================= */
