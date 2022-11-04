import { createUser } from "./requests/api.js";
import { okTip, toltip } from "./toltip.js";

const header = document.querySelector(".header-register");
const assignName = document.getElementById("name-assign");
const assignEmail = document.getElementById("email-assign");
const assignPassword = document.getElementById("password-assign");
const selectLevel = document.getElementById("set-level");
const registerBtn = document.getElementById("register");
const returnBtn = document.getElementById("go-back-home");

function registerButtons(){
    const boxBtn = document.createElement("div");
    const homeBtn = document.createElement("button");
    const loginBtn = document.createElement("button");
    const closeBtn = document.createElement("span");
    const closeImg = document.createElement("img");

    closeImg.src="/src/assets/Vector X.png";
    homeBtn.innerText="Home";
    loginBtn.innerText="Login";

    homeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.assign("../../index.html")
    })
    
    loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.assign("../pages/login.html")
    })

    closeBtn.addEventListener("click", () => {
        const drop = document.getElementById("dropdown");

        closeBtn.classList.toggle("none");
        boxBtn.classList.toggle("none");
        drop.classList.toggle("none")
    })

    closeBtn.appendChild(closeImg);
    boxBtn.append(homeBtn, loginBtn);
    header.append(closeBtn, boxBtn)
}

function dropdown(){
    const down = document.createElement("div");
    const imgDrop = document.createElement("img");

    down.id = "dropdown";

    imgDrop.src = "/src/assets/Vector.png";

    down.appendChild(imgDrop);
    header.appendChild(down);

    down.addEventListener("click", () => {
        down.classList.toggle("none")
        registerButtons()
    })
}
dropdown()

returnBtn.addEventListener("click", () => {
    window.location.assign("../../index.html")
})

registerBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const body = {
        username: assignName.value,
        password: assignPassword.value,
        email: assignEmail.value,
        professional_level: selectLevel.value
    };

    const register = await createUser(body);
    
    if(register.error){
        return toltip(register.error)
    } else {
        await createUser(body)  
    }
    const message = "Cadastro realizado";
    okTip(message);
    setTimeout(() => window.location.assign("/src/pages/login.html"), 1667)
})