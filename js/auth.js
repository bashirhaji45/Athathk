/* ===== صفحات الدخول والتسجيل: أثاثك (Firebase Authentication) =====
   يخدم login.html و signup.html (يعرف الصفحة من data-v في الفورم).
   يحتاج: js/firebase-config.js بإعدادات مشروعك، وتفعيل Email/Password و Google في Firebase.
   يجب فتح الموقع عبر http/https (استضافة أو localhost)، لا يعمل كملف file:// */

const NEXT = 'index.html';   // الصفحة التي ينتقل إليها المستخدم بعد النجاح

const needAuth = () => {
  // يحدد سبب تعذّر Firebase برسالة واضحة
  const code = location.protocol === 'file:' ? 'cfg/file'
    : window.authStatus === 'nofirebase' ? 'cfg/nofirebase'
    : window.authStatus === 'init' ? 'cfg/init'
    : !window.auth ? 'cfg/missing' : null;
  if (code) { const e = new Error(code); e.code = code; throw e; }
};

async function onLogin({ email, password, remember }) {
  needAuth();
  const P = firebase.auth.Auth.Persistence;
  await auth.setPersistence(remember ? P.LOCAL : P.SESSION);
  await auth.signInWithEmailAndPassword(email, password);
}
async function onSignup({ name, email, tel, password }) {
  needAuth();
  const cred = await auth.createUserWithEmailAndPassword(email, password);
  await cred.user.updateProfile({ displayName: name });
  if (window.SAVE_PHONE_IN_FIRESTORE && firebase.firestore) {
    try { await firebase.firestore().collection('users').doc(cred.user.uid).set({ name, email, tel, createdAt: firebase.firestore.FieldValue.serverTimestamp() }); }
    catch (e) { console.warn('Firestore:', e); }   // فشل الحفظ لا يمنع إنشاء الحساب
  }
}
async function onGoogle() {
  needAuth();
  await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
}
async function onReset(email) {
  needAuth();
  await auth.sendPasswordResetEmail(email);
}

/* رسائل أخطاء Firebase بالعربية */
const FB = {
  'cfg/missing': 'لم يُضبط Firebase بعد. افتح js/firebase-config.js وضع إعدادات مشروعك.',
  'cfg/file': 'لا يعمل الدخول من ملف مفتوح على الجهاز. ارفع الموقع إلى استضافة (GitHub Pages أو Firebase Hosting) وافتحه من الرابط.',
  'cfg/nofirebase': 'تعذّر تحميل Firebase، تحقق من اتصال الإنترنت ثم أعد تحميل الصفحة.',
  'cfg/init': 'تعذّرت تهيئة Firebase، راجع إعدادات js/firebase-config.js.',
  'auth/invalid-credential': 'البريد أو كلمة المرور غير صحيحة.',
  'auth/user-not-found': 'لا يوجد حساب بهذا البريد.',
  'auth/wrong-password': 'كلمة المرور غير صحيحة.',
  'auth/invalid-email': 'صيغة البريد غير صحيحة.',
  'auth/user-disabled': 'هذا الحساب معطّل.',
  'auth/email-already-in-use': 'هذا البريد مسجّل من قبل، جرّب تسجيل الدخول.',
  'auth/weak-password': 'كلمة المرور ضعيفة، اختر كلمة أقوى.',
  'auth/too-many-requests': 'محاولات كثيرة، انتظر قليلاً ثم أعد المحاولة.',
  'auth/network-request-failed': 'تعذّر الاتصال، تحقق من الإنترنت.',
  'auth/popup-closed-by-user': 'أُغلقت نافذة جوجل قبل إكمال الدخول.',
  'auth/cancelled-popup-request': 'أُلغي طلب الدخول، حاول مرة أخرى.',
  'auth/popup-blocked': 'المتصفح منع نافذة جوجل، اسمح بالنوافذ المنبثقة ثم أعد المحاولة.',
  'auth/operation-not-allowed': 'طريقة الدخول هذه غير مفعّلة في Firebase.',
  'auth/unauthorized-domain': 'نطاق الموقع غير مضاف في Firebase (Authorized domains).',
  'auth/invalid-api-key': 'مفتاح Firebase غير صحيح، راجع js/firebase-config.js.',
  'auth/operation-not-supported-in-this-environment': 'افتح الموقع عبر رابط http أو https (استضافة أو localhost) وليس كملف مباشر.'
};
const fbMsg = e => FB[e && e.code] || 'حدث خطأ غير متوقع، حاول مرة أخرى.';

