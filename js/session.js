/* يعرض حالة المستخدم في هيدر الصفحة الرئيسية: اسمه وزر خروج بدل دخول/حساب جديد */
(function () {
  const box = document.getElementById('auth-links');
  if (!box || !window.auth) return;
  const guest = box.innerHTML;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  auth.onAuthStateChanged(u => {
    if (!u) { box.innerHTML = guest; return; }
    const n = (u.displayName || u.email || '').split(' ')[0];
    box.innerHTML = '<span style="font-weight:700;color:var(--wood)">أهلاً ' + esc(n) + '</span><button class="btn out" id="logout" style="min-height:44px;padding:0 18px">خروج</button>';
    document.getElementById('logout').onclick = () => auth.signOut();
  });
})();
