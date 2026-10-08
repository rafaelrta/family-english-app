/* =========================================================
   ENGLISH FAMILY
   APP.JS
   Núcleo principal + MOTOR DE AULAS
   ========================================================= */


/* =========================================================
   1. CONFIGURAÇÃO GERAL
   ========================================================= */

const APP_CONFIG = {

  name: "English Family",

  version: "1.2.0",

  language: "en",

  defaultLevel: "A2",

  dailyGoalMinutes: 15,

  xpPerLesson: 20,

  xpPerReview: 10,

  xpPerConversation: 15,

  xpPerTest: 30,

  storageKey: "englishFamilyData",

  storageVersion: 1

};


/* =========================================================
   2. ESTRUTURA DO CURSO
   ========================================================= */

const COURSE = {

  A1: {
    title: "A1 — Beginner",
    modules: 3,
    lessonsPerModule: 5
  },

  A2: {
    title: "A2 — Elementary",
    modules: 3,
    lessonsPerModule: 5
  },

  B1: {
    title: "B1 — Intermediate",
    modules: 3,
    lessonsPerModule: 5
  },

  B2: {
    title: "B2 — Upper Intermediate",
    modules: 3,
    lessonsPerModule: 5
  },

  C1: {
    title: "C1 — Advanced",
    modules: 3,
    lessonsPerModule: 5
  }

};


/* =========================================================
   3. BANCO DE AULAS
   =========================================================
   
   A estrutura foi criada para comportar A1 → C1.

   Nesta primeira versão real do Motor de Aulas,
   A2-M1-L1 já possui conteúdo completo.

   As demais aulas permanecem estruturadas para
   receber o conteúdo completo posteriormente.
   ========================================================= */

const LESSON_CONTENT = {

  A2: {

    1: {

      title: "Módulo 1",

      lessons: [

        {
          id: "A2-M1-L1",
          title: "Daily Routine",
          description: "Talking about everyday routines.",
          type: "reading",
          status: "current",

          content: {

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
                question:
                  "What time does the person usually wake up?",
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
                question:
                  "Who does the person have breakfast with?",
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
                question:
                  "When does the person have lunch?",
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
                question:
                  "What does the person usually do after dinner?",
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
                question:
                  "Choose the correct sentence.",
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
                question:
                  "Choose the correct sentence.",
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
                question:
                  "Choose the correct sentence.",
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
                question:
                  "Complete: I _____ up at seven.",
                answer:
                  "wake"
              },

              {
                id: "r2",
                question:
                  "Complete: I _____ lunch at noon.",
                answer:
                  "have"
              },

              {
                id: "r3",
                question:
                  "Complete: I _____ to bed at eleven.",
                answer:
                  "go"
              }

            ]

          }

        },

        {
          id: "A2-M1-L2",
          title: "A Busy Day",
          description: "Talking about past events.",
          type: "reading",
          status: "locked"
        },

        {
          id: "A2-M1-L3",
          title: "An Unexpected Afternoon",
          description: "Plans and unexpected situations.",
          type: "reading",
          status: "locked"
        },

        {
          id: "A2-M1-L4",
          title: "A Change of Plans",
          description: "Past events and changes.",
          type: "reading",
          status: "locked"
        },

        {
          id: "A2-M1-L5",
          title: "Coming Soon",
          description: "Consolidating the module.",
          type: "reading",
          status: "locked"
        },

        {
          id: "A2-M1-REVIEW",
          title: "Revisão Geral",
          description: "Review everything from Module 1.",
          type: "review",
          status: "locked"
        },

        {
          id: "A2-M1-TEST",
          title: "Avaliação do Módulo",
          description: "Test your knowledge.",
          type: "test",
          status: "locked"
        }

      ]

    },

    2: {

      title: "Módulo 2",

      lessons: createModuleLessons(
        "A2",
        2
      )

    },

    3: {

      title: "Módulo 3",

      lessons: createModuleLessons(
        "A2",
        3
      )

    }

  }

};


/* =========================================================
   4. CRIAÇÃO DOS MÓDULOS PLACEHOLDER
   ========================================================= */

function createModuleLessons(
  level,
  moduleNumber
) {

  const lessons = [];

  for (
    let i = 1;
    i <= 5;
    i++
  ) {

    lessons.push({

      id:
        `${level}-M${moduleNumber}-L${i}`,

      title:
        "Conteúdo em preparação",

      description:
        "Aula estruturada para o curso.",

      type:
        "reading",

      status:
        "locked"

    });

  }

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

  return lessons;

}


/* =========================================================
   5. GARANTIR ESTRUTURA A1 → C1
   ========================================================= */

function ensureCourseStructure() {

  Object.keys(
    COURSE
  ).forEach(
    level => {

      if (
        !LESSON_CONTENT[level]
      ) {

        LESSON_CONTENT[level] = {};

      }

      for (
        let moduleNumber = 1;
        moduleNumber <=
          COURSE[level].modules;
        moduleNumber++
      ) {

        if (
          !LESSON_CONTENT[level][moduleNumber]
        ) {

          LESSON_CONTENT[level][moduleNumber] = {

            title:
              `Módulo ${moduleNumber}`,

            lessons:
              createModuleLessons(
                level,
                moduleNumber
              )

          };

        }

      }

    }
  );

}


/* =========================================================
   6. ESTRUTURA PADRÃO DO USUÁRIO
   ========================================================= */

const DEFAULT_USER = {

  id: "local-user",

  name: "Aluno",

  email: "",

  level: APP_CONFIG.defaultLevel,

  module: 1,

  lesson: 1,

  xp: 0,

  streak: 0,

  lastStudyDate: null,

  dailyDate: null,

  dailyMinutes: 0,

  dailyGoal:
    APP_CONFIG.dailyGoalMinutes,

  totalStudyMinutes: 0,

  lessonsCompletedCount: 0,

  reviewCompletedCount: 0,

  conversationsCompletedCount: 0,

  testsCompletedCount: 0,

  progress: {

    reading: 0,

    listening: 0,

    speaking: 0,

    writing: 0,

    vocabulary: 0,

    grammar: 0

  },

  review: {

    due: 0,

    weakPoints: 0,

    items: []

  },

  achievements: [],

  completedLessons: [],

  completedReviews: [],

  completedTests: [],

  errors: [],

  vocabulary: {},

  grammar: {},

  conversations: [],

  studySessions: [],

  settings: {

    darkMode: false,

    notifications: true,

    sound: true

  }

};


/* =========================================================
   7. ESTADO GLOBAL
   ========================================================= */

let APP_STATE = {

  user: null,

  currentSection: "home",

  menuOpen: false,

  initialized: false,

  currentLesson: null,

  currentSession: null

};


/* =========================================================
   8. INICIALIZAÇÃO
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  initializeApp
);


function initializeApp() {

  try {

    ensureCourseStructure();

    loadUserData();

    normalizeDailyData();

    setupNavigation();

    setupMenu();

    setupButtons();

    updateInterface();

    registerServiceWorker();

    APP_STATE.initialized = true;

    console.log(
      `${APP_CONFIG.name} ${APP_CONFIG.version} inicializado.`
    );

  }

  catch (error) {

    console.error(
      "Erro durante a inicialização:",
      error
    );

  }

}


/* =========================================================
   9. SERVICE WORKER
   ========================================================= */

function registerServiceWorker() {

  if (
    !("serviceWorker" in navigator)
  ) {

    return;

  }

  window.addEventListener(
    "load",
    () => {

      navigator.serviceWorker
        .register("./sw.js")
        .then(
          registration => {

            console.log(
              "[English Family] Service Worker registrado.",
              registration.scope
            );

          }
        )
        .catch(
          error => {

            console.warn(
              "[English Family] Falha ao registrar Service Worker:",
              error
            );

          }
        );

    }
  );

}


/* =========================================================
   10. STORAGE
   ========================================================= */

function loadUserData() {

  try {

    const savedData =
      localStorage.getItem(
        APP_CONFIG.storageKey
      );

    if (!savedData) {

      APP_STATE.user =
        cloneObject(
          DEFAULT_USER
        );

      saveUserData();

      return;

    }

    const parsed =
      JSON.parse(
        savedData
      );

    APP_STATE.user =
      mergeObjects(
        DEFAULT_USER,
        parsed
      );

    normalizeUserData();

  }

  catch (error) {

    console.error(
      "Erro ao carregar dados:",
      error
    );

    APP_STATE.user =
      cloneObject(
        DEFAULT_USER
      );

  }

}


function saveUserData() {

  if (!APP_STATE.user) {

    return;

  }

  try {

    localStorage.setItem(
      APP_CONFIG.storageKey,
      JSON.stringify(
        APP_STATE.user
      )
    );

  }

  catch (error) {

    console.error(
      "Erro ao salvar dados:",
      error
    );

  }

}


