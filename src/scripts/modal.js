import { companies } from "./requests/api.js";
import { updateUser } from "./requests/user.js";
import { createDep, updateDep, deleteDep, hireUser, fireUser } from "./requests/department.js";
import { usersAvailable, users, updateDepUser, deleteUser } from "./requests/admin.js";
import { toltip, okTip } from "./toltip.js";

const body = document.getElementById("admin-body");
const bodyUser = document.getElementById("user-body");
const token = JSON.parse(localStorage.getItem("token"));

export function editModal(){
    const showModal = document.createElement("div");
    const modal = document.createElement("div");
    const close = document.createElement("img");
    const profile = document.createElement("h3");
    const username = document.createElement("input");
    const email = document.createElement("input");
    const password = document.createElement("input");
    const update = document.createElement("button");

    showModal.classList.remove("none");
    showModal.classList.add("show-modal");
    modal.classList.add("modal");

    close.src="../assets/Vector X.png";
    profile.innerText = "Editar Perfil";
    username.placeholder = "Seu nome";
    email.placeholder = "Seu email";
    password.placeholder = "Sua senha";
    update.innerText = "Editar Perfil";

    close.addEventListener("click", () => {
        bodyUser.removeChild(showModal)
    })

    update.addEventListener("click", async (e) => {
        e.preventDefault();

        const bodyReq = {
            username: username.value,
            email: email.value,
            password: password.value
        };
        
        const userUpdate = await updateUser(token, bodyReq);
        const message = "Atualização feita com sucesso!"

        if(userUpdate.error){
            return toltip(userUpdate.error)
        }

        await updateUser(token, bodyReq)
        
        showModal.classList.remove("show-modal");
        showModal.classList.add("none");
        okTip(message);
        setTimeout(() => window.location.reload(), 1667)
    })

    modal.append(close, profile, username, email, password, update);
    showModal.appendChild(modal);
    bodyUser.appendChild(showModal)
}

export async function createDepModal(){
    const showModal = document.createElement("div");
    const modal = document.createElement("div");
    const close = document.createElement("img");
    const title = document.createElement("h3");
    const name = document.createElement("input");
    const description = document.createElement("input");
    const company = document.createElement("select");
    const disabledOption = document.createElement("option")
    const create = document.createElement("button");

    showModal.classList.remove("none");
    showModal.classList.add("show-modal");
    modal.classList.add("modal");

    close.src="../assets/Vector X.png";
    title.innerText = "Criar Departamento";
    name.placeholder = "Nome do departamento";
    description.placeholder = "Descrição";
    company.name = "create-dep";
    disabledOption.value="";
    disabledOption.innerText="Selecionar empresa";
    create.innerText = "Criar o departamento";

    close.addEventListener("click", () => {
        body.removeChild(showModal)
    })

    company.insertAdjacentHTML("afterbegin", `<option value="" disabled selected > Selecionar empresa </option>`);
    const comps = await companies();
    comps.forEach((comp) => {
        const option = document.createElement("option");
 
        option.innerText = comp.name;
        option.value = comp.uuid;

        company.appendChild(option)
    })

    create.addEventListener("click", async () => {
        const body = {
            name: name.value,
            description: description.value,
            company_uuid: company.value
        }

        const depCreate = await createDep(token, body);

        if(depCreate.error){
            return toltip(depCreate.error)
        }

        const message = "Novo departamento criado"

        showModal.classList.remove("show-modal");
        showModal.classList.add("none");
        okTip(message);
        setTimeout(() => window.location.reload(), 1667)        
    })

    modal.append(close, title, name, description, company, create)
    showModal.appendChild(modal)
    body.appendChild(showModal)
}

