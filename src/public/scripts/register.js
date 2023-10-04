const registerButton = document.getElementById("btn_register");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm_password");
const errorPasswordMessages = document.querySelectorAll(
  ".error_password_message"
);
const errorAuthMessages = document.querySelectorAll(
  ".error_authentication_message"
);
const userNameInput = document.getElementById("userName");
const emailInput = document.getElementById("email");

registerButton.addEventListener("click", function (event) {
  if (passwordInput.value !== confirmInput.value) {
    event.preventDefault();
    // alert('Passwords do not match. Please try again.');

    errorPasswordMessages.forEach((message) => {
      message.style.display = "block";
    });

    passwordInput.style.border = "1px solid red";
    confirmInput.style.border = "1px solid red";
  }
});

//make sure that the neccessary variable is present in URL

if (window.location.search.includes("userNameFound=true")) {
  userFounActivation();
}

function userFounActivation() {
  errorAuthMessages.forEach((message) => {
    message.style.display = "block";
  });

  userNameInput.style.border = "1px solid red";
  emailInput.style.border = "1px solid red";
}

document.addEventListener("DOMContentLoaded", function () {
  const successModal = document.getElementById("register_successModal");

  // Verificar si la respuesta de registro fue exitosa
  const urlParams = new URLSearchParams(window.location.search);
  const registrationSuccess = urlParams.get("registrationSuccess");

  if (registrationSuccess === "true") {
    // successModal.style.display = "block";

    // Redireccionar después de 3 segundos (3000 milisegundos)
    // Mensaje modal haciendole saber al usuario que el registro fue exitoso.
    Swal.fire({
      title: 'Registro completado',
      text: 'Se ha enviado un correo de confirmacion a tu direccion email',
      icon: 'success',
      confirmButtonText: 'ok',
    }).then((result) => {
      if (result.isConfirmed) {
        setTimeout(function () {
          window.location.href = "/login"; // Cambia "/login" por la URL a la que quieres redireccionar
        }, 1000);
      }
    });

  }
});

const register_preview_icon = document.getElementById("register_preview_icon");

function showPreview(event) {
  const file = event.target.files[0];
  const preview = document.getElementById("register_preview");
  const reader = new FileReader();
  reader.onload = function () {
    register_preview_icon.style.display = 'none';
    preview.src = reader.result;
    preview.style.display = "block";
  };
  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}

console.log('register.js working');