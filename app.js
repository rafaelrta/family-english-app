/* =========================================================
   ENGLISH FAMILY
   APP.JS
   Núcleo principal da aplicação
   ========================================================= */


/* =========================================================
   1. CONFIGURAÇÃO GERAL
   ========================================================= */

const APP_CONFIG = {

  name: "English Family",

  version: "1.1.0",

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
   3. CONTEÚDO INICIAL DO CURSO
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
          status: "current"
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

      lessons: [

        {
          id: "A2-M2-L1",
          title: "Coming Soon",
          description: "New lesson.",
          type: "reading",
          status: "locked"
        },

        {
          id: "A2-M2-L2",
          title: "Coming Soon",
          description: "New lesson.",
          type: "reading",
          status: "locked"
        },

        {
          id: "A2-M2-L3",
          title: "Coming Soon",
          description: "New lesson.",
          type: "reading",
          status: "locked"
        },

        {
          id: "A2-M2-L4",
          title: "Coming Soon",
          description: "New lesson.",
          type: "reading",
          status: "locked"
        },

        {
          id: "A2-M2-L5",
          title: "Coming Soon",
          description: "New lesson.",
          type: "reading",
          status: "locked"
        },

        {
          id: "A2-M2-REVIEW",
          title: "Revisão Geral",
          description: "Review everything from Module 2.",
          type: "review",
          status: "locked"
        },

        {
          id: "A2-M2-TEST",
          title: "Avaliação do Módulo",
          description: "Test your knowledge.",
          type: "test",
          status: "locked"
        }

      ]

    },

    3: {

      title: "Módulo 3",

      lessons: [

        {
          id: "A2-M3-L1",
          title: "Coming Soon",
          description: "New lesson.",
          type: "reading",
          status: "locked"
        },

        {
          id: "A2-M3-L2",
          title: "Coming Soon",
          description: "New lesson.",
          type: "reading",
          status: "locked"
        },

        {
          id: "A2-M3-L3",
          title: "Coming Soon",
          description: "New lesson.",
          type: "reading",
          status: "locked"
        },

        {
          id: "A2-M3-L4",
          title: "Coming Soon",
          description: "New lesson.",
          type: "reading",
          status: "locked"
        },

        {
          id: "A2-M3-L5",
          title: "Coming Soon",
          description: "New lesson.",
          type: "reading",
          status: "locked"
        },

        {
          id: "A2-M3-REVIEW",
          title: "Revisão Geral",
          description: "Review everything from Module 3.",
          type: "review",
          status: "locked"
        },

        {
          id: "A2-M3-TEST",
          title: "Avaliação do Módulo",
          description: "Test your knowledge.",
          type: "test",
          status: "locked"
        }

      ]

    }

  }

};


/* =========================================================
   4. ESTRUTURA PADRÃO DO USUÁRIO
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

  dailyGoal: APP_CONFIG.dailyGoalMinutes,

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
   5. ESTADO GLOBAL DA APLICAÇÃO
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
   6. INICIALIZAÇÃO
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  initializeApp
);


function initializeApp() {

  try {

    loadUserData();

    normalizeDailyData();

    setupNavigation();

    setupMenu();

    setupButtons();

    updateInterface();

    APP_STATE.initialized = true;

    console.log(
      `${APP_CONFIG.name} ${APP_CONFIG.version} inicializado.`
    );

  } catch (error) {

    console.error(
      "Erro durante a inicialização do aplicativo:",
      error
    );

  }

}


/* =========================================================
   7. STORAGE
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


  } catch (error) {

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

  } catch (error) {

    console.error(
      "Erro ao salvar dados:",
      error
    );

  }

}


/* =========================================================
   8. NORMALIZAÇÃO DOS DADOS
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

    user.module =
      1;

  }


  if (
    !Number.isInteger(
      user.lesson
    ) ||
    user.lesson < 1
  ) {

    user.lesson =
      1;

  }


  if (!Array.isArray(
    user.completedLessons
  )) {

    user.completedLessons =
      [];

  }


  if (!Array.isArray(
    user.completedReviews
  )) {

    user.completedReviews =
      [];

  }


  if (!Array.isArray(
    user.completedTests
  )) {

    user.completedTests =
      [];

  }


  if (!Array.isArray(
    user.achievements
  )) {

    user.achievements =
      [];

  }


  if (!Array.isArray(
    user.errors
  )) {

    user.errors =
      [];

  }


  if (!Array.isArray(
    user.conversations
  )) {

    user.conversations =
      [];

  }


  if (!Array.isArray(
    user.studySessions
  )) {

    user.studySessions =
      [];

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


  if (!user.settings) {

    user.settings =
      cloneObject(
        DEFAULT_USER.settings
      );

  }


  saveUserData();

}


/* =========================================================
   9. CONTROLE DA META DIÁRIA
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
   10. UTILITÁRIOS
   ========================================================= */

