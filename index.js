let modeIconChange = document.getElementById("modeIconChange");
let darkmodeStatus = true;

modeIconChange.addEventListener("click", (evt) => {
    document.body.classList.toggle("light");
    if(darkmodeStatus === true){
        evt.target.setAttribute("src", "./images/icon-moon.svg");
        darkmodeStatus = false;
    }
    else{
        evt.target.setAttribute("src", "./images/icon-sun.svg");
        darkmodeStatus = true;
    }
})