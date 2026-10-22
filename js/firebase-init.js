
/* Athathak Firebase initialization — Compat SDK */
(function () {
  try {
    const c = window.FIREBASE_CONFIG;

    if (!window.firebase || !c || !c.apiKey ||
        c.apiKey === "YOUR_API_KEY" ||
        c.apiKey.startsWith("YOUR_")) {
      window.authStatus = "nofirebase";
      console.error("Firebase configuration missing.");
      return;
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(c);
    }

    window.auth = firebase.auth();
    window.auth.languageCode = "ar";
    window.authStatus = "ready";
  } catch (error) {
    window.authStatus = "init";
    console.error("Firebase initialization failed:", error);
  }
})();
