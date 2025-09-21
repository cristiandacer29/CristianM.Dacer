function loadProject (category) {
    sessionStorage.clear;
    sessionStorage.setItem("project", category);
}
var exercisesImages = document.getElementById("exercisesImages");
const modal = document.getElementById("modal");
const fullSceen =document.getElementById("fullScreen");
const caption =document.getElementById("caption");
exercisesImages.addEventListener("click", imageClicked=>{
    if (imageClicked.target.src != undefined) {
        modal.style.display = "flex";
        fullSceen.src = imageClicked.target.src;
        caption.innerHTML = imageClicked.target.alt
    }
    else{
        modal.style.display = "none";
    }
})
function toClose(){
    modal.style.display = "none";
}