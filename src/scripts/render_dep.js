import { departments, compDeps } from "./requests/department.js";
import { deleteDepModal, editDepModal, editUserModal, removeUserModal, viewDepModal } from "./modal.js";

const token = JSON.parse(localStorage.getItem("token"));

const selectDep = document.getElementById("set-dep");
const depList = document.getElementById("dep-list");
const userList = document.getElementById("user-list");

const deps = await departments(token);

export function renderOption(company) {
  const option = document.createElement("option");

  option.innerText = company.name;
  option.value = company.uuid;

  selectDep.appendChild(option);
}

export function renderDeps(department) {
  const card = document.createElement("li");
  const name = document.createElement("h3");
  const description = document.createElement("p");
  const company = document.createElement("p");
  const actions = document.createElement("div");
  const peek = document.createElement("img");
  const edit = document.createElement("img");
  const remove = document.createElement("img");

  peek.id = department.uuid;
  name.innerText = department.name;
  description.innerText = department.description;
  company.innerText = department.companies.name;
  peek.src = "../assets/eye.png";
  edit.src = "../assets/edit_pen.png";
  remove.src = "../assets/trash.png";

  edit.addEventListener("click", () => {
    editDepModal(department.description, department.uuid)
  });


  peek.addEventListener("click", (e) => {
    viewDepModal(department.name, department.description, department.companies.name, e.target.id)
  });


  remove.addEventListener("click", () => {
    deleteDepModal(department.name, department.uuid)
  });

  actions.append(peek, edit, remove);
  card.append(name, description, company, actions);
  depList.appendChild(card);
}

export async function renderCompDeps() {
  const id = selectDep.value;
  const depsComp = await compDeps(id, token);

  if (id !== "" && id !== "all") {
    depList.innerHTML = "";
    depsComp.forEach((dep) => {
      renderDeps(dep);
    });
  } else {
    depList.innerHTML = "";
    deps.forEach((dep) => {
      renderDeps(dep);
    });
  }
}

export function renderUser(user) {
  const card = document.createElement("li");
  const name = document.createElement("h3");
  const description = document.createElement("p");
  const kindWork = document.createElement("p");
  const actions = document.createElement("div");
  const edit = document.createElement("img");
  const remove = document.createElement("img");

  if (user.is_admin === false) {

    const capitalizeProfLvl = user.professional_level[0].toUpperCase() + user.professional_level.substr(1);
    const capitalizeKindWork = user.kind_of_work[0].toUpperCase() + user.kind_of_work.substr(1);

    name.innerText = user.username;
    description.innerText = capitalizeProfLvl;
    kindWork.innerText = capitalizeKindWork;
    edit.id = user.uuid;
    remove.id = user.uuid;
    edit.src = "../assets/edit_pen.png";
    remove.src = "../assets/trash.png";

    edit.addEventListener("click", async (e) => {
      editUserModal(e.target.id)
    })
    remove.addEventListener("click", async (e) => {
      removeUserModal(user.username,e.target.id)
    })
  }

  actions.append(edit, remove);
  card.append(name, description, kindWork, actions);
  userList.appendChild(card);
}