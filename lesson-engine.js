/* =========================================================
   ENGLISH FAMILY
   LESSON-ENGINE.JS
   MOTOR DE AULAS
   ========================================================= */


/* =========================================================
   1. CONFIGURAÇÃO
   ========================================================= */

const LESSON_ENGINE_CONFIG = {

  version: "1.0.0",

  passingScore: 70,

  xpPerCorrectAnswer: 2,

  minimumLessonMinutes: 5,

  sections: [

    "context",

    "reading",

    "comprehension",

    "vocabulary",

    "grammar",

    "translation",

    "recall",

    "listening",

    "speaking",

    "writing",

    "fixation",

    "feedback"

  ]

};


/* =========================================================
   2. ESTADO DO MOTOR
   ========================================================= */

const LESSON_ENGINE = {

  active: false,

  lesson: null,

  activities: [],

  currentIndex: 0,

  answers: [],

  score: 0,

  correctAnswers: 0,

  wrongAnswers: 0,

  startedAt: null,

  completedAt: null,

  startTime: null,

  sessionMinutes: 0

};


/* =========================================================
   3. CONTEÚDO REAL DAS AULAS
   ========================================================= */

const LESSON_LIBRARY = {


  /* =======================================================
     A2 — MÓDULO 1 — AULA 1
     ======================================================= */

  "A2-M1-L1": {

    id: "A2-M1-L1",

    level: "A2",

    module: 1,

    lesson: 1,

    title: "Daily Routine",

    subtitle:
      "Talking about everyday routines.",

    objective:
      "Aprender a falar sobre hábitos e rotina diária em inglês.",

    estimatedMinutes: 15,


    context: {

      title:
        "A normal day",

      text:
        "Every morning, Anna wakes up at seven o'clock. " +
        "She gets up, takes a shower and has breakfast. " +
        "Then she goes to work. She usually works until five o'clock. " +
        "In the evening, she comes home, has dinner and studies English.",

      translation:
        "Todas as manhãs, Anna acorda às sete horas. " +
        "Ela se levanta, toma banho e toma café da manhã. " +
        "Depois, ela vai para o trabalho. " +
        "Ela geralmente trabalha até as cinco horas. " +
        "À noite, ela volta para casa, janta e estuda inglês."

    },


    reading: {

      title:
        "Reading",

      text:
        "Every morning, Anna wakes up at seven o'clock. " +
        "She gets up and takes a shower. " +
        "After that, she has breakfast and goes to work. " +
        "She usually works until five o'clock. " +
        "In the evening, she comes home and studies English."

    },


    comprehension: [

      {

        id: "A2-M1-L1-C1",

        type: "multiple-choice",

        question:
          "What time does Anna wake up?",

        options: [

          "At six o'clock.",

          "At seven o'clock.",

          "At eight o'clock.",

          "At nine o'clock."

        ],

        answer: 1,

        explanation:
          "The text says: Anna wakes up at seven o'clock."

      },

      {

        id: "A2-M1-L1-C2",

        type: "multiple-choice",

        question:
          "What does Anna do after she gets up?",

        options: [

          "She goes to work.",

          "She studies English.",

          "She takes a shower.",

          "She has dinner."

        ],

        answer: 2,

        explanation:
          "After she gets up, Anna takes a shower."

      },

      {

        id: "A2-M1-L1-C3",

        type: "multiple-choice",

        question:
          "What does Anna do in the evening?",

        options: [

          "She goes to school.",

          "She comes home and studies English.",

          "She wakes up.",

          "She goes to work."

        ],

        answer: 1,

        explanation:
          "In the evening, she comes home and studies English."

      }

    ],


    vocabulary: [

      {

        word: "wake up",

        translation:
          "acordar",

        category:
          "daily routine",

        example:
          "I wake up at seven."

      },

      {

        word: "get up",

        translation:
          "levantar-se",

        category:
          "daily routine",

        example:
          "I get up early."

      },

      {

        word: "take a shower",

        translation:
          "tomar banho",

        category:
          "daily routine",

        example:
          "She takes a shower every morning."

      },

      {

        word: "have breakfast",

        translation:
          "tomar café da manhã",

        category:
          "food",

        example:
          "We have breakfast at seven."

      },

      {

        word: "go to work",

        translation:
          "ir para o trabalho",

        category:
          "work",

        example:
          "I go to work at eight."

      },

      {

        word: "come home",

        translation:
          "voltar para casa",

        category:
          "daily routine",

        example:
          "She comes home at six."

      }

    ],


    grammar: {

      topic:
        "Simple Present",

      explanation:
        "Usamos o Simple Present para falar sobre hábitos, " +
        "rotinas e fatos que acontecem regularmente.",

      examples: [

        "I wake up at seven.",

        "She works until five.",

        "He studies English.",

        "They go to work every day."

      ],

      rule:
        "Com he, she e it, normalmente acrescentamos -s ao verbo."

    },


    translation: [

      {

        id: "A2-M1-L1-T1",

        question:
          "Traduza para o inglês: " +
          "Eu acordo às sete horas.",

        answer:
          "I wake up at seven o'clock."

      },

      {

        id: "A2-M1-L1-T2",

        question:
          "Traduza para o inglês: " +
          "Ela trabalha todos os dias.",

        answer:
          "She works every day."

      },

      {

        id: "A2-M1-L1-T3",

        question:
          "Traduza para o inglês: " +
          "Nós estudamos inglês à noite.",

        answer:
          "We study English at night."

      }

    ],


    recall: [

      {

        id: "A2-M1-L1-R1",

        question:
          "Complete: Anna ______ up at seven o'clock.",

        answer:
          "wakes"

      },

      {

        id: "A2-M1-L1-R2",

        question:
          "Complete: She ______ English in the evening.",

        answer:
          "studies"

      },

      {

        id: "A2-M1-L1-R3",

        question:
          "Complete: She ______ a shower every morning.",

        answer:
          "takes"

      }

    ],


    fixation: [

      {

        id: "A2-M1-L1-F1",

        question:
          "Which sentence is correct?",

        options: [

          "She work every day.",

          "She works every day.",

          "She working every day.",

          "She workes every day."

        ],

        answer: 1

      },

      {

        id: "A2-M1-L1-F2",

        question:
          "Which sentence means 'Eu estudo inglês à noite'?",

        options: [

          "I study English at night.",

          "I studies English at night.",

          "I studying English at night.",

          "I study English in morning."

        ],

        answer: 0

      }

    ]

  }

};