const GICON = '<svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>';

/* ---------- الواجهة ---------- */
function init() {
  const $ = i => document.getElementById(i);
  const svg = d => `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const IC = {
    mail: svg('<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M4 7l8 6 8-6"/>'),
    lock: svg('<rect x="5" y="11" width="14" height="9" rx="3"/><path d="M8 11V8a4 4 0 018 0v3"/>'),
    user: svg('<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-6 8-6s8 2 8 6"/>'),
    phone: svg('<path d="M6 3h4l2 5-2.5 1.5a11 11 0 005 5L16 12l5 2v4a2 2 0 01-2 2A16 16 0 013 5a2 2 0 013-2z"/>'),
    eye: svg('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),
    off: svg('<path d="M3 3l18 18M10.6 6.2A9.6 9.6 0 0112 6c6 0 10 6 10 6a17 17 0 01-3.2 3.8M6.5 7.5A17 17 0 002 12s4 7 10 7c1.7 0 3.2-.4 4.5-1M9.9 9.9a3 3 0 004.2 4.2"/>')
  };
  // الحقول: [المفتاح، التسمية، النوع، الأيقونة، autocomplete]
  const F = {
    login: [['email','البريد الإلكتروني','email','mail','email'], ['pw','كلمة المرور','password','lock','current-password']],
    signup: [['name','الاسم الكامل','text','user','name'], ['email','البريد الإلكتروني','email','mail','email'], ['tel','رقم الهاتف','tel','phone','tel'], ['pw','كلمة المرور','password','lock','new-password'], ['pw2','تأكيد كلمة المرور','password','lock','new-password']]
  };

  const form = document.querySelector('form');
  if (!form) return;                      // لا يوجد فورم في هذه الصفحة
  const v = form.dataset.v;
  const id = k => `${v}-${k}`;

  form.innerHTML = F[v].map(([k,l,t,ic,ac]) =>
    `<div class="fld"><span class="ic">${IC[ic]}</span><input id="${id(k)}" type="${t}" placeholder=" " autocomplete="${ac}" aria-describedby="${id(k)}-e"><label for="${id(k)}">${l}</label>${t=='password'?`<button type="button" class="eye" aria-label="إظهار كلمة المرور" data-for="${id(k)}">${IC.eye}</button>`:''}</div>`
    + (k=='pw' && v=='signup' ? '<div class="meter" aria-live="polite"><span></span><span></span><span></span><span></span><em></em></div>' : '')
    + `<div class="err" id="${id(k)}-e" role="alert"></div>`).join('')
    + (v=='login'
      ? `<div class="row"><label class="chk"><input type="checkbox" id="remember">تذكّرني</label><button type="button" class="link" id="forgot">نسيت كلمة المرور؟</button></div>`
      : `<label class="chk" style="margin:16px 4px"><input type="checkbox" id="terms">أوافق على الشروط وسياسة الخصوصية</label><div class="err" id="terms-e" role="alert"></div>`)
    + `<button class="btn" type="submit" style="margin-top:8px">${v=='login'?'دخول':'إنشاء الحساب'}</button>${v=='login'?`<div class="or">أو</div><button type="button" class="gbtn" id="google">${GICON}المتابعة باستخدام جوجل</button>`:''}<div class="out" aria-live="polite"></div>`
    + `<p class="foot">${v=='login'?'ليس لديك حساب؟ <a class="link" href="signup.html">سجّل الآن</a>':'لديك حساب؟ <a class="link" href="login.html">سجّل دخولك</a>'}</p>`;

  const out = form.querySelector('.out'), btn = form.querySelector('.btn');
  const msg = (t, bad) => out.innerHTML = t ? `<div class="ok"${bad ? ' style="background:#FDE7E4;color:#8C1D18"' : ''}>${t}</div>` : '';

  // إظهار/إخفاء كلمة المرور
  form.addEventListener('click', e => {
    const b = e.target.closest('.eye'); if (!b) return;
    const i = $(b.dataset.for), show = i.type == 'password';
    i.type = show ? 'text' : 'password'; b.innerHTML = show ? IC.off : IC.eye;
    b.setAttribute('aria-label', show ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور');
  });

  // قواعد التحقق برسائل ودّية
  const dig = s => s.replace(/[\s\-+]/g,'').replace(/[٠-٩]/g, c => '٠١٢٣٤٥٦٧٨٩'.indexOf(c));
  const R = {
    name: x => x.trim().length < 2 && 'اكتب اسمك الكامل.',
    email: x => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x.trim()) && 'اكتب بريداً صحيحاً، مثل name@email.com',
    tel: x => !/^\d{9,15}$/.test(dig(x)) && 'يبدو أن الرقم ناقص (٩ أرقام على الأقل).',
    pw: x => v == 'login' ? !x && 'اكتب كلمة المرور.' : x.length < 8 && 'كلمة المرور قصيرة، استخدم ٨ أحرف على الأقل.',
    pw2: x => x !== $(id('pw')).value && 'كلمتا المرور غير متطابقتين.'
  };
  const one = k => { const m = R[k]($(id(k)).value), i = $(id(k)); $(id(k)+'-e').textContent = m || ''; i.setAttribute('aria-invalid', !!m); return !m; };
  const all = () => F[v].map(f => one(f[0])).every(Boolean);
  F[v].forEach(([k]) => $(id(k)).addEventListener('input', e => e.target.getAttribute('aria-invalid') == 'true' && one(k)));

  // عدّاد قوة كلمة المرور (التسجيل فقط)
  if (v == 'signup') {
    const lv = [['','#E4D6BF'],['ضعيفة','#B3261E'],['متوسطة','#C98A1E'],['جيدة','#6F8F2E'],['قوية','#2E7D4F']];
    $('signup-pw').addEventListener('input', e => {
      const p = e.target.value;
      const n = p ? Math.max(1, [p.length >= 8, /[a-z]/.test(p) && /[A-Z]/.test(p), /\d/.test(p), /[^\w\s]/.test(p)].filter(Boolean).length) : 0;
      const m = form.querySelector('.meter');
      m.querySelectorAll('span').forEach((s, i) => s.style.background = i < n ? lv[n][1] : lv[0][1]);
      m.querySelector('em').textContent = lv[n][0];
    });
  }

  // الإرسال: تحقق ثم استدعاء نقطة الربط مع Firebase
  form.onsubmit = async e => {
    e.preventDefault();
    let ok = all();
    if (v == 'signup') { const t = !$('terms').checked; $('terms-e').textContent = t ? 'يلزم الموافقة للمتابعة.' : ''; ok = ok && !t; }
    if (!ok) return msg('');
    btn.disabled = true; btn.textContent = 'لحظة من فضلك...'; msg('');
    try {
      if (v == 'login') await onLogin({ email: $('login-email').value.trim(), password: $('login-pw').value, remember: $('remember').checked });
      else await onSignup({ name: $('signup-name').value.trim(), email: $('signup-email').value.trim(), tel: dig($('signup-tel').value), password: $('signup-pw').value });
      msg(v == 'login' ? 'تم تسجيل دخولك بنجاح. أهلاً بك.' : 'تم إنشاء حسابك بنجاح. أهلاً بك في أثاثك.');
      setTimeout(() => location.href = NEXT, 1200);
    } catch (err) {
      msg(fbMsg(err), true); btn.disabled = false; btn.textContent = v == 'login' ? 'دخول' : 'إنشاء الحساب';
    }
  };

  // نسيت كلمة المرور (الدخول فقط)
  if (v == 'login') $('forgot').onclick = async () => {
    if (!one('email')) return msg('اكتب بريدك أولاً لنرسل لك الرابط.', true);
    try { await onReset($('login-email').value.trim()); msg('أرسلنا إليك رابط إعادة تعيين كلمة المرور.'); }
    catch (err) { msg(fbMsg(err), true); }
  };

  // الدخول بحساب جوجل (صفحة الدخول فقط)
  if (v == 'login') $('google').onclick = async () => {
    const g = $('google'); g.disabled = true; msg('');
    try { await onGoogle(); msg('تم تسجيل دخولك بحساب جوجل. أهلاً بك.'); setTimeout(() => location.href = NEXT, 1000); }
    catch (err) { msg(fbMsg(err), true); g.disabled = false; }
  };
}

// ننتظر تحميل الصفحة كاملة قبل البحث عن الفورم
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