/* =========================================================
   11. NORMALIZAÇÃO
   ========================================================= */

function normalizeUserData() {

  const user =
    APP_STATE.user;

  if (!user.id) {

    user.id =
      "local-user";

  }

  if (!user.name) {

    user.name =
      "Aluno";

  }

  if (
    !COURSE[user.level]
  ) {

    user.level =
      APP_CONFIG.defaultLevel;

  }

  if (
    !Number.isInteger(
      user.module
    ) ||
    user.module < 1
  ) {

    user.module = 1;

  }

  if (
    !Number.isInteger(
      user.lesson
    ) ||
    user.lesson < 1
  ) {

    user.lesson = 1;

  }

  if (
    !Array.isArray(
      user.completedLessons
    )
  ) {

    user.completedLessons = [];

  }

  if (
    !Array.isArray(
      user.completedReviews
    )
  ) {

    user.completedReviews = [];

  }

  if (
    !Array.isArray(
      user.completedTests
    )
  ) {

    user.completedTests = [];

  }

  if (
    !Array.isArray(
      user.achievements
    )
  ) {

    user.achievements = [];

  }

  if (
    !Array.isArray(
      user.errors
    )
  ) {

    user.errors = [];

  }

  if (
    !Array.isArray(
      user.conversations
    )
  ) {

    user.conversations = [];

  }

  if (
    !Array.isArray(
      user.studySessions
    )
  ) {

    user.studySessions = [];

  }

  if (
    !user.progress ||
    typeof user.progress !== "object"
  ) {

    user.progress =
      cloneObject(
        DEFAULT_USER.progress
      );

  }

  if (
    !user.review ||
    typeof user.review !== "object"
  ) {

    user.review =
      cloneObject(
        DEFAULT_USER.review
      );

  }

  if (
    !Array.isArray(
      user.review.items
    )
  ) {

    user.review.items = [];

  }

  if (
    !user.vocabulary ||
    typeof user.vocabulary !== "object"
  ) {

    user.vocabulary = {};

  }

  if (
    !user.grammar ||
    typeof user.grammar !== "object"
  ) {

    user.grammar = {};

  }

  if (!user.settings) {

    user.settings =
      cloneObject(
        DEFAULT_USER.settings
      );

  }

  saveUserData();

}


/* =========================================================
   12. META DIÁRIA
   ========================================================= */

function normalizeDailyData() {

  const user =
    APP_STATE.user;

  const today =
    getDateKey(
      new Date()
    );

  if (
    user.dailyDate !==
    today
  ) {

    user.dailyDate =
      today;

    user.dailyMinutes =
      0;

    saveUserData();

  }

}


/* =========================================================
   13. UTILITÁRIOS
   ========================================================= */

function cloneObject(
  object
) {

  return JSON.parse(
    JSON.stringify(
      object
    )
  );

}


function mergeObjects(
  base,
  extra
) {

  const result =
    cloneObject(
      base
    );

  Object.keys(
    extra || {}
  ).forEach(
    key => {

      if (

        extra[key] !== null &&

        typeof extra[key] === "object" &&

        !Array.isArray(
          extra[key]
        )

      ) {

        result[key] =
          mergeObjects(
            result[key] || {},
            extra[key]
          );

      }

      else {

        result[key] =
          extra[key];

      }

    }
  );

  return result;

}


/* =========================================================
   14. NAVEGAÇÃO
   ========================================================= */

function setupNavigation() {

  document
    .querySelectorAll(
      "[data-section]"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          function () {

            navigateTo(
              this.dataset.section
            );

          }
        );

      }
    );

}


function navigateTo(
  section
) {

  if (!section) {

    return;

  }

  const target =
    document.getElementById(
      `section-${section}`
    );

  if (!target) {

    console.warn(
      `Seção não encontrada: ${section}`
    );

    return;

  }

  document
    .querySelectorAll(
      ".app-section"
    )
    .forEach(
      element => {

        element.classList.remove(
          "active"
        );

      }
    );

  target.classList.add(
    "active"
  );

  document
    .querySelectorAll(
      ".nav-item, .bottom-nav-item"
    )
    .forEach(
      item => {

        item.classList.toggle(
          "active",
          item.dataset.section ===
            section
        );

      }
    );

  APP_STATE.currentSection =
    section;

  closeMenu();

  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

}


/* =========================================================
   15. MENU
   ========================================================= */

function setupMenu() {

  const menuButton =
    document.getElementById(
      "menuButton"
    );

  const closeButton =
    document.getElementById(
      "closeMenuButton"
    );

  const overlay =
    document.getElementById(
      "menuOverlay"
    );

  if (menuButton) {

    menuButton.addEventListener(
      "click",
      openMenu
    );

  }

  if (closeButton) {

    closeButton.addEventListener(
      "click",
      closeMenu
    );

  }

  if (overlay) {

    overlay.addEventListener(
      "click",
      closeMenu
    );

  }

}


function openMenu() {

  const menu =
    document.getElementById(
      "sideMenu"
    );

  const overlay =
    document.getElementById(
      "menuOverlay"
    );

  if (!menu) {

    return;

  }

  menu.classList.add(
    "open"
  );

  overlay?.classList.add(
    "visible"
  );

  menu.setAttribute(
    "aria-hidden",
    "false"
  );

  overlay?.setAttribute(
    "aria-hidden",
    "false"
  );

  APP_STATE.menuOpen =
    true;

}


function closeMenu() {

  const menu =
    document.getElementById(
      "sideMenu"
    );

  const overlay =
    document.getElementById(
      "menuOverlay"
    );

  if (!menu) {

    return;

  }

  menu.classList.remove(
    "open"
  );

  overlay?.classList.remove(
    "visible"
  );

  menu.setAttribute(
    "aria-hidden",
    "true"
  );

  overlay?.setAttribute(
    "aria-hidden",
    "true"
  );

  APP_STATE.menuOpen =
    false;

}


/* =========================================================
   16. BOTÕES
   ========================================================= */

function setupButtons() {

  const continueButton =
    document.getElementById(
      "continueButton"
    );

  if (continueButton) {

    continueButton.addEventListener(
      "click",
      continueLearning
    );

  }

  const reviewButton =
    document.getElementById(
      "startReviewButton"
    );

  if (reviewButton) {

    reviewButton.addEventListener(
      "click",
      startReview
    );

  }

  const profileButton =
    document.getElementById(
      "profileButton"
    );

  if (profileButton) {

    profileButton.addEventListener(
      "click",
      openProfile
    );

  }

  document
    .querySelectorAll(
      ".conversation-mode"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          function () {

            startConversation(
              this.dataset.mode
            );

          }
        );

      }
    );

}


/* =========================================================
   17. CONTINUAR APRENDIZADO
   ========================================================= */

function continueLearning() {

  const lesson =
    getCurrentLesson();

  if (!lesson) {

    alert(
      "Não foi possível localizar a aula atual."
    );

    return;

  }

  startLesson(
    lesson
  );

}


/* =========================================================
   18. LOCALIZAR AULA ATUAL
   ========================================================= */

function getCurrentLesson() {

  const user =
    APP_STATE.user;

  const module =
    LESSON_CONTENT[
      user.level
    ]?.[
      user.module
    ];

  if (!module) {

    return null;

  }

  return module.lessons.find(
    lesson =>
      lesson.id ===
      `${user.level}-M${user.module}-L${user.lesson}`
  ) || null;

}


/* =========================================================
   19. LOCALIZAR QUALQUER ATIVIDADE
   ========================================================= */

function findActivity(
  activityId
) {

  if (!activityId) {

    return null;

  }

  for (
    const levelKey of
    Object.keys(
      LESSON_CONTENT
    )
  ) {

    const level =
      LESSON_CONTENT[
        levelKey
      ];

    for (
      const moduleKey of
      Object.keys(
        level
      )
    ) {

      const module =
        level[
          moduleKey
        ];

      const activity =
        module.lessons.find(
          lesson =>
            lesson.id ===
            activityId
        );

      if (activity) {

        return activity;

      }

    }

  }

  return null;

}


/* =========================================================
   20. MOTOR DE AULAS
   ========================================================= */

function startLesson(
  lesson
) {

  if (!lesson) {

    return;

  }

  if (
    lesson.status ===
      "locked" &&
    lesson.id !==
      `${APP_STATE.user.level}-M${APP_STATE.user.module}-L${APP_STATE.user.lesson}`
  ) {

    alert(
      "Esta aula ainda está bloqueada."
    );

    return;

  }

  APP_STATE.currentLesson =
    lesson;

  APP_STATE.currentSession = {

    type:
      "lesson",

    activityId:
      lesson.id,

    startedAt:
      new Date().toISOString(),

    completed:
      false,

    step:
      0,

    answers: [],

    score: 0,

    total:
      0,

    errors: []

  };

  if (
    lesson.content
  ) {

    openLessonEngine(
      lesson
    );

    return;

  }

  openUnavailableLesson(
    lesson
  );

}