function cloneObject(object) {

  return JSON.parse(
    JSON.stringify(object)
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

      } else {

        result[key] =
          extra[key];

      }

    }
  );


  return result;

}


/* =========================================================
   11. NAVEGAÇÃO
   ========================================================= */

function setupNavigation() {

  const navigationButtons =
    document.querySelectorAll(
      "[data-section]"
    );


  navigationButtons.forEach(
    button => {

      button.addEventListener(
        "click",
        function () {

          const section =
            this.dataset.section;

          navigateTo(
            section
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
      sectionElement => {

        sectionElement.classList.remove(
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
   12. MENU
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
   13. BOTÕES PRINCIPAIS
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
   14. CONTINUAR APRENDIZADO
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
   15. LOCALIZAR AULA ATUAL
   ========================================================= */

function getCurrentLesson() {

  const user =
    APP_STATE.user;


  const level =
    LESSON_CONTENT[
      user.level
    ];


  if (!level) {

    return null;

  }


  const module =
    level[
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
   16. LOCALIZAR QUALQUER ATIVIDADE
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
   17. INICIAR AULA
   ========================================================= */

function startLesson(
  lesson
) {

  if (!lesson) {

    return;

  }


  APP_STATE.currentLesson =
    lesson;


  APP_STATE.currentSession = {

    type: lesson.type,

    activityId: lesson.id,

    startedAt:
      new Date().toISOString(),

    completed: false

  };


  console.log(
    "Iniciando atividade:",
    lesson
  );


  /*
    ESTA É A PORTA DE ENTRADA
    PARA O FUTURO MOTOR DE AULAS.

    O motor completo será responsável por:

    1. Contextualização
    2. Reading
    3. Comprehension
    4. Vocabulary
    5. Grammar
    6. Translation
    7. Active Recall
    8. Listening
    9. Speaking
    10. Writing
    11. Fixation
    12. Feedback
    13. Review Scheduling
    14. Error Tracking
  */


  alert(
    `Aula selecionada:\n\n${lesson.title}\n\n` +
    `O conteúdo completo desta aula será carregado pelo Motor de Aulas.`
  );

}


/* =========================================================
   18. REVISÃO
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


  console.log(
    "Itens de revisão:",
    user.review
  );


  /*
    Futuro MOTOR DE REVISÃO:

    - Spaced Repetition
    - Active Recall
    - Retrieval Practice
    - Vocabulário
    - Gramática
    - Frases
    - Erros
    - Pontos fracos
    - Intervalos adaptativos
  */


  alert(
    "Revisão iniciada."
  );

}


/* =========================================================
   19. CONVERSAÇÃO
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

    type: "conversation",

    mode: mode || "guided",

    startedAt:
      new Date().toISOString(),

    completed: false

  };


  console.log(
    "Modo de conversação:",
    mode
  );


  alert(
    `${selectedMode}\n\n` +
    "O módulo de conversação será aberto aqui."
  );

}


/* =========================================================
   20. PERFIL
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
   21. XP
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


  const oldXP =
    Number(
      APP_STATE.user.xp || 0
    );


  APP_STATE.user.xp =
    oldXP +
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
   22. NÍVEL DE XP
   ========================================================= */

function getXPLevel() {

  const xp =
    Number(
      APP_STATE.user.xp || 0
    );


  if (xp >= 5000) {

    return 10;

  }


  if (xp >= 4000) {

    return 9;

  }


  if (xp >= 3000) {

    return 8;

  }


  if (xp >= 2000) {

    return 7;

  }


  if (xp >= 1500) {

    return 6;

  }


  if (xp >= 1000) {

    return 5;

  }


  if (xp >= 700) {

    return 4;

  }


  if (xp >= 400) {

    return 3;

  }


  if (xp >= 200) {

    return 2;

  }


  return 1;

}


/* =========================================================
   23. SEQUÊNCIA
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
   24. TEMPO DE ESTUDO
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


  /*
    Mantemos um histórico razoável.
    No futuro isso poderá ser substituído
    por sincronização com banco de dados.
  */

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
   25. CONCLUSÃO DE AULA
   ========================================================= */

function completeLesson(
  lessonId
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

    console.warn(
      `Aula não encontrada: ${lessonId}`
    );

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
    lesson
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
   26. AVANÇAR AULA
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


  /*
    Quando a quinta aula for concluída,
    a próxima atividade lógica será:

    REVIEW
    depois TEST

    O avanço de módulo será controlado
    pelo Motor de Curso.
  */


  if (
    user.lesson >=
    contentLessons.length
  ) {

    console.log(
      "Aulas do módulo concluídas. Próxima etapa: revisão."
    );

  }

}


/* =========================================================
   27. DESBLOQUEAR AULA ATUAL
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


  console.log(
    "Próxima aula:",
    currentId
  );

}


/* =========================================================
   28. HABILIDADES
   ========================================================= */

function updateSkillFromLesson(
  lesson
) {

  if (!lesson) {

    return;

  }


  const skillMap = {

    reading: "reading",

    listening: "listening",

    speaking: "speaking",

    writing: "writing",

    vocabulary: "vocabulary",

    grammar: "grammar"

  };


  const skill =
    skillMap[
      lesson.type
    ];


  if (!skill) {

    return;

  }


  const current =
    Number(
      APP_STATE.user.progress[
        skill
      ] || 0
    );


  APP_STATE.user.progress[
    skill
  ] =
    Math.min(
      100,
      current + 5
    );

}


/* =========================================================
   29. AGENDAMENTO DE REVISÃO
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
   30. ATUALIZAR CONTADORES DE REVISÃO
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
   31. CONQUISTAS
   ========================================================= */

function checkAchievements() {

  const user =
    APP_STATE.user;


  if (
    user.completedLessons.length >=
    1
  ) {

    unlockAchievement(
      "firstLesson"
    );

  }


  if (
    user.streak >=
    7
  ) {

    unlockAchievement(
      "sevenDays"
    );

  }


  if (
    user.streak >=
    30
  ) {

    unlockAchievement(
      "thirtyDays"
    );

  }


  if (
    user.conversations.length >=
    1
  ) {

    unlockAchievement(
      "firstConversation"
    );

  }


  if (
    user.xp >=
    1000
  ) {

    unlockAchievement(
      "oneThousandXP"
    );

  }


  if (
    user.completedLessons.length >=
    10
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
   32. ATUALIZAÇÃO DA INTERFACE
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
   33. NOME DO USUÁRIO
   ========================================================= */

function updateUserName() {

  const element =
    document.getElementById(
      "welcomeName"
    );


  if (!element) {

    return;

  }


  const name =
    APP_STATE.user.name ||
    "Aluno";


  element.textContent =
    `Olá, ${name}! 👋`;

}


/* =========================================================
   34. NÍVEL
   ========================================================= */

function updateLevel() {

  const user =
    APP_STATE.user;


  const levelElement =
    document.getElementById(
      "currentLevel"
    );


  const moduleElement =
    document.getElementById(
      "currentModule"
    );


  const lessonElement =
    document.getElementById(
      "currentLesson"
    );


  if (levelElement) {

    levelElement.textContent =
      user.level;

  }


  if (moduleElement) {

    moduleElement.textContent =
      user.module;

  }


  if (lessonElement) {

    lessonElement.textContent =
      user.lesson;

  }


  const progress =
    calculateLevelProgress();


  const text =
    document.getElementById(
      "levelProgressText"
    );


  const bar =
    document.getElementById(
      "levelProgressBar"
    );


  if (text) {

    text.textContent =
      `${progress}%`;

  }


  if (bar) {

    bar.style.width =
      `${progress}%`;

  }

}


/* =========================================================
   35. PROGRESSO DO NÍVEL
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


  if (
    totalLessons <= 0
  ) {

    return 0;

  }


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
      ) *
      100
    )

  );

}


/* =========================================================
   36. XP NA INTERFACE
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


  const levelElement =
    document.getElementById(
      "xpLevel"
    );


  if (levelElement) {

    levelElement.textContent =
      getXPLevel();

  }

}


/* =========================================================
   37. STREAK NA INTERFACE
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
   38. META DIÁRIA
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
            ) *
            100
          )
        )
      : 0;


  const text =
    document.getElementById(
      "dailyGoalText"
    );


  const percentElement =
    document.getElementById(
      "dailyGoalPercent"
    );


  const bar =
    document.getElementById(
      "dailyGoalBar"
    );


  if (text) {

    text.textContent =
      `${minutes} / ${goal} min`;

  }


  if (percentElement) {

    percentElement.textContent =
      `${percent}%`;

  }


  if (bar) {

    bar.style.width =
      `${percent}%`;

  }

}


/* =========================================================
   39. HABILIDADES
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
   40. PONTO FRACO
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


  const title =
    document.getElementById(
      "mainWeakPoint"
    );


  const description =
    document.getElementById(
      "mainWeakPointDescription"
    );


  if (!weakest) {

    return;

  }


  if (title) {

    title.textContent =
      names[
        weakest[0]
      ] ||
      weakest[0];

  }


  if (description) {

    description.textContent =
      `Seu desempenho atual está em ${weakest[1]}%. Vamos reforçar essa habilidade.`;

  }

}


/* =========================================================
   41. REVISÃO NA INTERFACE
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
   42. CAMINHO DO CURSO
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

      const levelElement =
        createLevelElement(
          level
        );


      container.appendChild(
        levelElement
      );

    }
  );

}


/* =========================================================
   43. ELEMENTO DE NÍVEL
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
    moduleNumber <= course.modules;
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
   44. ELEMENTO DE MÓDULO
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
      createPlaceholderLessons(
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
   45. AULAS PLACEHOLDER
   ========================================================= */

function createPlaceholderLessons(
  level,
  moduleNumber
) {

  const lessons =
    [];


  for (
    let i = 1;
    i <= 5;
    i++
  ) {

    lessons.push({

      id:
        `${level}-M${moduleNumber}-L${i}`,

      title:
        `Aula ${i}`,

      description:
        "Conteúdo disponível em breve.",

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
      "Revisão do módulo.",

    type:
      "review",

    status:
      "locked"

  });


  lessons.push({

    id:
      `${level}-M${moduleNumber}-TEST`,

    title:
      "Avaliação",

    description:
      "Avaliação do módulo.",

    type:
      "test",

    status:
      "locked"

  });


  return lessons;

}


/* =========================================================
   46. ELEMENTO DE AULA
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

      if (
        !isUnlocked
      ) {

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
   47. REVISÃO ESPECÍFICA
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
   48. TESTE
   ========================================================= */

function startTest(
  lesson
) {

  console.log(
    "Teste:",
    lesson
  );


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
    "O Motor de Testes será responsável por carregar as questões."
  );

}


/* =========================================================
   49. CONQUISTAS NA INTERFACE
   ========================================================= */

function updateAchievements() {

  const achievements =
    APP_STATE.user.achievements;


  const cards =
    document.querySelectorAll(
      ".achievement-card"
    );


  cards.forEach(
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
   50. UTILITÁRIO DE TEXTO
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
   51. DATAS
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
   52. REGISTRO DE ERRO
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
   53. REGISTRAR VOCABULÁRIO
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
    ).trim()
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
   54. REGISTRAR GRAMÁTICA
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
   55. REGISTRAR CONVERSAÇÃO
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
   56. CONCLUIR REVISÃO
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
   57. CONCLUIR TESTE
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
            ? test ===
              testId
            : test.id ===
              testId
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
   58. RESET LOCAL
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
   59. EXPORTAR DADOS
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
      [
        data
      ],
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
   60. IMPORTAR DADOS
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

  } catch (error) {

    console.error(
      "Erro ao importar dados:",
      error
    );


    return false;

  }

}


/* =========================================================
   61. API PÚBLICA DO APP
   ========================================================= */

window.EnglishFamily = {

  /* ---------- USUÁRIO ---------- */

  getUser() {

    return APP_STATE.user;

  },


  getState() {

    return APP_STATE;

  },


  /* ---------- STORAGE ---------- */

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


  /* ---------- NAVEGAÇÃO ---------- */

  navigate(
    section
  ) {

    navigateTo(
      section
    );

  },


  /* ---------- AULAS ---------- */

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
    id
  ) {

    return completeLesson(
      id
    );

  },


  /* ---------- XP ---------- */

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


  /* ---------- ESTUDO ---------- */

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


  /* ---------- REVISÃO ---------- */

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


  /* ---------- TESTES ---------- */

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


  /* ---------- CONVERSAÇÃO ---------- */

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


  /* ---------- ERROS ---------- */

  registerError(
    data
  ) {

    return registerError(
      data
    );

  },


  /* ---------- VOCABULÁRIO ---------- */

  registerVocabulary(
    word,
    data
  ) {

    registerVocabulary(
      word,
      data
    );

  },


  /* ---------- GRAMÁTICA ---------- */

  registerGrammar(
    topic,
    data
  ) {

    registerGrammar(
      topic,
      data
    );

  },


  /* ---------- INTERFACE ---------- */

  refresh() {

    updateInterface();

  }

};


/* =========================================================
   62. FIM DO APP.JS
   ========================================================= */
