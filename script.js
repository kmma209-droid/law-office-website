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


// === Enhancements ===
document.addEventListener('DOMContentLoaded', function(){
  // AOS init
  if (window.AOS) { AOS.init(); }

  // Scroll to Top
  const st = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) st.classList.add('show'); else st.classList.remove('show');
  });
  if (st) st.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  // Menu toggle (if exists)
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  if (menuToggle && sidebar){
    menuToggle.addEventListener('click', () => sidebar.classList.toggle('active'));
  }

  // Basic contact form validation
  const form = document.getElementById('contact-form');
  if (form){
    form.addEventListener('submit', (e) => {
      const name = form.querySelector('[name="name"]').value.trim();
      const email = form.querySelector('[name="email"]').value.trim();
      if (!name || !email){
        e.preventDefault();
        alert('من فضلك ادخل الاسم والبريد الإلكتروني.');
      }
    });
  }
});


// === CTA Modal Logic ===
const ctaBtn = document.getElementById('cta-btn');
const ctaModal = document.getElementById('cta-modal');
const ctaYes = document.getElementById('cta-yes');
const ctaNo = document.getElementById('cta-no');
const iconW = document.getElementById('cta-icon-whatsapp');
const iconX = document.getElementById('cta-icon-close');

if(ctaBtn && ctaModal){
  ctaBtn.addEventListener('click', ()=>{
    const isOpen = ctaModal.style.display==='flex';
    if(isOpen){
      ctaModal.style.display='none';
      iconW.style.display='block'; iconX.style.display='none';
    } else {
      ctaModal.style.display='flex';
      iconW.style.display='none'; iconX.style.display='block';
    }
  });
  if(ctaNo) ctaNo.addEventListener('click', ()=>{
    ctaModal.style.display='none';
    iconW.style.display='block'; iconX.style.display='none';
  });
  if(ctaYes) ctaYes.addEventListener('click', ()=>{
    window.open('https://wa.me/201012345678?text=مرحباً، أود حجز استشارة قانونية.','_blank');
    ctaModal.style.display='none';
    iconW.style.display='block'; iconX.style.display='none';
  });
}

// === Auth UI ===
document.addEventListener("DOMContentLoaded",()=>{
  const loginLink=document.getElementById("login-link");
  const logoutLink=document.getElementById("logout-link");
  const welcome=document.getElementById("welcome-user");
  const user=localStorage.getItem("loggedInUser");
  if(user){
    if(loginLink) loginLink.style.display="none";
    if(logoutLink) logoutLink.style.display="inline-block";
    if(welcome){ welcome.style.display="inline-block"; welcome.textContent="مرحبا، "+user; }
  }
  if(logoutLink){
    logoutLink.addEventListener("click",(e)=>{
      e.preventDefault();
      localStorage.removeItem("loggedInUser");
      window.location.reload();
    });
  }
});