const body = document.querySelector("body");

export function toltip(text){
    const tip = document.createElement("div");
    const close = document.createElement("img")
    const message = document.createElement("p");

    tip.classList.add("toltip");

    tip.id = "tip";
    close.src = "../assets/Vector X.png";
    message.innerText = text;

    close.addEventListener("click", () => {
        body.removeChild(tip)
    })

    tip.append(close, message);
    body.appendChild(tip)
} 

export function removeTip(){
 const tip = document.getElementById("tip");
 body.removeChild(tip)
}

export function okTip(text){
    setTimeout(() => removeTip(), 2000);
    toltip(text)
}