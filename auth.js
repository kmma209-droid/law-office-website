
// ===== Auth Modal (Lawyer) with Google Option =====
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('auth-modal');
  const closeBtn = document.getElementById('auth-close');
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');
  const panelLogin = document.getElementById('panel-login');
  const panelRegister = document.getElementById('panel-register');
  const formLogin = document.getElementById('form-login');
  const formRegister = document.getElementById('form-register');
  const err = document.getElementById('auth-error');
  const googleLogin = document.getElementById('google-login');
  const googleRegister = document.getElementById('google-register');

  // Demo users (with admin)
  function getUsers(){
    return JSON.parse(localStorage.getItem('users_demo') || '[]');
  }
  function setUsers(u){ localStorage.setItem('users_demo', JSON.stringify(u)); }
  function getCurrent(){ return JSON.parse(localStorage.getItem('current_demo') || 'null'); }
  function setCurrent(u){ localStorage.setItem('current_demo', JSON.stringify(u)); }
  function clearCurrent(){ localStorage.removeItem('current_demo'); }

  // Seed admin
  if(!getUsers().some(u=>u.username==='admin')){
    setUsers([{username:'admin', password:'1234', name:'Admin', role:'admin'}]);
  }

  // Tabs
  function activate(tab){
    if(tab==='login'){
      tabLogin.classList.add('active'); tabRegister.classList.remove('active');
      panelLogin.hidden = false; panelRegister.hidden = true;
    }else{
      tabRegister.classList.add('active'); tabLogin.classList.remove('active');
      panelRegister.hidden = false; panelLogin.hidden = true;
    }
  }
  tabLogin.addEventListener('click', ()=>activate('login'));
  tabRegister.addEventListener('click', ()=>activate('register'));

  closeBtn.addEventListener('click', ()=> modal.style.display='none');
  window.addEventListener('click', (e)=>{ if(e.target===modal) modal.style.display='none'; });

  // Login
  formLogin.addEventListener('submit', (e)=>{
    e.preventDefault();
    const u=document.getElementById('login-username').value.trim();
    const p=document.getElementById('login-password').value.trim();
    const users=getUsers();
    const found=users.find(x=>x.username===u && x.password===p);
    if(found){
      setCurrent(found);
      err.style.display='none';
      if(confirm('مرحبًا ' + (found.name||found.username) + (found.role==='admin'?' (أدمن)':''))){
      window.location.href = 'dashboard.html';          }
      modal.style.display='none';
    }else{
      err.textContent='بيانات غير صحيحة'; err.style.display='block';
    }
  });

  // Register
  formRegister.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name=document.getElementById('reg-name').value.trim();
    const username=document.getElementById('reg-username').value.trim();
    const password=document.getElementById('reg-password').value.trim();
    const users=getUsers();
    if(users.some(u=>u.username===username)){
      err.textContent='اسم المستخدم موجود بالفعل'; err.style.display='block';
      return;
    }
    const role=(username==='admin'?'admin':'user');
    const newUser={username,password,name,role};
    users.push(newUser);
    setUsers(users);
    setCurrent(newUser);
    err.style.display='none';
    if(confirm('تم إنشاء الحساب بنجاح! مرحبًا ' + (name||username))){
      window.location.href='index.html';
    }
    modal.style.display='none';
  });

  // Google login/register (mock)
  function handleGoogle(){
    const googleUser={username:'google_user', name:'Google User', role:'user'};
    setCurrent(googleUser);
    if(confirm('مرحبًا بك باستخدام Google')){
      window.location.href='index.html';
    }
    modal.style.display='none';
  }
  googleLogin.addEventListener('click', handleGoogle);
  googleRegister.addEventListener('click', handleGoogle);

  // Show modal on load for demo
  modal.style.display='flex';
});
