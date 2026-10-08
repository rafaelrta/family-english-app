/* =========================================================
   ENGLISH FAMILY
   APP.JS
   Núcleo inicial da aplicação
   ========================================================= */


/* =========================================================
   1. CONFIGURAÇÃO GERAL
   ========================================================= */

const APP_CONFIG = {

  name: "English Family",

  version: "1.0.0",

  language: "en",

  defaultLevel: "A2",

  dailyGoalMinutes: 15,

  xpPerLesson: 20,

  xpPerReview: 10,

  xpPerConversation: 15,

  storageKey: "englishFamilyData"

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
   3. CONTEÚDO INICIAL
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
   4. ESTADO PADRÃO DO USUÁRIO
   ========================================================= */

const DEFAULT_USER = {

  id: "local-user",

  name: "Aluno",

  email: "",

  level: "A2",

  module: 1,

  lesson: 1,

  xp: 0,

  streak: 0,

  lastStudyDate: null,

  dailyMinutes: 0,

  dailyGoal: APP_CONFIG.dailyGoalMinutes,

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

    weakPoints: 0

  },

  achievements: [],

  completedLessons: [],

  completedReviews: [],

  completedTests: [],

  errors: [],

  vocabulary: {},

  grammar: {},

  conversations: [],

  settings: {

    darkMode: false,

    notifications: true

  }

};


/* =========================================================
   5. ESTADO GLOBAL
   ========================================================= */

let APP_STATE = {

  user: null,

  currentSection: "home",

  menuOpen: false,

  initialized: false

};


/* =========================================================
   6. INICIALIZAÇÃO
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  initializeApp
);


function initializeApp() {

  loadUserData();

  setupNavigation();

  setupMenu();

  setupButtons();

  updateInterface();

  APP_STATE.initialized = true;

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


    if (savedData) {

      const parsed =
        JSON.parse(savedData);

      APP_STATE.user =
        mergeObjects(
          DEFAULT_USER,
          parsed
        );

    } else {

      APP_STATE.user =
        cloneObject(DEFAULT_USER);

      saveUserData();

    }

  } catch (error) {

    console.error(
      "Erro ao carregar dados:",
      error
    );

    APP_STATE.user =
      cloneObject(DEFAULT_USER);

  }

}


function saveUserData() {

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
   8. UTILITÁRIOS
   ========================================================= */

function cloneObject(object) {

  return JSON.parse(
    JSON.stringify(object)
  );

}