/* =========================================================
   21. ABRIR MOTOR DE AULA
   ========================================================= */

function openLessonEngine(
  lesson
) {

  const content =
    lesson.content;

  if (!content) {

    openUnavailableLesson(
      lesson
    );

    return;

  }

  let engine =
    document.getElementById(
      "lessonEngine"
    );

  if (!engine) {

    engine =
      document.createElement(
        "div"
      );

    engine.id =
      "lessonEngine";

    document.body.appendChild(
      engine
    );

  }

  engine.className =
    "lesson-engine-overlay";

  engine.innerHTML =
    buildLessonEngineHTML(
      lesson
    );

  document.body.classList.add(
    "lesson-engine-open"
  );

  bindLessonEngine(
    lesson
  );

  showLessonStep(
    0
  );

}


/* =========================================================
   22. CONSTRUIR INTERFACE DA AULA
   ========================================================= */

function buildLessonEngineHTML(
  lesson
) {

  const content =
    lesson.content;

  const totalSteps =
    calculateLessonSteps(
      content
    );

  return `

    <div class="lesson-engine">

      <header class="lesson-engine-header">

        <button
          type="button"
          class="lesson-close-button"
          id="lessonCloseButton"
          aria-label="Fechar aula"
        >
          ×
        </button>

        <div class="lesson-header-info">

          <span class="lesson-level">
            ${content.level}
          </span>

          <strong>
            ${content.title}
          </strong>

        </div>

        <div class="lesson-step-counter">
          <span id="lessonStepCurrent">1</span>
          /
          <span id="lessonStepTotal">
            ${totalSteps}
          </span>
        </div>

      </header>

      <div class="lesson-progress-track">

        <div
          id="lessonEngineProgress"
          class="lesson-progress-fill"
          style="width:0%"
        ></div>

      </div>

      <main
        id="lessonEngineContent"
        class="lesson-engine-content"
      ></main>

      <footer class="lesson-engine-footer">

        <button
          type="button"
          id="lessonBackButton"
          class="lesson-secondary-button"
        >
          Voltar
        </button>

        <button
          type="button"
          id="lessonNextButton"
          class="lesson-primary-button"
        >
          Continuar
        </button>

      </footer>

    </div>

  `;

}


/* =========================================================
   23. ETAPAS DA AULA
   ========================================================= */

function calculateLessonSteps(
  content
) {

  let steps = 0;

  if (content.introduction) {

    steps++;

  }

  if (
    content.vocabulary?.length
  ) {

    steps++;

  }

  if (content.grammar) {

    steps++;

  }

  if (content.reading) {

    steps++;

  }

  if (
    content.comprehension?.length
  ) {

    steps +=
      content.comprehension.length;

  }

  if (
    content.translation?.length
  ) {

    steps +=
      content.translation.length;

  }

  if (
    content.grammarExercises?.length
  ) {

    steps +=
      content.grammarExercises.length;

  }

  if (
    content.activeRecall?.length
  ) {

    steps +=
      content.activeRecall.length;

  }

  steps++;

  return steps;

}


/* =========================================================
   24. CRIAR LISTA DE ETAPAS
   ========================================================= */

function buildLessonSteps(
  content
) {

  const steps = [];

  if (
    content.introduction
  ) {

    steps.push({

      type:
        "introduction",

      data:
        content.introduction

    });

  }

  if (
    content.vocabulary?.length
  ) {

    steps.push({

      type:
        "vocabulary",

      data:
        content.vocabulary

    });

  }

  if (
    content.grammar
  ) {

    steps.push({

      type:
        "grammar",

      data:
        content.grammar

    });

  }

  if (
    content.reading
  ) {

    steps.push({

      type:
        "reading",

      data:
        content.reading

    });

  }

  (
    content.comprehension || []
  ).forEach(
    item => {

      steps.push({

        type:
          "comprehension",

        data:
          item

      });

    }
  );

  (
    content.translation || []
  ).forEach(
    item => {

      steps.push({

        type:
          "translation",

        data:
          item

      });

    }
  );

  (
    content.grammarExercises || []
  ).forEach(
    item => {

      steps.push({

        type:
          "grammarExercise",

        data:
          item

      });

    }
  );

  (
    content.activeRecall || []
  ).forEach(
    item => {

      steps.push({

        type:
          "activeRecall",

        data:
          item

      });

    }
  );

  steps.push({

    type:
      "completion",

    data:
      null

  });

  return steps;

}


/* =========================================================
   25. ESTADO DO MOTOR
   ========================================================= */

function getLessonSteps() {

  const lesson =
    APP_STATE.currentLesson;

  if (
    !lesson?.content
  ) {

    return [];

  }

  return buildLessonSteps(
    lesson.content
  );

}


/* =========================================================
   26. MOSTRAR ETAPA
   ========================================================= */

function showLessonStep(
  index
) {

  const steps =
    getLessonSteps();

  if (!steps.length) {

    return;

  }

  const safeIndex =
    Math.max(
      0,
      Math.min(
        index,
        steps.length - 1
      )
    );

  APP_STATE.currentSession.step =
    safeIndex;

  const step =
    steps[
      safeIndex
    ];

  const container =
    document.getElementById(
      "lessonEngineContent"
    );

  if (!container) {

    return;

  }

  container.innerHTML =
    renderLessonStep(
      step,
      safeIndex
    );

  updateLessonEngineControls(
    safeIndex,
    steps.length
  );

  bindStepInteractions(
    step,
    safeIndex
  );

}


/* =========================================================
   27. RENDERIZAR ETAPA
   ========================================================= */

function renderLessonStep(
  step,
  index
) {

  switch (
    step.type
  ) {

    case "introduction":

      return renderIntroduction(
        step.data
      );

    case "vocabulary":

      return renderVocabulary(
        step.data
      );

    case "grammar":

      return renderGrammar(
        step.data
      );

    case "reading":

      return renderReading(
        step.data
      );

    case "comprehension":

      return renderQuestion(
        step.data,
        "comprehension"
      );

    case "translation":

      return renderQuestion(
        step.data,
        "translation"
      );

    case "grammarExercise":

      return renderQuestion(
        step.data,
        "grammarExercise"
      );

    case "activeRecall":

      return renderQuestion(
        step.data,
        "activeRecall"
      );

    case "completion":

      return renderCompletion(
        APP_STATE.currentLesson
      );

    default:

      return `

        <div class="lesson-card">

          <h2>Atividade</h2>

          <p>
            Conteúdo da atividade.
          </p>

        </div>

      `;

  }

}


/* =========================================================
   28. INTRODUÇÃO
   ========================================================= */

function renderIntroduction(
  data
) {

  return `

    <section class="lesson-card lesson-introduction">

      <span class="lesson-eyebrow">
        LET'S START
      </span>

      <h1>
        ${data.title}
      </h1>

      <h3>
        ${data.text}
      </h3>

      <div class="lesson-objectives">

        <h3>
          🎯 O que você vai aprender
        </h3>

        <ul>

          ${
            (
              APP_STATE.currentLesson.content
                .objectives || []
            )
            .map(
              item =>
                `<li>${item}</li>`
            )
            .join("")
          }

        </ul>

      </div>

    </section>

  `;

}


/* =========================================================
   29. VOCABULÁRIO
   ========================================================= */

function renderVocabulary(
  words
) {

  return `

    <section class="lesson-card">

      <span class="lesson-eyebrow">
        VOCABULARY
      </span>

      <h1>
        Palavras importantes
      </h1>

      <p>
        Leia as palavras e observe os exemplos.
      </p>

      <div class="lesson-vocabulary-grid">

        ${
          words
            .map(
              item => `

                <article class="vocabulary-card">

                  <strong>
                    ${item.word}
                  </strong>

                  <span>
                    ${item.translation}
                  </span>

                  <small>
                    ${item.example}
                  </small>

                </article>

              `
            )
            .join("")
        }

      </div>

    </section>

  `;

}


/* =========================================================
   30. GRAMÁTICA
   ========================================================= */

function renderGrammar(
  data
) {

  return `

    <section class="lesson-card">

      <span class="lesson-eyebrow">
        GRAMMAR
      </span>

      <h1>
        ${data.title}
      </h1>

      <p>
        ${data.explanation}
      </p>

      <div class="grammar-rule">

        <strong>
          Regra principal
        </strong>

        <p>
          ${data.rule}
        </p>

      </div>

      <h3>
        Exemplos
      </h3>

      <div class="grammar-examples">

        ${
          data.examples
            .map(
              example =>
                `<div class="grammar-example">
                  ${example}
                </div>`
            )
            .join("")
        }

      </div>

    </section>

  `;

}