/* =========================================================
   4. BUSCAR UMA AULA NA BIBLIOTECA
   ========================================================= */

function getLessonFromLibrary(
  lessonId
) {

  if (!lessonId) {

    return null;

  }


  return LESSON_LIBRARY[
    lessonId
  ] || null;

}


/* =========================================================
   5. INICIAR MOTOR
   ========================================================= */

function startLessonEngine(
  lesson
) {

  if (!lesson) {

    console.warn(
      "Motor de aulas: aula inválida."
    );

    return false;

  }


  const lessonData =
    getLessonFromLibrary(
      lesson.id
    );


  if (!lessonData) {

    alert(
      "Esta aula ainda não possui conteúdo disponível."
    );

    return false;

  }


  resetLessonEngine();


  LESSON_ENGINE.active =
    true;


  LESSON_ENGINE.lesson =
    lessonData;


  LESSON_ENGINE.startedAt =
    new Date().toISOString();


  LESSON_ENGINE.startTime =
    Date.now();


  LESSON_ENGINE.activities =
    buildLessonActivities(
      lessonData
    );


  LESSON_ENGINE.currentIndex =
    0;


  openLessonInterface();


  renderCurrentActivity();


  return true;

}


/* =========================================================
   6. RESET DO MOTOR
   ========================================================= */

function resetLessonEngine() {

  LESSON_ENGINE.active =
    false;

  LESSON_ENGINE.lesson =
    null;

  LESSON_ENGINE.activities =
    [];

  LESSON_ENGINE.currentIndex =
    0;

  LESSON_ENGINE.answers =
    [];

  LESSON_ENGINE.score =
    0;

  LESSON_ENGINE.correctAnswers =
    0;

  LESSON_ENGINE.wrongAnswers =
    0;

  LESSON_ENGINE.startedAt =
    null;

  LESSON_ENGINE.completedAt =
    null;

  LESSON_ENGINE.startTime =
    null;

  LESSON_ENGINE.sessionMinutes =
    0;

}


/* =========================================================
   7. CONSTRUIR ATIVIDADES
   ========================================================= */

