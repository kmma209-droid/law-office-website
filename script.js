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


// CTA Modal Logic
document.addEventListener('DOMContentLoaded', () => {
  const ctaBtn = document.getElementById('cta-btn');
  const ctaModal = document.getElementById('cta-modal');
  const ctaNo = document.getElementById('cta-no');

  if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
      ctaModal.style.display = 'flex';
    });
  }

  if (ctaNo) {
    ctaNo.addEventListener('click', () => {
      ctaModal.style.display = 'none';
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === ctaModal) {
      ctaModal.style.display = 'none';
    }
  });
});


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



// articals

// أضف هذا الكود في نهاية ملف script.js
function displayArticles() {
    const articlesList = document.getElementById('articles-list');
    const articles = JSON.parse(localStorage.getItem('articles')) || [];

    if (!articlesList) {
        return;
    }

    if (articles.length === 0) {
        articlesList.innerHTML = '<p style="text-align: center;">لا توجد مقالات حاليًا.</p>';
        return;
    }

    articlesList.innerHTML = '';
    articles.forEach((article, index) => {
        const li = document.createElement('li');
        li.classList.add('article-item');
        
        const articleLink = document.createElement('a');
        articleLink.href = `article-detail.html?id=${index}`;
        
        const articleCard = document.createElement('div');
        articleCard.classList.add('article-card');
        articleCard.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description.substring(0, 150)}...</p>
        `;

        articleLink.appendChild(articleCard);
        li.appendChild(articleLink);
        articlesList.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', displayArticles);