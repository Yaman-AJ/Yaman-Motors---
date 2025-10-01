var inputEmail = document.getElementById("input-email");
var inputPass = document.getElementById("input-pass");
var btnSend = document.getElementById("send");
var emailStorage = localStorage.getItem("Email");
var passStorage = localStorage.getItem("Pass");

btnSend.addEventListener("click", Send);
function Send(e) {
  e.preventDefault();
  if (inputEmail.value === emailStorage && inputPass.value === passStorage) {
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 1000);
  } else {
    alert("البريد الإلكتروني أو كلمة المرور غير صحيحة");
  }
}
