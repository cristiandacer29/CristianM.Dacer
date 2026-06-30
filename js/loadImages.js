function loadProject (category) {
    sessionStorage.clear;
    sessionStorage.setItem("project", category);
}

var exercisesImages = document.getElementById("exercisesImages");
const modal = document.getElementById("modal");
const fullScreen =document.getElementById("fullScreen");
const caption =document.getElementById("caption");

function openModal() {
    window.history.pushState({ modalOpen: true }, '', null);
}
function closeModal() {
    modal.style.display = 'none';
    if (window.history.state && window.history.state.modalOpen) {
        window.history.back(); 
    }
}

exercisesImages.addEventListener("click", imageClicked=>{
    if (imageClicked.target.src != undefined) {
        modal.style.display = "flex";
        fullScreen.src = imageClicked.target.src;
        caption.innerHTML = imageClicked.target.alt;
        openModal();
    }
    else{
        modal.style.display = "none";
    }
})

function toClose(){
    modal.style.display = "none";
    closeModal();
}

window.addEventListener('popstate', function(event) {
    if (modal.style.display === 'flex') {
        closeModal(); 
        console.log('Back button clicked, modal closed.'); 
    }
});
