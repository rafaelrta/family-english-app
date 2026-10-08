/* =========================================================
   ENGLISH FAMILY
   APP.JS
   v1.4.0

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

  version: "1.4.0",

  language: "en",

  defaultLevel: "A2",

  dailyGoalMinutes: 15,

  xpPerLesson: 20,

  xpPerReview: 10,

  xpPerConversation: 15,

  xpPerTest: 30,

  storageKey: "englishFamilyData",

  storageVersion: 2,

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

  const currentId =
    `${APP_STATE.user.level}-M${APP_STATE.user.module}-L${APP_STATE.user.lesson}`;

  const completed =
    APP_STATE.user.completedLessons
      .includes(lesson.id);

  const isCurrent =
    lesson.id === currentId;

  const isUnlocked =
    completed ||
    isCurrent ||
    lesson.status === "current";

  if (!isUnlocked) {

    alert(
      "Esta aula ainda está bloqueada."
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

    type:
      "lesson",

    activityId:
      resolvedLesson.id,

    startedAt:
      new Date().toISOString(),

    completed:
      false,

    step:
      0,

    answers:
      {},

    score:
      0,

    total:
      0,

    errors:
      [],

    feedbackShown:
      false

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


function buildLessonSteps(
  content
) {

  const steps = [];

  if (content.introduction) {

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

  if (content.grammar) {

    steps.push({

      type:
        "grammar",

      data:
        content.grammar

    });

  }

  if (content.reading) {

    steps.push({

      type:
        "reading",

      data:
        content.reading

    });

  }

  (content.listening || [])
    .forEach(item =>
      steps.push({

        type:
          "listening",

        data:
          item

      })
    );

  (content.comprehension || [])
    .forEach(item =>
      steps.push({

        type:
          "comprehension",

        data:
          item

      })
    );

  (content.translation || [])
    .forEach(item =>
      steps.push({

        type:
          "translation",

        data:
          item

      })
    );

  (content.grammarExercises || [])
    .forEach(item =>
      steps.push({

        type:
          "grammarExercise",

        data:
          item

      })
    );

  (content.speaking || [])
    .forEach(item =>
      steps.push({

        type:
          "speaking",

        data:
          item

      })
    );

  (content.writing || [])
    .forEach(item =>
      steps.push({

        type:
          "writing",

        data:
          item

      })
    );

  (content.activeRecall || [])
    .forEach(item =>
      steps.push({

        type:
          "activeRecall",

        data:
          item

      })
    );

  steps.push({

    type:
      "completion",

    data:
      null

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
   END APP.JS v1.4.0
   ========================================================= */