export function editDepModal(text, id){
    const showModal = document.createElement("div");
    const modal = document.createElement("div");
    const close = document.createElement("img");
    const title = document.createElement("h3");
    const description = document.createElement("textarea");
    const update = document.createElement("button");

    showModal.classList.remove("none");
    showModal.classList.add("show-modal");
    modal.classList.add("modal");

    close.src="../assets/Vector X.png";
    title.innerText = "Editar Departamento";
    description.innerText = `${text}`;
    update.innerText = "Salvar alterações";

    close.addEventListener("click", () => {
        body.removeChild(showModal)
    })

    update.addEventListener("click", async (e) => {
        e.preventDefault();

        const body = {
            description: description.value
        };
        
        const depUpdate = await updateDep(id, token, body);
        const message = "Atualização feita com sucesso!"

        if(depUpdate.error){
            return toltip(depUpdate.error)
        }
        
        showModal.classList.remove("show-modal");
        showModal.classList.add("none");
        okTip(message);
        setTimeout(() => window.location.reload(), 1667)
    })

    modal.append(close, title, description, update)
    showModal.appendChild(modal)
    body.appendChild(showModal)
}

export function deleteDepModal(name, id){
    const showModal = document.createElement("div");
    const modal = document.createElement("div");
    const close = document.createElement("img");
    const title = document.createElement("h3");
    const remove = document.createElement("button");

    showModal.classList.remove("none");
    showModal.classList.add("show-modal");
    modal.classList.add("modal");

    close.src="../assets/Vector X.png";
    title.innerText = `Realmente deseja deletar o Departamento ${name} e demitir seus funcionários?`;
    remove.innerText = "Confirmar";

    close.addEventListener("click", () => {
        body.removeChild(showModal)
    })

    remove.addEventListener("click", async (e) => {
        e.preventDefault();
        
        const depDelete = await deleteDep(id, token);
        const message = "Departamento removido"
        
        if(depDelete.error){
            return toltip(depDelete.error)
        }
        
        showModal.classList.remove("show-modal");
        showModal.classList.add("none");
        okTip(message);
        setTimeout(() => window.location.reload(), 1667)
    })

    modal.append(close, title, remove)
    showModal.appendChild(modal)
    body.appendChild(showModal)
}

export async function viewDepModal(name, text, comp, depId){
    const showModal = document.createElement("div");
    const modal = document.createElement("div");
    const close = document.createElement("img");
    const title = document.createElement("h3");
    const box = document.createElement("div");
    const infoBox = document.createElement("div");
    const description = document.createElement("h4");
    const company = document.createElement("p");
    const userBox = document.createElement("div");
    const username = document.createElement("select");
    const hireBtn  = document.createElement("button");
    const userList = document.createElement("ul");

    showModal.classList.remove("none");
    showModal.classList.add("show-modal");
    modal.classList.add("modal");

    close.src="../assets/Vector X.png";
    title.innerText = `${name}`;
    description.innerText = `${text}`;
    company.innerText = `${comp}`;
    username.name= "set-outwork";
    hireBtn.innerText = "Contratar";
    userList.id = "dep-users-list";

    username.insertAdjacentHTML("afterbegin", `<option value="" disabled selected > Selecionar usuário </option>`);

    async function renderViewOption(){
        const outworkers = await usersAvailable(token);
        outworkers.forEach((user) => {
            const option = document.createElement("option");
            option.value = user.uuid;
            option.innerText = user.username;
            username.appendChild(option)
        })
    };
    renderViewOption();

    async function renderDepUser(user){
        const card = document.createElement("li");
        const username = document.createElement("h4");
        const profLevel = document.createElement("p");
        const company = document.createElement("p");
        const fireBtn = document.createElement("button");

        username.innerText = user.username;
        profLevel.innerText = user.professional_level;
        company.innerText = `${comp}`;
        fireBtn.innerText = "Desligar";

        fireBtn.addEventListener("click", async(e) =>{
            e.preventDefault();

            const id = user.uuid;
            const fire = await fireUser(id, token);
            const message = "Usuário demitido";
    
            if(fire.error){
                return toltip(hire.error)
            }
            
            showModal.classList.remove("show-modal");
            showModal.classList.add("none");
            okTip(message);
            setTimeout(() => window.location.reload(), 1667)
        })

        card.append(username, profLevel, company, fireBtn)
        userList.appendChild(card)
    }

    const usersDep = await users(token);
    const filterUsers = usersDep.filter( user => user.department_uuid === depId)
    filterUsers.forEach((user) => {
        renderDepUser(user)
    })

    close.addEventListener("click", () => {
        body.removeChild(showModal)
    });

    hireBtn.addEventListener("click", async (e) =>{
        e.preventDefault()
        const id = username.value;
        const body = {
            user_uuid: id,
            department_uuid: depId
        }
        const hire = await hireUser(token, body);
        const message = "Usuário contratado";

        if(hire.error){
            return toltip(hire.error)
        }
        
        showModal.classList.remove("show-modal");
        showModal.classList.add("none");
        okTip(message);
        setTimeout(() => window.location.reload(), 1667)
    });

    infoBox.append(description, company);
    userBox.append(username, hireBtn);
    box.append(infoBox, userBox);
    modal.append(close, title, box, userList);
    showModal.appendChild(modal);
    body.appendChild(showModal)
}

