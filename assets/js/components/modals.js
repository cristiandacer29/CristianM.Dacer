import { loadedImages } from './gallery.js'; 
export const modals = ()=>{
    let currentIndex = 0;
    const fullSizeContainer = document.getElementById('fullSizeContainer');
    const imageToView = document.getElementById('imageToView');
    const fullSizeImageDescription =  document.getElementById('fullSizeImageDescription');


    const closeLightbox = () => {
        fullSizeContainer.classList.add('hide');
    };
    
    if(fullSizeContainer){
        fullSizeContainer.addEventListener('click', (event)=>{
            if(event.target.closest('#close')){
                closeLightbox();
                history.back();
            }
        })
    }
    const displayImageIndex = (targetIndex) =>{
        currentIndex = targetIndex;
        const currentImagePath = loadedImages[currentIndex];
        fullSizeContainer.classList.add('loading');
        
        imageToView.src = currentImagePath;
        const fileName = currentImagePath.split('/').pop().split('.__')[0]; 
        const cleanName = decodeURIComponent(fileName).replace(/\.[^/.]+$/, "");
        imageToView.alt = cleanName;
        fullSizeImageDescription.classList.remove('slide-from-bottom-animation');
        void fullSizeImageDescription.offsetWidth;
        fullSizeImageDescription.classList.add('slide-from-bottom-animation');
        fullSizeImageDescription.textContent = cleanName;
        imageToView.onload = () =>{
            fullSizeContainer.classList.remove('loading');
        }
        preloadSurroundingAssets();
    }
    function preloadSurroundingAssets() {
        const nextItem = (currentIndex + 1) % loadedImages.length;
        const prevItem = (currentIndex - 1 + loadedImages.length) % loadedImages.length;

        const preloadNext = new Image();
        preloadNext.src = loadedImages[nextItem];

        const preloadPrev = new Image();
        preloadPrev.src = loadedImages[prevItem];
    }

    // 3. Keep your active click listeners exactly the same
    if(document.getElementById("next")){
        document.getElementById("next").addEventListener("click", () => {
            document.querySelector('.full-size-image-container').classList.remove('slide-from-right-animation', 'slide-from-left-animation');
            void document.querySelector('.full-size-image-container').offsetWidth;
            document.querySelector('.full-size-image-container').classList.add('slide-from-right-animation');
            displayImageIndex((currentIndex + 1) % loadedImages.length);
        });
    }

    if (document.getElementById("previews")) {
        document.getElementById("previews").addEventListener("click", () => {
            document.querySelector('.full-size-image-container').classList.remove('slide-from-right-animation', 'slide-from-left-animation');
            void document.querySelector('.full-size-image-container').offsetWidth;
            document.querySelector('.full-size-image-container').classList.add('slide-from-left-animation');
            displayImageIndex((currentIndex - 1 + loadedImages.length) % loadedImages.length);
        });
    }
    window.addEventListener('popstate', (event) => {
    // If the back button is clicked, hide the open modal frame
    closeLightbox();
    });
}