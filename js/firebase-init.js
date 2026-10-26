/* تهيئة Firebase (تُحمَّل بعد firebase-config.js)
   تُنشئ window.auth عند النجاح، وإلا تضع سبب الفشل في window.authStatus */
(function () {
  const c = window.FIREBASE_CONFIG;
  if (!window.firebase) { window.authStatus = 'nofirebase'; return; }                    // لم تُحمَّل مكتبة Firebase
  if (!c || !c.apiKey || c.apiKey.indexOf('YOUR_') === 0) { window.authStatus = 'noconfig'; return; }
  try {
    firebase.initializeApp(c);
    // تنبيه إن اختلف إصدار Firebase المحمَّل عن 10.12.0 (علامة على خلط إصدارات أو مكتبات)
    if (firebase.SDK_VERSION !== '10.12.0') console.warn('إصدار Firebase المحمَّل هو ' + firebase.SDK_VERSION + ' والمشروع مبني على compat 10.12.0');
    window.auth = firebase.auth();
    window.auth.languageCode = 'ar';
    if (firebase.firestore) window.db = firebase.firestore();   // قاعدة البيانات (إن حُمّلت مكتبة Firestore)
    window.authStatus = 'ok';
  } catch (e) {
    window.authStatus = 'init';
    console.error('Firebase init error:', e);
  }
})();
