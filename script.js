// set year
document.getElementById('year').textContent = new Date().getFullYear();

// theme toggle, remember preference
const btn = document.getElementById('theme-toggle');
const prefers = localStorage.getItem('site-theme');
if(prefers === 'dark') document.body.classList.add('dark');

btn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('site-theme', isDark ? 'dark' : 'light');
});

// simple contact form behaviour (client-side)
const form = document.getElementById('contact-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  if(!name){ alert('من فضلك اكتب اسمك'); return; }
  alert('تم استلام رسالتك، سنتواصل معك قريباً ✅');
  form.reset();
});
