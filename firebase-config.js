/* Configuração web do Firebase — English Family.
   Os dados do progresso são protegidos pelas regras do Firestore por UID. */
(function () {
  "use strict";
  const config = {
    apiKey: "AIzaSyBUMJlWVmMT8BowJZMJpecv83SC1ukMLWA",
    authDomain: "family-english-c8868.firebaseapp.com",
    projectId: "family-english-c8868",
    storageBucket: "family-english-c8868.firebasestorage.app",
    messagingSenderId: "588470050935",
    appId: "1:588470050935:web:c052ce35299bd7baa32672"
  };
  if (!window.firebase) {
    console.error("[English Family] Firebase SDK não carregado.");
    window.EF_FIREBASE_READY = false;
    return;
  }
  if (!firebase.apps.length) firebase.initializeApp(config);
  window.EF_FIREBASE_AUTH = firebase.auth();
  window.EF_FIREBASE_DB = firebase.firestore();
  window.EF_FIREBASE_READY = true;
  window.EF_FIREBASE_AUTH.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .catch(error => console.error("[English Family] Não foi possível manter a sessão:", error));
})();