function buildLessonActivities(
  lesson
) {

  const activities =
    [];


  activities.push({

    id:
      `${lesson.id}-context`,

    type:
      "context",

    title:
      lesson.context.title,

    data:
      lesson.context

  });


  activities.push({

    id:
      `${lesson.id}-reading`,

    type:
      "reading",

    title:
      lesson.reading.title,

    data:
      lesson.reading

  });


  lesson.comprehension
    .forEach(
      activity => {

        activities.push({

          id:
            activity.id,

          type:
            "comprehension",

          title:
            "Compreensão",

          data:
            activity

        });

      }
    );


  activities.push({

    id:
      `${lesson.id}-vocabulary`,

    type:
      "vocabulary",

    title:
      "Vocabulário",

    data:
      lesson.vocabulary

  });


  activities.push({

    id:
      `${lesson.id}-grammar`,

    type:
      "grammar",

    title:
      lesson.grammar.topic,

    data:
      lesson.grammar

  });


  lesson.translation
    .forEach(
      activity => {

        activities.push({

          id:
            activity.id,

          type:
            "translation",

          title:
            "Tradução",

          data:
            activity

        });

      }
    );


  lesson.recall
    .forEach(
      activity => {

        activities.push({

          id:
            activity.id,

          type:
            "recall",

          title:
            "Recuperação ativa",

          data:
            activity

        });

      }
    );


  lesson.fixation
    .forEach(
      activity => {

        activities.push({

          id:
            activity.id,

          type:
            "fixation",

          title:
            "Fixação",

          data:
            activity

        });

      }
    );


  activities.push({

    id:
      `${lesson.id}-feedback`,

    type:
      "feedback",

    title:
      "Resultado",

    data:
      {}

  });


  return activities;

}


/* =========================================================
   8. INTERFACE DO MOTOR
   ========================================================= */

function openLessonInterface() {

  let container =
    document.getElementById(
      "lessonEngine"
    );


  if (!container) {

    container =
      document.createElement(
        "div"
      );

    container.id =
      "lessonEngine";

    document.body.appendChild(
      container
    );

  }


  container.className =
    "lesson-engine-overlay";


  container.setAttribute(
    "aria-hidden",
    "false"
  );


  container.innerHTML = `

    <div class="lesson-engine">

      <header class="lesson-engine-header">

        <button
          type="button"
          id="lessonEngineClose"
          class="lesson-engine-close"
          aria-label="Fechar aula"
        >
          ×
        </button>

        <div class="lesson-engine-heading">

          <span
            id="lessonEngineLevel"
            class="lesson-engine-level"
          >
          </span>

          <h1
            id="lessonEngineTitle"
          >
          </h1>

          <p
            id="lessonEngineSubtitle"
          >
          </p>

        </div>

        <div
          id="lessonEngineProgress"
          class="lesson-engine-progress"
        >
        </div>

      </header>


      <main
        id="lessonEngineContent"
        class="lesson-engine-content"
      >
      </main>


      <footer
        class="lesson-engine-footer"
      >

        <button
          type="button"
          id="lessonEngineBack"
          class="lesson-engine-button secondary"
        >
          Voltar
        </button>

        <button
          type="button"
          id="lessonEngineNext"
          class="lesson-engine-button primary"
        >
          Continuar
        </button>

      </footer>

    </div>

  `;


  document
    .getElementById(
      "lessonEngineClose"
    )
    ?.addEventListener(
      "click",
      closeLessonEngine
    );


  document
    .getElementById(
      "lessonEngineBack"
    )
    ?.addEventListener(
      "click",
      previousLessonActivity
    );


  document
    .getElementById(
      "lessonEngineNext"
    )
    ?.addEventListener(
      "click",
      nextLessonActivity
    );


  document.body.classList.add(
    "lesson-engine-open"
  );

}


/* =========================================================
   9. FECHAR MOTOR
   ========================================================= */

function closeLessonEngine() {

  const confirmation =
    confirm(
      "Deseja sair desta aula? Seu progresso das atividades já concluídas será mantido."
    );


  if (!confirmation) {

    return;

  }


  const container =
    document.getElementById(
      "lessonEngine"
    );


  if (container) {

    container.remove();

  }


  document.body.classList.remove(
    "lesson-engine-open"
  );


  LESSON_ENGINE.active =
    false;

}


/* =========================================================
   10. RENDERIZAR ATIVIDADE
   ========================================================= */