/* =========================================================
   31. LEITURA
   ========================================================= */

function renderReading(
  data
) {

  return `

    <section class="lesson-card">

      <span class="lesson-eyebrow">
        READING
      </span>

      <h1>
        ${data.title}
      </h1>

      <div class="reading-text">

        ${data.text}

      </div>

      <details class="translation-box">

        <summary>
          🇧🇷 Ver tradução
        </summary>

        <p>
          ${data.translation}
        </p>

      </details>

    </section>

  `;

}


/* =========================================================
   32. QUESTÕES
   ========================================================= */

function renderQuestion(
  data,
  type
) {

  const isText =
    type === "translation" ||
    type === "activeRecall";

  if (isText) {

    return `

      <section class="lesson-card">

        <span class="lesson-eyebrow">
          ${
            type === "translation"
              ? "TRANSLATION"
              : "ACTIVE RECALL"
          }
        </span>

        <h1>
          ${data.question}
        </h1>

        <div class="lesson-answer-area">

          <input
            id="lessonTextAnswer"
            class="lesson-text-input"
            type="text"
            autocomplete="off"
            placeholder="Digite sua resposta..."
          >

          <div
            id="lessonAnswerFeedback"
            class="lesson-answer-feedback"
          ></div>

        </div>

      </section>

    `;

  }

  return `

    <section class="lesson-card">

      <span class="lesson-eyebrow">
        ${
          type === "grammarExercise"
            ? "GRAMMAR"
            : "COMPREHENSION"
        }
      </span>

      <h1>
        ${data.question}
      </h1>

      <div class="lesson-options">

        ${
          data.options
            .map(
              (option, index) => `

                <button
                  type="button"
                  class="lesson-option"
                  data-answer-index="${index}"
                >
                  <span>
                    ${String.fromCharCode(
                      65 + index
                    )}
                  </span>

                  ${option}

                </button>

              `
            )
            .join("")
        }

      </div>

      <div
        id="lessonAnswerFeedback"
        class="lesson-answer-feedback"
      ></div>

    </section>

  `;

}


/* =========================================================
   33. FINALIZAÇÃO
   ========================================================= */

function renderCompletion(
  lesson
) {

  const session =
    APP_STATE.currentSession;

  const score =
    session.total > 0
      ? Math.round(
          (
            session.score /
            session.total
          ) * 100
        )
      : 100;

  return `

    <section class="lesson-card lesson-completion">

      <div class="completion-icon">
        🎉
      </div>

      <span class="lesson-eyebrow">
        LESSON COMPLETE
      </span>

      <h1>
        Muito bem!
      </h1>

      <p>
        Você concluiu:
      </p>

      <h2>
        ${lesson.title}
      </h2>

      <div class="lesson-result-grid">

        <div>
          <strong>
            ${score}%
          </strong>
          <span>
            desempenho
          </span>
        </div>

        <div>
          <strong>
            +${APP_CONFIG.xpPerLesson}
          </strong>
          <span>
            XP
          </span>
        </div>

      </div>

      <p class="completion-message">

        ${
          score >= 80
            ? "Excelente desempenho! Você está pronto para continuar."
            : score >= 60
              ? "Bom trabalho! Continue praticando para fortalecer o conteúdo."
              : "Você concluiu a aula. Os pontos que apresentou dificuldade serão reforçados nas próximas revisões."
        }

      </p>

    </section>

  `;

}


/* =========================================================
   34. CONTROLES DO MOTOR
   ========================================================= */

function updateLessonEngineControls(
  index,
  total
) {

  const current =
    document.getElementById(
      "lessonStepCurrent"
    );

  const totalElement =
    document.getElementById(
      "lessonStepTotal"
    );

  const progress =
    document.getElementById(
      "lessonEngineProgress"
    );

  const back =
    document.getElementById(
      "lessonBackButton"
    );

  const next =
    document.getElementById(
      "lessonNextButton"
    );

  if (current) {

    current.textContent =
      index + 1;

  }

  if (totalElement) {

    totalElement.textContent =
      total;

  }

  if (progress) {

    const percent =
      total > 1
        ? (
            index /
            (total - 1)
          ) * 100
        : 100;

    progress.style.width =
      `${percent}%`;

  }

  if (back) {

    back.disabled =
      index === 0;

  }

  if (next) {

    next.textContent =
      index === total - 1
        ? "Concluir aula"
        : "Continuar";

  }

}


/* =========================================================
   35. INTERAÇÕES DA AULA
   ========================================================= */

function bindLessonEngine(
  lesson
) {

  document
    .getElementById(
      "lessonCloseButton"
    )
    ?.addEventListener(
      "click",
      closeLessonEngine
    );

  document
    .getElementById(
      "lessonBackButton"
    )
    ?.addEventListener(
      "click",
      lessonPreviousStep
    );

  document
    .getElementById(
      "lessonNextButton"
    )
    ?.addEventListener(
      "click",
      lessonNextStep
    );

}


function bindStepInteractions(
  step
) {

  if (
    step.type ===
      "comprehension" ||
    step.type ===
      "grammarExercise"
  ) {

    document
      .querySelectorAll(
        ".lesson-option"
      )
      .forEach(
        button => {

          button.addEventListener(
            "click",
            () => {

              handleMultipleChoice(
                step.data,
                Number(
                  button.dataset.answerIndex
                ),
                button
              );

            }
          );

        }
      );

  }

  if (
    step.type ===
      "translation" ||
    step.type ===
      "activeRecall"
  ) {

    const input =
      document.getElementById(
        "lessonTextAnswer"
      );

    if (input) {

      input.addEventListener(
        "keydown",
        event => {

          if (
            event.key ===
            "Enter"
          ) {

            lessonNextStep();

          }

        }
      );

    }

  }

}


/* =========================================================
   36. PRÓXIMA ETAPA
   ========================================================= */

function lessonNextStep() {

  const steps =
    getLessonSteps();

  const index =
    APP_STATE.currentSession.step;

  const step =
    steps[index];

  if (
    step?.type ===
      "comprehension" ||
    step?.type ===
      "grammarExercise"
  ) {

    if (
      !APP_STATE.currentSession.answers[
        index
      ]
    ) {

      showTemporaryMessage(
        "Selecione uma resposta antes de continuar."
      );

      return;

    }

  }

  if (
    step?.type ===
      "translation" ||
    step?.type ===
      "activeRecall"
  ) {

    const input =
      document.getElementById(
        "lessonTextAnswer"
      );

    if (input) {

      const answer =
        input.value.trim();

      if (!answer) {

        showTemporaryMessage(
          "Digite uma resposta antes de continuar."
        );

        input.focus();

        return;

      }

      evaluateTextAnswer(
        step.data,
        answer,
        index
      );

    }

  }

  if (
    index >=
    steps.length - 1
  ) {

    finishLessonEngine();

    return;

  }

  showLessonStep(
    index + 1
  );

}


/* =========================================================
   37. ETAPA ANTERIOR
   ========================================================= */

function lessonPreviousStep() {

  const index =
    APP_STATE.currentSession.step;

  if (
    index <= 0
  ) {

    return;

  }

  showLessonStep(
    index - 1
  );

}


/* =========================================================
   38. MÚLTIPLA ESCOLHA
   ========================================================= */

function handleMultipleChoice(
  data,
  selected,
  button
) {

  const index =
    APP_STATE.currentSession.step;

  if (
    APP_STATE.currentSession.answers[index]
  ) {

    return;

  }

  const correct =
    selected ===
    data.answer;

  APP_STATE.currentSession.answers[
    index
  ] = {

    correct:
      correct,

    answer:
      selected

  };

  APP_STATE.currentSession.total++;

  if (correct) {

    APP_STATE.currentSession.score++;

  }

  document
    .querySelectorAll(
      ".lesson-option"
    )
    .forEach(
      option => {

        option.disabled =
          true;

      }
    );

  if (correct) {

    button.classList.add(
      "correct"
    );

  }

  else {

    button.classList.add(
      "incorrect"
    );

    const correctButton =
      document.querySelector(
        `[data-answer-index="${data.answer}"]`
      );

    correctButton?.classList.add(
      "correct"
    );

    registerLessonError(
      data,
      selected
    );

  }

  const feedback =
    document.getElementById(
      "lessonAnswerFeedback"
    );

  if (feedback) {

    feedback.className =
      `lesson-answer-feedback ${
        correct
          ? "success"
          : "error"
      }`;

    feedback.innerHTML =
      correct

        ? `
          <strong>✓ Correct!</strong>
          <p>
            ${
              data.explanation ||
              "Muito bem!"
            }
          </p>
        `

        : `
          <strong>✗ Not quite.</strong>
          <p>
            ${
              data.explanation ||
              "Observe a resposta correta e continue."
            }
          </p>
        `;

  }

}


