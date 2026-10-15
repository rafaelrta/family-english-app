/* =========================================================
   ENGLISH FAMILY
   APP.JS
   v1.5.1

   Núcleo principal
   Motor de aulas
   Conteúdo dinâmico
   Referência pedagógica AEF
   Fallback offline
   Personalização básica
   ========================================================= */


/* =========================================================
   1. CONFIGURAÇÃO GERAL
   ========================================================= */

const APP_CONFIG = {

  name: "English Family",

  version: "1.5.1",

  language: "en",

  defaultLevel: "A2",

  dailyGoalMinutes: 15,

  xpPerLesson: 20,

  xpPerReview: 10,

  xpPerConversation: 15,

  xpPerTest: 30,

  storageKey: "englishFamilyData",

  storageVersion: 3,

  /*
   * Quando existir um backend próprio, basta informar
   * a URL aqui.
   *
   * Exemplo:
   *
   * dynamicApiUrl:
   * "https://seu-backend.com/api/lesson"
   *
   * NÃO coloque chaves secretas aqui.
   */

  dynamicApiUrl: "",

  /*
   * Fonte externa pública usada como fallback dinâmico.
   *
   * A Wikipedia possui API pública e permite consultas
   * via navegador com origin=*.
   */

  wikipediaApi:
    "https://en.wikipedia.org/w/api.php",

  dynamicTimeout: 9000,

  /*
   * Conteúdo externo somente quando explicitamente
   * habilitado pela aula.
   */

  dynamicContentEnabled: true,

  /*
   * AEF é referência pedagógica.
   * Não significa copiar o material.
   */

  pedagogy: {

    primaryReference:
      "American English File",

    publisher:
      "Oxford University Press",

    usage:
      "pedagogical_reference",

    copyrightPolicy:
      "original_content_only"

  }

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
   ========================================================= */

const LESSON_CONTENT =
  window.ENGLISH_FAMILY_COURSE_DATA || {};


/* =========================================================
   4. ESTADO GLOBAL
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
   5. USUÁRIO PADRÃO
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

  dynamicLessons: {},

  lessonSnapshots: {},

  settings: {

    darkMode: false,

    notifications: true,

    sound: true

  }

};


/* =========================================================
   6. INICIALIZAÇÃO
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  initializeApp
);


function initializeCoreApp() {

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
   7. SERVICE WORKER
   ========================================================= */

function registerServiceWorker() {

  if (!("serviceWorker" in navigator)) {

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
   8. STORAGE
   ========================================================= */

function loadUserData() {

  try {

    const savedData =
      localStorage.getItem(
        APP_CONFIG.storageKey
      );

    if (!savedData) {

      APP_STATE.user =
        cloneObject(DEFAULT_USER);

      saveUserData();

      return;

    }

    const parsed =
      JSON.parse(savedData);

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
      cloneObject(DEFAULT_USER);

  }

}


function saveUserData() {

  if (!APP_STATE.user) {

    return;

  }

  try {

    APP_STATE.user.storageVersion =
      APP_CONFIG.storageVersion;

    localStorage.setItem(
      APP_CONFIG.storageKey,
      JSON.stringify(APP_STATE.user)
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
   9. NORMALIZAÇÃO DO USUÁRIO
   ========================================================= */

function normalizeUserData() {

  const user =
    APP_STATE.user;

  if (!user.id) {

    user.id = "local-user";

  }

  if (!user.name) {

    user.name = "Aluno";

  }

  if (!COURSE[user.level]) {

    user.level =
      APP_CONFIG.defaultLevel;

  }

  if (
    !Number.isInteger(user.module) ||
    user.module < 1
  ) {

    user.module = 1;

  }

  if (
    !Number.isInteger(user.lesson) ||
    user.lesson < 1
  ) {

    user.lesson = 1;

  }

  if (!Array.isArray(user.completedLessons)) {

    user.completedLessons = [];

  }

  if (!Array.isArray(user.completedReviews)) {

    user.completedReviews = [];

  }

  if (!Array.isArray(user.completedTests)) {

    user.completedTests = [];

  }

  if (!Array.isArray(user.achievements)) {

    user.achievements = [];

  }

  if (!Array.isArray(user.errors)) {

    user.errors = [];

  }

  if (!Array.isArray(user.conversations)) {

    user.conversations = [];

  }

  if (!Array.isArray(user.studySessions)) {

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

  if (!Array.isArray(user.review.items)) {

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

  if (
    !user.dynamicLessons ||
    typeof user.dynamicLessons !== "object"
  ) {

    user.dynamicLessons = {};

  }

  if (
    !user.lessonSnapshots ||
    typeof user.lessonSnapshots !== "object"
  ) {

    user.lessonSnapshots = {};

  }

  if (
    !user.settings ||
    typeof user.settings !== "object"
  ) {

    user.settings =
      cloneObject(
        DEFAULT_USER.settings
      );

  }

  migrateUserData();

  saveUserData();

}


/* =========================================================
   10. MIGRAÇÃO
   ========================================================= */

function migrateUserData() {

  const user =
    APP_STATE.user;

  if (!user.storageVersion) {

    user.storageVersion = 1;

  }

  if (user.storageVersion < 2) {

    if (!user.dynamicLessons) {

      user.dynamicLessons = {};

    }

    if (!user.lessonSnapshots) {

      user.lessonSnapshots = {};

    }

    user.storageVersion = 2;

  }

}


/* =========================================================
   11. DATA DIÁRIA
   ========================================================= */

function normalizeDailyData() {

  const user =
    APP_STATE.user;

  const today =
    getDateKey(
      new Date()
    );

  if (user.dailyDate !== today) {

    user.dailyDate = today;

    user.dailyMinutes = 0;

    saveUserData();

  }

}


/* =========================================================
   12. UTILITÁRIOS
   ========================================================= */

function cloneObject(object) {

  return JSON.parse(
    JSON.stringify(object)
  );

}


function mergeObjects(base, extra) {

  const result =
    cloneObject(base);

  Object.keys(extra || {})
    .forEach(key => {

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

      }

      else {

        result[key] =
          extra[key];

      }

    });

  return result;

}


/* =========================================================
   13. NAVEGAÇÃO
   ========================================================= */

function setupNavigation() {

  document
    .querySelectorAll("[data-section]")
    .forEach(button => {

      button.addEventListener(
        "click",
        function () {

          navigateTo(
            this.dataset.section
          );

        }
      );

    });

}


function navigateTo(section) {

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
    .querySelectorAll(".app-section")
    .forEach(element =>
      element.classList.remove("active")
    );

  target.classList.add("active");

  document
    .querySelectorAll(
      ".nav-item, .bottom-nav-item"
    )
    .forEach(item => {

      item.classList.toggle(
        "active",
        item.dataset.section === section
      );

    });

  APP_STATE.currentSection =
    section;

  closeMenu();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =========================================================
   14. MENU
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

  menu.classList.add("open");

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

  APP_STATE.menuOpen = true;

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

  APP_STATE.menuOpen = false;

}


/* =========================================================
   15. BOTÕES
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
    .querySelectorAll(".conversation-mode")
    .forEach(button => {

      button.addEventListener(
        "click",
        function () {

          startConversation(
            this.dataset.mode
          );

        }
      );

    });

}


/* =========================================================
   16. CONTINUAR
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

  startLesson(lesson);

}


/* =========================================================
   17. AULA ATUAL
   ========================================================= */

function getCurrentLesson() {

  const user =
    APP_STATE.user;

  const module =
    LESSON_CONTENT
      ?.[user.level]
      ?.[user.module];

  if (!module) {

    return null;

  }

  return module.lessons
    ?.find(
      lesson =>
        lesson.id ===
        `${user.level}-M${user.module}-L${user.lesson}`
    ) || null;

}


/* =========================================================
   18. LOCALIZAR ATIVIDADE
   ========================================================= */

function findActivity(activityId) {

  if (!activityId) {

    return null;

  }

  for (
    const levelKey of
    Object.keys(LESSON_CONTENT)
  ) {

    const level =
      LESSON_CONTENT[levelKey];

    for (
      const moduleKey of
      Object.keys(level || {})
    ) {

      const module =
        level[moduleKey];

      if (!Array.isArray(module?.lessons)) {

        continue;

      }

      const activity =
        module.lessons.find(
          lesson =>
            lesson.id === activityId
        );

      if (activity) {

        return activity;

      }

    }

  }

  return null;

}


/* =========================================================
   19. ESTRUTURA DO CURSO
   ========================================================= */

function createModuleLessons(
  level,
  moduleNumber
) {

  const existing =
    LESSON_CONTENT
      ?.[level]
      ?.[moduleNumber]
      ?.lessons;

  if (
    Array.isArray(existing) &&
    existing.length
  ) {

    return existing;

  }

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
        `Lesson ${i}`,

      description:
        "Aula estruturada para o curso.",

      type:
        "reading",

      kind:
        "lesson",

      status:
        i === 1 &&
        level === APP_CONFIG.defaultLevel &&
        moduleNumber === 1
          ? "current"
          : "locked",

      contentMode:
        "dynamic_with_fallback"

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

  return lessons;

}


function ensureCourseStructure() {

  Object.keys(COURSE)
    .forEach(level => {

      if (!LESSON_CONTENT[level]) {

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

        else if (
          !Array.isArray(
            LESSON_CONTENT[level][moduleNumber].lessons
          )
        ) {

          LESSON_CONTENT[level][moduleNumber].lessons =
            createModuleLessons(
              level,
              moduleNumber
            );

        }

      }

    });

}

/* =========================================================
   20. INICIAR AULA
   ========================================================= */

async function startLesson(lesson) {

  if (!lesson) {
    return;
  }

  // Identifica o nível da aula pelo seu ID.
  const requestedLevel =
    String(lesson.id || "")
      .split("-")[0]
      .toUpperCase();

  // Ordem dos níveis do curso.
  const levelOrder = {
    A1: 1,
    A2: 2,
    B1: 3,
    B2: 4,
    C1: 5
  };

  // Nível definido para o perfil do aluno.
  const profileLevel =
    String(
      APP_STATE.user?.level ||
      "A1"
    ).toUpperCase();

  // Bloqueia níveis acima do perfil.
  if (
    levelOrder[requestedLevel] &&
    levelOrder[profileLevel] &&
    levelOrder[requestedLevel] >
      levelOrder[profileLevel]
  ) {

    alert(
  "O nivel " + requestedLevel +
  " esta bloqueado. Seu perfil esta configurado para " +
  profileLevel + "."
);

    return;

  }

  const currentId =
    `${APP_STATE.user.level}-M${APP_STATE.user.module}-L${APP_STATE.user.lesson}`;

  const completed =
    (APP_STATE.user.completedLessons || [])
      .includes(lesson.id);

  const isCurrent =
    lesson.id === currentId;

  // Permite estudar aulas de níveis anteriores,
  // mesmo que ainda não tenham sido concluídas.
  const isPreviousLevel =
    levelOrder[requestedLevel] &&
    levelOrder[profileLevel] &&
    levelOrder[requestedLevel] <
      levelOrder[profileLevel];

  const isUnlocked =
    completed ||
    isCurrent ||
    lesson.status === "current" ||
    isPreviousLevel;

  if (!isUnlocked) {

   alert(
  "Esta aula ainda esta bloqueada."
);

    return;

  }

  /*
   * Primeiro tenta recuperar conteúdo
   * dinâmico ou snapshot.
   */

  const resolvedLesson =
    await resolveLessonContent(
      lesson
    );

  if (
    !resolvedLesson ||
    !resolvedLesson.content
  ) {

    openUnavailableLesson(
      lesson
    );

    return;

  }

  APP_STATE.currentLesson =
    resolvedLesson;

  APP_STATE.currentSession = {

    type: "lesson",

    activityId:
      resolvedLesson.id,

    startedAt:
      new Date().toISOString(),

    completed: false,

    step: 0,

    answers: {},

    score: 0,

    total: 0,

    errors: [],

    feedbackShown: false

  };

  openLessonEngine(
    resolvedLesson
  );

}

/* =========================================================
   21. RESOLUÇÃO DE CONTEÚDO
   ========================================================= */

async function resolveLessonContent(
  lesson
) {

  if (!lesson) {

    return null;

  }

  /*
   * Se a aula já possui conteúdo interno,
   * ele continua sendo prioridade quando
   * contentMode é static/fallback.
   */

  if (
    lesson.content &&
    lesson.contentMode !== "dynamic"
  ) {

    return lesson;

  }

  /*
   * Snapshot salvo anteriormente.
   */

  const snapshot =
    APP_STATE.user
      ?.lessonSnapshots
      ?.[lesson.id];

  if (
    snapshot &&
    snapshot.content
  ) {

    return {

      ...lesson,

      content:
        cloneObject(
          snapshot.content
        ),

      dynamicSnapshot:
        true

    };

  }

  /*
   * Tenta backend primeiro.
   */

  if (
    APP_CONFIG.dynamicContentEnabled
  ) {

    try {

      const dynamic =
        await fetchDynamicLesson(
          lesson
        );

      if (
        dynamic &&
        dynamic.content
      ) {

        saveLessonSnapshot(
          lesson,
          dynamic
        );

        return {

          ...lesson,

          content:
            dynamic.content,

          dynamicSource:
            dynamic.source || null,

          dynamicSnapshot:
            true

        };

      }

    }

    catch (error) {

      console.warn(
        "[English Family] Conteúdo dinâmico indisponível:",
        error
      );

    }

  }

  /*
   * Fallback interno.
   */

  if (lesson.content) {

    return lesson;

  }

  /*
   * Tenta construir fallback genérico.
   */

  const generatedFallback =
    buildFallbackLessonContent(
      lesson
    );

  if (generatedFallback) {

    return {

      ...lesson,

      content:
        generatedFallback

    };

  }

  return null;

}


/* =========================================================
   22. BUSCA DE CONTEÚDO DINÂMICO
   ========================================================= */

async function fetchDynamicLesson(
  lesson
) {

  const metadata =
    lesson.dynamicContent ||
    lesson.content?.dynamicContent ||
    {};

  /*
   * Backend próprio
   */

  if (
    APP_CONFIG.dynamicApiUrl
  ) {

    return await fetchFromBackend(
      lesson,
      metadata
    );

  }

  /*
   * Sem backend:
   * utiliza Wikipedia como fonte
   * pública para enriquecer a aula.
   */

  return await fetchWikipediaLesson(
    lesson,
    metadata
  );

}


/* =========================================================
   23. BACKEND
   ========================================================= */

async function fetchFromBackend(
  lesson,
  metadata
) {

  const controller =
    new AbortController();

  const timeout =
    setTimeout(
      () =>
        controller.abort(),
      APP_CONFIG.dynamicTimeout
    );

  try {

    const response =
      await fetch(
        APP_CONFIG.dynamicApiUrl,
        {

          method:
            "POST",

          headers: {

            "Content-Type":
              "application/json"

          },

          body:
            JSON.stringify({

              lessonId:
                lesson.id,

              level:
                APP_STATE.user.level,

              module:
                APP_STATE.user.module,

              lesson:
                APP_STATE.user.lesson,

              objective:
                lesson.description,

              dynamicContent:
                metadata,

              weaknesses:
                getUserWeaknesses(),

              errors:
                APP_STATE.user.errors
                  .slice(-10),

              vocabulary:
                getRecentVocabulary(),

              grammar:
                getRecentGrammar()

            }),

          signal:
            controller.signal

        }
      );

    if (!response.ok) {

      throw new Error(
        `HTTP ${response.status}`
      );

    }

    const data =
      await response.json();

    return normalizeDynamicResponse(
      data,
      lesson
    );

  }

  finally {

    clearTimeout(timeout);

  }

}


/* =========================================================
   24. WIKIPEDIA
   ========================================================= */

async function fetchWikipediaLesson(
  lesson,
  metadata
) {

  const topics =
    Array.isArray(
      metadata.searchTopics
    )
      ? metadata.searchTopics
      : [];

  if (!topics.length) {

    return null;

  }

  const query =
    topics[0];

  const url =
    `${APP_CONFIG.wikipediaApi}` +
    `?action=query` +
    `&list=search` +
    `&srsearch=${encodeURIComponent(query)}` +
    `&format=json` +
    `&origin=*` +
    `&srlimit=3`;

  const controller =
    new AbortController();

  const timeout =
    setTimeout(
      () =>
        controller.abort(),
      APP_CONFIG.dynamicTimeout
    );

  try {

    const response =
      await fetch(
        url,
        {
          signal:
            controller.signal
        }
      );

    if (!response.ok) {

      throw new Error(
        `Wikipedia HTTP ${response.status}`
      );

    }

    const data =
      await response.json();

    const results =
      data?.query?.search || [];

    if (!results.length) {

      return null;

    }

    const selected =
      results[0];

    const cleanText =
      stripHTML(
        selected.snippet || ""
      );

    /*
     * Não copiamos o artigo inteiro.
     * Utilizamos somente o resultado curto
     * como contexto para gerar uma atividade
     * original.
     */

    const content =
      buildDynamicContentFromExternalContext(
        lesson,
        {
          title:
            selected.title,

          context:
            cleanText

        }
      );

    return {

      content,

      source: {

        provider:
          "Wikipedia",

        title:
          selected.title,

        query,

        retrievedAt:
          new Date().toISOString()

      }

    };

  }

  finally {

    clearTimeout(timeout);

  }

}


/* =========================================================
   25. NORMALIZAR RESPOSTA DINÂMICA
   ========================================================= */

function normalizeDynamicResponse(
  data,
  lesson
) {

  if (!data) {

    return null;

  }

  if (
    data.content
  ) {

    return {

      content:
        normalizeLessonContent(
          data.content,
          lesson
        ),

      source:
        data.source || {

          provider:
            "English Family API",

          retrievedAt:
            new Date().toISOString()

        }

    };

  }

  return null;

}


/* =========================================================
   26. GERAR CONTEÚDO ORIGINAL A PARTIR
       DE CONTEXTO EXTERNO
   ========================================================= */

function buildDynamicContentFromExternalContext(
  lesson,
  external
) {

  const metadata =
    lesson.dynamicContent ||
    {};

  const level =
    lesson.level ||
    APP_STATE.user.level;

  const topic =
    metadata.topic ||
    metadata.searchTopics?.[0] ||
    lesson.title;

  const context =
    external.context ||
    "";

  /*
   * Conteúdo curto e original.
   * O contexto externo NÃO é simplesmente
   * reproduzido como aula.
   */

  const originalText =
    createOriginalReading(
      level,
      topic,
      context
    );

  const vocabulary =
    buildDynamicVocabulary(
      metadata,
      level
    );

  const grammar =
    buildDynamicGrammar(
      metadata,
      level
    );

  const comprehension =
    buildGenericComprehension(
      originalText,
      level
    );

  return {

    level,

    sourceType:
      "dynamic",

    source:
      external.title || topic,

    title:
      lesson.title,

    objectives:
      metadata.objectives ||
      [
        `Understand a short text about ${topic}.`,
        "Learn useful vocabulary in context.",
        "Practice the target grammar.",
        "Recall information without translating every sentence."
      ],

    introduction: {

      title:
        lesson.title,

      text:
        `Today you will study ${topic} through reading, vocabulary, grammar and active recall.`

    },

    vocabulary,

    grammar,

    reading: {

      title:
        `Reading: ${topic}`,

      text:
        originalText,

      translation:
        "Try to understand the text first. Use translation only after completing your first reading."

    },

    comprehension,

    translation:
      buildTranslationExercises(
        originalText
      ),

    grammarExercises:
      buildGrammarExercises(
        grammar
      ),

    activeRecall:
      buildActiveRecall(
        originalText
      )

  };

}


/* =========================================================
   27. CONTEÚDO ORIGINAL
   ========================================================= */

function createOriginalReading(
  level,
  topic,
  context
) {

  const safeTopic =
    topic || "everyday life";

  const sentences = {

    A1: [
      `People can learn many things from everyday life.`,
      `A simple routine can help people organize their day.`,
      `They can work, study, eat, rest, and spend time with other people.`,
      `Small habits can make daily activities easier.`,
      `Learning useful English words helps people talk about these experiences.`
    ],

    A2: [
      `Everyday life is full of situations that can teach us something new.`,
      `People usually have routines, but their plans can change when something unexpected happens.`,
      `A person may need to organize work, study, family activities, and free time.`,
      `Good habits can make these responsibilities easier to manage.`,
      `Learning English through familiar situations helps students understand new words in context.`
    ],

    B1: [
      `Everyday situations often provide useful opportunities for learning.`,
      `People develop routines because routines help them organize responsibilities and make decisions.`,
      `However, unexpected events can force them to change their plans.`,
      `When this happens, they need to communicate clearly and find practical solutions.`,
      `Understanding English through real situations can make learning more meaningful.`
    ],

    B2: [
      `Daily life involves a constant balance between responsibilities, personal goals, and unexpected events.`,
      `Although routines can make life more predictable, people still need to adapt when circumstances change.`,
      `Effective communication becomes especially important when plans are interrupted or priorities shift.`,
      `These ordinary situations can provide valuable opportunities to develop language skills.`,
      `Learning vocabulary in context also makes it easier to recognize how expressions are used naturally.`
    ],

    C1: [
      `Ordinary experiences frequently reveal how people organize their priorities and respond to change.`,
      `Although routines provide structure, unexpected circumstances often require individuals to reconsider their plans.`,
      `The ability to communicate precisely becomes particularly valuable when expectations are disrupted.`,
      `Such situations offer meaningful opportunities to develop linguistic awareness through authentic contexts.`,
      `Rather than memorizing isolated expressions, learners can develop stronger comprehension by observing how language functions within real situations.`
    ]

  };

  const selected =
    sentences[level] ||
    sentences.A2;

  /*
   * O contexto externo serve como sinal
   * temático, não como texto copiado.
   */

  return selected.join(" ");

}


/* =========================================================
   28. VOCABULÁRIO DINÂMICO
   ========================================================= */

function buildDynamicVocabulary(
  metadata,
  level
) {

  const words =
    metadata.targetVocabulary ||
    [];

  const fallback = {

    A1: [
      ["routine","rotina"],
      ["day","dia"],
      ["work","trabalho"],
      ["study","estudar"],
      ["home","casa"]
    ],

    A2: [
      ["routine","rotina"],
      ["schedule","agenda"],
      ["habit","hábito"],
      ["usually","geralmente"],
      ["busy","ocupado"]
    ],

    B1: [
      ["responsibility","responsabilidade"],
      ["unexpected","inesperado"],
      ["decision","decisão"],
      ["solution","solução"],
      ["communicate","comunicar"]
    ],

    B2: [
      ["circumstance","circunstância"],
      ["priority","prioridade"],
      ["interrupt","interromper"],
      ["adapt","adaptar"],
      ["meaningful","significativo"]
    ],

    C1: [
      ["awareness","consciência"],
      ["precisely","precisamente"],
      ["disrupted","interrompido"],
      ["circumstance","circunstância"],
      ["comprehension","compreensão"]
    ]

  };

  const selected =
    words.length
      ? words.map(word => [word, ""])
      : (
        fallback[level] ||
        fallback.A2
      );

  return selected.map(
    item => {

      const word =
        Array.isArray(item)
          ? item[0]
          : item;

      const translation =
        Array.isArray(item)
          ? item[1]
          : "";

      return {

        word,

        translation,

        category:
          "dynamic",

        example:
          `This word is useful when talking about ${metadata.topic || "everyday situations"}.`

      };

    }
  );

}


/* =========================================================
   29. GRAMÁTICA DINÂMICA
   ========================================================= */

function buildDynamicGrammar(
  metadata,
  level
) {

  const grammar =
    metadata.targetGrammar ||
    [];

  const topic =
    grammar[0] ||
    getDefaultGrammar(level);

  const explanations = {

    "present simple":
      "Use the present simple to talk about routines, habits, facts and regular situations.",

    "past simple":
      "Use the past simple to talk about completed actions in the past.",

    "future forms":
      "Future forms help us talk about plans, predictions and future events.",

    "present perfect":
      "The present perfect connects past experiences or actions with the present.",

    "conditionals":
      "Conditionals are used to describe possible, imaginary or conditional situations."

  };

  return {

    title:
      topic,

    explanation:
      explanations[topic.toLowerCase()] ||
      `This lesson focuses on the use of ${topic} in meaningful communication.`,

    rule:
      `Practice ${topic} in complete sentences and pay attention to the context.`,

    examples: [

      `I use ${topic} in context.`,

      `She practices ${topic} every day.`,

      `They are learning how ${topic} works.`

    ]

  };

}


function getDefaultGrammar(level) {

  const defaults = {

    A1:
      "verb to be",

    A2:
      "present simple",

    B1:
      "past simple",

    B2:
      "present perfect",

    C1:
      "conditionals"

  };

  return defaults[level] ||
    defaults.A2;

}


/* =========================================================
   30. COMPREENSÃO
   ========================================================= */

function buildGenericComprehension(
  text,
  level
) {

  const firstSentence =
    text.split(".")[0] ||
    text;

  return [

    {

      id:
        "dynamic-comp-1",

      question:
        "What is the main idea of the text?",

      options: [

        "It describes a situation related to everyday life and learning.",

        "It explains how to repair a machine.",

        "It describes a historical war.",

        "It gives instructions for cooking."

      ],

      answer:
        0,

      explanation:
        `The text begins with the idea that ${firstSentence.toLowerCase()}.`

    },

    {

      id:
        "dynamic-comp-2",

      question:
        "Which skill is the lesson encouraging?",

      options: [

        "Understanding language in context.",

        "Memorizing isolated numbers.",

        "Avoiding English completely.",

        "Translating every word immediately."

      ],

      answer:
        0,

      explanation:
        "The lesson is based on understanding English through context."

    }

  ];

}


/* =========================================================
   31. TRADUÇÃO
   ========================================================= */

function buildTranslationExercises(
  text
) {

  const first =
    text.split(".")[0]?.trim();

  return [

    {

      id:
        "dynamic-trans-1",

      question:
        `Translate this idea into Portuguese: "${first}."`,

      answer:
        "",

      alternatives: []

    }

  ];

}


/* =========================================================
   32. GRAMMAR EXERCISES
   ========================================================= */

function buildGrammarExercises(
  grammar
) {

  return [

    {

      id:
        "dynamic-grammar-1",

      question:
        `Which option is the best example of ${grammar.title}?`,

      options: [

        "I use the target structure in context.",

        "Yesterday tomorrow blue.",

        "Because table quickly.",

        "House computer seven."

      ],

      answer:
        0,

      explanation:
        "The first option is a complete meaningful sentence."

    }

  ];

}


/* =========================================================
   33. ACTIVE RECALL
   ========================================================= */

function buildActiveRecall(
  text
) {

  return [

    {

      id:
        "dynamic-recall-1",

      question:
        "Without looking back, write one idea you remember from the reading.",

      answer:
        "",

      alternatives: []

    }

  ];

}


/* =========================================================
   34. FALLBACK INTERNO
   ========================================================= */

function buildFallbackLessonContent(
  lesson
) {

  const metadata =
    lesson.dynamicContent ||
    {};

  const level =
    lesson.level ||
    APP_STATE.user.level;

  const topic =
    metadata.topic ||
    metadata.searchTopics?.[0] ||
    lesson.title;

  const text =
    createOriginalReading(
      level,
      topic,
      ""
    );

  const grammar =
    buildDynamicGrammar(
      metadata,
      level
    );

  return {

    level,

    sourceType:
      "internal_fallback",

    title:
      lesson.title,

    objectives:
      metadata.objectives ||
      [
        `Understand ${topic} in context.`,
        "Learn useful vocabulary.",
        "Practice grammar.",
        "Strengthen active recall."
      ],

    introduction: {

      title:
        lesson.title,

      text:
        `This lesson uses ${topic} to develop your English step by step.`

    },

    vocabulary:
      buildDynamicVocabulary(
        metadata,
        level
      ),

    grammar,

    reading: {

      title:
        lesson.title,

      text,

      translation:
        "Read the English text first. Try to understand it before checking support."

    },

    comprehension:
      buildGenericComprehension(
        text,
        level
      ),

    translation:
      [],

    grammarExercises:
      buildGrammarExercises(
        grammar
      ),

    activeRecall:
      buildActiveRecall(
        text
      )

  };

}


/* =========================================================
   35. NORMALIZAR CONTEÚDO
   ========================================================= */

function normalizeLessonContent(
  content,
  lesson
) {

  if (!content) {

    return null;

  }

  const normalized =
    cloneObject(content);

  normalized.level =
    normalized.level ||
    lesson.level ||
    APP_STATE.user.level;

  normalized.title =
    normalized.title ||
    lesson.title;

  normalized.objectives =
    Array.isArray(
      normalized.objectives
    )
      ? normalized.objectives
      : [];

  normalized.vocabulary =
    Array.isArray(
      normalized.vocabulary
    )
      ? normalized.vocabulary
      : [];

  normalized.comprehension =
    Array.isArray(
      normalized.comprehension
    )
      ? normalized.comprehension
      : [];

  normalized.translation =
    Array.isArray(
      normalized.translation
    )
      ? normalized.translation
      : [];

  normalized.grammarExercises =
    Array.isArray(
      normalized.grammarExercises
    )
      ? normalized.grammarExercises
      : [];

  normalized.activeRecall =
    Array.isArray(
      normalized.activeRecall
    )
      ? normalized.activeRecall
      : [];

  normalized.listening =
    Array.isArray(
      normalized.listening
    )
      ? normalized.listening
      : [];

  normalized.speaking =
    Array.isArray(
      normalized.speaking
    )
      ? normalized.speaking
      : [];

  normalized.writing =
    Array.isArray(
      normalized.writing
    )
      ? normalized.writing
      : [];

  return normalized;

}


/* =========================================================
   36. SNAPSHOT
   ========================================================= */

function saveLessonSnapshot(
  lesson,
  dynamicData
) {

  if (!lesson || !dynamicData) {

    return;

  }

  if (
    !APP_STATE.user.lessonSnapshots
  ) {

    APP_STATE.user.lessonSnapshots =
      {};

  }

  APP_STATE.user.lessonSnapshots[
    lesson.id
  ] = {

    content:
      cloneObject(
        dynamicData.content
      ),

    source:
      dynamicData.source ||
      null,

    createdAt:
      new Date().toISOString()

  };

  saveUserData();

}


/* =========================================================
   37. MOTOR DE AULAS
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
    "lesson-overlay active";

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

  showLessonStep(0);

}


/* =========================================================
   38. HTML DO MOTOR
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

    <div class="lesson-header">

      <button
        type="button"
        class="lesson-close-button"
        id="lessonCloseButton"
        aria-label="Fechar aula"
      >
        ×
      </button>

      <div class="lesson-header-center">

        <div class="lesson-header-title">
          ${escapeHTML(content.title)}
        </div>

        <div class="lesson-progress-track">

          <div
            id="lessonEngineProgress"
            class="lesson-progress-fill"
            style="width:0%"
          ></div>

        </div>

      </div>

      <div class="lesson-xp">
        +${APP_CONFIG.xpPerLesson} XP
      </div>

    </div>

    <main
      id="lessonEngineContent"
      class="lesson-body"
    ></main>

    <footer class="lesson-footer">

      <button
        type="button"
        id="lessonBackButton"
        class="secondary-button"
      >
        Voltar
      </button>

      <div class="lesson-step-indicator">

        <span id="lessonStepCurrent">
          1
        </span>

        /

        <span id="lessonStepTotal">
          ${totalSteps}
        </span>

      </div>

      <button
        type="button"
        id="lessonNextButton"
        class="primary-button"
      >
        Continuar
      </button>

    </footer>

  `;

}


/* =========================================================
   39. ETAPAS
   ========================================================= */

function calculateLessonSteps(
  content
) {

  return buildLessonSteps(
    content
  ).length;

}



function buildLessonSteps(content) {

  const steps = [];

  if (!content) {
    return steps;
  }

  if (content.introduction) {
    steps.push({
      type: "introduction",
      data: content.introduction
    });
  }

  if (Array.isArray(content.vocabulary) && content.vocabulary.length) {
    steps.push({
      type: "vocabulary",
      data: content.vocabulary
    });
  }

  if (content.grammar) {
    steps.push({
      type: "grammar",
      data: content.grammar
    });
  }

  if (content.reading) {
    steps.push({
      type: "reading",
      data: content.reading
    });
  }

  // Aceita um único objeto ou uma lista de atividades.
  const listeningItems = Array.isArray(content.listening)
    ? content.listening
    : content.listening
      ? [content.listening]
      : [];

  listeningItems.forEach(item => {
    steps.push({
      type: "listening",
      data: item
    });
  });

  if (Array.isArray(content.comprehension)) {
    content.comprehension.forEach(item => {
      steps.push({
        type: "comprehension",
        data: item
      });
    });
  }

  if (Array.isArray(content.translation)) {
    content.translation.forEach(item => {
      steps.push({
        type: "translation",
        data: item
      });
    });
  }

  if (Array.isArray(content.grammarExercises)) {
    content.grammarExercises.forEach(item => {
      steps.push({
        type: "grammarExercise",
        data: item
      });
    });
  }

  const speakingItems = Array.isArray(content.speaking)
    ? content.speaking
    : content.speaking
      ? [content.speaking]
      : [];

  speakingItems.forEach(item => {
    steps.push({
      type: "speaking",
      data: item
    });
  });

  const writingItems = Array.isArray(content.writing)
    ? content.writing
    : content.writing
      ? [content.writing]
      : [];

  writingItems.forEach(item => {
    steps.push({
      type: "writing",
      data: item
    });
  });

  if (Array.isArray(content.activeRecall)) {
    content.activeRecall.forEach(item => {
      steps.push({
        type: "activeRecall",
        data: item
      });
    });
  }

  steps.push({
    type: "completion",
    data: null
  });

  return steps;
}



function getLessonSteps() {

  const lesson =
    APP_STATE.currentLesson;

  if (!lesson?.content) {

    return [];

  }

  return buildLessonSteps(
    lesson.content
  );

}


/* =========================================================
   40. MOSTRAR ETAPA
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

  APP_STATE.currentSession.feedbackShown =
    false;

  const step =
    steps[safeIndex];

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
   41. RENDERIZAÇÃO
   ========================================================= */

function renderLessonStep(
  step
) {

  switch (step.type) {

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

    case "listening":

      return renderListening(
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

    case "speaking":

      return renderSpeaking(
        step.data
      );

    case "writing":

      return renderWriting(
        step.data
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

        <section class="lesson-card">

          <h2>Atividade</h2>

          <p>
            Conteúdo da atividade.
          </p>

        </section>

      `;

  }

}


/* =========================================================
   42. INTRODUÇÃO
   ========================================================= */

function renderIntroduction(
  data
) {

  const objectives =
    APP_STATE.currentLesson
      ?.content
      ?.objectives ||
      [];

  return `

    <div class="lesson-content">

      <span class="lesson-kicker">
        LET'S START
      </span>

      <h1 class="lesson-title">
        ${escapeHTML(data.title)}
      </h1>

      <p class="lesson-description">
        ${escapeHTML(data.text)}
      </p>

      ${
        objectives.length
          ? `

            <div class="lesson-card">

              <h3 class="lesson-card-title">
                🎯 O que você vai aprender
              </h3>

              <ul>

                ${objectives
                  .map(
                    item =>
                      `<li>${escapeHTML(item)}</li>`
                  )
                  .join("")}

              </ul>

            </div>

          `
          : ""
      }

    </div>

  `;

}


/* =========================================================
   43. VOCABULÁRIO
   ========================================================= */

function renderVocabulary(
  words
) {

  return `

    <div class="lesson-content">

      <span class="lesson-kicker">
        VOCABULARY
      </span>

      <h1 class="lesson-title">
        Palavras importantes
      </h1>

      <p class="lesson-description">
        Leia as palavras, observe os exemplos
        e tente criar suas próprias frases.
      </p>

      <div class="lesson-card">

        ${words
          .map(
            item => `

              <div class="lesson-example">

                <strong>
                  ${escapeHTML(item.word)}
                </strong>

                <span>
                  ${escapeHTML(item.translation)}
                </span>

                <small>
                  ${escapeHTML(item.example)}
                </small>

              </div>

            `
          )
          .join("")}

      </div>

    </div>

  `;

}


/* =========================================================
   44. GRAMÁTICA
   ========================================================= */

function renderGrammar(
  data
) {

  return `

    <div class="lesson-content">

      <span class="lesson-kicker">
        GRAMMAR
      </span>

      <h1 class="lesson-title">
        ${escapeHTML(data.title)}
      </h1>

      <div class="lesson-card">

        <h3 class="lesson-card-title">
          Explicação
        </h3>

        <p class="lesson-card-text">
          ${escapeHTML(data.explanation)}
        </p>

      </div>

      <div class="lesson-card">

        <h3 class="lesson-card-title">
          Regra principal
        </h3>

        <p class="lesson-card-text">
          ${escapeHTML(data.rule)}
        </p>

      </div>

      <div class="lesson-card">

        <h3 class="lesson-card-title">
          Exemplos
        </h3>

        <div class="lesson-example-list">

          ${(data.examples || [])
            .map(
              example =>
                `<div class="lesson-example">
                  ${escapeHTML(example)}
                </div>`
            )
            .join("")}

        </div>

      </div>

    </div>

  `;

}


/* =========================================================
   45. READING
   ========================================================= */

function renderReading(
  data
) {

  return `

    <div class="lesson-content">

      <span class="lesson-kicker">
        READING
      </span>

      <h1 class="lesson-title">
        ${escapeHTML(data.title)}
      </h1>

      <div class="lesson-card">

        <div class="lesson-english-text">
          ${escapeHTML(data.text)}
        </div>

      </div>

      <div class="lesson-card">

        <details>

          <summary>
            🇧🇷 Ver tradução
          </summary>

          <div class="lesson-translation">

            ${escapeHTML(
              data.translation || ""
            )}

          </div>

        </details>

      </div>

    </div>

  `;

}


/* =========================================================
   46. LISTENING
   ========================================================= */

function renderListening(
  data
) {

  return `

    <div class="lesson-content">

      <span class="lesson-kicker">
        LISTENING
      </span>

      <h1 class="lesson-title">
        ${escapeHTML(
          data.title ||
          "Listen"
        )}
      </h1>

      <div class="lesson-card">

        <p class="lesson-card-text">
          ${escapeHTML(
            data.instruction ||
            "Listen carefully and identify the main idea."
          )}
        </p>

        ${
          data.audioUrl
            ? `

              <audio
                controls
                preload="metadata"
                style="width:100%;"
              >

                <source
                  src="${escapeHTML(data.audioUrl)}"
                >

              </audio>

            `
            : `

              <div class="lesson-example">

                <strong>
                  Audio preparado para esta atividade.
                </strong>

                <small>
                  A versão com áudio será utilizada
                  quando uma fonte de áudio estiver disponível.
                </small>

              </div>

            `
        }

      </div>

    </div>

  `;

}


/* =========================================================
   47. SPEAKING
   ========================================================= */

function renderSpeaking(
  data
) {

  return `

    <div class="lesson-content">

      <span class="lesson-kicker">
        SPEAKING
      </span>

      <h1 class="lesson-title">
        ${escapeHTML(
          data.title ||
          "Speaking practice"
        )}
      </h1>

      <div class="lesson-card">

        <h3 class="lesson-card-title">
          Desafio
        </h3>

        <p class="lesson-card-text">
          ${escapeHTML(
            data.prompt ||
            "Speak for one minute about the topic."
          )}
        </p>

        ${
          data.model
            ? `

              <details>

                <summary>
                  Ver exemplo
                </summary>

                <div class="lesson-translation">
                  ${escapeHTML(data.model)}
                </div>

              </details>

            `
            : ""
        }

      </div>

    </div>

  `;

}


/* =========================================================
   48. WRITING
   ========================================================= */

function renderWriting(
  data
) {

  return `

    <div class="lesson-content">

      <span class="lesson-kicker">
        WRITING
      </span>

      <h1 class="lesson-title">
        ${escapeHTML(
          data.title ||
          "Writing practice"
        )}
      </h1>

      <div class="lesson-exercise">

        <div class="exercise-type">
          Writing
        </div>

        <p>
          ${escapeHTML(
            data.prompt ||
            "Write a short answer in English."
          )}
        </p>

        <div class="exercise-input">

          <textarea
            id="lessonWritingAnswer"
            rows="6"
            autocomplete="off"
            placeholder="Write your answer..."
            style="width:100%;resize:vertical;"
          ></textarea>

        </div>

        <div
          id="lessonAnswerFeedback"
          class="exercise-feedback"
        ></div>

      </div>

    </div>

  `;

}


/* =========================================================
   49. QUESTÕES
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

      <div class="lesson-content">

        <span class="lesson-kicker">

          ${
            type === "translation"
              ? "TRANSLATION"
              : "ACTIVE RECALL"
          }

        </span>

        <h1 class="lesson-title">
          ${escapeHTML(data.question)}
        </h1>

        <div class="lesson-exercise">

          <div class="exercise-type">

            ${
              type === "translation"
                ? "Tradução"
                : "Recuperação ativa"
            }

          </div>

          <div class="exercise-input">

            <input
              id="lessonTextAnswer"
              type="text"
              autocomplete="off"
              placeholder="Digite sua resposta..."
            >

          </div>

          <div
            id="lessonAnswerFeedback"
            class="exercise-feedback"
          ></div>

        </div>

      </div>

    `;

  }

  return `

    <div class="lesson-content">

      <span class="lesson-kicker">

        ${
          type === "grammarExercise"
            ? "GRAMMAR"
            : "COMPREHENSION"
        }

      </span>

      <h1 class="lesson-title">
        ${escapeHTML(data.question)}
      </h1>

      <div class="lesson-exercise">

        <div class="exercise-type">

          ${
            type === "grammarExercise"
              ? "Grammar"
              : "Comprehension"
          }

        </div>

        <div class="exercise-options">

          ${(data.options || [])
            .map(
              (option, index) => `

                <button
                  type="button"
                  class="exercise-option"
                  data-answer-index="${index}"
                >

                  <span>
                    ${String.fromCharCode(
                      65 + index
                    )}
                  </span>

                  ${escapeHTML(option)}

                </button>

              `
            )
            .join("")}

        </div>

        <div
          id="lessonAnswerFeedback"
          class="exercise-feedback"
        ></div>

      </div>

    </div>

  `;

}


/* =========================================================
   50. CONCLUSÃO
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

    <div class="lesson-content">

      <div class="lesson-result">

        <div class="lesson-result-icon">
          🎉
        </div>

        <span class="lesson-kicker">
          LESSON COMPLETE
        </span>

        <h1 class="lesson-title">
          Muito bem!
        </h1>

        <p class="lesson-description">
          Você concluiu:
        </p>

        <h2>
          ${escapeHTML(
            lesson.title
          )}
        </h2>

        <div class="lesson-result-xp">
          +${APP_CONFIG.xpPerLesson} XP
        </div>

        <div class="lesson-card">

          <h3>
            Desempenho
          </h3>

          <strong>
            ${score}%
          </strong>

          <p>

            ${
              score >= 80

                ? "Excelente desempenho! Você está pronto para continuar."

                : score >= 60

                  ? "Bom trabalho! Continue praticando para fortalecer o conteúdo."

                  : "Você concluiu a aula. Os pontos de dificuldade serão reforçados nas próximas revisões."

            }

          </p>

        </div>

      </div>

    </div>

  `;

}


/* =========================================================
   51. CONTROLES
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
        ? "Concluir"
        : "Continuar";

  }

}


/* =========================================================
   52. BIND MOTOR
   ========================================================= */

function bindLessonEngine() {

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


/* =========================================================
   53. INTERAÇÕES
   ========================================================= */

function bindStepInteractions(
  step
) {

  if (
    step.type === "comprehension" ||
    step.type === "grammarExercise"
  ) {

    document
      .querySelectorAll(
        ".exercise-option"
      )
      .forEach(button => {

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

      });

  }

}


/* =========================================================
   54. PRÓXIMO PASSO
   ========================================================= */

function lessonNextStep() {

  const steps =
    getLessonSteps();

  if (!steps.length) {

    return;

  }

  const session =
    APP_STATE.currentSession;

  const index =
    session.step;

  const step =
    steps[index];

  if (!step) {

    return;

  }

  if (
    step.type === "comprehension" ||
    step.type === "grammarExercise"
  ) {

    if (
      !Object.prototype.hasOwnProperty.call(
        session.answers,
        index
      )
    ) {

      showTemporaryMessage(
        "Selecione uma resposta antes de continuar."
      );

      return;

    }

  }

  if (
    step.type === "translation" ||
    step.type === "activeRecall"
  ) {

    if (
      !Object.prototype.hasOwnProperty.call(
        session.answers,
        index
      )
    ) {

      const input =
        document.getElementById(
          "lessonTextAnswer"
        );

      if (!input) {

        return;

      }

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

      return;

    }

  }

  if (
    step.type === "writing"
  ) {

    if (
      !Object.prototype.hasOwnProperty.call(
        session.answers,
        index
      )
    ) {

      const input =
        document.getElementById(
          "lessonWritingAnswer"
        );

      const answer =
        input?.value.trim() || "";

      if (!answer) {

        showTemporaryMessage(
          "Escreva uma resposta antes de continuar."
        );

        input?.focus();

        return;

      }

      evaluateWritingAnswer(
        step.data,
        answer,
        index
      );

      return;

    }

  }

  if (
    step.type === "speaking"
  ) {

    if (
      !Object.prototype.hasOwnProperty.call(
        session.answers,
        index
      )
    ) {

      session.answers[index] = {

        correct:
          true,

        answer:
          "speaking-completed"

      };

      session.total++;

      session.score++;

      updateSkillFromSpeaking();

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
   55. VOLTAR
   ========================================================= */

function lessonPreviousStep() {

  const session =
    APP_STATE.currentSession;

  if (!session) {

    return;

  }

  const index =
    session.step;

  if (index <= 0) {

    return;

  }

  showLessonStep(
    index - 1
  );

}


/* =========================================================
   56. MÚLTIPLA ESCOLHA
   ========================================================= */

function handleMultipleChoice(
  data,
  selected,
  button
) {

  const session =
    APP_STATE.currentSession;

  const index =
    session.step;

  if (
    Object.prototype.hasOwnProperty.call(
      session.answers,
      index
    )
  ) {

    return;

  }

  const correct =
    selected ===
    data.answer;

  session.answers[index] = {

    correct,

    answer:
      selected

  };

  session.total++;

  if (correct) {

    session.score++;

  }

  document
    .querySelectorAll(
      ".exercise-option"
    )
    .forEach(
      option =>
        option.disabled = true
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

  updateVocabularyAndGrammarFromQuestion(
    data,
    correct
  );

  const feedback =
    document.getElementById(
      "lessonAnswerFeedback"
    );

  if (feedback) {

    feedback.className =
      `exercise-feedback visible ${
        correct
          ? "correct"
          : "incorrect"
      }`;

    feedback.innerHTML =
      correct

        ? `<strong>✓ Correct!</strong>
           <p>${escapeHTML(
             data.explanation ||
             "Muito bem!"
           )}</p>`

        : `<strong>✗ Not quite.</strong>
           <p>${escapeHTML(
             data.explanation ||
             "Observe a resposta correta e continue."
           )}</p>`;

  }

  session.feedbackShown =
    true;

}


/* =========================================================
   57. RESPOSTA TEXTUAL
   ========================================================= */

function evaluateTextAnswer(
  data,
  answer,
  index
) {

  const session =
    APP_STATE.currentSession;

  if (
    Object.prototype.hasOwnProperty.call(
      session.answers,
      index
    )
  ) {

    return;

  }

  const normalized =
    normalizeAnswer(
      answer
    );

  const accepted =
    [
      data.answer,
      ...(data.alternatives || [])
    ]
      .filter(Boolean)
      .map(
        normalizeAnswer
      );

  /*
   * Algumas atividades, como active recall
   * e tradução dinâmica, não possuem uma
   * única resposta rígida.
   */

  const flexible =
    !accepted.length;

  const correct =
    flexible
      ? answer.length >= 3
      : accepted.includes(
          normalized
        );

  session.answers[index] = {

    correct,

    answer

  };

  session.total++;

  if (correct) {

    session.score++;

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

  const input =
    document.getElementById(
      "lessonTextAnswer"
    );

  if (input) {

    input.disabled =
      true;

  }

  if (feedback) {

    feedback.className =
      `exercise-feedback visible ${
        correct
          ? "correct"
          : "incorrect"
      }`;

    feedback.innerHTML =

      correct

        ? `<strong>✓ Excellent!</strong>
           <p>Resposta registrada. Muito bem!</p>`

        : `<strong>✗ Vamos reforçar.</strong>
           ${
             data.answer
               ? `<p>Resposta esperada:
                    <strong>${escapeHTML(
                      data.answer
                    )}</strong>
                  </p>`
               : `<p>Vamos reforçar esse conteúdo nas próximas atividades.</p>`
           }`;

  }

  updateVocabularyAndGrammarFromQuestion(
    data,
    correct
  );

  session.feedbackShown =
    true;

}


/* =========================================================
   58. WRITING
   ========================================================= */

function evaluateWritingAnswer(
  data,
  answer,
  index
) {

  const session =
    APP_STATE.currentSession;

  if (
    Object.prototype.hasOwnProperty.call(
      session.answers,
      index
    )
  ) {

    return;

  }

  const valid =
    answer.length >= 5;

  session.answers[index] = {

    correct:
      valid,

    answer

  };

  session.total++;

  if (valid) {

    session.score++;

  }

  else {

    registerLessonError(
      data,
      answer
    );

  }

  const input =
    document.getElementById(
      "lessonWritingAnswer"
    );

  if (input) {

    input.disabled =
      true;

  }

  const feedback =
    document.getElementById(
      "lessonAnswerFeedback"
    );

  if (feedback) {

    feedback.className =
      "exercise-feedback visible " +
      (
        valid
          ? "correct"
          : "incorrect"
      );

    feedback.innerHTML =
      valid

        ? `<strong>✓ Good job!</strong>
           <p>Your answer has been recorded.</p>`

        : `<strong>✗ Keep practicing.</strong>
           <p>Write a little more so we can reinforce the skill.</p>`;

  }

  APP_STATE.user.progress.writing =
    Math.min(
      100,
      APP_STATE.user.progress.writing +
      (valid ? 2 : 1)
    );

  saveUserData();

}


/* =========================================================
   59. SPEAKING
   ========================================================= */

function updateSkillFromSpeaking() {

  APP_STATE.user.progress.speaking =
    Math.min(
      100,
      APP_STATE.user.progress.speaking +
      2
    );

  saveUserData();

}


/* =========================================================
   60. VOCABULÁRIO + GRAMÁTICA
   ========================================================= */

function updateVocabularyAndGrammarFromQuestion(
  data,
  correct
) {

  const lesson =
    APP_STATE.currentLesson;

  const content =
    lesson?.content;

  if (!content) {

    return;

  }

  if (
    content.vocabulary?.length
  ) {

    content.vocabulary.forEach(
      item => {

        registerVocabulary(
          item.word,
          {

            word:
              item.word,

            translation:
              item.translation,

            level:
              content.level,

            category:
              item.category,

            examples:
              item.example
                ? [item.example]
                : [],

            correct:
              correct,

            incorrect:
              !correct

          }
        );

      }
    );

  }

  if (
    content.grammar?.title
  ) {

    registerGrammar(
      content.grammar.title,
      {

        level:
          content.level,

        correct:
          correct,

        incorrect:
          !correct,

        mastery:
          correct
            ? 5
            : 0

      }
    );

  }

}


/* =========================================================
   61. ERRO DA AULA
   ========================================================= */

function registerLessonError(
  data,
  answer
) {

  const type =
    data.options
      ? "multiple-choice"
      : "text";

  const error =
    registerError({

      id:
        `${APP_STATE.currentLesson.id}-${data.id || Date.now()}`,

      type,

      question:
        data.question,

      expected:
        data.options
          ? data.options[data.answer]
          : data.answer,

      answer:
        typeof answer === "number"
          ? data.options?.[answer] ||
            String(answer)
          : answer

    });

  if (
    APP_STATE.currentSession
  ) {

    APP_STATE.currentSession.errors
      .push(error);

  }

}


/* =========================================================
   62. FINALIZAR AULA
   ========================================================= */

function finishLessonEngine() {

  const lesson =
    APP_STATE.currentLesson;

  if (!lesson) {

    return;

  }

  const session =
    APP_STATE.currentSession;

  if (!session) {

    return;

  }

  if (session.completed) {

    showLessonStep(
      getLessonSteps().length - 1
    );

    return;

  }

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

  const completed =
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

  if (!completed) {

    console.log(
      "Aula já havia sido concluída anteriormente."
    );

  }

}


/* =========================================================
   63. FECHAR MOTOR
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
   64. AULA INDISPONÍVEL
   ========================================================= */

function openUnavailableLesson(
  lesson
) {

  alert(

    `${lesson.title}\n\n` +

    "Não foi possível carregar o conteúdo " +

    "dinâmico e não existe um conteúdo interno " +

    "disponível para esta aula."

  );

}


/* =========================================================
   65. TEMPO
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
        now - start
      ) / 60000
    );

  return Math.max(
    1,
    minutes
  );

}


/* =========================================================
   66. NORMALIZAÇÃO DE RESPOSTA
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
   67. MENSAGEM TEMPORÁRIA
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
      "lesson-status-message";

    document.body.appendChild(
      element
    );

  }

  element.textContent =
    message;

  element.classList.add(
    "visible",
    "warning"
  );

  setTimeout(
    () =>
      element.classList.remove(
        "visible",
        "warning"
      ),
    2500
  );

}


/* =========================================================
   68. REVISÃO
   ========================================================= */

function startReview() {

  const user =
    APP_STATE.user;

  updateReviewCounters();

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
    `Você possui ${due} item(ns) para revisão e ${weakPoints} ponto(s) de dificuldade.\n\n` +
    "O Motor de Revisão está preparado para receber o sistema adaptativo."
  );

}


/* =========================================================
   69. CONVERSAÇÃO
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

    "O Motor de Conversação está preparado " +

    "para receber as atividades de fala e interação."

  );

}


/* =========================================================
   70. PERFIL
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
   71. XP
   ========================================================= */

function addXP(
  amount,
  reason = "general"
) {

  const value =
    Number(amount);

  if (
    !Number.isFinite(value) ||
    value <= 0
  ) {

    return 0;

  }

  APP_STATE.user.xp +=
    Math.floor(value);

  saveUserData();

  updateXPDisplay();

  checkAchievements();

  console.log(
    `XP +${Math.floor(value)} (${reason})`
  );

  return Math.floor(value);

}


/* =========================================================
   72. NÍVEL XP
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
   73. STREAK
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

    if (difference === 1) {

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
   74. MINUTOS DE ESTUDO
   ========================================================= */

function addStudyMinutes(
  minutes
) {

  const value =
    Number(minutes);

  if (
    !Number.isFinite(value) ||
    value <= 0
  ) {

    return;

  }

  normalizeDailyData();

  const roundedMinutes =
    Math.max(
      1,
      Math.round(value)
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
      APP_STATE.user.studySessions
        .slice(-500);

  }

  updateStreak();

  saveUserData();

  updateDailyGoal();

}


/* =========================================================
   75. COMPLETAR AULA
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
    user.completedLessons
      .includes(lessonId)
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
   76. AVANÇAR
   ========================================================= */

function advanceLesson(
  completedLesson = null
) {

  const user =
    APP_STATE.user;

  const module =
    LESSON_CONTENT
      ?.[user.level]
      ?.[user.module];

  if (!module) {

    return;

  }

  const contentLessons =
    module.lessons.filter(
      lesson =>
        lesson.kind === "lesson" ||
        (
          lesson.type !== "review" &&
          lesson.type !== "test"
        )
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

  if (currentIndex < 0) {

    return;

  }

  if (
    currentIndex <
    contentLessons.length - 1
  ) {

    user.lesson =
      currentIndex + 2;

    unlockCurrentLesson();

    return;

  }

  const review =
    module.lessons.find(
      lesson =>
        lesson.type === "review"
    );

  const test =
    module.lessons.find(
      lesson =>
        lesson.type === "test"
    );

  if (review) {

    review.status =
      "current";

  }

  if (test) {

    test.status =
      "locked";

  }

  console.log(
    "Aulas do módulo concluídas. Revisão desbloqueada."
  );

}


/* =========================================================
   77. DESBLOQUEAR
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
   78. HABILIDADES
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

  const contentType =
    lesson.type;

  if (
    contentType === "reading"
  ) {

    skills.reading =
      Math.min(
        100,
        skills.reading + 5
      );

  }

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

    if (accuracy >= 0.8) {

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

    if (accuracy >= 0.9) {

      skills.vocabulary =
        Math.min(
          100,
          skills.vocabulary + 2
        );

    }

  }

  saveUserData();

}


/* =========================================================
   79. REVISÃO ESPAÇADA — BASE
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

  const existing =
    APP_STATE.user.review.items
      .find(
        item =>
          item.id === lesson.id
      );

  if (existing) {

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
      2.5,

    lastScore:
      null,

    status:
      "learning"

  });

  updateReviewCounters();

}


/* =========================================================
   80. CONTADORES
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
        item.nextReview <= today
    );

  APP_STATE.user.review.due =
    dueItems.length;

  APP_STATE.user.review.weakPoints =
    APP_STATE.user.errors
      .filter(
        error =>
          !error.resolved
      )
      .length;

  saveUserData();

}


/* =========================================================
   81. ACHIEVEMENTS
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

  if (user.streak >= 7) {

    unlockAchievement(
      "sevenDays"
    );

  }

  if (user.streak >= 30) {

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

  if (user.xp >= 1000) {

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
    !APP_STATE.user.achievements
      .includes(id)
  ) {

    APP_STATE.user.achievements
      .push(id);

    saveUserData();

    updateAchievements();

  }

}


/* =========================================================
   82. INTERFACE
   ========================================================= */

function efxOriginalUpdateInterface() {

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
   83. NOME
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
    `Olá, ${
      APP_STATE.user.name ||
      "Aluno"
    }! 👋`;

}


/* =========================================================
   84. NÍVEL
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
   85. PROGRESSO
   ========================================================= */

function calculateLevelProgress() {

  const user =
    APP_STATE.user;

  const course =
    COURSE[user.level];

  if (!course) {

    return 0;

  }

  const totalLessons =
    course.modules *
    course.lessonsPerModule;

  const completed =
    user.completedLessons
      .filter(
        id =>
          id.startsWith(
            user.level
          ) &&
          /-L\d+$/.test(id)
      )
      .length;

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
   86. XP DISPLAY
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
   87. STREAK DISPLAY
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
   88. META DIÁRIA
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
   89. SKILLS
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
   90. PONTO FRACO
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
    names[weakest[0]] ||
    weakest[0]
  );

  setText(
    "mainWeakPointDescription",
    `Seu desempenho atual está em ${weakest[1]}%. Vamos reforçar essa habilidade.`
  );

}


/* =========================================================
   91. REVISÃO UI
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
   92. CURSO
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

  Object.keys(COURSE)
    .forEach(
      level =>
        container.appendChild(
          createLevelElement(
            level
          )
        )
    );

}


/* =========================================================
   93. NÍVEL ELEMENT
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
          ${escapeHTML(
            course.title
          )}
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
   94. MÓDULO
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
    LESSON_CONTENT
      ?.[level]
      ?.[moduleNumber];

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
          .includes(lesson.id)
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
    lesson =>
      lessonList.appendChild(
        createLessonElement(
          lesson
        )
      )
  );

  return moduleCard;

}


/* =========================================================
   95. AULA ELEMENT
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
      lesson.status ===
        "current"
        ? "🧠"
        : "🔒";

  }

  else if (isTest) {

    icon =
      lesson.status ===
        "current"
        ? "📝"
        : "🔒";

  }

  element.innerHTML = `

    <span class="lesson-icon">
      ${icon}
    </span>

    <span class="lesson-info">

      <strong>
        ${escapeHTML(
          lesson.title
        )}
      </strong>

      <span>
        ${escapeHTML(
          lesson.description
        )}
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
   96. REVISÃO ESPECÍFICA
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
   97. TESTE
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

    `Avaliação selecionada:\n\n` +

    `${lesson.title}\n\n` +

    "O Motor de Testes está preparado " +

    "para receber as avaliações completas."

  );

}


/* =========================================================
   98. ACHIEVEMENTS UI
   ========================================================= */

function updateAchievements() {

  const achievements =
    APP_STATE.user.achievements;

  document
    .querySelectorAll(
      ".achievement-card"
    )
    .forEach(card => {

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

    });

}


/* =========================================================
   99. TEXTO
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
   100. DATAS
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
   101. ERROS
   ========================================================= */

function registerError(
  errorData
) {

  if (
    !errorData ||
    typeof errorData !==
      "object"
  ) {

    return null;

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

  /*
   * Evita acumular exatamente o mesmo erro
   * várias vezes na mesma sessão.
   */

  const duplicate =
    APP_STATE.user.errors
      .find(
        existing =>
          existing.id ===
          error.id
      );

  if (!duplicate) {

    APP_STATE.user.errors.push(
      error
    );

  }

  APP_STATE.user.review.weakPoints =
    APP_STATE.user.errors
      .filter(
        item =>
          !item.resolved
      )
      .length;

  saveUserData();

  updateReview();

  return error;

}


/* =========================================================
   102. VOCABULÁRIO
   ========================================================= */

function registerVocabulary(
  word,
  data = {}
) {

  if (!word) {

    return;

  }

  const key =
    String(word)
      .trim()
      .toLowerCase();

  if (!key) {

    return;

  }

  const existing =
    APP_STATE.user.vocabulary[key] ||
    {};

  APP_STATE.user.vocabulary[key] = {

    word:
      data.word ||
      existing.word ||
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
        existing.repetitions || 0
      ) + 1,

    correct:
      Number(
        existing.correct || 0
      ) +
      (
        data.correct
          ? 1
          : 0
      ),

    incorrect:
      Number(
        existing.incorrect || 0
      ) +
      (
        data.incorrect
          ? 1
          : 0
      ),

    lastSeen:
      getDateKey(
        new Date()
      )

  };

  saveUserData();

}


/* =========================================================
   103. GRAMÁTICA
   ========================================================= */

function registerGrammar(
  topic,
  data = {}
) {

  if (!topic) {

    return;

  }

  const key =
    String(topic)
      .trim();

  const existing =
    APP_STATE.user.grammar[key] ||
    {};

  const oldCorrect =
    Number(
      existing.correct || 0
    );

  const oldIncorrect =
    Number(
      existing.incorrect || 0
    );

  const newCorrect =
    oldCorrect +
    (
      data.correct
        ? 1
        : 0
    );

  const newIncorrect =
    oldIncorrect +
    (
      data.incorrect
        ? 1
        : 0
    );

  const calculatedMastery =
    calculateGrammarMastery(
      newCorrect,
      newIncorrect
    );

  APP_STATE.user.grammar[key] = {

    topic:
      key,

    level:
      data.level ||
      existing.level ||
      APP_STATE.user.level,

    correct:
      newCorrect,

    incorrect:
      newIncorrect,

    mastery:
      data.mastery ??
      calculatedMastery,

    lastPracticed:
      getDateKey(
        new Date()
      )

  };

  saveUserData();

}


function calculateGrammarMastery(
  correct,
  incorrect
) {

  const total =
    correct +
    incorrect;

  if (!total) {

    return 0;

  }

  return Math.round(
    (
      correct /
      total
    ) * 100
  );

}


/* =========================================================
   104. CONVERSAÇÃO COMPLETA
   ========================================================= */

function completeConversation(
  mode = "guided",
  minutes = 0
) {

  const record = {

    id:
      `conversation-${Date.now()}`,

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

  APP_STATE.user.conversations
    .push(record);

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
   105. REVISÃO COMPLETA
   ========================================================= */

function completeReview(
  reviewId
) {

  if (!reviewId) {

    return;

  }

  if (
    !APP_STATE.user.completedReviews
      .includes(reviewId)
  ) {

    APP_STATE.user.completedReviews
      .push(reviewId);

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
   106. TESTE COMPLETO
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

  if (!alreadyCompleted) {

    APP_STATE.user.completedTests
      .push({

        id:
          testId,

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
   107. DADOS DO ALUNO
   ========================================================= */

function getUserWeaknesses() {

  const progress =
    APP_STATE.user.progress;

  return Object.entries(
    progress
  )
    .sort(
      (a, b) =>
        Number(a[1]) -
        Number(b[1])
    )
    .slice(
      0,
      3
    )
    .map(
      item =>
        item[0]
    );

}


function getRecentVocabulary() {

  return Object.values(
    APP_STATE.user.vocabulary
  )
    .slice(-20);

}


function getRecentGrammar() {

  return Object.values(
    APP_STATE.user.grammar
  )
    .slice(-20);

}


/* =========================================================
   108. RESET
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
   109. EXPORTAR
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
   110. IMPORTAR
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
   111. HTML ESCAPE
   ========================================================= */

function escapeHTML(
  value
) {

  return String(
    value ?? ""
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
   112. LIMPAR HTML EXTERNO
   ========================================================= */

function stripHTML(
  value
) {

  const temporary =
    document.createElement(
      "div"
    );

  temporary.innerHTML =
    String(value || "");

  return temporary.textContent ||
    temporary.innerText ||
    "";

}


/* =========================================================
   113. API PÚBLICA
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

    return startLesson(
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

  resolveLessonContent(
    lesson
  ) {

    return resolveLessonContent(
      lesson
    );

  },

  getWeaknesses() {

    return getUserWeaknesses();

  },

  refresh() {

    updateInterface();

  }

};


/* =========================================================
   END APP.JS v1.5.1
   ========================================================= */

/* =========================================================
   ENGLISH FAMILY v1.5.1 — PERFIS FAMILIARES E ATIVIDADES
   Perfis locais neste navegador; não é autenticação de servidor.
   ========================================================= */

const EF_ACCOUNTS_KEY = "englishFamilyAccounts_v1";
const EF_ACTIVE_KEY = "englishFamilyActiveAccount_v1";
const EF_PENDING_PROFILE_KEY = "englishFamilyPendingProfile_v1";
let EF_ACTIVE_ACCOUNT = null;
let EF_AUTH_BOUND = false;

function efReadAccounts() {
  try { return JSON.parse(localStorage.getItem(EF_ACCOUNTS_KEY) || "[]"); }
  catch (_) { return []; }
}
function efWriteAccounts(accounts) {
  localStorage.setItem(EF_ACCOUNTS_KEY, JSON.stringify(accounts));
}
function efSafeText(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;", "'":"&#39;"}[c]));
}
async function efHashPin(pin) {
  if (window.crypto && crypto.subtle && window.TextEncoder) {
    const bytes = new TextEncoder().encode(String(pin));
    const hash = await crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(hash)).map(x => x.toString(16).padStart(2,"0")).join("");
  }
  // Fallback apenas para compatibilidade local; não é criptografia forte.
  let h = 2166136261;
  for (const c of String(pin)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  return "local-" + (h >>> 0).toString(16);
}
function efAccountStorageKey(id) { return `englishFamilyData_profile_${id}`; }
function efRenderAuth(message = "") {
  let root = document.getElementById("efAuthRoot");
  if (!root) { root = document.createElement("div"); root.id = "efAuthRoot"; document.body.appendChild(root); }
  root.innerHTML = `
    <style>
      #efAuthRoot{position:fixed;inset:0;z-index:100000;background:linear-gradient(145deg,#eaf8ee,#f5fbf6 55%,#d9f1df);display:grid;place-items:center;padding:20px;overflow:auto;color:#163b2b;font-family:inherit}
      .ef-auth-card{width:min(100%,520px);background:#fff;border:1px solid #d9eadf;border-radius:24px;padding:clamp(22px,5vw,38px);box-shadow:0 24px 70px #1c56301c}
      .ef-auth-logo{font-size:13px;font-weight:800;letter-spacing:.12em;color:#16804a}.ef-auth-card h1{font-size:clamp(26px,5vw,34px);margin:10px 0 8px}.ef-auth-card p{line-height:1.55;color:#5c7466}.ef-auth-tabs{display:flex;gap:8px;margin:22px 0 18px}.ef-auth-tabs button,.ef-profile-switch{border:1px solid #cfe2d5;background:#f5faf6;border-radius:12px;padding:11px 14px;cursor:pointer;font-weight:700;color:#27563d}.ef-auth-tabs button.active{background:#177b46;color:#fff;border-color:#177b46}.ef-auth-field{display:grid;gap:6px;margin:13px 0}.ef-auth-field label{font-size:13px;font-weight:700}.ef-auth-field input,.ef-auth-field select{width:100%;box-sizing:border-box;border:1px solid #ccddd1;border-radius:12px;padding:13px;font:inherit;background:#fff;color:#163b2b}.ef-auth-submit{width:100%;border:0;border-radius:13px;background:#16804a;color:white;padding:14px;font:inherit;font-weight:800;cursor:pointer;margin-top:12px}.ef-auth-msg{color:#a33b2d!important;font-weight:700;min-height:1.3em}.ef-auth-note{font-size:12px!important;background:#f4f8f4;border-radius:12px;padding:11px}.ef-auth-existing{display:grid;gap:8px;margin-top:12px}.ef-auth-existing button{display:flex;justify-content:space-between;align-items:center;text-align:left;border:1px solid #d5e7da;border-radius:12px;background:#fff;padding:12px;cursor:pointer;color:#163b2b}.ef-profile-pill{position:fixed;right:16px;top:14px;z-index:9000;border:1px solid #cde2d3;background:#fff;color:#20563a;border-radius:999px;padding:9px 13px;box-shadow:0 4px 16px #0000000d;font:inherit;font-size:13px;font-weight:700;cursor:pointer}
    </style>
    <section class="ef-auth-card" aria-labelledby="efAuthTitle">
      <div class="ef-auth-logo">ENGLISH FAMILY</div>
      <h1 id="efAuthTitle">Seu inglês, no seu ritmo.</h1>
      <p>Crie um perfil para cada pessoa da família. Cada perfil mantém seu próprio nível, aulas concluídas, pontos e revisões neste navegador.</p>
      <div class="ef-auth-tabs"><button type="button" id="efTabLogin" class="active">Entrar</button><button type="button" id="efTabRegister">Criar perfil</button></div>
      <div id="efAuthForm"></div><p class="ef-auth-msg" id="efAuthMessage">${efSafeText(message)}</p>
      <p class="ef-auth-note">Importante: os perfis ficam salvos neste dispositivo/navegador. O PIN não cria uma conta online nem sincroniza automaticamente com outros aparelhos. Para uso familiar privado, não use um PIN que você reutiliza em outros serviços.</p>
    </section>`;
  const loginTab = root.querySelector("#efTabLogin"), registerTab = root.querySelector("#efTabRegister");
  function showMode(mode) {
    const registering = mode === "register";
    loginTab.classList.toggle("active", !registering); registerTab.classList.toggle("active", registering);
    const accounts = efReadAccounts();
    root.querySelector("#efAuthForm").innerHTML = registering ? `
      <form id="efRegisterForm"><div class="ef-auth-field"><label for="efName">Nome do familiar</label><input id="efName" name="name" maxlength="60" autocomplete="name" required placeholder="Ex.: Ana"></div>
      <div class="ef-auth-field"><label for="efEmail">E-mail (opcional)</label><input id="efEmail" name="email" type="email" maxlength="120" autocomplete="email" placeholder="voce@exemplo.com"></div>
      <div class="ef-auth-field"><label for="efPin">Crie um PIN ou senha (4 a 32 caracteres)</label><input id="efPin" name="pin" type="password" minlength="4" maxlength="32" autocomplete="new-password" required></div>
      <div class="ef-auth-field"><label for="efLevel">Nível inicial de inglês</label><select id="efLevel" name="level"><option value="A1">A1 — Iniciante</option><option value="A2" selected>A2 — Básico</option><option value="B1">B1 — Intermediário</option><option value="B2">B2 — Intermediário avançado</option><option value="C1">C1 — Avançado</option></select></div><button class="ef-auth-submit" type="submit">Criar meu perfil</button></form>` : `
      <form id="efLoginForm"><div class="ef-auth-field"><label for="efLoginName">Perfil</label><select id="efLoginName" name="id" required>${accounts.map(a=>`<option value="${efSafeText(a.id)}" ${a.id===localStorage.getItem(EF_PENDING_PROFILE_KEY)?"selected":""}>${efSafeText(a.name)}${a.email?` — ${efSafeText(a.email)}`:""}</option>`).join("")}</select></div>
      <div class="ef-auth-field"><label for="efLoginPin">PIN ou senha</label><input id="efLoginPin" name="pin" type="password" minlength="4" maxlength="32" autocomplete="current-password" required></div><button class="ef-auth-submit" type="submit">Entrar no meu perfil</button></form>
      ${accounts.length ? "" : "<p>Este é o primeiro acesso neste navegador. Selecione <b>Criar perfil</b> para começar.</p>"}
      ${accounts.length ? `<div class="ef-auth-existing"><p>Perfis cadastrados</p>${accounts.map(a=>`<button type="button" data-ef-profile="${efSafeText(a.id)}"><span><b>${efSafeText(a.name)}</b><br><small>Nível ${efSafeText(a.level||"A2")}</small></span><span>Entrar →</span></button>`).join("")}</div>` : ""}`;
    const form = root.querySelector("#efRegisterForm");
    if (form) form.addEventListener("submit", async ev => {
      ev.preventDefault(); const fd = new FormData(form); const name=String(fd.get("name")||"").trim(), email=String(fd.get("email")||"").trim(), pin=String(fd.get("pin")||""), level=String(fd.get("level")||"A2");
      if(name.length<2){efSetAuthMessage("Informe um nome com pelo menos 2 caracteres.");return;}
      if(pin.length<4){efSetAuthMessage("O PIN/senha precisa ter pelo menos 4 caracteres.");return;}
      const all=efReadAccounts(); if(all.some(a=>a.name.trim().toLocaleLowerCase()===name.toLocaleLowerCase())){efSetAuthMessage("Já existe um perfil com esse nome. Escolha outro nome.");return;}
      const id="ef_"+Date.now().toString(36)+Math.random().toString(36).slice(2,7);
      const account={id,name,email,level,pinHash:await efHashPin(pin),createdAt:new Date().toISOString()};
      all.push(account); efWriteAccounts(all);
      let user=cloneObject(DEFAULT_USER); user.id=id;user.name=name;user.email=email;user.level=level;user.module=1;user.lesson=1;
      // Migra o progresso antigo apenas no primeiro perfil, se ele existir.
      const legacy=localStorage.getItem(APP_CONFIG.storageKey);
      if(all.length===1 && legacy){try{const old=JSON.parse(legacy);if(old && (old.completedLessons||[]).length){user=mergeObjects(user,old);user.id=id;user.name=name;user.email=email;user.level=level;}}catch(_){}}
      localStorage.setItem(efAccountStorageKey(id),JSON.stringify(user));localStorage.setItem(EF_ACTIVE_KEY,id);EF_ACTIVE_ACCOUNT=account;root.remove();initializeCoreApp();efAddProfileButton();
    });
    const loginForm=root.querySelector("#efLoginForm");
    if(loginForm) loginForm.addEventListener("submit",async ev=>{ev.preventDefault();const fd=new FormData(loginForm);await efLogin(String(fd.get("id")||""),String(fd.get("pin")||""));});
    root.querySelectorAll("[data-ef-profile]").forEach(btn=>btn.addEventListener("click",()=>{const sel=root.querySelector("#efLoginName");if(sel)sel.value=btn.dataset.efProfile;const pin=root.querySelector("#efLoginPin");if(pin)pin.focus();}));
  }
  loginTab.addEventListener("click",()=>showMode("login"));registerTab.addEventListener("click",()=>showMode("register"));showMode("login");
}
function efSetAuthMessage(message){const el=document.getElementById("efAuthMessage");if(el)el.textContent=message;}
async function efLogin(id,pin){const accounts=efReadAccounts(),account=accounts.find(a=>a.id===id);if(!account){efSetAuthMessage("Selecione um perfil válido.");return;}const hash=await efHashPin(pin);if(hash!==account.pinHash){efSetAuthMessage("PIN/senha incorreto. Tente novamente.");return;}localStorage.setItem(EF_ACTIVE_KEY,id);localStorage.removeItem(EF_PENDING_PROFILE_KEY);EF_ACTIVE_ACCOUNT=account;const root=document.getElementById("efAuthRoot");if(root)root.remove();initializeCoreApp();efAddProfileButton();}
function efAddProfileButton(){let b=document.getElementById("efProfileButton");if(!b){b=document.createElement("button");b.id="efProfileButton";b.className="ef-profile-pill";b.type="button";document.body.appendChild(b);b.addEventListener("click",efOpenProfileMenu);}const account=EF_ACTIVE_ACCOUNT||efReadAccounts().find(a=>a.id===localStorage.getItem(EF_ACTIVE_KEY));b.textContent=`👤 ${account?.name||APP_STATE.user?.name||"Perfil"} ▾`;}
function efOpenProfileMenu(){const accounts=efReadAccounts();const choice=prompt("Perfil atual: "+(EF_ACTIVE_ACCOUNT?.name||APP_STATE.user?.name)+"\n\nDigite o número do perfil para trocar:\n"+accounts.map((a,i)=>`${i+1}. ${a.name} (${a.level})`).join("\n")+"\n\nDigite 0 para sair do perfil atual.");if(choice===null)return;if(choice==="0"){localStorage.removeItem(EF_ACTIVE_KEY);location.reload();return;}const n=Number(choice);if(Number.isInteger(n)&&n>=1&&n<=accounts.length){const target=accounts[n-1];if(target.id===localStorage.getItem(EF_ACTIVE_KEY))return;localStorage.setItem(EF_PENDING_PROFILE_KEY,target.id);localStorage.removeItem(EF_ACTIVE_KEY);location.reload();}}
function initializeApp(){
  const accounts=efReadAccounts();const activeId=localStorage.getItem(EF_ACTIVE_KEY);EF_ACTIVE_ACCOUNT=accounts.find(a=>a.id===activeId)||null;
  if(!EF_ACTIVE_ACCOUNT){efRenderAuth();return;}
  initializeCoreApp();efAddProfileButton();
}
function loadUserData(){
  try{const key=EF_ACTIVE_ACCOUNT?efAccountStorageKey(EF_ACTIVE_ACCOUNT.id):APP_CONFIG.storageKey;const raw=localStorage.getItem(key);if(raw){APP_STATE.user=mergeObjects(cloneObject(DEFAULT_USER),JSON.parse(raw));}else{APP_STATE.user=cloneObject(DEFAULT_USER);if(EF_ACTIVE_ACCOUNT){APP_STATE.user.id=EF_ACTIVE_ACCOUNT.id;APP_STATE.user.name=EF_ACTIVE_ACCOUNT.name;APP_STATE.user.email=EF_ACTIVE_ACCOUNT.email||"";APP_STATE.user.level=EF_ACTIVE_ACCOUNT.level||APP_CONFIG.defaultLevel;} }normalizeUserData();saveUserData();}
  catch(error){console.error("Erro ao carregar perfil:",error);APP_STATE.user=cloneObject(DEFAULT_USER);}
}
function saveUserData(){if(!APP_STATE.user)return;try{APP_STATE.user.storageVersion=APP_CONFIG.storageVersion;const serialized=JSON.stringify(APP_STATE.user);localStorage.setItem(APP_CONFIG.storageKey,serialized);if(EF_ACTIVE_ACCOUNT)localStorage.setItem(efAccountStorageKey(EF_ACTIVE_ACCOUNT.id),serialized);}catch(error){console.error("Erro ao salvar progresso:",error);}}

// A avaliação passa a ser interativa e usa questões reais do conteúdo pedagógico disponível.
function startTest(lesson){
  const level=String(lesson.id||"").split("-")[0]||APP_STATE.user.level;
  const moduleMatch=String(lesson.id||"").match(/M(\d+)/);const moduleNumber=moduleMatch?Number(moduleMatch[1]):APP_STATE.user.module;
  const lessonMatch=String(lesson.id||"").match(/L(\d+)/);const lessonNumber=lessonMatch?Number(lessonMatch[1]):APP_STATE.user.lesson;
  const source=LESSON_CONTENT[level]?.[moduleNumber]?.lessons?.[lessonNumber-1];
  const content=source?.content||source;
  const pool=[...(content?.comprehension||[]),...(content?.grammarExercises||[])].filter(q=>Array.isArray(q.options)&&q.options.length>=2&&Number.isInteger(q.answer));
  if(!pool.length){alert("Ainda não há questões suficientes para esta avaliação. Conclua as aulas do módulo e tente novamente.");return;}
  const questions=pool.slice(0,Math.min(10,pool.length));let idx=0,correct=0,answered=false;
  const old=document.getElementById("efPracticeOverlay");if(old)old.remove();const modal=document.createElement("div");modal.id="efPracticeOverlay";modal.style.cssText="position:fixed;inset:0;z-index:100001;background:#10251deF;display:grid;place-items:center;padding:18px;font-family:inherit;";
  modal.innerHTML=`<section style="width:min(100%,680px);max-height:92vh;overflow:auto;background:white;color:#173b2b;border-radius:22px;padding:clamp(20px,4vw,34px);box-sizing:border-box"><p style="font-size:12px;font-weight:800;letter-spacing:.12em;color:#16804a">ENGLISH FAMILY · AVALIAÇÃO</p><h2 id="efTestTitle">${efSafeText(lesson.title||"Teste do módulo")}</h2><p id="efTestProgress"></p><div id="efTestQuestion" style="font-size:19px;font-weight:700;line-height:1.5;margin:22px 0"></div><div id="efTestOptions" style="display:grid;gap:10px"></div><p id="efTestFeedback" aria-live="polite"></p><button id="efTestNext" style="display:none;width:100%;padding:13px;border:0;border-radius:12px;background:#16804a;color:white;font-weight:800;margin-top:12px;cursor:pointer">Próxima questão</button><button id="efTestClose" style="margin-top:12px;border:0;background:transparent;padding:10px;cursor:pointer">Sair da avaliação</button></section>`;document.body.appendChild(modal);
  const qEl=modal.querySelector("#efTestQuestion"),opts=modal.querySelector("#efTestOptions"),feedback=modal.querySelector("#efTestFeedback"),next=modal.querySelector("#efTestNext"),progress=modal.querySelector("#efTestProgress");
  function show(){answered=false;const q=questions[idx];progress.textContent=`Questão ${idx+1} de ${questions.length}`;qEl.textContent=q.question;feedback.textContent="";next.style.display="none";opts.innerHTML="";q.options.forEach((opt,i)=>{const b=document.createElement("button");b.type="button";b.textContent=opt;b.style.cssText="text-align:left;padding:14px;border:1px solid #d5e5da;border-radius:12px;background:#f8fbf8;cursor:pointer;font:inherit;color:inherit";b.addEventListener("click",()=>{if(answered)return;answered=true;const ok=i===q.answer;if(ok)correct++;feedback.textContent=(ok?"Correto! ":"Ainda não. ")+(q.explanation||"");feedback.style.color=ok?"#16804a":"#a33b2d";Array.from(opts.children).forEach((el,j)=>{el.disabled=true;if(j===q.answer)el.style.border="2px solid #16804a";});next.textContent=idx===questions.length-1?"Ver resultado":"Próxima questão";next.style.display="block";});opts.appendChild(b);});}
  next.addEventListener("click",()=>{if(!answered)return;if(idx<questions.length-1){idx++;show();return;}const score=Math.round(correct/questions.length*100);const passed=score>=70;progress.textContent=`Resultado: ${correct}/${questions.length} — ${score}%`;qEl.textContent=passed?"Avaliação concluída!":"Continue praticando e tente novamente.";opts.innerHTML="";feedback.textContent=passed?"Você atingiu a nota mínima de 70%.":"É necessário atingir 70% para aprovação. Revise as aulas e tente de novo.";next.style.display="none";if(passed){completeTest(lesson.id,score);const completed=APP_STATE.user.completedTests||[];if(!completed.some(t=>(typeof t==="string"?t:t.id)===lesson.id)){completed.push({id:lesson.id,score,date:getDateKey(new Date()),timestamp:new Date().toISOString()});APP_STATE.user.completedTests=completed;}APP_STATE.user.testsCompletedCount=completed.length;const nextModule=moduleNumber+1;if(nextModule<=(COURSE[level]?.modules||3)){APP_STATE.user.level=level;APP_STATE.user.module=nextModule;APP_STATE.user.lesson=1;}saveUserData();updateInterface();}else{next.style.display="block";next.textContent="Tentar novamente";next.onclick=()=>{idx=0;correct=0;next.onclick=null;show();};}const close=modal.querySelector("#efTestClose");close.textContent="Voltar ao curso";});
  modal.querySelector("#efTestClose").addEventListener("click",()=>modal.remove());show();
}

// Revisões recuperam uma aula concluída para prática real em vez de apenas exibir um aviso.
function startReview(){
  const user=APP_STATE.user;const completed=(user.completedLessons||[]);let target=null;
  for(const id of completed.slice().reverse()){const m=String(id).match(/^(A1|A2|B1|B2|C1)-M(\d+)-L(\d+)/);if(!m)continue;const level=m[1],mi=Number(m[2])-1,li=Number(m[3])-1;const item=LESSON_CONTENT[level]?.[mi+1]?.lessons?.[li];if(item){target=item;break;}}
  if(!target){alert("Conclua pelo menos uma aula para iniciar revisões personalizadas.");return;}
  startLesson(target);
}

/* =========================================================
   ENGLISH FAMILY v1.5.1 — CORREÇÕES INTEGRADAS
   Navegação completa, curso desbloqueado, revisão, conversação
   Gemini por perfil e configurações funcionais.
   ========================================================= */

function efxInjectStyles() {
  if (document.getElementById('efxStyles')) return;
  const style = document.createElement('style');
  style.id = 'efxStyles';
  style.textContent = `
    .efx-overlay{position:fixed;inset:0;z-index:100050;background:rgba(14,31,24,.68);display:grid;place-items:center;padding:14px}
    .efx-panel{width:min(100%,760px);max-height:min(92vh,900px);overflow:auto;background:#fff;color:#1f2937;border-radius:22px;padding:clamp(18px,4vw,30px);box-shadow:0 24px 80px #0003}
    .efx-panel h2{font-size:clamp(22px,4vw,30px);margin:4px 0 8px;color:#152b20}.efx-muted{color:#687568;line-height:1.5;font-size:14px}
    .efx-field{display:grid;gap:7px;margin:14px 0}.efx-field label{font-weight:750;font-size:13px}.efx-field input,.efx-field textarea,.efx-field select{width:100%;border:1px solid #d6e2d8;border-radius:12px;padding:12px;font:inherit;background:#fff;color:#17251d;box-sizing:border-box}
    .efx-row{display:flex;gap:9px;flex-wrap:wrap;margin-top:15px}.efx-btn{border:1px solid #d8e2da;border-radius:12px;padding:11px 15px;font:inherit;font-weight:750;cursor:pointer;background:#f6faf7;color:#254b35}.efx-btn.primary{background:#58cc02;color:#fff;border-color:#46a302}.efx-btn.danger{color:#a42323;background:#fff0f0;border-color:#ffd0d0}.efx-btn:disabled{opacity:.5;cursor:not-allowed}
    .efx-chatlog{display:flex;flex-direction:column;gap:10px;min-height:170px;max-height:42vh;overflow:auto;padding:12px;background:#f5f8f5;border-radius:14px;margin:14px 0}.efx-msg{max-width:90%;padding:11px 13px;border-radius:14px;white-space:pre-wrap;line-height:1.5;font-size:14px}.efx-msg.assistant{align-self:flex-start;background:#e7f5e8}.efx-msg.user{align-self:flex-end;background:#dff3ff}.efx-alert{padding:12px;border-radius:12px;background:#fff5cc;color:#735500;font-size:12px;line-height:1.5;margin:12px 0}.efx-question{font-size:18px;font-weight:800;line-height:1.5;margin:20px 0}.efx-options{display:grid;gap:9px}.efx-option{border:1px solid #d8e3da;border-radius:12px;padding:13px;text-align:left;background:#fff;color:#203429;font:inherit;cursor:pointer}.efx-option:hover{background:#eff9ed;border-color:#58cc02}.efx-option:disabled{cursor:default}.efx-option.good{background:#e9f8dc;border-color:#58cc02}.efx-option.bad{background:#ffe8e8;border-color:#ff4b4b}.efx-course-level{scroll-margin-top:90px}.efx-open-level{font-size:12px;color:#16804a;font-weight:800}
    body.efx-dark{--background:#111827;--surface:#1f2937;--surface-soft:#273449;--text:#e5e7eb;--text-dark:#f9fafb;--text-medium:#d1d5db;--text-light:#9ca3af;--border:#374151}body.efx-dark .app-header,body.efx-dark .bottom-navigation,body.efx-dark .side-menu{background:#182231;color:#f9fafb}body.efx-dark .efx-panel{background:#1f2937;color:#e5e7eb}body.efx-dark .efx-panel h2{color:#f9fafb}body.efx-dark .efx-field input,body.efx-dark .efx-field textarea,body.efx-dark .efx-field select{background:#111827;color:#f9fafb;border-color:#4b5563}
    @media(min-width:700px){.efx-chat-compose{display:grid;grid-template-columns:1fr auto;gap:9px;align-items:end}}
  `;
  document.head.appendChild(style);
}

function efxProfileId() {
  return String(EF_ACTIVE_ACCOUNT?.id || APP_STATE.user?.id || 'local-user');
}
function efxGeminiKeyStorage() { return `englishFamilyGeminiKey_${efxProfileId()}`; }
function efxGetGeminiKey() { try { return localStorage.getItem(efxGeminiKeyStorage()) || ''; } catch (_) { return ''; } }
function efxSetGeminiKey(key) { try { if (key) localStorage.setItem(efxGeminiKeyStorage(), key.trim()); else localStorage.removeItem(efxGeminiKeyStorage()); return true; } catch (_) { return false; } }
function efxOverlay(title, subtitle = '') {
  efxInjectStyles();
  document.getElementById('efxOverlay')?.remove();
  const overlay = document.createElement('div'); overlay.id = 'efxOverlay'; overlay.className = 'efx-overlay';
  overlay.innerHTML = `<section class="efx-panel" role="dialog" aria-modal="true"><div style="font-size:11px;font-weight:900;letter-spacing:.12em;color:#16804a">ENGLISH FAMILY</div><h2>${efSafeText(title)}</h2>${subtitle ? `<p class="efx-muted">${efSafeText(subtitle)}</p>` : ''}<div id="efxPanelBody"></div><div class="efx-row"><button type="button" class="efx-btn" id="efxClose">Fechar</button></div></section>`;
  document.body.appendChild(overlay);
  overlay.querySelector('#efxClose').addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', ev => { if (ev.target === overlay) overlay.remove(); });
  return { overlay, body: overlay.querySelector('#efxPanelBody') };
}

// Todos os níveis e aulas ficam acessíveis, independentemente do nível escolhido no perfil.
function updateCoursePath() {
  const container = document.getElementById('coursePath');
  if (!container || !APP_STATE.user) return;
  container.innerHTML = '';
  Object.keys(COURSE).forEach(level => {
    const section = createLevelElement(level);
    section.classList.add('efx-course-level');
    const badge = section.querySelector('.course-level-badge');
    if (badge) badge.title = `Abrir nível ${level}`;
    const heading = section.querySelector('.course-level-header');
    if (heading) {
      const label = document.createElement('span'); label.className = 'efx-open-level'; label.textContent = 'ACESSO LIVRE'; heading.appendChild(label);
    }
    container.appendChild(section);
  });
}

function createLessonElement(lesson) {
  const element = document.createElement('button');
  element.type = 'button'; element.className = 'lesson-item';
  const completed = (APP_STATE.user.completedLessons || []).includes(lesson.id);
  const isCurrent = lesson.id === `${APP_STATE.user.level}-M${APP_STATE.user.module}-L${APP_STATE.user.lesson}`;
  const isReview = lesson.type === 'review'; const isTest = lesson.type === 'test';
  const icon = completed ? '✅' : isReview ? '🧠' : isTest ? '📝' : isCurrent ? '▶️' : '📘';
  element.innerHTML = `<span class="lesson-icon">${icon}</span><span class="lesson-info"><strong>${escapeHTML(lesson.title || lesson.id || 'Aula')}</strong><span>${escapeHTML(lesson.description || (completed ? 'Aula concluída · praticar novamente' : 'Aula disponível'))}</span></span><span class="lesson-status">${completed ? '✓' : '›'}</span>`;
  element.addEventListener('click', () => {
    if (isReview) { startReview(); return; }
    if (isTest) { startTest(lesson); return; }
    startLesson(lesson);
  });
  return element;
}

function setupButtons() {
  document.getElementById('continueButton')?.addEventListener('click', continueLearning);
  document.getElementById('startReviewButton')?.addEventListener('click', startReview);
  document.getElementById('profileButton')?.addEventListener('click', openProfile);
  document.querySelectorAll('.conversation-mode').forEach(button => {
    button.addEventListener('click', () => startConversation(button.dataset.mode || 'guided'));
  });
  document.querySelectorAll('.setting-item').forEach((button, index) => {
    button.addEventListener('click', () => efxOpenSetting(button.textContent.trim(), index));
  });
}

function efxOpenSetting(label, index) {
  const lower = label.toLocaleLowerCase('pt-BR');
  if (lower.includes('família') || lower.includes('familia') || index === 1) {
    if (typeof efOpenProfileMenu === 'function') efOpenProfileMenu();
    else alert('A troca de perfil familiar estará disponível após entrar em um perfil.');
    return;
  }
  if (lower.includes('notifica') || index === 2) {
    APP_STATE.user.settings = APP_STATE.user.settings || {};
    const enabled = APP_STATE.user.settings.notifications !== false;
    const modal = efxOverlay('Notificações', 'Preferência salva apenas neste perfil e neste navegador.');
    modal.body.innerHTML = `<p class="efx-muted">Lembretes de estudo: <strong>${enabled ? 'ativados' : 'desativados'}</strong>.</p><div class="efx-row"><button class="efx-btn primary" id="efxToggleNotifications">${enabled ? 'Desativar' : 'Ativar'} lembretes</button></div>`;
    modal.body.querySelector('#efxToggleNotifications').onclick = () => { APP_STATE.user.settings.notifications = !(APP_STATE.user.settings.notifications !== false); saveUserData(); const now = APP_STATE.user.settings.notifications; modal.body.querySelector('p').innerHTML = `Lembretes de estudo: <strong>${now ? 'ativados' : 'desativados'}</strong>.`; modal.body.querySelector('#efxToggleNotifications').textContent = `${now ? 'Desativar' : 'Ativar'} lembretes`; };
    return;
  }
  if (lower.includes('aparência') || lower.includes('aparencia') || index === 3) {
    APP_STATE.user.settings = APP_STATE.user.settings || {};
    const active = Boolean(APP_STATE.user.settings.darkMode);
    document.body.classList.toggle('efx-dark', active);
    const modal = efxOverlay('Aparência', 'A preferência de visual é salva neste perfil.');
    modal.body.innerHTML = `<p class="efx-muted">Modo atual: <strong>${active ? 'escuro' : 'claro'}</strong>.</p><button class="efx-btn primary" id="efxToggleTheme">Alternar modo claro/escuro</button>`;
    modal.body.querySelector('#efxToggleTheme').onclick = () => { const now = document.body.classList.toggle('efx-dark'); APP_STATE.user.settings.darkMode = now; saveUserData(); modal.body.querySelector('p').innerHTML = `Modo atual: <strong>${now ? 'escuro' : 'claro'}</strong>.`; };
    return;
  }
  efxOpenProfileSettings();
}

function efxOpenProfileSettings() {
  const modal = efxOverlay('Meu perfil', 'Edite o nome e o nível inicial exibido no painel. Isso não apaga seu histórico.');
  const user = APP_STATE.user;
  modal.body.innerHTML = `<form id="efxProfileForm"><div class="efx-field"><label for="efxProfileName">Nome</label><input id="efxProfileName" maxlength="60" required value="${efSafeText(user.name || '')}"></div><div class="efx-field"><label for="efxProfileLevel">Nível do painel</label><select id="efxProfileLevel"><option value="A1">A1 — Iniciante</option><option value="A2">A2 — Básico</option><option value="B1">B1 — Intermediário</option><option value="B2">B2 — Intermediário avançado</option><option value="C1">C1 — Avançado</option></select></div><div class="efx-row"><button class="efx-btn primary" type="submit">Salvar perfil</button><button class="efx-btn" type="button" id="efxGeminiSettings">Configurar chave Gemini</button></div></form>`;
  modal.body.querySelector('#efxProfileLevel').value = user.level || 'A2';
  modal.body.querySelector('#efxProfileForm').addEventListener('submit', ev => {
    ev.preventDefault(); user.name = modal.body.querySelector('#efxProfileName').value.trim() || user.name; user.level = modal.body.querySelector('#efxProfileLevel').value; if (EF_ACTIVE_ACCOUNT) { EF_ACTIVE_ACCOUNT.name = user.name; EF_ACTIVE_ACCOUNT.level = user.level; const accounts = efReadAccounts().map(account => account.id === EF_ACTIVE_ACCOUNT.id ? { ...account, name: user.name, level: user.level, email: user.email || '' } : account); efWriteAccounts(accounts); } saveUserData(); updateInterface(); if (typeof efAddProfileButton === 'function') efAddProfileButton(); modal.overlay.remove();
  });
  modal.body.querySelector('#efxGeminiSettings').onclick = () => { modal.overlay.remove(); efxConfigureGeminiKey(); };
}

function efxConfigureGeminiKey(onSaved = null) {
  const modal = efxOverlay('Chave da API Gemini', `Perfil: ${APP_STATE.user?.name || 'Aluno'}. A chave fica salva separadamente para este perfil neste navegador.`);
  const existing = efxGetGeminiKey();
  modal.body.innerHTML = `<div class="efx-alert">Segurança: esta versão do GitHub Pages salva a chave neste navegador. Ela não vai para o repositório, mas pode ser acessada por alguém que controle este dispositivo ou inspecione as requisições. Para proteção maior, use um backend privado.</div><form id="efxGeminiForm"><div class="efx-field"><label for="efxGeminiKey">Chave Gemini API</label><input id="efxGeminiKey" type="password" autocomplete="off" spellcheck="false" placeholder="Cole sua chave do Google AI Studio" value="${efSafeText(existing)}"></div><label style="display:flex;gap:8px;align-items:center;font-size:13px"><input id="efxShowKey" type="checkbox"> Mostrar chave</label><p class="efx-muted">Obtenha a chave em <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer">Google AI Studio — API keys</a>. Não é a senha da sua conta Google.</p><div class="efx-row"><button class="efx-btn primary" type="submit">Salvar chave neste perfil</button>${onSaved ? '<button class="efx-btn primary" type="button" id="efxSaveAndContinue">Salvar e iniciar conversa</button>' : ''}<button class="efx-btn" type="button" id="efxTestKey">Testar chave</button><button class="efx-btn danger" type="button" id="efxDeleteKey">Remover chave</button></div><p id="efxKeyStatus" class="efx-muted" aria-live="polite"></p></form>`;
  const keyInput = modal.body.querySelector('#efxGeminiKey'); const status = modal.body.querySelector('#efxKeyStatus');
  modal.body.querySelector('#efxShowKey').onchange = ev => keyInput.type = ev.target.checked ? 'text' : 'password';
  modal.body.querySelector('#efxGeminiForm').onsubmit = ev => { ev.preventDefault(); const key = keyInput.value.trim(); if (!key) { status.textContent = 'Cole uma chave antes de salvar.'; return; } if (efxSetGeminiKey(key)) { status.textContent = 'Chave salva para este perfil neste navegador.'; } else status.textContent = 'Não foi possível salvar. Verifique as configurações do navegador.'; };
  modal.body.querySelector('#efxDeleteKey').onclick = () => { efxSetGeminiKey(''); keyInput.value = ''; status.textContent = 'Chave removida deste perfil.'; };
  const continueButton = modal.body.querySelector('#efxSaveAndContinue');
  if (continueButton) continueButton.onclick = () => { const key = keyInput.value.trim(); if (!key) { status.textContent = 'Cole uma chave antes de continuar.'; return; } if (!efxSetGeminiKey(key)) { status.textContent = 'Não foi possível salvar a chave neste navegador.'; return; } modal.overlay.remove(); onSaved(); };
  modal.body.querySelector('#efxTestKey').onclick = async () => { const key = keyInput.value.trim() || efxGetGeminiKey(); if (!key) { status.textContent = 'Informe uma chave primeiro.'; return; } status.textContent = 'Testando conexão…'; try { await efxGeminiRequest(key, [{ role: 'user', parts: [{ text: 'Reply with exactly: Connection successful.' }] }], 'Reply briefly in English.'); status.textContent = 'Conexão com o Gemini funcionando. Clique em salvar para guardar a chave.'; } catch (err) { status.textContent = `Falha no teste: ${err.message || 'verifique a chave e a conexão'}`; } };
}

function efxCollectReviewQuestions() {
  const user = APP_STATE.user; const pool = []; const seen = new Set();
  const completed = (user.completedLessons || []).slice().reverse();
  completed.forEach(id => {
    const match = String(id).match(/^(A1|A2|B1|B2|C1)-M(\d+)-L(\d+)/); if (!match) return;
    const lesson = LESSON_CONTENT[match[1]]?.[Number(match[2])]?.lessons?.[Number(match[3]) - 1]; if (!lesson) return;
    const content = lesson.content || lesson;
    [...(content.comprehension || []), ...(content.grammarExercises || [])].forEach(q => {
      if (!q || !Array.isArray(q.options) || q.options.length < 2 || !Number.isInteger(q.answer)) return;
      const key = `${id}:${q.id || q.question}`; if (seen.has(key)) return; seen.add(key);
      pool.push({ ...q, lessonId: id, lessonTitle: lesson.title || id });
    });
  });
  // If a profile has completed lessons but no quiz pool is available, offer a recall prompt instead of a dead end.
  return pool;
}

function startReview() {
  if (!APP_STATE.user) return;
  const questions = efxCollectReviewQuestions();
  if (!questions.length) {
    const modal = efxOverlay('Revisão inteligente', 'As revisões são montadas a partir das aulas já concluídas.');
    modal.body.innerHTML = `<p class="efx-muted">${(APP_STATE.user.completedLessons || []).length ? 'Ainda não há questões de múltipla escolha disponíveis nas aulas concluídas. Você pode abrir qualquer aula e praticar novamente.' : 'Conclua uma aula para começar a criar seu histórico de revisão espaçada.'}</p><div class="efx-row"><button class="efx-btn primary" id="efxGoCourse">Abrir curso completo</button></div>`;
    modal.body.querySelector('#efxGoCourse').onclick = () => { modal.overlay.remove(); navigateTo('learn'); };
    return;
  }
  const modal = efxOverlay('Revisão inteligente', 'Pratique conteúdos das aulas concluídas. As respostas erradas ficam registradas para orientar próximas revisões.');
  modal.body.innerHTML = `<p id="efxReviewProgress" class="efx-muted"></p><div id="efxReviewQuestion" class="efx-question"></div><div id="efxReviewOptions" class="efx-options"></div><p id="efxReviewFeedback" class="efx-muted" aria-live="polite"></p><div class="efx-row"><button class="efx-btn primary" id="efxReviewNext" disabled>Próxima questão</button></div>`;
  let index = 0, correct = 0, answered = false; const qEl = modal.body.querySelector('#efxReviewQuestion'); const options = modal.body.querySelector('#efxReviewOptions'); const feedback = modal.body.querySelector('#efxReviewFeedback'); const next = modal.body.querySelector('#efxReviewNext'); const progress = modal.body.querySelector('#efxReviewProgress');
  function show() {
    answered = false; const q = questions[index]; progress.textContent = `Questão ${index + 1} de ${questions.length} · ${q.lessonTitle}`; qEl.textContent = q.question || 'Escolha a resposta correta.'; feedback.textContent = ''; next.disabled = true; next.textContent = index === questions.length - 1 ? 'Ver resultado' : 'Próxima questão'; options.innerHTML = '';
    q.options.forEach((text, i) => { const button = document.createElement('button'); button.className = 'efx-option'; button.type = 'button'; button.textContent = text; button.onclick = () => { if (answered) return; answered = true; const good = i === q.answer; if (good) correct++; else { APP_STATE.user.errors = APP_STATE.user.errors || []; APP_STATE.user.errors.push({ lessonId: q.lessonId, question: q.question, expected: q.options[q.answer], given: text, date: new Date().toISOString(), source: 'review' }); APP_STATE.user.review.weakPoints = APP_STATE.user.errors.length; } Array.from(options.children).forEach((el, j) => { el.disabled = true; if (j === q.answer) el.classList.add('good'); else if (j === i && !good) el.classList.add('bad'); }); feedback.textContent = `${good ? 'Correto! ' : `Resposta correta: ${q.options[q.answer]}. `}${q.explanation || ''}`; next.disabled = false; saveUserData(); }; options.appendChild(button); });
  }
  next.onclick = () => { if (!answered) return; if (index < questions.length - 1) { index++; show(); return; } const score = Math.round(correct / questions.length * 100); const reviewId = `review-${Date.now()}`; completeReview(reviewId); modal.body.innerHTML = `<div style="text-align:center;padding:18px"><div style="font-size:42px">${score >= 70 ? '🎉' : '💪'}</div><h3 style="font-size:24px;margin:10px 0">Revisão concluída!</h3><p class="efx-muted">Você acertou ${correct} de ${questions.length} questões (${score}%). ${score >= 70 ? 'Ótimo trabalho!' : 'Continue praticando para fixar melhor.'}</p><button class="efx-btn primary" id="efxReviewDone">Voltar ao painel</button></div>`; modal.body.querySelector('#efxReviewDone').onclick = () => { modal.overlay.remove(); updateInterface(); navigateTo('review'); }; };
  show();
}

function startConversation(mode = 'guided') {
  const modes = { guided: 'Conversação guiada', practice: 'Prática livre', challenge: 'Desafio de conversação' };
  const title = modes[mode] || modes.guided;
  if (!efxGetGeminiKey()) { efxConfigureGeminiKey(() => startConversation(mode)); return; }
  const modal = efxOverlay(title, `Nível ${APP_STATE.user?.level || 'A2'} · ${APP_STATE.user?.name || 'Aluno'}`);
  const starter = mode === 'challenge' ? 'Challenge: You are ordering food at a café. Ask for a drink and a meal, then ask the price.' : mode === 'practice' ? 'Free practice: Tell me about your day. I will help you express your ideas naturally.' : 'Guided conversation: Let us introduce ourselves. What is your name, and what do you like doing?';
  modal.body.innerHTML = `<div class="efx-alert">${mode === 'guided' ? 'O tutor conversa em inglês, adapta a linguagem ao seu nível e pode explicar correções em português.' : mode === 'challenge' ? 'Complete a situação proposta em inglês. Tente responder com frases completas.' : 'Converse livremente. Você pode escrever em inglês e pedir ajuda quando precisar.'}</div><div class="efx-chatlog" id="efxChatLog"><div class="efx-msg assistant">${efSafeText(starter)}</div></div><form id="efxChatForm"><div class="efx-field"><label for="efxChatInput">Sua resposta em inglês</label><textarea id="efxChatInput" rows="3" placeholder="Type your answer in English…" required></textarea></div><div class="efx-row"><button class="efx-btn primary" id="efxChatSend" type="submit">Enviar resposta</button><button class="efx-btn" type="button" id="efxChatHint">Preciso de uma dica</button><button class="efx-btn" type="button" id="efxChatKey">Configurar chave</button></div></form><p id="efxChatStatus" class="efx-muted" aria-live="polite"></p>`;
  const log = modal.body.querySelector('#efxChatLog'); const form = modal.body.querySelector('#efxChatForm'); const input = modal.body.querySelector('#efxChatInput'); const status = modal.body.querySelector('#efxChatStatus'); const send = modal.body.querySelector('#efxChatSend');
  const history = []; const startedAt = Date.now(); let turns = 0;
  function addMessage(role, text) { const bubble = document.createElement('div'); bubble.className = `efx-msg ${role === 'user' ? 'user' : 'assistant'}`; bubble.textContent = text; log.appendChild(bubble); log.scrollTop = log.scrollHeight; }
  form.addEventListener('submit', async ev => {
    ev.preventDefault(); const text = input.value.trim(); if (!text) return; const key = efxGetGeminiKey();
    if (!key) { status.textContent = 'Configure a chave do Gemini para usar a IA nesta conversa.'; return; }
    addMessage('user', text); history.push({ role: 'user', parts: [{ text }] }); input.value = ''; send.disabled = true; status.textContent = 'O tutor está preparando uma resposta…';
    try { const reply = await efxGeminiRequest(key, history, `You are a kind American English tutor in the English Family app. The learner's CEFR level is ${APP_STATE.user?.level || 'A2'}. Conversation mode: ${mode}. The opening prompt already shown to the learner is: ${starter}. Continue from that prompt naturally in English, correct at most one or two important mistakes gently, and include a short Portuguese explanation only when useful. Ask one follow-up question. For challenge mode, stay in the role-play scenario. Keep responses concise and age-appropriate. Do not claim to hear audio; the learner is typing.`); history.push({ role: 'model', parts: [{ text: reply }] }); addMessage('assistant', reply); turns++; status.textContent = 'Resposta recebida. Continue a conversa.'; }
    catch (err) { history.pop(); status.textContent = `Não foi possível obter resposta: ${err.message || 'verifique a chave e a conexão'}`; }
    finally { send.disabled = false; input.focus(); }
  });
  modal.body.querySelector('#efxChatHint').onclick = () => { input.value = mode === 'challenge' ? 'Could I have a ___, please? How much is it?' : 'I usually… / I like… because…'; input.focus(); };
  modal.body.querySelector('#efxChatKey').onclick = () => { modal.overlay.remove(); efxConfigureGeminiKey(); };
  modal.overlay.querySelector('#efxClose').addEventListener('click', () => { if (turns > 0) completeConversation(mode, Math.max(1, Math.round((Date.now() - startedAt) / 60000))); }, { once: true });
}

async function efxGeminiRequest(apiKey, contents, systemInstruction = '') {
  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
    body: JSON.stringify({ systemInstruction: { parts: [{ text: systemInstruction || 'You are a helpful English tutor.' }] }, contents, generationConfig: { temperature: 0.7, maxOutputTokens: 600 } })
  });
  let data; try { data = await response.json(); } catch (_) { data = {}; }
  if (!response.ok) { const message = data?.error?.message || `Erro HTTP ${response.status}`; throw new Error(message); }
  const text = data?.candidates?.[0]?.content?.parts?.map(p => p.text || '').join('\n').trim();
  if (!text) throw new Error('A API não retornou texto. Verifique as permissões ou o limite de uso da chave.');
  return text;
}

// Restaura o tema salvo para o perfil atual.
function efxRestoreProfileSettings() {
  const dark = Boolean(APP_STATE.user?.settings?.darkMode);
  document.body.classList.toggle('efx-dark', dark);
}

// O núcleo chama updateInterface após carregar o perfil; o wrapper restaura também as preferências.
function updateInterface() {
  efxOriginalUpdateInterface();
  efxRestoreProfileSettings();
}

/* =========================================================
   ENGLISH FAMILY — BLOQUEIO DE NÍVEIS POR PERFIL
   Acesso ao nível atual e aos níveis anteriores.
   ========================================================= */

(function () {
  "use strict";

  const EF_LEVEL_ORDER = ["A1", "A2", "B1", "B2", "C1"];

  function efNormalizeLevel(level) {
    const normalized = String(level || "").trim().toUpperCase();
    return EF_LEVEL_ORDER.includes(normalized) ? normalized : "A1";
  }

  function efCanAccessLevel(level) {
    const userLevel = efNormalizeLevel(APP_STATE.user?.level);
    const requestedLevel = efNormalizeLevel(level);

    return (
      EF_LEVEL_ORDER.indexOf(requestedLevel) <=
      EF_LEVEL_ORDER.indexOf(userLevel)
    );
  }

  function efGetLessonLevel(lesson) {
    const id = String(lesson?.id || "");
    const match = id.match(/^(A1|A2|B1|B2|C1)(?:-|$)/i);

    return efNormalizeLevel(match ? match[1] : lesson?.level);
  }

  // Atualiza a apresentação dos níveis e identifica os bloqueados.
  const efPreviousUpdateCoursePath = updateCoursePath;

  updateCoursePath = function () {
    efPreviousUpdateCoursePath();

    const container = document.getElementById("coursePath");
    if (!container) return;

    container.querySelectorAll(".efx-course-level").forEach(section => {
      const heading = section.querySelector(".course-level-header");
      if (!heading) return;

      const badge = section.querySelector(".course-level-badge");
      const levelText = badge?.textContent || heading.textContent;
      const match = levelText.match(/\b(A1|A2|B1|B2|C1)\b/i);

      if (!match) return;

      const level = efNormalizeLevel(match[1]);
      const allowed = efCanAccessLevel(level);

      section.classList.toggle("efx-level-locked", !allowed);

      const label = heading.querySelector(".efx-open-level");
      if (label) {
        label.textContent = allowed ? "LIBERADO" : "🔒 BLOQUEADO";
      }

      if (badge) {
        badge.title = allowed
          ? `Acessar nível ${level}`
          : `Nível ${level} bloqueado. Seu nível atual é ${efNormalizeLevel(APP_STATE.user?.level)}.`;
      }
    });
  };

  // Bloqueia aulas, revisões e provas dos níveis superiores.
  const efPreviousCreateLessonElement = createLessonElement;

  createLessonElement = function (lesson) {
    const element = efPreviousCreateLessonElement(lesson);
    const level = efGetLessonLevel(lesson);
    const allowed = efCanAccessLevel(level);

    if (!allowed) {
      element.disabled = true;
      element.classList.add("efx-lesson-locked");
      element.title = `🔒 Disponível quando seu perfil alcançar o nível ${level}.`;

      const icon = element.querySelector(".lesson-icon");
      const status = element.querySelector(".lesson-status");
      const description = element.querySelector(".lesson-info span");

      if (icon) icon.textContent = "🔒";
      if (status) status.textContent = "Bloqueado";
      if (description) {
        description.textContent = `Desbloqueia ao alcançar ${level}`;
      }
    }

    return element;
  };

  // Proteção adicional contra tentativas de abrir uma aula bloqueada.
  const efPreviousStartLesson = startLesson;

  startLesson = function (lesson) {
    const level = efGetLessonLevel(lesson);

    if (!efCanAccessLevel(level)) {
      alert(
        `Este conteúdo está bloqueado.\n\n` +
        `Seu nível atual é ${efNormalizeLevel(APP_STATE.user?.level)}. ` +
        `Você precisa alcançar ${level} para acessar este conteúdo.`
      );
      return;
    }

    return efPreviousStartLesson.apply(this, arguments);
  };

  // Atualiza a tela sempre que o nível ou perfil for carregado.
  const efPreviousRestoreProfileSettings =
    typeof efxRestoreProfileSettings === "function"
      ? efxRestoreProfileSettings
      : null;

  if (efPreviousRestoreProfileSettings) {
    efxRestoreProfileSettings = function () {
      efPreviousRestoreProfileSettings.apply(this, arguments);
      updateCoursePath();
    };
  }

  // Estilo visual dos conteúdos bloqueados.
  const efLockStyle = document.createElement("style");
  efLockStyle.id = "ef-level-lock-styles";
  efLockStyle.textContent = `
    .efx-level-locked {
      opacity: 0.72;
    }

    .efx-level-locked .efx-open-level {
      color: #b45309;
      font-weight: 700;
    }

    .efx-lesson-locked {
      opacity: 0.55;
      cursor: not-allowed !important;
    }

    .efx-lesson-locked:disabled {
      pointer-events: none;
    }
  `;
  if (!document.getElementById(efLockStyle.id)) {
    document.head.appendChild(efLockStyle);
  }

})();