function renderCurrentActivity() {

  if (
    !LESSON_ENGINE.active
  ) {

    return;

  }


  const activity =
    LESSON_ENGINE.activities[
      LESSON_ENGINE.currentIndex
    ];


  if (!activity) {

    finishLessonEngine();

    return;

  }


  const content =
    document.getElementById(
      "lessonEngineContent"
    );


  const progress =
    document.getElementById(
      "lessonEngineProgress"
    );


  const title =
    document.getElementById(
      "lessonEngineTitle"
    );


  const subtitle =
    document.getElementById(
      "lessonEngineSubtitle"
    );


  const level =
    document.getElementById(
      "lessonEngineLevel"
    );


  if (level) {

    level.textContent =
      LESSON_ENGINE.lesson.level;

  }


  if (title) {

    title.textContent =
      LESSON_ENGINE.lesson.title;

  }


  if (subtitle) {

    subtitle.textContent =
      LESSON_ENGINE.lesson.subtitle;

  }


  if (progress) {

    progress.textContent =
      `${LESSON_ENGINE.currentIndex + 1} / ` +
      `${LESSON_ENGINE.activities.length}`;

  }


  if (!content) {

    return;

  }


  content.innerHTML =
    "";


  switch (
    activity.type
  ) {

    case "context":

      renderContext(
        content,
        activity
      );

      break;


    case "reading":

      renderReading(
        content,
        activity
      );

      break;


    case "comprehension":

      renderMultipleChoice(
        content,
        activity
      );

      break;


    case "vocabulary":

      renderVocabulary(
        content,
        activity
      );

      break;


    case "grammar":

      renderGrammar(
        content,
        activity
      );

      break;


    case "translation":

      renderTranslation(
        content,
        activity
      );

      break;


    case "recall":

      renderRecall(
        content,
        activity
      );

      break;


    case "fixation":

      renderMultipleChoice(
        content,
        activity
      );

      break;


    case "feedback":

      renderFeedback(
        content
      );

      break;


    default:

      renderUnknownActivity(
        content
      );

  }


  updateEngineButtons();

}


/* =========================================================
   11. CONTEXTUALIZAÇÃO
   ========================================================= */

function renderContext(
  container,
  activity
) {

  const data =
    activity.data;


  container.innerHTML = `

    <section class="lesson-card context-card">

      <span class="lesson-card-label">
        CONTEXT
      </span>

      <h2>
        ${escapeHTML(
          data.title
        )}
      </h2>

      <p class="lesson-context-text">
        ${escapeHTML(
          data.text
        )}
      </p>

      <div class="lesson-translation-box">

        <strong>
          Tradução
        </strong>

        <p>
          ${escapeHTML(
            data.translation
          )}
        </p>

      </div>

      <div class="lesson-objective">

        <strong>
          Objetivo da aula
        </strong>

        <p>
          ${escapeHTML(
            LESSON_ENGINE.lesson.objective
          )}
        </p>

      </div>

    </section>

  `;

}


/* =========================================================
   12. READING
   ========================================================= */

function renderReading(
  container,
  activity
) {

  const data =
    activity.data;


  container.innerHTML = `

    <section class="lesson-card reading-card">

      <span class="lesson-card-label">
        READING
      </span>

      <h2>
        ${escapeHTML(
          data.title
        )}
      </h2>

      <div class="reading-text">

        ${escapeHTML(
          data.text
        )}

      </div>

      <div class="reading-instruction">

        Leia o texto com atenção.
        Tente compreender primeiro
        sem consultar a tradução.

      </div>

    </section>

  `;

}


/* =========================================================
   13. MULTIPLE CHOICE
   ========================================================= */

function renderMultipleChoice(
  container,
  activity
) {

  const data =
    activity.data;


  const options =
    data.options || [];


  container.innerHTML = `

    <section
      class="lesson-card question-card"
      data-question-id="${escapeHTML(
        data.id
      )}"
    >

      <span class="lesson-card-label">
        ${activity.type === "fixation"
          ? "FIXAÇÃO"
          : "COMPREENSÃO"}
      </span>

      <h2>
        ${escapeHTML(
          data.question
        )}
      </h2>

      <div class="lesson-options">

        ${options.map(
          (option, index) => `

            <button
              type="button"
              class="lesson-option"
              data-option-index="${index}"
            >
              <span class="option-letter">
                ${String.fromCharCode(
                  65 + index
                )}
              </span>

              <span>
                ${escapeHTML(
                  option
                )}
              </span>

            </button>

          `
        ).join("")}

      </div>

      <div
        class="lesson-feedback"
        id="currentQuestionFeedback"
      >
      </div>

    </section>

  `;


  container
    .querySelectorAll(
      ".lesson-option"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            const selected =
              Number(
                button.dataset.optionIndex
              );


            answerMultipleChoice(
              data,
              selected,
              container
            );

          }
        );

      }
    );

}


/* =========================================================
   14. RESPONDER MULTIPLE CHOICE
   ========================================================= */

