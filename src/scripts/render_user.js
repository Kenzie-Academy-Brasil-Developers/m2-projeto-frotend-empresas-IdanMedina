import { userInfo, depUsers, userDeps } from "./requests/user.js";

const token = JSON.parse(localStorage.getItem("token"));

const username = document.querySelector(".username");
const info = document.querySelector(".user-info");
const ul = document.querySelector(".ul-box");

const reqInfo = await userInfo(token);
const coworkers = await depUsers(token);
const comps = await userDeps(token);

export function renderUserInfo() {
    const email = document.createElement("p");
    const profLevel = document.createElement("p");
    const kindWork = document.createElement("p");
  
    username.innerText = reqInfo.username;
    
    email.innerText = reqInfo.email;
    
    const capitalizeProfLvl = reqInfo.professional_level[0].toUpperCase() + reqInfo.professional_level.substr(1);
    profLevel.innerText = capitalizeProfLvl;
    
    if(reqInfo.kind_of_work){
    const capitalizekindWork = reqInfo.kind_of_work[0].toUpperCase() + reqInfo.kind_of_work.substr(1);
    kindWork.innerText = capitalizekindWork;
    }
    
    info.append(email, profLevel, kindWork);
  }

  export async function renderCoworkers(){
    console.log(comps)
    if(comps.error){
      const capitalizeError = comps.error[0].toUpperCase() + comps.error.substr(1);
      return ul.insertAdjacentHTML("afterbegin", `<div class="head-coworkers">${capitalizeError}</div>`);
    }

    
ul.insertAdjacentHTML("afterbegin", `<div class="head-coworkers">${comps.name} - ${coworkers[0].name}</div>`);
    const userData = coworkers[0].users;
    
    userData.forEach((user) => {
      const card = document.createElement("li");
      const name = document.createElement("h4");
      const profLevel = document.createElement("p");

      const capitalizeProfLvl = user.professional_level[0].toUpperCase() + user.professional_level.substr(1);
      profLevel.innerText = capitalizeProfLvl;

      name.innerText = user.username;

      card.append(name, profLevel);
      ul.appendChild(card)
    })
    
  }