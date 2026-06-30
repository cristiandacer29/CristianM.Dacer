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
    console.log('Modal opened, history state pushed.'); 
}
function closeModal() {
    modal.style.display = 'none';
    
    // If the modal was closed manually, remove the state we pushed
    if (window.history.state && window.history.state.modalOpen) {
        window.history.back(); 
        console.log('Modal closed, history state popped.'); 
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
    
}
window.addEventListener('popstate', function(event) {
    if (modal.style.display === 'block') {
        closeModal(); // Close the modal when the back button is clicked
        console.log('Back button pressed, modal closed.');
    }
});
