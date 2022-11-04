import { editModal } from "./modal.js";
import { renderUserInfo, renderCoworkers } from "./render_user.js";

const logout = document.querySelector(".logout");
const edit = document.getElementById("edit");

logout.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("email");

  window.location.assign("../../index.html");
});

renderUserInfo();
renderCoworkers();

edit.addEventListener("click", () => {
  editModal();
});
