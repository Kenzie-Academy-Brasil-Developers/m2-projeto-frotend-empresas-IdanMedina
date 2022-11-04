import { companies } from "./requests/api.js";
import { users } from "./requests/admin.js";
import { renderOption, renderUser, renderCompDeps } from "./render_dep.js";
import { createDepModal } from "./modal.js";

const token = JSON.parse(localStorage.getItem("token"));

const selectDep = document.getElementById("set-dep");
const createBtn = document.querySelector(".create-btn");
const logout = document.querySelector(".logout");

const comps = await companies();
const employees = await users(token);

logout.addEventListener("click", () => {
   localStorage.removeItem("token");
   localStorage.removeItem("email");

   window.location.assign("../../index.html")
})

comps.forEach( comp => {
   renderOption(comp)
});

renderCompDeps();

selectDep.addEventListener("change", () => {
   renderCompDeps()
})

employees.forEach( user => {
   renderUser(user)
})

createBtn.addEventListener("click",() =>{
   createDepModal()
})