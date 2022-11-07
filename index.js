import { dropdown, homeButtons, renderOption, renderComps } from "./src/scripts/home.js";
import { sectors } from "./src/scripts/requests/api.js";

const select = document.getElementById("set-sector");

homeButtons();
dropdown();
renderComps();

const sectorList = await sectors();

sectorList.forEach((sec) => {
  renderOption(sec)
});

select.addEventListener("click", () => {
  renderComps()
});