function answerMultipleChoice(
  question,
  selected,
  container
) {

  const buttons =
    container.querySelectorAll(
      ".lesson-option"
    );


  buttons.forEach(
    button => {

      button.disabled =
        true;

    }
  );


  const correct =
    selected ===
    question.answer;


  const feedback =
    container.querySelector(
      "#currentQuestionFeedback"
    );


  if (correct) {

    LESSON_ENGINE.correctAnswers++;

    LESSON_ENGINE.score +=
      LESSON_ENGINE_CONFIG.xpPerCorrectAnswer;


    buttons[
      selected
    ]?.classList.add(
      "correct"
    );


    if (feedback) {

      feedback.innerHTML = `
        <strong>
          Correto! 🎉
        </strong>

        <p>
          ${escapeHTML(
            question.explanation ||
            "Muito bem!"
          )}
        </p>
      `;

    }

  }

  else {

    LESSON_ENGINE.wrongAnswers++;


    buttons[
      selected
    ]?.classList.add(
      "wrong"
    );


    buttons[
      question.answer
    ]?.classList.add(
      "correct"
    );


    if (feedback) {

      feedback.innerHTML = `
        <strong>
          Vamos revisar. 💡
        </strong>

        <p>
          ${
            escapeHTML(
              question.explanation ||
              "A alternativa correta está destacada."
            )
          }
        </p>
      `;

    }

  }


  registerAnswer({

    questionId:
      question.id,

    type:
      "multiple-choice",

    selected:
      selected,

    correct:
      correct,

    expected:
      question.answer

  });


  updateEngineButtons();

}


/* =========================================================
   15. VOCABULÁRIO
   ========================================================= */

function renderVocabulary(
  container,
  activity
) {

  const words =
    activity.data || [];


  container.innerHTML = `

    <section class="lesson-card vocabulary-card">

      <span class="lesson-card-label">
        VOCABULARY
      </span>

      <h2>
        Palavras essenciais
      </h2>

      <div class="vocabulary-list">

        ${words.map(
          word => `

            <article
              class="vocabulary-item"
            >

              <div>

                <strong>
                  ${escapeHTML(
                    word.word
                  )}
                </strong>

                <span>
                  ${escapeHTML(
                    word.translation
                  )}
                </span>

              </div>

              <p>
                ${escapeHTML(
                  word.example
                )}
              </p>

            </article>

          `
        ).join("")}

      </div>

      <div class="lesson-instruction">

        Leia cada palavra em voz alta
        e tente criar uma frase própria.

      </div>

    </section>

  `;


  words.forEach(
    word => {

      if (
        window.EnglishFamily &&
        typeof window.EnglishFamily
          .registerVocabulary ===
          "function"
      ) {

        window.EnglishFamily
          .registerVocabulary(
            word.word,
            {

              word:
                word.word,

              translation:
                word.translation,

              category:
                word.category,

              examples:
                [
                  word.example
                ],

              level:
                LESSON_ENGINE.lesson.level

            }
          );

      }

    }
  );

}


/* =========================================================
   16. GRAMÁTICA
   ========================================================= */

function renderGrammar(
  container,
  activity
) {

  const data =
    activity.data;


  container.innerHTML = `

    <section class="lesson-card grammar-card">

      <span class="lesson-card-label">
        GRAMMAR
      </span>

      <h2>
        ${escapeHTML(
          data.topic
        )}
      </h2>

      <p class="grammar-explanation">
        ${escapeHTML(
          data.explanation
        )}
      </p>

      <div class="grammar-rule">

        <strong>
          Regra principal
        </strong>

        <p>
          ${escapeHTML(
            data.rule
          )}
        </p>

      </div>

      <div class="grammar-examples">

        <strong>
          Exemplos
        </strong>

        ${data.examples.map(
          example => `
            <div class="grammar-example">
              ${escapeHTML(
                example
              )}
            </div>
          `
        ).join("")}

      </div>

    </section>

  `;


  if (
    window.EnglishFamily &&
    typeof window.EnglishFamily
      .registerGrammar ===
      "function"
  ) {

    window.EnglishFamily
      .registerGrammar(
        data.topic,
        {

          level:
            LESSON_ENGINE.lesson.level

        }
      );

  }

}


/* =========================================================
   17. TRADUÇÃO
   ========================================================= */

function renderTranslation(
  container,
  activity
) {

  const data =
    activity.data;


  container.innerHTML = `

    <section
      class="lesson-card question-card translation-card"
    >

      <span class="lesson-card-label">
        TRANSLATION
      </span>

      <h2>
        ${escapeHTML(
          data.question
        )}
      </h2>

      <textarea
        id="translationAnswer"
        class="lesson-textarea"
        rows="4"
        placeholder="Digite sua resposta em inglês..."
        autocomplete="off"
      ></textarea>

      <div
        id="translationFeedback"
        class="lesson-feedback"
      >
      </div>

    </section>

  `;

}


/* =========================================================
   18. RECUPERAÇÃO ATIVA
   ========================================================= */

