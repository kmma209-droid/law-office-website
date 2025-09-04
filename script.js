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

// sidebar toggle for mobile with icon change
const menuBtn = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const menuIcon = menuBtn.querySelector('i');

menuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
  if(sidebar.classList.contains('active')){
    menuIcon.classList.remove('fa-bars');
    menuIcon.classList.add('fa-xmark');
  } else {
    menuIcon.classList.remove('fa-xmark');
    menuIcon.classList.add('fa-bars');
  }
});
