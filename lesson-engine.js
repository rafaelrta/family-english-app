/* =========================================================
   ENGLISH FAMILY
   MOTOR DE AULAS
   lesson-engine.js
   ========================================================= */

(function () {

  "use strict";


  /* =======================================================
     CONFIGURAÇÃO
     ======================================================= */

  const ENGINE_CONFIG = {

    version: "1.0.0",

    minimumPassingScore: 70,

    xpPerActivity: 2,

    xpBonusPerfectLesson: 10,

    maxAttemptsPerActivity: 3

  };


  /* =======================================================
     TIPOS DE ATIVIDADE
     ======================================================= */

  const ACTIVITY_TYPES = {

    INTRO: "intro",

    READING: "reading",

    COMPREHENSION: "comprehension",

    VOCABULARY: "vocabulary",

    GRAMMAR: "grammar",

    TRANSLATION: "translation",

    LISTENING: "listening",

    SPEAKING: "speaking",

    WRITING: "writing",

    ACTIVE_RECALL: "active-recall",

    MULTIPLE_CHOICE: "multiple-choice",

    TRUE_FALSE: "true-false",

    FILL_BLANK: "fill-blank",

    ORDER_WORDS: "order-words",

    MATCHING: "matching",

    REVIEW: "review",

    COMPLETE: "complete"

  };


  /* =======================================================
     ESTADO INTERNO DO MOTOR
     ======================================================= */

  let lessonState = {

    active: false,

    lessonId: null,

    level: null,

    module: null,

    lesson: null,

    title: "",

    description: "",

    activities: [],

    currentActivityIndex: 0,

    answers: [],

    errors: [],

    correctAnswers: 0,

    incorrectAnswers: 0,

    score: 0,

    xpEarned: 0,

    startedAt: null,

    finishedAt: null,

    completed: false

  };


  /* =======================================================
     UTILITÁRIOS
     ======================================================= */

  function clone(value) {

    return JSON.parse(
      JSON.stringify(value)
    );

  }


  function getApp() {

    if (
      window.EnglishFamily
    ) {

      return window.EnglishFamily;

    }

    return null;

  }


  function createLessonId(
    level,
    module,
    lesson
  ) {

    return [

      String(level || "")
        .toUpperCase(),

      String(module || ""),

      String(lesson || "")

    ].join("-");

  }


  function normalizeActivity(
    activity,
    index
  ) {

    const normalized = {

      id:
        activity.id ||
        `activity-${index + 1}`,

      type:
        activity.type ||
        ACTIVITY_TYPES.MULTIPLE_CHOICE,

      title:
        activity.title ||
        "",

      instruction:
        activity.instruction ||
        "",

      question:
        activity.question ||
        "",

      text:
        activity.text ||
        "",

      audio:
        activity.audio ||
        null,

      image:
        activity.image ||
        null,

      options:
        Array.isArray(activity.options)
          ? activity.options
          : [],

      answer:
        activity.answer !== undefined
          ? activity.answer
          : null,

      answers:
        Array.isArray(activity.answers)
          ? activity.answers
          : [],

      explanation:
        activity.explanation ||
        "",

      vocabulary:
        Array.isArray(activity.vocabulary)
          ? activity.vocabulary
          : [],

      grammar:
        activity.grammar ||
        null,

      skill:
        activity.skill ||
        null,

      points:
        Number.isFinite(activity.points)
          ? activity.points
          : ENGINE_CONFIG.xpPerActivity

    };

    return normalized;

  }


  /* =======================================================
     RESET DO ESTADO
     ======================================================= */

  function resetState() {

    lessonState = {

      active: false,

      lessonId: null,

      level: null,

      module: null,

      lesson: null,

      title: "",

      description: "",

      activities: [],

      currentActivityIndex: 0,

      answers: [],

      errors: [],

      correctAnswers: 0,

      incorrectAnswers: 0,

      score: 0,

      xpEarned: 0,

      startedAt: null,

      finishedAt: null,

      completed: false

    };

  }


  /* =======================================================
     CARREGAR AULA
     ======================================================= */

  function loadLesson(
    lessonData
  ) {

    if (
      !lessonData
    ) {

      console.error(
        "LessonEngine: aula não encontrada."
      );

      return false;

    }


    const activities =
      Array.isArray(
        lessonData.activities
      )
        ? lessonData.activities
        : [];


    resetState();


    lessonState.lessonId =
      lessonData.id ||
      createLessonId(
        lessonData.level,
        lessonData.module,
        lessonData.lesson
      );


    lessonState.level =
      lessonData.level ||
      null;


    lessonState.module =
      lessonData.module ||
      null;


    lessonState.lesson =
      lessonData.lesson ||
      null;


    lessonState.title =
      lessonData.title ||
      "Aula";


    lessonState.description =
      lessonData.description ||
      "";


    lessonState.activities =
      activities.map(
        normalizeActivity
      );


    return true;

  }


  /* =======================================================
     INICIAR AULA
     ======================================================= */

  function start(
    lessonData
  ) {

    if (
      !loadLesson(
        lessonData
      )
    ) {

      return false;

    }


    lessonState.active = true;

    lessonState.startedAt =
      new Date().toISOString();


    lessonState.currentActivityIndex =
      0;


    render();


    return true;

  }


  /* =======================================================
     ATIVIDADE ATUAL
     ======================================================= */

  function getCurrentActivity() {

    if (
      !lessonState.active
    ) {

      return null;

    }


    return (
      lessonState.activities[
        lessonState.currentActivityIndex
      ] ||
      null
    );

  }


  /* =======================================================
     PROGRESSO DA AULA
     ======================================================= */

  function getProgress() {

    const total =
      lessonState.activities.length;


    if (
      total === 0
    ) {

      return {

        current: 0,

        total: 0,

        percentage: 0

      };

    }


    const current =
      lessonState.currentActivityIndex + 1;


    return {

      current,

      total,

      percentage:
        Math.round(
          (
            lessonState.currentActivityIndex /
            total
          ) * 100
        )

    };

  }


  /* =======================================================
     RENDERIZAÇÃO
     ======================================================= */

  function render() {

    removeLessonScreen();


    if (
      !lessonState.active
    ) {

      return;

    }


    const activity =
      getCurrentActivity();


    if (
      !activity
    ) {

      finishLesson();

      return;

    }


    const container =
      document.createElement(
        "div"
      );


    container.id =
      "lessonEngineScreen";


    container.className =
      "lesson-engine-screen";


    container.innerHTML =
      buildLessonHTML(
        activity
      );


    document.body.appendChild(
      container
    );


    bindLessonEvents();


    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }


  /* =======================================================
     HTML DA AULA
     ======================================================= */

  function buildLessonHTML(
    activity
  ) {

    const progress =
      getProgress();


    return `

      <div class="lesson-engine-overlay">

        <div class="lesson-engine-header">

          <button
            id="lessonBackButton"
            class="lesson-engine-close"
            type="button"
            aria-label="Sair da aula"
          >
            ×
          </button>

          <div class="lesson-engine-progress">

            <div
              class="lesson-engine-progress-bar"
            >

              <div
                class="lesson-engine-progress-fill"
                style="width:${progress.percentage}%"
              ></div>

            </div>

            <span>
              ${progress.current}
              /
              ${progress.total}
            </span>

          </div>

        </div>


        <div class="lesson-engine-content">

          <div class="lesson-engine-title">

            <span class="small-label">
              ${escapeHTML(
                lessonState.level || ""
              )}
            </span>

            <h1>
              ${escapeHTML(
                lessonState.title
              )}
            </h1>

            ${
              activity.title
                ? `
                  <h2>
                    ${escapeHTML(
                      activity.title
                    )}
                  </h2>
                `
                : ""
            }

          </div>


          ${
            activity.instruction
              ? `
                <p class="lesson-engine-instruction">
                  ${escapeHTML(
                    activity.instruction
                  )}
                </p>
              `
              : ""
          }


          <div
            id="lessonActivity"
            class="lesson-activity"
          >

            ${buildActivityHTML(
              activity
            )}

          </div>


          <div
            id="lessonFeedback"
            class="lesson-feedback"
            hidden
          ></div>


          <button
            id="lessonAnswerButton"
            class="primary-button full-width lesson-answer-button"
            type="button"
          >
            Verificar
          </button>

        </div>

      </div>

    `;

  }


  /* =======================================================
     CONSTRUÇÃO DA ATIVIDADE
     ======================================================= */

  function buildActivityHTML(
    activity
  ) {

    switch (
      activity.type
    ) {

      case ACTIVITY_TYPES.INTRO:

        return buildIntroActivity(
          activity
        );


      case ACTIVITY_TYPES.READING:

        return buildReadingActivity(
          activity
        );


      case ACTIVITY_TYPES.MULTIPLE_CHOICE:

        return buildMultipleChoiceActivity(
          activity
        );


      case ACTIVITY_TYPES.TRUE_FALSE:

        return buildTrueFalseActivity(
          activity
        );


      case ACTIVITY_TYPES.FILL_BLANK:

        return buildFillBlankActivity(
          activity
        );


      case ACTIVITY_TYPES.ORDER_WORDS:

        return buildOrderWordsActivity(
          activity
        );


      case ACTIVITY_TYPES.TRANSLATION:

        return buildTranslationActivity(
          activity
        );


      case ACTIVITY_TYPES.VOCABULARY:

        return buildVocabularyActivity(
          activity
        );


      case ACTIVITY_TYPES.GRAMMAR:

        return buildGrammarActivity(
          activity
        );


      case ACTIVITY_TYPES.LISTENING:

        return buildListeningActivity(
          activity
        );


      case ACTIVITY_TYPES.SPEAKING:

        return buildSpeakingActivity(
          activity
        );


      case ACTIVITY_TYPES.WRITING:

        return buildWritingActivity(
          activity
        );


      case ACTIVITY_TYPES.ACTIVE_RECALL:

        return buildActiveRecallActivity(
          activity
        );


      case ACTIVITY_TYPES.COMPLETE:

        return buildCompleteActivity(
          activity
        );


      default:

        return buildMultipleChoiceActivity(
          activity
        );

    }

  }


  /* =======================================================
     INTRODUÇÃO
     ======================================================= */

  function buildIntroActivity(
    activity
  ) {

    return `

      <div class="lesson-intro">

        ${
          activity.image
            ? `
              <img
                src="${escapeAttribute(
                  activity.image
                )}"
                alt=""
                class="lesson-image"
              >
            `
            : ""
        }

        ${
          activity.text
            ? `
              <div class="lesson-text">
                ${formatText(
                  activity.text
                )}
              </div>
            `
            : ""
        }

      </div>

    `;

  }


  /* =======================================================
     LEITURA
     ======================================================= */

  function buildReadingActivity(
    activity
  ) {

    return `

      <div class="reading-activity">

        ${
          activity.text
            ? `
              <div class="reading-text">
                ${formatText(
                  activity.text
                )}
              </div>
            `
            : ""
        }

        ${
          activity.question
            ? `
              <div class="reading-question">
                <strong>
                  ${escapeHTML(
                    activity.question
                  )}
                </strong>
              </div>
            `
            : ""
        }

      </div>

    `;

  }


  /* =======================================================
     MÚLTIPLA ESCOLHA
     ======================================================= */

  function buildMultipleChoiceActivity(
    activity
  ) {

    return `

      <div class="question-block">

        <div class="question-text">

          ${escapeHTML(
            activity.question
          )}

        </div>


        <div class="answer-options">

          ${
            activity.options
              .map(
                function(option, index) {

                  return `

                    <label
                      class="answer-option"
                    >

                      <input
                        type="radio"
                        name="lessonAnswer"
                        value="${escapeAttribute(
                          option
                        )}"
                      >

                      <span>
                        ${escapeHTML(
                          option
                        )}
                      </span>

                    </label>

                  `;

                }
              )
              .join("")
          }

        </div>

      </div>

    `;

  }


  /* =======================================================
     VERDADEIRO / FALSO
     ======================================================= */

  function buildTrueFalseActivity(
    activity
  ) {

    return `

      <div class="question-block">

        <div class="question-text">

          ${escapeHTML(
            activity.question
          )}

        </div>


        <div class="answer-options">

          <label
            class="answer-option"
          >

            <input
              type="radio"
              name="lessonAnswer"
              value="true"
            >

            <span>
              Verdadeiro
            </span>

          </label>


          <label
            class="answer-option"
          >

            <input
              type="radio"
              name="lessonAnswer"
              value="false"
            >

            <span>
              Falso
            </span>

          </label>

        </div>

      </div>

    `;

  }


  /* =======================================================
     PREENCHER LACUNA
     ======================================================= */

  function buildFillBlankActivity(
    activity
  ) {

    return `

      <div class="question-block">

        <div class="question-text">
          ${formatText(
            activity.question
          )}
        </div>


        <input
          id="lessonTextAnswer"
          class="lesson-text-input"
          type="text"
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
          placeholder="Digite sua resposta"
        >

      </div>

    `;

  }


  /* =======================================================
     ORDENAR PALAVRAS
     ======================================================= */

  function buildOrderWordsActivity(
    activity
  ) {

    const words =
      Array.isArray(
        activity.options
      )
        ? activity.options
        : [];


    return `

      <div class="question-block">

        <div class="question-text">
          ${escapeHTML(
            activity.question
          )}
        </div>


        <div
          id="wordBank"
          class="word-bank"
        >

          ${
            words
              .map(
                function(word) {

                  return `

                    <button
                      type="button"
                      class="word-chip"
                      data-word="${escapeAttribute(
                        word
                      )}"
                    >
                      ${escapeHTML(
                        word
                      )}
                    </button>

                  `;

                }
              )
              .join("")
          }

        </div>


        <div
          id="orderedWords"
          class="ordered-words"
        ></div>

      </div>

    `;

  }


  /* =======================================================
     TRADUÇÃO
     ======================================================= */

  function buildTranslationActivity(
    activity
  ) {

    return `

      <div class="question-block">

        <div class="translation-source">

          ${formatText(
            activity.question
          )}

        </div>


        <textarea
          id="lessonTextAnswer"
          class="lesson-text-input lesson-textarea"
          placeholder="Digite a tradução..."
          autocomplete="off"
          spellcheck="false"
        ></textarea>

      </div>

    `;

  }


  /* =======================================================
     VOCABULÁRIO
     ======================================================= */

  function buildVocabularyActivity(
    activity
  ) {

    return `

      <div class="question-block">

        ${
          activity.text
            ? `
              <div class="vocabulary-word">
                ${escapeHTML(
                  activity.text
                )}
              </div>
            `
            : ""
        }


        <div class="question-text">

          ${escapeHTML(
            activity.question
          )}

        </div>


        <div class="answer-options">

          ${
            activity.options
              .map(
                function(option) {

                  return `

                    <label
                      class="answer-option"
                    >

                      <input
                        type="radio"
                        name="lessonAnswer"
                        value="${escapeAttribute(
                          option
                        )}"
                      >

                      <span>
                        ${escapeHTML(
                          option
                        )}
                      </span>

                    </label>

                  `;

                }
              )
              .join("")
          }

        </div>

      </div>

    `;

  }


  /* =======================================================
     GRAMÁTICA
     ======================================================= */

  function buildGrammarActivity(
    activity
  ) {

    return `

      <div class="question-block">

        ${
          activity.grammar
            ? `
              <div class="grammar-explanation">
                ${formatText(
                  activity.grammar
                )}
              </div>
            `
            : ""
        }


        <div class="question-text">

          ${escapeHTML(
            activity.question
          )}

        </div>


        <div class="answer-options">

          ${
            activity.options
              .map(
                function(option) {

                  return `

                    <label
                      class="answer-option"
                    >

                      <input
                        type="radio"
                        name="lessonAnswer"
                        value="${escapeAttribute(
                          option
                        )}"
                      >

                      <span>
                        ${escapeHTML(
                          option
                        )}
                      </span>

                    </label>

                  `;

                }
              )
              .join("")
          }

        </div>

      </div>

    `;

  }


  /* =======================================================
     LISTENING
     ======================================================= */

  function buildListeningActivity(
    activity
  ) {

    return `

      <div class="question-block">

        ${
          activity.audio
            ? `
              <audio
                class="lesson-audio"
                controls
                preload="metadata"
              >

                <source
                  src="${escapeAttribute(
                    activity.audio
                  )}"
                >

              </audio>
            `
            : `
              <div class="audio-placeholder">
                🎧
                <p>
                  O áudio desta atividade será
                  disponibilizado aqui.
                </p>
              </div>
            `
        }


        <div class="question-text">

          ${escapeHTML(
            activity.question
          )}

        </div>


        <div class="answer-options">

          ${
            activity.options
              .map(
                function(option) {

                  return `

                    <label
                      class="answer-option"
                    >

                      <input
                        type="radio"
                        name="lessonAnswer"
                        value="${escapeAttribute(
                          option
                        )}"
                      >

                      <span>
                        ${escapeHTML(
                          option
                        )}
                      </span>

                    </label>

                  `;

                }
              )
              .join("")
          }

        </div>

      </div>

    `;

  }


  /* =======================================================
     SPEAKING
     ======================================================= */

  function buildSpeakingActivity(
    activity
  ) {

    return `

      <div class="speaking-activity">

        <div class="speaking-prompt">

          🗣️

          <p>
            ${escapeHTML(
              activity.question ||
              "Fale em inglês seguindo a orientação."
            )}
          </p>

        </div>


        <button
          id="speechButton"
          class="secondary-button"
          type="button"
        >
          🎙️ Iniciar fala
        </button>


        <div
          id="speechResult"
          class="speech-result"
        ></div>

      </div>

    `;

  }


  /* =======================================================
     WRITING
     ======================================================= */

  function buildWritingActivity(
    activity
  ) {

    return `

      <div class="question-block">

        <div class="question-text">

          ${formatText(
            activity.question
          )}

        </div>


        <textarea
          id="lessonTextAnswer"
          class="lesson-text-input lesson-textarea"
          placeholder="Escreva sua resposta em inglês..."
          autocomplete="off"
          spellcheck="false"
        ></textarea>

      </div>

    `;

  }


  /* =======================================================
     RECUPERAÇÃO ATIVA
     ======================================================= */

  function buildActiveRecallActivity(
    activity
  ) {

    return `

      <div class="active-recall">

        <div class="recall-prompt">

          🧠

          <h2>
            ${escapeHTML(
              activity.question
            )}
          </h2>

        </div>


        <input
          id="lessonTextAnswer"
          class="lesson-text-input"
          type="text"
          placeholder="Digite o que você lembra..."
          autocomplete="off"
          spellcheck="false"
        >

      </div>

    `;

  }


  /* =======================================================
     CONCLUSÃO
     ======================================================= */

  function buildCompleteActivity(
    activity
  ) {

    return `

      <div class="lesson-complete-preview">

        <div class="complete-icon">
          🎯
        </div>

        <h2>
          Muito bem!
        </h2>

        <p>
          Você chegou ao final desta etapa.
        </p>

        ${
          activity.text
            ? `
              <div class="lesson-text">
                ${formatText(
                  activity.text
                )}
              </div>
            `
            : ""
        }

      </div>

    `;

  }


  /* =======================================================
     EVENTOS
     ======================================================= */

  function bindLessonEvents() {

    const backButton =
      document.getElementById(
        "lessonBackButton"
      );


    if (
      backButton
    ) {

      backButton.addEventListener(
        "click",
        exitLesson
      );

    }


    const answerButton =
      document.getElementById(
        "lessonAnswerButton"
      );


    if (
      answerButton
    ) {

      answerButton.addEventListener(
        "click",
        handleAnswer
      );

    }


    bindWordOrdering();


    bindSpeech();

  }


  /* =======================================================
     ORDENAR PALAVRAS
     ======================================================= */

  function bindWordOrdering() {

    const wordBank =
      document.getElementById(
        "wordBank"
      );


    const orderedWords =
      document.getElementById(
        "orderedWords"
      );


    if (
      !wordBank ||
      !orderedWords
    ) {

      return;

    }


    wordBank
      .querySelectorAll(
        ".word-chip"
      )
      .forEach(
        function(button) {

          button.addEventListener(
            "click",
            function() {

              if (
                button.disabled
              ) {

                return;

              }


              button.disabled =
                true;


              const chip =
                document.createElement(
                  "button"
                );


              chip.type =
                "button";


              chip.className =
                "word-chip selected";


              chip.textContent =
                button.dataset.word;


              chip.dataset.word =
                button.dataset.word;


              chip.addEventListener(
                "click",
                function() {

                  chip.remove();

                  button.disabled =
                    false;

                }
              );


              orderedWords.appendChild(
                chip
              );

            }
          );

        }
      );

  }


  /* =======================================================
     RECONHECIMENTO DE VOZ
     ======================================================= */

  function bindSpeech() {

    const button =
      document.getElementById(
        "speechButton"
      );


    if (
      !button
    ) {

      return;

    }


    const result =
      document.getElementById(
        "speechResult"
      );


    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;


    if (
      !SpeechRecognition
    ) {

      button.disabled =
        true;


      button.textContent =
        "🎙️ Voz não disponível neste navegador";


      return;

    }


    const recognition =
      new SpeechRecognition();


    recognition.lang =
      "en-US";


    recognition.interimResults =
      false;


    recognition.continuous =
      false;


    button.addEventListener(
      "click",
      function() {

        button.disabled =
          true;


        button.textContent =
          "🎙️ Ouvindo...";


        recognition.start();

      }
    );


    recognition.onresult =
      function(event) {

        const transcript =
          event.results[0][0]
            .transcript;


        if (
          result
        ) {

          result.textContent =
            transcript;

        }


        lessonState.currentSpeech =
          transcript;


        button.disabled =
          false;


        button.textContent =
          "🎙️ Tentar novamente";

      };


    recognition.onerror =
      function() {

        button.disabled =
          false;


        button.textContent =
          "🎙️ Tentar novamente";

      };


    recognition.onend =
      function() {

        button.disabled =
          false;

      };

  }


  /* =======================================================
     RECEBER RESPOSTA
     ======================================================= */

  function handleAnswer() {

    const activity =
      getCurrentActivity();


    if (
      !activity
    ) {

      return;

    }


    const answer =
      collectAnswer(
        activity
      );


    if (
      answer === null
    ) {

      showFeedback(
        false,
        "Escolha ou escreva uma resposta antes de continuar."
      );

      return;

    }


    const correct =
      evaluateAnswer(
        activity,
        answer
      );


    registerAnswer(
      activity,
      answer,
      correct
    );


    showFeedback(
      correct,
      getFeedbackMessage(
        activity,
        correct
      )
    );


    const button =
      document.getElementById(
        "lessonAnswerButton"
      );


    if (
      button
    ) {

      button.textContent =
        "Continuar";


      button.onclick =
        function() {

          nextActivity();

        };

    }

  }


  /* =======================================================
     COLETAR RESPOSTA
     ======================================================= */

  function collectAnswer(
    activity
  ) {

    switch (
      activity.type
    ) {

      case ACTIVITY_TYPES.MULTIPLE_CHOICE:

      case ACTIVITY_TYPES.VOCABULARY:

      case ACTIVITY_TYPES.GRAMMAR:

      case ACTIVITY_TYPES.LISTENING:

      case ACTIVITY_TYPES.TRUE_FALSE: {

        const selected =
          document.querySelector(
            'input[name="lessonAnswer"]:checked'
          );


        return selected
          ? selected.value
          : null;

      }


      case ACTIVITY_TYPES.FILL_BLANK:

      case ACTIVITY_TYPES.TRANSLATION:

      case ACTIVITY_TYPES.WRITING:

      case ACTIVITY_TYPES.ACTIVE_RECALL: {

        const input =
          document.getElementById(
            "lessonTextAnswer"
          );


        if (
          !input
        ) {

          return null;

        }


        const value =
          input.value.trim();


        return value
          ? value
          : null;

      }


      case ACTIVITY_TYPES.ORDER_WORDS: {

        const container =
          document.getElementById(
            "orderedWords"
          );


        if (
          !container
        ) {

          return null;

        }


        const words =
          Array.from(
            container.children
          ).map(
            function(element) {

              return element.dataset.word ||
                element.textContent.trim();

            }
          );


        return words.length
          ? words
          : null;

      }


      case ACTIVITY_TYPES.SPEAKING:

        return (
          lessonState.currentSpeech ||
          null
        );


      case ACTIVITY_TYPES.INTRO:

      case ACTIVITY_TYPES.COMPLETE:

        return true;


      default:

        return null;

    }

  }


  /* =======================================================
     AVALIAR RESPOSTA
     ======================================================= */

  function evaluateAnswer(
    activity,
    answer
  ) {

    /*
      Atividades introdutórias não
      exigem correção.
    */

    if (
      activity.type ===
        ACTIVITY_TYPES.INTRO ||
      activity.type ===
        ACTIVITY_TYPES.COMPLETE
    ) {

      return true;

    }


    /*
      Speaking inicialmente registra
      a tentativa. A avaliação
      avançada de pronúncia será
      incorporada posteriormente.
    */

    if (
      activity.type ===
        ACTIVITY_TYPES.SPEAKING
    ) {

      return true;

    }


    const expected =
      activity.answer !== null
        ? activity.answer
        : activity.answers;


    if (
      Array.isArray(expected)
    ) {

      if (
        activity.type ===
          ACTIVITY_TYPES.ORDER_WORDS
      ) {

        return compareWordArrays(
          answer,
          expected
        );

      }


      return expected.some(
        function(value) {

          return normalizeAnswer(
            answer
          ) ===
          normalizeAnswer(
            value
          );

        }
      );

    }


    if (
      expected === null ||
      expected === undefined
    ) {

      /*
        Atividades sem resposta
        definida serão consideradas
        concluídas, mas não serão
        contabilizadas como erro.
      */

      return true;

    }


    return (
      normalizeAnswer(
        answer
      ) ===
      normalizeAnswer(
        expected
      )
    );

  }


  /* =======================================================
     NORMALIZAÇÃO
     ======================================================= */

  function normalizeAnswer(
    value
  ) {

    if (
      value === null ||
      value === undefined
    ) {

      return "";

    }


    return String(value)
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(
        /[\u0300-\u036f]/g,
        ""
      )
      .replace(
        /[.!?,;:]+$/g,
        ""
      )
      .replace(
        /\s+/g,
        " "
      );

  }


  function compareWordArrays(
    first,
    second
  ) {

    if (
      !Array.isArray(first) ||
      !Array.isArray(second)
    ) {

      return false;

    }


    if (
      first.length !==
      second.length
    ) {

      return false;

    }


    for (
      let index = 0;
      index < first.length;
      index++
    ) {

      if (
        normalizeAnswer(
          first[index]
        ) !==
        normalizeAnswer(
          second[index]
        )
      ) {

        return false;

      }

    }


    return true;

  }


  /* =======================================================
     REGISTRAR RESPOSTA
     ======================================================= */

  function registerAnswer(
    activity,
    answer,
    correct
  ) {

    lessonState.answers.push({

      activityId:
        activity.id,

      type:
        activity.type,

      answer:
        clone(answer),

      correct,

      timestamp:
        new Date().toISOString()

    });


    if (
      correct
    ) {

      lessonState.correctAnswers++;

      lessonState.score++;

      lessonState.xpEarned +=
        activity.points ||
        ENGINE_CONFIG.xpPerActivity;

    }
    else {

      lessonState.incorrectAnswers++;

      registerActivityError(
        activity,
        answer
      );

    }

  }


  /* =======================================================
     ERROS
     ======================================================= */

  function registerActivityError(
    activity,
    answer
  ) {

    const error = {

      activityId:
        activity.id,

      lessonId:
        lessonState.lessonId,

      type:
        activity.type,

      question:
        activity.question,

      answer:
        clone(answer),

      expected:
        clone(activity.answer),

      timestamp:
        new Date().toISOString()

    };


    lessonState.errors.push(
      error
    );


    const app =
      getApp();


    if (
      app &&
      typeof app.registerError ===
        "function"
    ) {

      try {

        app.registerError(
          error
        );

      }
      catch (error) {

        console.warn(
          "Não foi possível registrar o erro no app.",
          error
        );

      }

    }

  }


  /* =======================================================
     FEEDBACK
     ======================================================= */

  function showFeedback(
    correct,
    message
  ) {

    const feedback =
      document.getElementById(
        "lessonFeedback"
      );


    if (
      !feedback
    ) {

      return;

    }


    feedback.hidden =
      false;


    feedback.className =
      correct
        ? "lesson-feedback correct"
        : "lesson-feedback incorrect";


    feedback.innerHTML = `

      <strong>
        ${
          correct
            ? "Muito bem! 🎉"
            : "Vamos reforçar isso. 💪"
        }
      </strong>

      <p>
        ${escapeHTML(
          message
        )}
      </p>

    `;

  }


  function getFeedbackMessage(
    activity,
    correct
  ) {

    if (
      correct
    ) {

      return (
        activity.explanation ||
        "Resposta correta."
      );

    }


    if (
      activity.explanation
    ) {

      return activity.explanation;

    }


    if (
      activity.answer !== null &&
      activity.answer !== undefined
    ) {

      return (
        "A resposta esperada é: " +
        formatExpectedAnswer(
          activity.answer
        )
      );

    }


    return "Revise este ponto e tente novamente.";

  }


  function formatExpectedAnswer(
    answer
  ) {

    if (
      Array.isArray(answer)
    ) {

      return answer.join(
        " "
      );

    }


    return String(
      answer
    );

  }


  /* =======================================================
     PRÓXIMA ATIVIDADE
     ======================================================= */

  function nextActivity() {

    const feedback =
      document.getElementById(
        "lessonFeedback"
      );


    if (
      feedback
    ) {

      feedback.hidden =
        true;

    }


    lessonState.currentSpeech =
      null;


    lessonState.currentActivityIndex++;


    if (
      lessonState.currentActivityIndex >=
      lessonState.activities.length
    ) {

      finishLesson();

      return;

    }


    render();

  }


  /* =======================================================
     FINALIZAR AULA
     ======================================================= */

  function finishLesson() {

    lessonState.active =
      false;


    lessonState.completed =
      true;


    lessonState.finishedAt =
      new Date().toISOString();


    const total =
      lessonState.correctAnswers +
      lessonState.incorrectAnswers;


    const percentage =
      total > 0
        ? Math.round(
            (
              lessonState.correctAnswers /
              total
            ) * 100
          )
        : 100;


    if (
      percentage === 100
    ) {

      lessonState.xpEarned +=
        ENGINE_CONFIG.xpBonusPerfectLesson;

    }


    const app =
      getApp();


    /*
      Entrega XP ao aplicativo.
    */

    if (
      app &&
      typeof app.addXP ===
        "function"
    ) {

      try {

        app.addXP(
          lessonState.xpEarned
        );

      }
      catch (error) {

        console.warn(
          "Erro ao adicionar XP.",
          error
        );

      }

    }


    /*
      Registra conclusão da aula.
    */

    if (
      app &&
      typeof app.completeLesson ===
        "function"
    ) {

      try {

        app.completeLesson(
          {
            lessonId:
              lessonState.lessonId,

            level:
              lessonState.level,

            module:
              lessonState.module,

            lesson:
              lessonState.lesson,

            score:
              percentage,

            correctAnswers:
              lessonState.correctAnswers,

            incorrectAnswers:
              lessonState.incorrectAnswers,

            xpEarned:
              lessonState.xpEarned,

            errors:
              lessonState.errors,

            startedAt:
              lessonState.startedAt,

            finishedAt:
              lessonState.finishedAt

          }
        );

      }
      catch (error) {

        console.warn(
          "Erro ao registrar conclusão da aula.",
          error
        );

      }

    }


    renderLessonResult(
      percentage
    );

  }


  /* =======================================================
     RESULTADO
     ======================================================= */

  function renderLessonResult(
    percentage
  ) {

    removeLessonScreen();


    const container =
      document.createElement(
        "div"
      );


    container.id =
      "lessonEngineScreen";


    container.className =
      "lesson-engine-screen";


    const passed =
      percentage >=
      ENGINE_CONFIG.minimumPassingScore;


    container.innerHTML = `

      <div class="lesson-engine-overlay">

        <div class="lesson-result">

          <div class="lesson-result-icon">

            ${
              passed
                ? "🎉"
                : "💪"
            }

          </div>


          <span class="small-label">
            AULA CONCLUÍDA
          </span>


          <h1>
            ${
              passed
                ? "Parabéns!"
                : "Continue praticando!"
            }
          </h1>


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
                ${lessonState.correctAnswers}
              </strong>
              <span>
                acertos
              </span>
            </div>


            <div>
              <strong>
                ${lessonState.incorrectAnswers}
              </strong>
              <span>
                erros
              </span>
            </div>


            <div>
              <strong>
                +${lessonState.xpEarned}
              </strong>
              <span>
                XP
              </span>
            </div>

          </div>


          ${
            lessonState.errors.length
              ? `
                <div class="lesson-result-attention">

                  <strong>
                    Pontos para reforçar
                  </strong>

                  <p>
                    ${lessonState.errors.length}
                    ${
                      lessonState.errors.length === 1
                        ? "atividade precisa"
                        : "atividades precisam"
                    }
                    de revisão.
                  </p>

                </div>
              `
              : `
                <div class="lesson-result-perfect">

                  ⭐ Excelente!
                  Você não teve erros nesta aula.

                </div>
              `
          }


          <button
            id="lessonFinishButton"
            class="primary-button full-width"
            type="button"
          >
            Continuar
          </button>

        </div>

      </div>

    `;


    document.body.appendChild(
      container
    );


    const finishButton =
      document.getElementById(
        "lessonFinishButton"
      );


    if (
      finishButton
    ) {

      finishButton.addEventListener(
        "click",
        function() {

          removeLessonScreen();


          if (
            window.EnglishFamily &&
            typeof window.EnglishFamily.refresh ===
              "function"
          ) {

            window.EnglishFamily.refresh();

          }

        }
      );

    }

  }


  /* =======================================================
     SAIR DA AULA
     ======================================================= */

  function exitLesson() {

    const confirmed =
      window.confirm(
        "Deseja sair da aula? Seu progresso desta sessão será perdido."
      );


    if (
      !confirmed
    ) {

      return;

    }


    resetState();

    removeLessonScreen();

  }


  /* =======================================================
     REMOVER TELA
     ======================================================= */

  function removeLessonScreen() {

    const screen =
      document.getElementById(
        "lessonEngineScreen"
      );


    if (
      screen
    ) {

      screen.remove();

    }

  }


  /* =======================================================
     SEGURANÇA HTML
     ======================================================= */

  function escapeHTML(
    value
  ) {

    if (
      value === null ||
      value === undefined
    ) {

      return "";

    }


    return String(value)
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


  function escapeAttribute(
    value
  ) {

    return escapeHTML(
      value
    );

  }


  function formatText(
    value
  ) {

    return escapeHTML(
      value
    )
      .replace(
        /\n\n/g,
        "</p><p>"
      )
      .replace(
        /\n/g,
        "<br>"
      );

  }


  /* =======================================================
     API PÚBLICA
     ======================================================= */

  window.LessonEngine = {

    version:
      ENGINE_CONFIG.version,

    config:
      ENGINE_CONFIG,

    activityTypes:
      ACTIVITY_TYPES,

    start:
      start,

    loadLesson:
      loadLesson,

    getState:
      function () {

        return clone(
          lessonState
        );

      },

    getCurrentActivity:
      getCurrentActivity,

    getProgress:
      getProgress,

    nextActivity:
      nextActivity,

    finishLesson:
      finishLesson,

    exitLesson:
      exitLesson,

    reset:
      resetState,

    render:
      render

  };


  /* =======================================================
     INICIALIZAÇÃO
     ======================================================= */

  console.log(
    "English Family — Lesson Engine " +
    ENGINE_CONFIG.version +
    " carregado."
  );

})();
