import { compsBySector, companies } from "../scripts/requests/api.js";

const header = document.querySelector(".header-home");
const ul = document.querySelector(".home-list");
const select = document.getElementById("set-sector");

function homeButtons() {
  const boxBtn = document.createElement("div");
  const loginBtn = document.createElement("button");
  const registerBtn = document.createElement("button");
  const closeBtn = document.createElement("span");
  const closeImg = document.createElement("img");

  closeImg.src = "/src/assets/Vector X.png";
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
    const drop = document.getElementById("dropdown");

    closeBtn.classList.toggle("none");
    boxBtn.classList.toggle("none");
    drop.classList.toggle("none");
  });

  closeBtn.appendChild(closeImg);
  boxBtn.append(loginBtn, registerBtn);
  header.append(closeBtn, boxBtn);
}

export function dropdown() {
  const down = document.createElement("div");
  const imgDrop = document.createElement("img");

  down.id = "dropdown";

  imgDrop.src = "/src/assets/Vector.png";

  down.appendChild(imgDrop);
  header.appendChild(down);

  down.addEventListener("click", () => {
    down.classList.toggle("none");
    homeButtons();
  });
}

export function renderCompany(company) {
  const card = document.createElement("li");
  const name = document.createElement("h3");
  const hours = document.createElement("p");
  const sector = document.createElement("span");

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