function mergeObjects(base, extra) {

  const result =
    cloneObject(base);

  Object.keys(extra || {}).forEach(
    key => {

      if (

        extra[key] !== null &&

        typeof extra[key] === "object" &&

        !Array.isArray(extra[key])

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
   9. NAVEGAÇÃO
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


function navigateTo(section) {

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
          item.dataset.section === section
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
   10. MENU
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


  if (!menu) return;


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


  if (!menu) return;


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
   11. BOTÕES PRINCIPAIS
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
   12. CONTINUAR APRENDIZADO
   ========================================================= */

function continueLearning() {

  const user =
    APP_STATE.user;


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
   13. LOCALIZAR AULA ATUAL
   ========================================================= */

function getCurrentLesson() {

  const user =
    APP_STATE.user;


  const level =
    LESSON_CONTENT[user.level];


  if (!level) {

    return null;

  }


  const module =
    level[user.module];


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
   14. INICIAR AULA
   ========================================================= */

function startLesson(lesson) {

  console.log(
    "Iniciando aula:",
    lesson
  );


  /*
    Futuramente esta função abrirá
    o motor completo da aula:

    Reading
    Comprehension
    Vocabulary
    Grammar
    Translation
    Fixation
    Listening
    Speaking
    Writing
  */


  alert(
    `Aula selecionada:\n\n${lesson.title}\n\n` +
    `O conteúdo completo da aula será carregado pelo motor pedagógico.`
  );

}


/* =========================================================
   15. REVISÃO
   ========================================================= */

function startReview() {

  console.log(
    "Iniciando revisão"
  );


  if (
    APP_STATE.user.review.due === 0 &&
    APP_STATE.user.review.weakPoints === 0
  ) {

    alert(
      "Você não possui itens de revisão no momento."
    );

    return;

  }


  /*
    Futuramente:

    1. selecionar itens vencidos
    2. selecionar pontos fracos
    3. misturar vocabulário
    4. gramática
    5. frases
    6. recuperação ativa
    7. atualizar memória
  */


  alert(
    "Revisão iniciada."
  );

}


/* =========================================================
   16. CONVERSAÇÃO
   ========================================================= */

function startConversation(mode) {

  console.log(
    "Modo de conversação:",
    mode
  );


  const labels = {

    guided:
      "Conversação guiada",

    practice:
      "Prática livre",

    challenge:
      "Desafio"

  };


  alert(
    `${labels[mode] || "Conversação"}\n\n` +
    "O módulo de conversação será aberto aqui."
  );

}


/* =========================================================
   17. PERFIL
   ========================================================= */

function openProfile() {

  alert(
    `Perfil atual:\n\n${APP_STATE.user.name}\n\n` +
    `Nível: ${APP_STATE.user.level}\n` +
    `XP: ${APP_STATE.user.xp}\n` +
    `Sequência: ${APP_STATE.user.streak} dias`
  );

}


/* =========================================================
   18. XP
   ========================================================= */

function addXP(amount) {

  if (!Number.isFinite(amount)) {

    return;

  }


  APP_STATE.user.xp +=
    Math.max(
      0,
      amount
    );


  saveUserData();

  updateXPDisplay();

  checkAchievements();

}


/* =========================================================
   19. SEQUÊNCIA
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

  } else if (
    lastDate === today
  ) {

    return;

  } else {

    const difference =
      daysBetween(
        lastDate,
        today
      );


    if (difference === 1) {

      APP_STATE.user.streak +=
        1;

    } else {

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
   20. TEMPO DE ESTUDO
   ========================================================= */

function addStudyMinutes(minutes) {

  if (
    !Number.isFinite(minutes) ||
    minutes <= 0
  ) {

    return;

  }


  APP_STATE.user.dailyMinutes +=
    minutes;


  saveUserData();

  updateDailyGoal();


  /*
    Aqui futuramente podemos
    registrar sessões completas
    no histórico do aluno.
  */

}


/* =========================================================
   21. CONCLUSÃO DE AULA
   ========================================================= */

function completeLesson(lessonId) {

  if (
    !lessonId
  ) {

    return;

  }


  const completed =
    APP_STATE.user.completedLessons;


  if (
    !completed.includes(
      lessonId
    )
  ) {

    completed.push(
      lessonId
    );


    addXP(
      APP_CONFIG.xpPerLesson
    );


    updateStreak();


    advanceLesson();

  }


  saveUserData();

  updateInterface();

}


/* =========================================================
   22. AVANÇAR AULA
   ========================================================= */

function advanceLesson() {

  const user =
    APP_STATE.user;


  const module =
    LESSON_CONTENT[user.level]?.[
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


  const nextLessonIndex =
    user.lesson;


  if (
    nextLessonIndex <
    contentLessons.length
  ) {

    user.lesson +=
      1;

    unlockCurrentLesson();

    return;

  }


  /*
    Depois da quinta aula:

    Aula 6 = revisão
    Aula 7 = prova
  */

}


/* =========================================================
   23. DESBLOQUEAR AULA ATUAL
   ========================================================= */

function unlockCurrentLesson() {

  const currentId =
    `${APP_STATE.user.level}-M${APP_STATE.user.module}-L${APP_STATE.user.lesson}`;


  console.log(
    "Próxima aula:",
    currentId
  );

}


/* =========================================================
   24. CONQUISTAS
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
    user.conversations.length >= 1
  ) {

    unlockAchievement(
      "firstConversation"
    );

  }

}


function unlockAchievement(id) {

  if (
    !APP_STATE.user.achievements.includes(
      id
    )
  ) {

    APP_STATE.user.achievements.push(
      id
    );

    saveUserData();

  }

}


/* =========================================================
   25. ATUALIZAÇÃO DA INTERFACE
   ========================================================= */

function updateInterface() {

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
   26. NOME
   ========================================================= */

function updateUserName() {

  const element =
    document.getElementById(
      "welcomeName"
    );


  if (!element) return;


  const name =
    APP_STATE.user.name ||
    "Aluno";


  element.textContent =
    `Olá, ${name}! 👋`;

}


/* =========================================================
   27. NÍVEL
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
   28. PROGRESSO DO NÍVEL
   ========================================================= */

function calculateLevelProgress() {

  const user =
    APP_STATE.user;


  const totalLessons =
    COURSE[user.level]
      ?.modules *
    COURSE[user.level]
      ?.lessonsPerModule;


  if (!totalLessons) {

    return 0;

  }


  const completed =
    user.completedLessons.filter(
      id =>
        id.startsWith(
          user.level
        )
    ).length;


  return Math.min(
    100,
    Math.round(
      (completed /
        totalLessons) *
      100
    )
  );

}


/* =========================================================
   29. XP
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

}


/* =========================================================
   30. STREAK
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
   31. META DIÁRIA
   ========================================================= */

function updateDailyGoal() {

  const user =
    APP_STATE.user;


  const minutes =
    user.dailyMinutes;


  const goal =
    user.dailyGoal;


  const percent =
    Math.min(
      100,
      Math.round(
        (minutes / goal) *
        100
      )
    );


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
   32. HABILIDADES
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


function updateWeakPoint() {

  const progress =
    APP_STATE.user.progress;


  const entries =
    Object.entries(
      progress
    );


  entries.sort(
    (a, b) =>
      a[1] - b[1]
  );


  const weakest =
    entries[0];


  const names = {

    reading: "Reading",

    listening: "Listening",

    speaking: "Speaking",

    writing: "Writing",

    vocabulary: "Vocabulary",

    grammar: "Grammar"

  };


  const title =
    document.getElementById(
      "mainWeakPoint"
    );


  const description =
    document.getElementById(
      "mainWeakPointDescription"
    );


  if (!weakest) return;


  if (title) {

    title.textContent =
      names[weakest[0]] ||
      weakest[0];

  }


  if (description) {

    description.textContent =
      `Seu desempenho atual está em ${weakest[1]}%. Vamos reforçar essa habilidade.`;

  }

}


/* =========================================================
   33. REVISÃO
   ========================================================= */

function updateReview() {

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
   34. CAMINHO DO CURSO
   ========================================================= */

function updateCoursePath() {

  const container =
    document.getElementById(
      "coursePath"
    );


  if (!container) return;


  container.innerHTML =
    "";


  const levels =
    Object.keys(
      COURSE
    );


  levels.forEach(
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


function createLevelElement(level) {

  const wrapper =
    document.createElement(
      "article"
    );


  wrapper.className =
    "course-level";


  const course =
    COURSE[level];


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

    const moduleElement =
      createModuleElement(
        level,
        moduleNumber
      );


    wrapper.appendChild(
      moduleElement
    );

  }


  return wrapper;

}


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
    LESSON_CONTENT[level]
      ?.[
        moduleNumber
      ];


  let lessons =
    moduleData
      ?.lessons ||
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


  if (!isCurrent &&
      level !== APP_STATE.user.level) {

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


function createPlaceholderLessons(
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


  let icon =
    "🔒";


  if (completed) {

    icon =
      "✅";

  } else if (isCurrent) {

    icon =
      "▶️";

  } else if (
    lesson.type === "review"
  ) {

    icon =
      "🧠";

  } else if (
    lesson.type === "test"
  ) {

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
        lesson.status ===
        "locked" &&
        !isCurrent &&
        !completed
      ) {

        /*
          No futuro teremos regras
          completas de desbloqueio.
        */

        alert(
          "Esta atividade ainda está bloqueada."
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
   35. CONQUISTAS
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
   36. UTILITÁRIO DE TEXTO
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
   37. DATAS
   ========================================================= */

function getDateKey(date) {

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
    (1000 * 60 * 60 * 24)
  );

}


/* =========================================================
   38. RESET LOCAL
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
   39. API PÚBLICA DO APP
   ========================================================= */

window.EnglishFamily = {

  getUser() {

    return APP_STATE.user;

  },


  save() {

    saveUserData();

  },


  addXP(amount) {

    addXP(
      amount
    );

  },


  addStudyMinutes(minutes) {

    addStudyMinutes(
      minutes
    );

  },


  completeLesson(id) {

    completeLesson(
      id
    );

  },


  navigate(section) {

    navigateTo(
      section
    );

  },


  reset() {

    resetLocalData();

  }

};


/* =========================================================
   40. FIM
   ========================================================= */