function renderRecall(
  container,
  activity
) {

  const data =
    activity.data;


  container.innerHTML = `

    <section
      class="lesson-card question-card recall-card"
    >

      <span class="lesson-card-label">
        ACTIVE RECALL
      </span>

      <h2>
        ${escapeHTML(
          data.question
        )}
      </h2>

      <input
        id="recallAnswer"
        class="lesson-input"
        type="text"
        placeholder="Digite sua resposta..."
        autocomplete="off"
      >

      <div
        id="recallFeedback"
        class="lesson-feedback"
      >
      </div>

    </section>

  `;

}


/* =========================================================
   19. FEEDBACK FINAL
   ========================================================= */

function renderFeedback(
  container
) {

  const total =
    LESSON_ENGINE.correctAnswers +
    LESSON_ENGINE.wrongAnswers;


  const percentage =
    total > 0
      ? Math.round(
          (
            LESSON_ENGINE.correctAnswers /
            total
          ) *
          100
        )
      : 100;


  container.innerHTML = `

    <section class="lesson-card final-result">

      <span class="lesson-card-label">
        LESSON COMPLETE
      </span>

      <div class="lesson-result-icon">
        ${percentage >= 70
          ? "🎉"
          : "📚"}
      </div>

      <h2>
        ${percentage >= 70
          ? "Excelente trabalho!"
          : "Boa tentativa!"}
      </h2>

      <p>
        Você concluiu a aula
        <strong>
          ${escapeHTML(
            LESSON_ENGINE.lesson.title
          )}
        </strong>.
      </p>

      <div class="lesson-score">

        <strong>
          ${percentage}%
        </strong>

        <span>
          aproveitamento
        </span>

      </div>

      <div class="lesson-result-stats">

        <div>
          <strong>
            ${LESSON_ENGINE.correctAnswers}
          </strong>
          <span>
            acertos
          </span>
        </div>

        <div>
          <strong>
            ${LESSON_ENGINE.wrongAnswers}
          </strong>
          <span>
            para revisar
          </span>
        </div>

      </div>

      <p class="lesson-final-message">

        ${percentage >= 70
          ? "Seu desempenho foi suficiente para avançar. Continue praticando para consolidar o conteúdo."
          : "O conteúdo ficará registrado para reforço e revisão. Não desanime — aprender é um processo."}

      </p>

    </section>

  `;

}


/* =========================================================
   20. ATIVIDADE DESCONHECIDA
   ========================================================= */

function renderUnknownActivity(
  container
) {

  container.innerHTML = `

    <section class="lesson-card">

      <h2>
        Atividade indisponível
      </h2>

      <p>
        Esta atividade ainda não foi configurada.
      </p>

    </section>

  `;

}


/* =========================================================
   21. REGISTRAR RESPOSTA
   ========================================================= */

function registerAnswer(
  answer
) {

  LESSON_ENGINE.answers.push({

    ...answer,

    timestamp:
      new Date().toISOString()

  });

}


/* =========================================================
   22. BOTÕES
   ========================================================= */

function updateEngineButtons() {

  const back =
    document.getElementById(
      "lessonEngineBack"
    );


  const next =
    document.getElementById(
      "lessonEngineNext"
    );


  if (back) {

    back.disabled =
      LESSON_ENGINE.currentIndex ===
      0;

  }


  if (!next) {

    return;

  }


  const activity =
    LESSON_ENGINE.activities[
      LESSON_ENGINE.currentIndex
    ];


  if (!activity) {

    return;

  }


  if (
    activity.type ===
      "comprehension" ||
    activity.type ===
      "fixation"
  ) {

    const answered =
      LESSON_ENGINE.answers.some(
        answer =>
          answer.questionId ===
          activity.data.id
      );


    next.disabled =
      !answered;

  }

  else {

    next.disabled =
      false;

  }


  next.textContent =

    LESSON_ENGINE.currentIndex ===
      LESSON_ENGINE.activities.length - 1

      ? "Concluir aula"

      : "Continuar";

}


/* =========================================================
   23. PRÓXIMA ATIVIDADE
   ========================================================= */

function nextLessonActivity() {

  const activity =
    LESSON_ENGINE.activities[
      LESSON_ENGINE.currentIndex
    ];


  if (!activity) {

    return;

  }


  if (
    activity.type ===
      "translation"
  ) {

    if (
      !processTranslationAnswer(
        activity
      )
    ) {

      return;

    }

  }


  if (
    activity.type ===
      "recall"
  ) {

    if (
      !processRecallAnswer(
        activity
      )
    ) {

      return;

    }

  }


  if (
    LESSON_ENGINE.currentIndex >=
    LESSON_ENGINE.activities.length - 1
  ) {

    finishLessonEngine();

    return;

  }


  LESSON_ENGINE.currentIndex +=
    1;


  renderCurrentActivity();

}


