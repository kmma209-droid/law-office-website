document.getElementById('year').textContent = new Date().getFullYear();

// theme toggle with preference
const btn = document.getElementById('theme-toggle');
const prefers = localStorage.getItem('site-theme');
if(prefers === 'dark') document.body.classList.add('dark');

btn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('site-theme', isDark ? 'dark' : 'light');
});

// simple contact form
const form = document.getElementById('contact-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('تم استلام رسالتك، سنتواصل معك قريباً ✅');
  form.reset();
});

// sidebar toggle for mobile
const menuBtn = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
menuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});