/* =========================================================
   39. RESPOSTA ESCRITA
   ========================================================= */

function evaluateTextAnswer(
  data,
  answer,
  index
) {

  if (
    APP_STATE.currentSession.answers[index]
  ) {

    return;

  }

  const normalized =
    normalizeAnswer(
      answer
    );

  const accepted = [

    data.answer,

    ...(data.alternatives || [])

  ]
    .map(
      normalizeAnswer
    );

  const correct =
    accepted.includes(
      normalized
    );

  APP_STATE.currentSession.answers[
    index
  ] = {

    correct:
      correct,

    answer:
      answer

  };

  APP_STATE.currentSession.total++;

  if (correct) {

    APP_STATE.currentSession.score++;

  }

  else {

    registerLessonError(
      data,
      answer
    );

  }

  const feedback =
    document.getElementById(
      "lessonAnswerFeedback"
    );

  if (feedback) {

    feedback.className =
      `lesson-answer-feedback ${
        correct
          ? "success"
          : "error"
      }`;

    feedback.innerHTML =
      correct

        ? `
          <strong>✓ Excellent!</strong>
          <p>
            Resposta correta.
          </p>
        `

        : `
          <strong>✗ Vamos reforçar.</strong>
          <p>
            Resposta esperada:
            <strong>
              ${data.answer}
            </strong>
          </p>
        `;

  }

}


/* =========================================================
   40. REGISTRAR ERRO DA AULA
   ========================================================= */

function registerLessonError(
  data,
  answer
) {

  const type =
    data.options
      ? "multiple-choice"
      : "text";

  registerError({

    id:
      `${APP_STATE.currentLesson.id}-${data.id || Date.now()}`,

    type:

      type,

    question:
      data.question,

    expected:
      data.options
        ? data.options[
            data.answer
          ]
        : data.answer,

    answer:
      typeof answer === "number"
        ? data.options?.[
            answer
          ] || String(answer)
        : answer

  });

}


/* =========================================================
   41. FINALIZAR MOTOR
   ========================================================= */

function finishLessonEngine() {

  const lesson =
    APP_STATE.currentLesson;

  if (!lesson) {

    return;

  }

  const session =
    APP_STATE.currentSession;

  const minutes =
    calculateSessionMinutes(
      session.startedAt
    );

  addStudyMinutes(
    Math.max(
      1,
      minutes
    )
  );

  if (
    !session.completed
  ) {

    completeLesson(
      lesson.id,
      {
        score:
          session.score,

        total:
          session.total
      }
    );

    session.completed =
      true;

  }

  showLessonStep(
    getLessonSteps().length - 1
  );

  const next =
    document.getElementById(
      "lessonNextButton"
    );

  if (next) {

    next.textContent =
      "Fechar";

    next.onclick =
      closeLessonEngine;

  }

}


/* =========================================================
   42. FECHAR MOTOR
   ========================================================= */

function closeLessonEngine() {

  const engine =
    document.getElementById(
      "lessonEngine"
    );

  if (engine) {

    engine.remove();

  }

  document.body.classList.remove(
    "lesson-engine-open"
  );

  APP_STATE.currentLesson =
    null;

  APP_STATE.currentSession =
    null;

  updateInterface();

}


/* =========================================================
   43. AULA SEM CONTEÚDO
   ========================================================= */

function openUnavailableLesson(
  lesson
) {

  alert(

    `${lesson.title}\n\n` +

    "Esta aula já está estruturada no curso, " +
    "mas o conteúdo completo ainda será incorporado."

  );

}


/* =========================================================
   44. TEMPO DA SESSÃO
   ========================================================= */

function calculateSessionMinutes(
  startedAt
) {

  if (!startedAt) {

    return 1;

  }

  const start =
    new Date(
      startedAt
    ).getTime();

  const now =
    Date.now();

  const minutes =
    Math.round(
      (
        now -
        start
      ) /
      60000
    );

  return Math.max(
    1,
    minutes
  );

}


/* =========================================================
   45. NORMALIZAR RESPOSTA
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
      /[.,!?;:']/g,
      ""
    )
    .replace(
      /\s+/g,
      " "
    );

}


/* =========================================================
   46. MENSAGEM TEMPORÁRIA
   ========================================================= */

function showTemporaryMessage(
  message
) {

  let element =
    document.getElementById(
      "lessonTemporaryMessage"
    );

  if (!element) {

    element =
      document.createElement(
        "div"
      );

    element.id =
      "lessonTemporaryMessage";

    element.className =
      "lesson-temporary-message";

    document.body.appendChild(
      element
    );

  }

  element.textContent =
    message;

  element.classList.add(
    "visible"
  );

  setTimeout(
    () => {

      element.classList.remove(
        "visible"
      );

    },
    2500
  );

}


/* =========================================================
   47. REVISÃO
   ========================================================= */

function startReview() {

  const user =
    APP_STATE.user;

  const due =
    Number(
      user.review?.due || 0
    );

  const weakPoints =
    Number(
      user.review?.weakPoints || 0
    );

  if (
    due === 0 &&
    weakPoints === 0 &&
    !user.review?.items?.length
  ) {

    alert(
      "Você não possui itens de revisão no momento."
    );

    return;

  }

  alert(
    "O Motor de Revisão será aberto nesta área."
  );

}


/* =========================================================
   48. CONVERSAÇÃO
   ========================================================= */

function startConversation(
  mode
) {

  const labels = {

    guided:
      "Conversação guiada",

    practice:
      "Prática livre",

    challenge:
      "Desafio"

  };

  const selectedMode =
    labels[mode] ||
    "Conversação";

  APP_STATE.currentSession = {

    type:
      "conversation",

    mode:
      mode || "guided",

    startedAt:
      new Date().toISOString(),

    completed:
      false

  };

  alert(
    `${selectedMode}\n\n` +
    "O módulo completo de conversação será integrado ao Motor de Conversação."
  );

}


/* =========================================================
   49. PERFIL
   ========================================================= */

function openProfile() {

  const user =
    APP_STATE.user;

  alert(

    `Perfil atual:\n\n` +

    `${user.name}\n\n` +

    `Nível: ${user.level}\n` +

    `XP: ${user.xp}\n` +

    `Sequência: ${user.streak} dias`

  );

}


/* =========================================================
   50. XP
   ========================================================= */

function addXP(
  amount,
  reason = "general"
) {

  const value =
    Number(
      amount
    );

  if (
    !Number.isFinite(
      value
    ) ||
    value <= 0
  ) {

    return 0;

  }

  APP_STATE.user.xp +=
    Math.floor(
      value
    );

  saveUserData();

  updateXPDisplay();

  checkAchievements();

  console.log(
    `XP +${Math.floor(value)} (${reason})`
  );

  return Math.floor(
    value
  );

}


/* =========================================================
   51. NÍVEL XP
   ========================================================= */

function getXPLevel() {

  const xp =
    Number(
      APP_STATE.user.xp || 0
    );

  if (xp >= 5000) return 10;
  if (xp >= 4000) return 9;
  if (xp >= 3000) return 8;
  if (xp >= 2000) return 7;
  if (xp >= 1500) return 6;
  if (xp >= 1000) return 5;
  if (xp >= 700) return 4;
  if (xp >= 400) return 3;
  if (xp >= 200) return 2;

  return 1;

}


/* =========================================================
   52. STREAK
   ========================================================= */

function updateStreak() {

  const today =
    getDateKey(
      new Date()
    );

  const lastDate =
    APP_STATE.user.lastStudyDate;

  if (!lastDate) {

    APP_STATE.user.streak =
      1;

  }

  else if (
    lastDate === today
  ) {

    return;

  }

  else {

    const difference =
      daysBetween(
        lastDate,
        today
      );

    if (
      difference === 1
    ) {

      APP_STATE.user.streak +=
        1;

    }

    else {

      APP_STATE.user.streak =
        1;

    }

  }

  APP_STATE.user.lastStudyDate =
    today;

  saveUserData();

  updateStreakDisplay();

  checkAchievements();

}


/* =========================================================
   53. TEMPO DE ESTUDO
   ========================================================= */

function addStudyMinutes(
  minutes
) {

  const value =
    Number(
      minutes
    );

  if (
    !Number.isFinite(
      value
    ) ||
    value <= 0
  ) {

    return;

  }

  normalizeDailyData();

  const roundedMinutes =
    Math.max(
      1,
      Math.round(
        value
      )
    );

  APP_STATE.user.dailyMinutes +=
    roundedMinutes;

  APP_STATE.user.totalStudyMinutes +=
    roundedMinutes;

  APP_STATE.user.studySessions.push({

    date:
      getDateKey(
        new Date()
      ),

    minutes:
      roundedMinutes,

    timestamp:
      new Date().toISOString()

  });

  if (
    APP_STATE.user.studySessions.length >
    500
  ) {

    APP_STATE.user.studySessions =
      APP_STATE.user.studySessions.slice(
        -500
      );

  }

  updateStreak();

  saveUserData();

  updateDailyGoal();

}


