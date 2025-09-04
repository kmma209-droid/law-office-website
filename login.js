document.addEventListener("DOMContentLoaded",()=>{
  const form=document.getElementById("login-form");
  const error=document.getElementById("login-error");
  form.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const u=document.getElementById("username").value.trim();
    const p=document.getElementById("password").value.trim();
    const res=await fetch("users.json");
    const users=await res.json();
    const found=users.find(x=>x.username===u && x.password===p);
    if(found){
      localStorage.setItem("loggedInUser",u);
      window.location.href="index.html";
    } else {
      error.style.display="block";
    }
  });
});