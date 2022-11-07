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
    const div = document.createElement("div");
    const boxBtn = document.createElement("div");
    const homeBtn = document.createElement("button");
    const loginBtn = document.createElement("button");
    const closeBtn = document.createElement("span");
    const closeImg = document.createElement("img");

    homeBtn.classList.add("drop-btn");
    loginBtn.classList.add("drop-btn");
    div.classList.add("none");
    div.id = "box-btn";

    closeImg.src="/src/assets/Vector X.png";
    closeImg.id="close-box-btn";
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
        const down = document.getElementById("dropdown");
    div.classList.add("none");
    down.classList.remove("none");
    })

    closeBtn.appendChild(closeImg);
    boxBtn.append(homeBtn, loginBtn);
    div.append(closeBtn, boxBtn);
    header.appendChild(div);
}
registerButtons()
function dropdown(){
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