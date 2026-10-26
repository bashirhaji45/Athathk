/* إعدادات Firebase لمشروعك — الصق القيم هنا
   1) console.firebase.google.com ← أنشئ مشروعاً ← أضف تطبيق ويب (</>) ← انسخ firebaseConfig.
   2) Authentication ← Sign-in method ← فعّل "Email/Password" و "Google".
   3) Authentication ← Settings ← Authorized domains ← أضف نطاق موقعك (localhost مضاف تلقائياً).
   ملاحظة: مفتاح apiKey في تطبيقات الويب ليس سرّاً، والحماية تكون بقواعد Firebase. */
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyAwN4UZCZG1UjzTkBGp-fov6rzBLodwnMs",
  authDomain: "athathk-2c567.firebaseapp.com",
  projectId: "athathk-2c567",
  storageBucket: "athathk-2c567.firebasestorage.app",
  messagingSenderId: "383362239941",
  appId: "1:383362239941:web:ffe7a48407f3386682cfac"
};
// إعدادات المحفظة: الحد الأدنى للشحن (ج.س) وبيانات التحويل التي تظهر للمستخدم — عدّلها ببياناتك الحقيقية
window.WALLET_CONFIG = {
  minTopup: 10000,
  payMethods: [
    { name: 'بنكك', account: 'ضع رقم الحساب هنا', holder: 'اسم صاحب الحساب' },
    { name: 'تحويل آخر', account: 'ضع الرقم هنا', holder: 'اسم المستلم' }
  ]
};
