import { compsBySector, companies } from "../scripts/requests/api.js";

const header = document.querySelector(".header-home");
const ul = document.querySelector(".home-list");
const select = document.getElementById("set-sector");

export function homeButtons() {
  const div = document.createElement("div");
  const boxBtn = document.createElement("div");
  const loginBtn = document.createElement("button");
  const registerBtn = document.createElement("button");
  const closeBtn = document.createElement("span");
  const closeImg = document.createElement("img");

  loginBtn.classList.add("drop-btn");
  registerBtn.classList.add("drop-btn");
  div.classList.add("none");
  div.id = "box-btn";

  closeImg.src = "/src/assets/Vector X.png";
  closeImg.id="close-box-btn";
  loginBtn.innerText = "Login";
  registerBtn.innerText = "Cadastro";

  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.assign("/src/pages/login.html");
  });

  registerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.assign("/src/pages/register.html");
  });

  closeBtn.addEventListener("click", () => {
    const down = document.getElementById("dropdown");
    div.classList.add("none");
    down.classList.remove("none");
  });

  closeBtn.appendChild(closeImg);
  boxBtn.append(loginBtn, registerBtn);
  div.append(closeBtn, boxBtn);
  header.appendChild(div)
}

export function dropdown() {
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

function renderCompany(company) {
  const card = document.createElement("li");
  const name = document.createElement("h3");
  const hours = document.createElement("p");
  const sector = document.createElement("span");

  card.classList.add("card-home");
  name.classList.add("comp-home");
  hours.classList.add("hour-home")
  sector.classList.add("sector-home");

  name.innerText = company.name;
  hours.innerText = company.opening_hours;
  sector.innerText = company.sectors.description;

  card.append(name, hours, sector);
  ul.appendChild(card);
}

export function renderOption(sector) {
  const option = document.createElement("option");

  option.innerText = sector.description;
  option.value = sector.description;

  select.appendChild(option);
}

export async function renderComps() {
  const select = document.getElementById("set-sector");
  const ul = document.querySelector(".home-list");
  
  if (select.value === "Todos") {
    ul.innerHTML = "";
    const comps = await companies();
    comps.forEach(async (comp) => {
      await renderCompany(comp);
    });
  } else {
    ul.innerHTML = "";
    const compBySec = await compsBySector(select.value);
    compBySec.forEach(async (comp) => {
      await renderCompany(comp);
    });
  }
}
