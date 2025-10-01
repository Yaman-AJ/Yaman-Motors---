var inputFname = document.getElementById("input-fname");
var inputLname = document.getElementById("input-lname");
var inputEmail = document.getElementById("input-email");
var inputPass = document.getElementById("input-pass");
var btnSend = document.getElementById("send");

btnSend.addEventListener("click", Send);
function Send(e) {
  e.preventDefault();
  if (
    inputEmail.value == "" ||
    inputFname.value == "" ||
    inputLname.value == "" ||
    inputPass.value == ""
  ) {
    alert("يرجى ملء جميع الحقول");
  } else {
    localStorage.setItem("FirstName", inputFname.value);
    localStorage.setItem("LastName", inputLname.value);
    localStorage.setItem("Email", inputEmail.value);
    localStorage.setItem("Pass", inputPass.value);

    setTimeout(() => {
      window.location.href = "../pages/login.html";
    }, 1000);
  }
}
