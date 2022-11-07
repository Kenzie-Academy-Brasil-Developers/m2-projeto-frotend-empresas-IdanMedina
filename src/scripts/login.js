import { login } from "./requests/api.js";
import { okTip, toltip } from "./toltip.js";

const header = document.querySelector(".header-login");
const loginEmail = document.getElementById("email-login");
const loginPassword = document.getElementById("password-login");
const loginBtn = document.getElementById("login");
const assignBtn = document.getElementById("back-to-register");

function loginButtons() {
  const div = document.createElement("div");
  const boxBtn = document.createElement("div");
  const homeBtn = document.createElement("button");
  const registerBtn = document.createElement("button");
  const closeBtn = document.createElement("span");
  const closeImg = document.createElement("img");

  homeBtn.classList.add("drop-btn");
  registerBtn.classList.add("drop-btn");
  div.classList.add("none");
  div.id = "box-btn";

  closeImg.src = "/src/assets/Vector X.png";
  closeImg.id="close-box-btn";
  homeBtn.innerText = "Home";
  registerBtn.innerText = "Cadastro";

  homeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.assign("../../index.html");
  });

  registerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.assign("../pages/register.html");
  });

  closeBtn.addEventListener("click", () => {
    const down = document.getElementById("dropdown");
    div.classList.add("none");
    down.classList.remove("none");
  });

  closeBtn.appendChild(closeImg);
  boxBtn.append(homeBtn, registerBtn);
  div.append(closeBtn, boxBtn);
  header.appendChild(div);
}
loginButtons();

function dropdown() {
  const down = document.createElement("div");
  const imgDrop = document.createElement("img");

  const divBtn = document.getElementById("box-btn");

  down.id = "dropdown";

  imgDrop.src = "/src/assets/Vector.png";

  down.appendChild(imgDrop);
  header.appendChild(down);

  down.addEventListener("click", () => {
    down.classList.add("none");
    divBtn.classList.remove("none");
  });
}
dropdown();

assignBtn.addEventListener("click", () => {
  window.location.assign("../pages/register.html");
});

loginBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const body = {
    email: loginEmail.value,
    password: loginPassword.value,
  };

  const toLogin = await login(body);
 
  if (toLogin.error) {
    return toltip(toLogin.error);
  }

  await login(body);

  localStorage.setItem("token", JSON.stringify(toLogin.token));
  localStorage.setItem("email", JSON.stringify(body.email));

  const email = JSON.parse(localStorage.getItem("email"));

  if(email === "admin@mail.com"){
    const message = "Login do administrador efetuado com sucesso";
    okTip(message);
    setTimeout(() =>  window.location.assign("/src/pages/admin_page.html"), 1667)
  } else {
    const message = "Login do usuário efetuado com sucesso";
    okTip(message);
    setTimeout(() => window.location.assign("/src/pages/user_page.html"), 1667)
  }
});
