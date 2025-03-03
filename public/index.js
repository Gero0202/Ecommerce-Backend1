console.log("conectado al scripttt");


const loginButton = document.querySelector(".button-login");
const welcomeMessage = document.getElementById("welcome-message");

loginButton.addEventListener("click", () => {
    if (loginButton.textContent === "Iniciar sesion") {
        loginButton.style.backgroundColor = "red";
        loginButton.textContent = "Cerrar sesión";
        welcomeMessage.textContent = "¡Bienvenido admin!";
        welcomeMessage.style.display = "block";
    } else {
        loginButton.style.backgroundColor = "green";
        loginButton.textContent = "Iniciar sesion";
        welcomeMessage.style.display = "none";
    }
});