/* =========================================================
   54. CONCLUSÃO DE AULA
   ========================================================= */

function completeLesson(
  lessonId,
  result = {}
) {

  if (!lessonId) {

    return false;

  }

  const user =
    APP_STATE.user;

  const lesson =
    findActivity(
      lessonId
    );

  if (!lesson) {

    return false;

  }

  if (
    user.completedLessons.includes(
      lessonId
    )
  ) {

    return false;

  }

  user.completedLessons.push(
    lessonId
  );

  user.lessonsCompletedCount =
    user.completedLessons.length;

  addXP(
    APP_CONFIG.xpPerLesson,
    "lesson"
  );

  updateStreak();

  updateSkillFromLesson(
    lesson,
    result
  );

  scheduleLessonForReview(
    lesson
  );

  advanceLesson(
    lesson
  );

  saveUserData();

  updateInterface();

  return true;

}


/* =========================================================
   55. AVANÇAR AULA
   ========================================================= */

function advanceLesson(
  completedLesson = null
) {

  const user =
    APP_STATE.user;

  const module =
    LESSON_CONTENT[
      user.level
    ]?.[
      user.module
    ];

  if (!module) {

    return;

  }

  const contentLessons =
    module.lessons.filter(
      lesson =>
        lesson.type ===
        "reading"
    );

  const currentIndex =
    contentLessons.findIndex(
      lesson =>
        lesson.id ===
        (
          completedLesson?.id ||
          `${user.level}-M${user.module}-L${user.lesson}`
        )
    );

  if (
    currentIndex >= 0 &&
    currentIndex <
      contentLessons.length - 1
  ) {

    user.lesson =
      currentIndex + 2;

    unlockCurrentLesson();

    return;

  }

  console.log(
    "Aulas do módulo concluídas. Próxima etapa: revisão."
  );

}


/* =========================================================
   56. DESBLOQUEAR
   ========================================================= */

function unlockCurrentLesson() {

  const user =
    APP_STATE.user;

  const currentId =
    `${user.level}-M${user.module}-L${user.lesson}`;

  const lesson =
    findActivity(
      currentId
    );

  if (lesson) {

    lesson.status =
      "current";

  }

}


/* =========================================================
   57. HABILIDADES
   ========================================================= */

function updateSkillFromLesson(
  lesson,
  result = {}
) {

  if (!lesson) {

    return;

  }

  const skills =
    APP_STATE.user.progress;

  const type =
    lesson.type;

  if (
    type === "reading"
  ) {

    skills.reading =
      Math.min(
        100,
        skills.reading + 5
      );

  }

  /*
    Como uma aula completa trabalha várias
    competências, o Motor já começa a desenvolver
    mais de uma habilidade.
  */

  skills.vocabulary =
    Math.min(
      100,
      skills.vocabulary + 3
    );

  skills.grammar =
    Math.min(
      100,
      skills.grammar + 3
    );

  if (
    Number(result.total || 0) > 0
  ) {

    const accuracy =
      Number(result.score || 0) /
      Number(result.total);

    if (
      accuracy >= 0.8
    ) {

      skills.reading =
        Math.min(
          100,
          skills.reading + 2
        );

      skills.grammar =
        Math.min(
          100,
          skills.grammar + 2
        );

    }

  }

}


/* =========================================================
   58. REVISÃO ESPAÇADA
   ========================================================= */

function scheduleLessonForReview(
  lesson
) {

  if (!lesson) {

    return;

  }

  if (
    !Array.isArray(
      APP_STATE.user.review.items
    )
  ) {

    APP_STATE.user.review.items =
      [];

  }

  const exists =
    APP_STATE.user.review.items
      .some(
        item =>
          item.id ===
          lesson.id
      );

  if (exists) {

    return;

  }

  const tomorrow =
    new Date();

  tomorrow.setDate(
    tomorrow.getDate() + 1
  );

  APP_STATE.user.review.items.push({

    id:
      lesson.id,

    type:
      lesson.type,

    nextReview:
      getDateKey(
        tomorrow
      ),

    interval:
      1,

    repetitions:
      0,

    ease:
      2.5

  });

  updateReviewCounters();

}


/* =========================================================
   59. CONTADORES DE REVISÃO
   ========================================================= */

function updateReviewCounters() {

  const today =
    getDateKey(
      new Date()
    );

  const items =
    APP_STATE.user.review.items ||
    [];

  const dueItems =
    items.filter(
      item =>
        item.nextReview <=
        today
    );

  APP_STATE.user.review.due =
    dueItems.length;

  APP_STATE.user.review.weakPoints =
    APP_STATE.user.errors.length;

  saveUserData();

}


/* =========================================================
   60. CONQUISTAS
   ========================================================= */

function checkAchievements() {

  const user =
    APP_STATE.user;

  if (
    user.completedLessons.length >= 1
  ) {

    unlockAchievement(
      "firstLesson"
    );

  }

  if (
    user.streak >= 7
  ) {

    unlockAchievement(
      "sevenDays"
    );

  }

  if (
    user.streak >= 30
  ) {

    unlockAchievement(
      "thirtyDays"
    );

  }

  if (
    user.conversations.length >= 1
  ) {

    unlockAchievement(
      "firstConversation"
    );

  }

  if (
    user.xp >= 1000
  ) {

    unlockAchievement(
      "oneThousandXP"
    );

  }

  if (
    user.completedLessons.length >= 10
  ) {

    unlockAchievement(
      "tenLessons"
    );

  }

}


function unlockAchievement(
  id
) {

  if (!id) {

    return;

  }

  if (
    !APP_STATE.user.achievements.includes(
      id
    )
  ) {

    APP_STATE.user.achievements.push(
      id
    );

    saveUserData();

    updateAchievements();

  }

}


/* =========================================================
   61. INTERFACE
   ========================================================= */

function updateInterface() {

  if (!APP_STATE.user) {

    return;

  }

  updateReviewCounters();

  updateUserName();

  updateLevel();

  updateXPDisplay();

  updateStreakDisplay();

  updateDailyGoal();

  updateSkills();

  updateReview();

  updateCoursePath();

  updateAchievements();

}


/* =========================================================
   62. NOME
   ========================================================= */

function updateUserName() {

  const element =
    document.getElementById(
      "welcomeName"
    );

  if (!element) {

    return;

  }

  element.textContent =
    `Olá, ${APP_STATE.user.name || "Aluno"}! 👋`;

}


/* =========================================================
   63. NÍVEL
   ========================================================= */

function updateLevel() {

  const user =
    APP_STATE.user;

  setText(
    "currentLevel",
    user.level
  );

  setText(
    "currentModule",
    user.module
  );

  setText(
    "currentLesson",
    user.lesson
  );

  const progress =
    calculateLevelProgress();

  setText(
    "levelProgressText",
    `${progress}%`
  );

  const bar =
    document.getElementById(
      "levelProgressBar"
    );

  if (bar) {

    bar.style.width =
      `${progress}%`;

  }

}


/* =========================================================
   64. PROGRESSO DO NÍVEL
   ========================================================= */

function calculateLevelProgress() {

  const user =
    APP_STATE.user;

  const course =
    COURSE[
      user.level
    ];

  if (!course) {

    return 0;

  }

  const totalLessons =
    course.modules *
    course.lessonsPerModule;

  const completed =
    user.completedLessons.filter(
      id =>
        id.startsWith(
          user.level
        ) &&
        /-L\d+$/.test(
          id
        )
    ).length;

  return Math.min(

    100,

    Math.round(
      (
        completed /
        totalLessons
      ) * 100
    )

  );

}


/* =========================================================
   65. XP
   ========================================================= */

function updateXPDisplay() {

  const element =
    document.querySelector(
      "#xpDisplay span"
    );

  if (element) {

    element.textContent =
      APP_STATE.user.xp;

  }

  setText(
    "xpLevel",
    getXPLevel()
  );

}


/* =========================================================
   66. STREAK
   ========================================================= */

function updateStreakDisplay() {

  const element =
    document.querySelector(
      "#streakDisplay span"
    );

  if (element) {

    element.textContent =
      APP_STATE.user.streak;

  }

}


/* =========================================================
   67. META
   ========================================================= */

function updateDailyGoal() {

  normalizeDailyData();

  const user =
    APP_STATE.user;

  const minutes =
    Number(
      user.dailyMinutes || 0
    );

  const goal =
    Number(
      user.dailyGoal ||
      APP_CONFIG.dailyGoalMinutes
    );

  const percent =
    goal > 0
      ? Math.min(
          100,
          Math.round(
            (
              minutes /
              goal
            ) * 100
          )
        )
      : 0;

  setText(
    "dailyGoalText",
    `${minutes} / ${goal} min`
  );

  setText(
    "dailyGoalPercent",
    `${percent}%`
  );

  const bar =
    document.getElementById(
      "dailyGoalBar"
    );

  if (bar) {

    bar.style.width =
      `${percent}%`;

  }

}