/* =========================================================
   24. ATIVIDADE ANTERIOR
   ========================================================= */

function previousLessonActivity() {

  if (
    LESSON_ENGINE.currentIndex <=
    0
  ) {

    return;

  }


  LESSON_ENGINE.currentIndex -=
    1;


  renderCurrentActivity();

}


/* =========================================================
   25. PROCESSAR TRADUÇÃO
   ========================================================= */

function processTranslationAnswer(
  activity
) {

  const input =
    document.getElementById(
      "translationAnswer"
    );


  const feedback =
    document.getElementById(
      "translationFeedback"
    );


  if (!input) {

    return false;

  }


  const answer =
    normalizeAnswer(
      input.value
    );


  if (!answer) {

    if (feedback) {

      feedback.innerHTML =
        "<p>Digite uma resposta antes de continuar.</p>";

    }

    return false;

  }


  const expected =
    normalizeAnswer(
      activity.data.answer
    );


  const correct =
    answersAreSimilar(
      answer,
      expected
    );


  if (correct) {

    LESSON_ENGINE.correctAnswers++;

    LESSON_ENGINE.score +=
      LESSON_ENGINE_CONFIG.xpPerCorrectAnswer;


    if (feedback) {

      feedback.innerHTML = `

        <strong>
          Correto! 🎉
        </strong>

        <p>
          ${escapeHTML(
            activity.data.answer
          )}
        </p>

      `;

    }

  }

  else {

    LESSON_ENGINE.wrongAnswers++;


    if (feedback) {

      feedback.innerHTML = `

        <strong>
          Vamos revisar. 💡
        </strong>

        <p>
          Resposta esperada:
          <strong>
            ${escapeHTML(
              activity.data.answer
            )}
          </strong>
        </p>

      `;

    }


    registerLessonError({

      id:
        activity.data.id,

      type:
        "translation",

      question:
        activity.data.question,

      expected:
        activity.data.answer,

      answer:
        input.value

    });

  }


  registerAnswer({

    questionId:
      activity.data.id,

    type:
      "translation",

    answer:
      input.value,

    expected:
      activity.data.answer,

    correct:
      correct

  });


  input.disabled =
    true;


  return true;

}


/* =========================================================
   26. PROCESSAR ACTIVE RECALL
   ========================================================= */

function processRecallAnswer(
  activity
) {

  const input =
    document.getElementById(
      "recallAnswer"
    );


  const feedback =
    document.getElementById(
      "recallFeedback"
    );


  if (!input) {

    return false;

  }


  const answer =
    normalizeAnswer(
      input.value
    );


  if (!answer) {

    if (feedback) {

      feedback.innerHTML =
        "<p>Digite uma resposta antes de continuar.</p>";

    }

    return false;

  }


  const expected =
    normalizeAnswer(
      activity.data.answer
    );


  const correct =
    answersAreSimilar(
      answer,
      expected
    );


  if (correct) {

    LESSON_ENGINE.correctAnswers++;

    LESSON_ENGINE.score +=
      LESSON_ENGINE_CONFIG.xpPerCorrectAnswer;


    if (feedback) {

      feedback.innerHTML = `

        <strong>
          Muito bem! 🎯
        </strong>

      `;

    }

  }

  else {

    LESSON_ENGINE.wrongAnswers++;


    if (feedback) {

      feedback.innerHTML = `

        <strong>
          Quase!
        </strong>

        <p>
          Resposta:
          <strong>
            ${escapeHTML(
              activity.data.answer
            )}
          </strong>
        </p>

      `;

    }


    registerLessonError({

      id:
        activity.data.id,

      type:
        "recall",

      question:
        activity.data.question,

      expected:
        activity.data.answer,

      answer:
        input.value

    });

  }


  registerAnswer({

    questionId:
      activity.data.id,

    type:
      "recall",

    answer:
      input.value,

    expected:
      activity.data.answer,

    correct:
      correct

  });


  input.disabled =
    true;


  return true;

}


/* =========================================================
   27. REGISTRAR ERRO NO SISTEMA PRINCIPAL
   ========================================================= */

function registerLessonError(
  errorData
) {

  if (
    window.EnglishFamily &&
    typeof window.EnglishFamily
      .registerError ===
      "function"
  ) {

    window.EnglishFamily
      .registerError(
        errorData
      );

  }

}


/* =========================================================
   28. FINALIZAR AULA
   ========================================================= */

