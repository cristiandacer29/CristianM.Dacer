
import galleryData from '../data/gallery.json' with { type: 'json' };
export let loadedImages = [];

const imagesName = (nameFromLocalStorage)=>{
    switch (nameFromLocalStorage) {
        case "Dishwashing":
            return "dishwashing";
        case "Cycling Jersey":
            return "jersey";
        case "Water refilling Station logo design":
            return "waterStation";
        case "Computer System Servicing (CSS NCII, COC)":
            return "tesda";
        case "Photoshop, Illustrator, and Blender Exercises":
            return "all";
        default:
            return "biking";
    }
} 

export const gallery = ()=>{
    if (!localStorage.getItem("currentProject"))return;
    const savedData = localStorage.getItem("currentProject");
    const savedDataObject = JSON.parse(savedData);
    if (document.getElementById('categoryText')) {
        const categoryText = document.getElementById('categoryText');
        const title = categoryText.querySelector("h2");
        const description = categoryText.querySelector("p");
        if(title && savedDataObject.name){
            title.textContent = savedDataObject.name;
        }
        if(description && savedDataObject.description){
            description.textContent = savedDataObject.description;
        }
    }
    let filteredJsonData = savedDataObject.category === "exercise" 
    ? galleryData.filter(item => item.category === savedDataObject.category) 
    : galleryData.filter(item => item.name === imagesName(savedDataObject.name) && item.category === savedDataObject.category);
    if(!filteredJsonData){
        console.error("No data found..");
        return [];
    }
    const gallery = document.getElementById('gallery');
    if(gallery){
        const cardFormat = (jsonData, imageName)=>{
            const card = document.createElement('div');
            card.className = "image-card flex neumorphism padding-medium radius-small popup-animation";
            card.innerHTML = `  <div class="img-container radius-small neumorphism-small padding-small">
                                    <img class="imageTag" src="" alt="">
                                </div>
                                <p class="imageDescription"></p>
                                <button class="neumorphism-button radius-medium image-hover">View Image...</button>`;
            
            card.querySelector('.imageTag').src = jsonData.folder+imageName;
            card.querySelector('.imageTag').dataset.image = jsonData.folder+imageName;
            card.querySelector('.imageTag').alt = imageName.replace(/\.[^/.]+$/, "");
            card.querySelector('.imageDescription').textContent  = imageName.replace(/\.[^/.]+$/, "");
            loadedImages.push(jsonData.folder+imageName);
            gallery.appendChild(card);
        }
        //load all image by category
        filteredJsonData.forEach(eachExercise => {
            eachExercise.images.forEach(imageName => {
                cardFormat(eachExercise, imageName);
            }) ;
            
        });
        //gallery show full size image button
        gallery.addEventListener('click', (event)=>{
            if(event.target.closest('button')){
                const parentCard = event.target.closest('.image-card');
                const cardImg = parentCard.querySelector('.img-container img');
                imageToView.src = cardImg.src;
                fullSizeImageDescription.textContent = cardImg.alt;
                fullSizeContainer.classList.remove('hide');
                //button for browser close button
                history.pushState({ modalOpen: true }, '');
                
            }
        })

    }
}