/* =========================================================
   68. HABILIDADES
   ========================================================= */

function updateSkills() {

  const skills =
    APP_STATE.user.progress;

  setText(
    "skillReading",
    `${skills.reading}%`
  );

  setText(
    "skillListening",
    `${skills.listening}%`
  );

  setText(
    "skillSpeaking",
    `${skills.speaking}%`
  );

  setText(
    "skillWriting",
    `${skills.writing}%`
  );

  setText(
    "skillVocabulary",
    `${skills.vocabulary}%`
  );

  setText(
    "skillGrammar",
    `${skills.grammar}%`
  );

  updateWeakPoint();

}


/* =========================================================
   69. PONTO FRACO
   ========================================================= */

function updateWeakPoint() {

  const progress =
    APP_STATE.user.progress;

  const entries =
    Object.entries(
      progress
    );

  entries.sort(
    (a, b) =>
      Number(a[1]) -
      Number(b[1])
  );

  const weakest =
    entries[0];

  const names = {

    reading:
      "Reading",

    listening:
      "Listening",

    speaking:
      "Speaking",

    writing:
      "Writing",

    vocabulary:
      "Vocabulary",

    grammar:
      "Grammar"

  };

  if (!weakest) {

    return;

  }

  setText(
    "mainWeakPoint",
    names[
      weakest[0]
    ] || weakest[0]
  );

  setText(

    "mainWeakPointDescription",

    `Seu desempenho atual está em ${weakest[1]}%. Vamos reforçar essa habilidade.`

  );

}


/* =========================================================
   70. REVISÃO NA INTERFACE
   ========================================================= */

function updateReview() {

  updateReviewCounters();

  setText(
    "reviewDueCount",
    APP_STATE.user.review.due
  );

  setText(
    "reviewWeakCount",
    APP_STATE.user.review.weakPoints
  );

}


/* =========================================================
   71. CAMINHO DO CURSO
   ========================================================= */

function updateCoursePath() {

  const container =
    document.getElementById(
      "coursePath"
    );

  if (!container) {

    return;

  }

  container.innerHTML =
    "";

  Object.keys(
    COURSE
  ).forEach(
    level => {

      container.appendChild(

        createLevelElement(
          level
        )

      );

    }
  );

}


/* =========================================================
   72. NÍVEL DO CURSO
   ========================================================= */

function createLevelElement(
  level
) {

  const wrapper =
    document.createElement(
      "article"
    );

  wrapper.className =
    "course-level";

  const course =
    COURSE[
      level
    ];

  const header =
    document.createElement(
      "div"
    );

  header.className =
    "course-level-header";

  header.innerHTML = `

    <div class="course-level-title">

      <div class="course-level-badge">
        ${level}
      </div>

      <div>

        <h2>
          ${course.title}
        </h2>

      </div>

    </div>

  `;

  wrapper.appendChild(
    header
  );

  for (
    let moduleNumber = 1;
    moduleNumber <=
      course.modules;
    moduleNumber++
  ) {

    wrapper.appendChild(

      createModuleElement(
        level,
        moduleNumber
      )

    );

  }

  return wrapper;

}


/* =========================================================
   73. MÓDULO
   ========================================================= */

function createModuleElement(
  level,
  moduleNumber
) {

  const moduleCard =
    document.createElement(
      "div"
    );

  moduleCard.className =
    "module-card";

  const isCurrent =
    level ===
      APP_STATE.user.level &&
    moduleNumber ===
      APP_STATE.user.module;

  const moduleData =
    LESSON_CONTENT[
      level
    ]?.[
      moduleNumber
    ];

  let lessons =
    moduleData?.lessons ||
    [];

  if (!lessons.length) {

    lessons =
      createModuleLessons(
        level,
        moduleNumber
      );

  }

  const completed =
    lessons.filter(
      lesson =>
        APP_STATE.user.completedLessons
          .includes(
            lesson.id
          )
    ).length;

  moduleCard.innerHTML = `

    <div class="module-header">

      <div class="module-title">
        Módulo ${moduleNumber}
      </div>

      <div class="module-progress">
        ${completed} / ${lessons.length}
      </div>

    </div>

    <div class="lesson-list"></div>

  `;

  if (
    !isCurrent &&
    level !==
      APP_STATE.user.level
  ) {

    moduleCard.style.opacity =
      "0.65";

  }

  const lessonList =
    moduleCard.querySelector(
      ".lesson-list"
    );

  lessons.forEach(
    lesson => {

      lessonList.appendChild(

        createLessonElement(
          lesson
        )

      );

    }
  );

  return moduleCard;

}


/* =========================================================
   74. ELEMENTO DE AULA
   ========================================================= */

function createLessonElement(
  lesson
) {

  const element =
    document.createElement(
      "button"
    );

  element.type =
    "button";

  element.className =
    "lesson-item";

  const completed =
    APP_STATE.user.completedLessons
      .includes(
        lesson.id
      );

  const isCurrent =
    lesson.id ===
    `${APP_STATE.user.level}-M${APP_STATE.user.module}-L${APP_STATE.user.lesson}`;

  const isReview =
    lesson.type ===
    "review";

  const isTest =
    lesson.type ===
    "test";

  const isUnlocked =
    completed ||
    isCurrent ||
    lesson.status ===
      "current";

  let icon =
    "🔒";

  if (completed) {

    icon =
      "✅";

  }

  else if (isCurrent) {

    icon =
      "▶️";

  }

  else if (isReview) {

    icon =
      "🧠";

  }

  else if (isTest) {

    icon =
      "📝";

  }

  element.innerHTML = `

    <span class="lesson-icon">
      ${icon}
    </span>

    <span class="lesson-info">

      <strong>
        ${lesson.title}
      </strong>

      <span>
        ${lesson.description}
      </span>

    </span>

    <span class="lesson-status">
      ${completed ? "✓" : ""}
    </span>

  `;

  element.addEventListener(
    "click",
    function () {

      if (!isUnlocked) {

        alert(
          "Esta atividade ainda está bloqueada."
        );

        return;

      }

      if (isReview) {

        startReviewActivity(
          lesson
        );

        return;

      }

      if (isTest) {

        startTest(
          lesson
        );

        return;

      }

      startLesson(
        lesson
      );

    }
  );

  return element;

}


/* =========================================================
   75. REVISÃO ESPECÍFICA
   ========================================================= */

function startReviewActivity(
  lesson
) {

  console.log(
    "Revisão do módulo:",
    lesson.id
  );

  startReview();

}


/* =========================================================
   76. TESTE
   ========================================================= */

function startTest(
  lesson
) {

  APP_STATE.currentSession = {

    type:
      "test",

    activityId:
      lesson.id,

    startedAt:
      new Date().toISOString(),

    completed:
      false

  };

  alert(
    `Avaliação selecionada:\n\n${lesson.title}\n\n` +
    "O Motor de Testes será integrado nesta estrutura."
  );

}


/* =========================================================
   77. CONQUISTAS
   ========================================================= */

function updateAchievements() {

  const achievements =
    APP_STATE.user.achievements;

  document
    .querySelectorAll(
      ".achievement-card"
    )
    .forEach(
      card => {

        const title =
          card.querySelector(
            "strong"
          )?.textContent;

        let unlocked =
          false;

        if (
          title ===
          "Primeira aula"
        ) {

          unlocked =
            achievements.includes(
              "firstLesson"
            );

        }

        if (
          title ===
          "7 dias"
        ) {

          unlocked =
            achievements.includes(
              "sevenDays"
            );

        }

        if (
          title ===
          "Primeira conversa"
        ) {

          unlocked =
            achievements.includes(
              "firstConversation"
            );

        }

        if (unlocked) {

          card.classList.remove(
            "locked"
          );

          const icon =
            card.querySelector(
              ".achievement-icon"
            );

          if (icon) {

            icon.textContent =
              "🏆";

          }

        }

      }
    );

}


/* =========================================================
   78. TEXTO
   ========================================================= */

function setText(
  id,
  value
) {

  const element =
    document.getElementById(
      id
    );

  if (element) {

    element.textContent =
      value;

  }

}


/* =========================================================
   79. DATAS
   ========================================================= */

function getDateKey(
  date
) {

  const year =
    date.getFullYear();

  const month =
    String(
      date.getMonth() + 1
    ).padStart(
      2,
      "0"
    );

  const day =
    String(
      date.getDate()
    ).padStart(
      2,
      "0"
    );

  return `${year}-${month}-${day}`;

}