function finishLessonEngine() {

  LESSON_ENGINE.completedAt =
    new Date().toISOString();


  const elapsed =
    LESSON_ENGINE.startTime
      ? (
          Date.now() -
          LESSON_ENGINE.startTime
        ) / 60000
      : 0;


  LESSON_ENGINE.sessionMinutes =
    Math.max(
      1,
      Math.round(
        elapsed
      )
    );


  const total =
    LESSON_ENGINE.correctAnswers +
    LESSON_ENGINE.wrongAnswers;


  const percentage =
    total > 0
      ? Math.round(
          (
            LESSON_ENGINE.correctAnswers /
            total
          ) *
          100
        )
      : 100;


  const lesson =
    LESSON_ENGINE.lesson;


  if (
    lesson &&
    window.EnglishFamily
  ) {

    const user =
      window.EnglishFamily
        .getUser();


    if (
      user &&
      !user.completedLessons
        .includes(
          lesson.id
        )
    ) {

      window.EnglishFamily
        .completeLesson(
          lesson.id
        );

    }


    window.EnglishFamily
      .addStudyMinutes(
        LESSON_ENGINE.sessionMinutes
      );

  }


  saveLessonSession(
    percentage
  );


  renderFeedback(
    document.getElementById(
      "lessonEngineContent"
    )
  );


  LESSON_ENGINE.currentIndex =
    LESSON_ENGINE.activities.length - 1;


  updateEngineButtons();

}


/* =========================================================
   29. SALVAR SESSÃO
   ========================================================= */

function saveLessonSession(
  percentage
) {

  if (
    !window.EnglishFamily
  ) {

    return;

  }


  const user =
    window.EnglishFamily
      .getUser();


  if (!user) {

    return;

  }


  if (
    !Array.isArray(
      user.studySessions
    )
  ) {

    user.studySessions =
      [];

  }


  /*
    A sessão detalhada fica em
    studySessions para permitir,
    no futuro, análises de desempenho.
  */

  user.studySessions.push({

    type:
      "lesson",

    lessonId:
      LESSON_ENGINE.lesson.id,

    level:
      LESSON_ENGINE.lesson.level,

    module:
      LESSON_ENGINE.lesson.module,

    lesson:
      LESSON_ENGINE.lesson.lesson,

    percentage:
      percentage,

    correct:
      LESSON_ENGINE.correctAnswers,

    wrong:
      LESSON_ENGINE.wrongAnswers,

    minutes:
      LESSON_ENGINE.sessionMinutes,

    startedAt:
      LESSON_ENGINE.startedAt,

    completedAt:
      LESSON_ENGINE.completedAt,

    timestamp:
      new Date().toISOString()

  });


  if (
    user.studySessions.length >
    500
  ) {

    user.studySessions =
      user.studySessions.slice(
        -500
      );

  }


  if (
    typeof window.EnglishFamily
      .save ===
      "function"
  ) {

    window.EnglishFamily
      .save();

  }

}


/* =========================================================
   30. NORMALIZAÇÃO DE RESPOSTA
   ========================================================= */

function normalizeAnswer(
  value
) {

  return String(
    value || ""
  )
    .toLowerCase()
    .trim()
    .replace(
      /[.,!?;:]/g,
      ""
    )
    .replace(
      /\s+/g,
      " "
    );

}


/* =========================================================
   31. COMPARAÇÃO DE RESPOSTAS
   ========================================================= */

function answersAreSimilar(
  answer,
  expected
) {

  if (
    answer ===
    expected
  ) {

    return true;

  }


  /*
    Aceita pequenas diferenças de
    pontuação e espaços.
  */

  const compactAnswer =
    answer.replace(
      /['"]/g,
      ""
    );


  const compactExpected =
    expected.replace(
      /['"]/g,
      ""
    );


  return (
    compactAnswer ===
    compactExpected
  );

}


/* =========================================================
   32. ESCAPE HTML
   ========================================================= */

function escapeHTML(
  value
) {

  return String(
    value || ""
  )
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );

}


/* =========================================================
   33. API PÚBLICA DO MOTOR
   ========================================================= */

window.EnglishFamilyLessonEngine = {

  start(
    lesson
  ) {

    return startLessonEngine(
      lesson
    );

  },


  close() {

    closeLessonEngine();

  },


  reset() {

    resetLessonEngine();

  },


  getState() {

    return LESSON_ENGINE;

  },


  getLibrary() {

    return LESSON_LIBRARY;

  },


  getLesson(
    id
  ) {

    return getLessonFromLibrary(
      id
    );

  }

};


/* =========================================================
   34. FIM DO MOTOR DE AULAS
   ========================================================= */