export function editUserModal (id) {
    const showModal = document.createElement("div");
    const modal = document.createElement("div");
    const close = document.createElement("img");
    const title = document.createElement("h3");
    const kindInput = document.createElement("select");
    const homeOffice = document.createElement("option");
    const present = document.createElement("option");
    const hybrid = document.createElement("option");
    const levelInput = document.createElement("select");
    const trainne = document.createElement("option");
    const junior = document.createElement("option");
    const full = document.createElement("option");
    const senior = document.createElement("option");
    const editBtn = document.createElement("button");

    showModal.classList.remove("none");
    showModal.classList.add("show-modal");
    modal.classList.add("modal");

    close.src="../assets/Vector X.png";
    title.innerText = "Editar Usuário";
    homeOffice.innerText = "Home Office";
    homeOffice.value = "home office";
    present.innerText = "Presencial";
    present.value = "presencial";
    hybrid.innerText = "Híbrido";
    hybrid.value = "hibrido";
    trainne.innerText = "Trainee";
    trainne.value = "estágio";
    junior.innerText = "Júnior";
    junior.value = "júnior";
    full.innerText = "Pleno";
    full.value = "pleno";
    senior.innerText = "Sênior";
    senior.value = "sênior";
    editBtn.innerText = "Editar";

    kindInput.insertAdjacentHTML("afterbegin", `<option value="" disabled selected > Selecionar modalidade de trabalho </option>`);
    levelInput.insertAdjacentHTML("afterbegin", `<option value="" disabled selected > Selecionar nível profissional </option>`);

    close.addEventListener("click", () => {
        body.removeChild(showModal)
    });
    
    editBtn.addEventListener("click", async (e) =>{
        e.preventDefault()

        const body = {
            kind_of_work: kindInput.value,
            professional_level: levelInput.value
        }
        const edit = await updateDepUser(id, token, body);
        const message = "Informações atualizadas";

        if(edit.error){
            return toltip(edit.error)
        }
        
        showModal.classList.remove("show-modal");
        showModal.classList.add("none");
        okTip(message);
        setTimeout(() => window.location.reload(), 1667)
    });

    kindInput.append(homeOffice, present, hybrid);
    levelInput.append(trainne, junior, full, senior);
    modal.append(close, title, kindInput, levelInput, editBtn);
    showModal.appendChild(modal);
    body.appendChild(showModal)
}

export function removeUserModal(name, id){
    const showModal = document.createElement("div");
    const modal = document.createElement("div");
    const close = document.createElement("img");
    const title = document.createElement("h3");
    const removeBtn = document.createElement("button");

    showModal.classList.remove("none");
    showModal.classList.add("show-modal");
    modal.classList.add("modal");

    close.src="../assets/Vector X.png";
    title.innerText = `Realmente deseja remover o usuário ${name}?`;
    removeBtn.innerText = "Deletar";

    close.addEventListener("click", () => {
        body.removeChild(showModal)
    })

    removeBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        
        const userDelete = await deleteUser(id, token);
        console.log(userDelete);
        const message = "Funcionário removido"
        
        if(userDelete.error){
            return toltip(userDelete.error)
        }
        
        showModal.classList.remove("show-modal");
        showModal.classList.add("none");
        okTip(message);
        setTimeout(() => window.location.reload(), 1667)
    })

    modal.append(close, title, removeBtn)
    showModal.appendChild(modal)
    body.appendChild(showModal)
}