function daysBetween(
  dateA,
  dateB
) {

  const a =
    new Date(
      `${dateA}T00:00:00`
    );

  const b =
    new Date(
      `${dateB}T00:00:00`
    );

  const difference =
    b.getTime() -
    a.getTime();

  return Math.round(

    difference /
    (
      1000 *
      60 *
      60 *
      24
    )

  );

}


/* =========================================================
   80. REGISTRO DE ERROS
   ========================================================= */

function registerError(
  errorData
) {

  if (
    !errorData ||
    typeof errorData !==
      "object"
  ) {

    return;

  }

  const error = {

    id:
      errorData.id ||
      `error-${Date.now()}`,

    type:
      errorData.type ||
      "general",

    question:
      errorData.question ||
      "",

    expected:
      errorData.expected ||
      "",

    answer:
      errorData.answer ||
      "",

    date:
      getDateKey(
        new Date()
      ),

    timestamp:
      new Date().toISOString(),

    resolved:
      false

  };

  APP_STATE.user.errors.push(
    error
  );

  APP_STATE.user.review.weakPoints =
    APP_STATE.user.errors.length;

  saveUserData();

  updateReview();

  return error;

}


/* =========================================================
   81. VOCABULÁRIO
   ========================================================= */

function registerVocabulary(
  word,
  data = {}
) {

  if (!word) {

    return;

  }

  const key =
    String(
      word
    )
      .trim()
      .toLowerCase();

  if (!key) {

    return;

  }

  const existing =
    APP_STATE.user.vocabulary[
      key
    ] || {};

  APP_STATE.user.vocabulary[
    key
  ] = {

    word:
      data.word ||
      word,

    translation:
      data.translation ||
      existing.translation ||
      "",

    level:
      data.level ||
      existing.level ||
      APP_STATE.user.level,

    category:
      data.category ||
      existing.category ||
      "",

    examples:
      data.examples ||
      existing.examples ||
      [],

    repetitions:
      Number(
        existing.repetitions ||
        0
      ),

    correct:
      Number(
        existing.correct ||
        0
      ),

    incorrect:
      Number(
        existing.incorrect ||
        0
      ),

    lastSeen:
      getDateKey(
        new Date()
      )

  };

  saveUserData();

}


/* =========================================================
   82. GRAMÁTICA
   ========================================================= */

function registerGrammar(
  topic,
  data = {}
) {

  if (!topic) {

    return;

  }

  const key =
    String(
      topic
    ).trim();

  const existing =
    APP_STATE.user.grammar[
      key
    ] || {};

  APP_STATE.user.grammar[
    key
  ] = {

    topic:
      key,

    level:
      data.level ||
      existing.level ||
      APP_STATE.user.level,

    correct:
      Number(
        existing.correct ||
        0
      ),

    incorrect:
      Number(
        existing.incorrect ||
        0
      ),

    mastery:
      Number(
        data.mastery ??
        existing.mastery ??
        0
      ),

    lastPracticed:
      getDateKey(
        new Date()
      )

  };

  saveUserData();

}


/* =========================================================
   83. CONVERSAÇÃO
   ========================================================= */

function completeConversation(
  mode = "guided",
  minutes = 0
) {

  const record = {

    id:
      `conversation-${Date.now()}`,

    mode:
      mode,

    date:
      getDateKey(
        new Date()
      ),

    minutes:
      Number(
        minutes || 0
      ),

    timestamp:
      new Date().toISOString()

  };

  APP_STATE.user.conversations.push(
    record
  );

  APP_STATE.user.conversationsCompletedCount =
    APP_STATE.user.conversations.length;

  addXP(
    APP_CONFIG.xpPerConversation,
    "conversation"
  );

  updateStreak();

  saveUserData();

  updateInterface();

  return record;

}


/* =========================================================
   84. CONCLUIR REVISÃO
   ========================================================= */

function completeReview(
  reviewId
) {

  if (!reviewId) {

    return;

  }

  if (
    !APP_STATE.user.completedReviews
      .includes(
        reviewId
      )
  ) {

    APP_STATE.user.completedReviews
      .push(
        reviewId
      );

    APP_STATE.user.reviewCompletedCount =
      APP_STATE.user.completedReviews.length;

    addXP(
      APP_CONFIG.xpPerReview,
      "review"
    );

    updateStreak();

  }

  updateReviewCounters();

  saveUserData();

  updateInterface();

}


/* =========================================================
   85. CONCLUIR TESTE
   ========================================================= */

function completeTest(
  testId,
  score = null
) {

  if (!testId) {

    return;

  }

  const alreadyCompleted =
    APP_STATE.user.completedTests
      .some(
        test =>
          typeof test ===
            "string"
            ? test === testId
            : test.id === testId
      );

  if (
    !alreadyCompleted
  ) {

    APP_STATE.user.completedTests
      .push({

        id:
          testId,

        score:
          score,

        date:
          getDateKey(
            new Date()
          ),

        timestamp:
          new Date().toISOString()

      });

    APP_STATE.user.testsCompletedCount =
      APP_STATE.user.completedTests.length;

    addXP(
      APP_CONFIG.xpPerTest,
      "test"
    );

    updateStreak();

  }

  saveUserData();

  updateInterface();

}


/* =========================================================
   86. RESET
   ========================================================= */

function resetLocalData() {

  const confirmation =
    confirm(
      "Isso apagará todo o progresso local deste dispositivo. Continuar?"
    );

  if (!confirmation) {

    return;

  }

  localStorage.removeItem(
    APP_CONFIG.storageKey
  );

  location.reload();

}


/* =========================================================
   87. EXPORTAR
   ========================================================= */

function exportUserData() {

  const data =
    JSON.stringify(
      APP_STATE.user,
      null,
      2
    );

  const blob =
    new Blob(
      [data],
      {
        type:
          "application/json"
      }
    );

  const url =
    URL.createObjectURL(
      blob
    );

  const link =
    document.createElement(
      "a"
    );

  link.href =
    url;

  link.download =
    `english-family-${getDateKey(
      new Date()
    )}.json`;

  document.body.appendChild(
    link
  );

  link.click();

  link.remove();

  URL.revokeObjectURL(
    url
  );

}


/* =========================================================
   88. IMPORTAR
   ========================================================= */

function importUserData(
  jsonData
) {

  try {

    const imported =
      typeof jsonData ===
        "string"
        ? JSON.parse(
            jsonData
          )
        : jsonData;

    if (
      !imported ||
      typeof imported !==
        "object"
    ) {

      throw new Error(
        "Dados inválidos."
      );

    }

    APP_STATE.user =
      mergeObjects(
        DEFAULT_USER,
        imported
      );

    normalizeUserData();

    normalizeDailyData();

    updateInterface();

    saveUserData();

    return true;

  }

  catch (error) {

    console.error(
      "Erro ao importar dados:",
      error
    );

    return false;

  }

}


/* =========================================================
   89. API PÚBLICA
   ========================================================= */

window.EnglishFamily = {

  getUser() {

    return APP_STATE.user;

  },

  getState() {

    return APP_STATE;

  },

  save() {

    saveUserData();

  },

  reset() {

    resetLocalData();

  },

  exportData() {

    exportUserData();

  },

  importData(
    data
  ) {

    return importUserData(
      data
    );

  },

  navigate(
    section
  ) {

    navigateTo(
      section
    );

  },

  getCurrentLesson() {

    return getCurrentLesson();

  },

  startLesson(
    lesson
  ) {

    startLesson(
      lesson
    );

  },

  completeLesson(
    id,
    result
  ) {

    return completeLesson(
      id,
      result
    );

  },

  addXP(
    amount,
    reason
  ) {

    return addXP(
      amount,
      reason
    );

  },

  getXPLevel() {

    return getXPLevel();

  },

  addStudyMinutes(
    minutes
  ) {

    addStudyMinutes(
      minutes
    );

  },

  updateStreak() {

    updateStreak();

  },

  startReview() {

    startReview();

  },

  completeReview(
    id
  ) {

    completeReview(
      id
    );

  },

  startTest(
    lesson
  ) {

    startTest(
      lesson
    );

  },

  completeTest(
    id,
    score
  ) {

    completeTest(
      id,
      score
    );

  },

  startConversation(
    mode
  ) {

    startConversation(
      mode
    );

  },

  completeConversation(
    mode,
    minutes
  ) {

    return completeConversation(
      mode,
      minutes
    );

  },

  registerError(
    data
  ) {

    return registerError(
      data
    );

  },

  registerVocabulary(
    word,
    data
  ) {

    registerVocabulary(
      word,
      data
    );

  },

  registerGrammar(
    topic,
    data
  ) {

    registerGrammar(
      topic,
      data
    );

  },

  refresh() {

    updateInterface();

  }

};


/* =========================================================
   90. FIM DO APP.JS
   ========================================================= */
