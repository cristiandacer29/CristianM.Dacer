//getImage
const images = document.getElementById("images");
const bigSizeImage = document.getElementById("bigSizeImage");
const discription = document.getElementById("discription");

var path = "img/";
var folderName;
var imageList = [];
var project = sessionStorage.getItem("project");
function apdateDiscription(newPath,newDiscription){
    bigSizeImage.src = newPath;
    discription.innerHTML = decodeURIComponent(newDiscription);
}
if (project == "dishwashing") {
    folderName = "dishwashing/";
    imageList = ["Calamansi.png",
                "Lemon.png",
                "Mockup.png"]; 
    apdateDiscription(path + folderName + imageList[0], imageList[0].split(/[.]/).at());
}
else if(project == "jersey"){
    folderName = "jersey/";
    imageList = ["Cycling team banner.png",
                "Cycling glove.png",
                "Cycling shirt front view.png",
                "Cycling shirt back view.png",
                "Cycing shorts front view.png",
                "Cycling shorts back view.png",
                "Cycling socks.png",
                "Final design front view.jpg",
                "Final design back view.jpg"]; 
    apdateDiscription(path + folderName + imageList[0], imageList[0].split(/[.]/).at());
}
else if(project == "logoDesign"){
    folderName = "waterStationLogo/";
    imageList = ["JME logo.png",
                "JME logo 3D version.png",
                "JME logo vertical style.png",
                "JME logo horizontal style.png",
                "JME establishment banner.jpg",
                "JME banner.png",
                "Business schedule banner.jpg",
                "Business card mockup.png",
                "Business card.png",
                "2.5 gallon water jug mockup.jpg",
                "5 gallon water jug mockup.jpg",
                "5 gallon water dispenser jug mockup.jpg",
                "JME circular sticker.png",
                "JME rectangular sticker.png"]; 
    apdateDiscription(path + folderName + imageList[0], imageList[0].split(/[.]/).at());
}
else{
    window.history.back();
}

imageList.forEach(imageList => {
    const imgElement = document.createElement("img");
    imgElement.src = path + folderName + imageList;
    imgElement.alt = imageList.split(/[.]/).at();
    images.appendChild(imgElement);
});

//toViewImage
function getFileName(path){
    return path.split(/[/\\]/).pop().split(/[.]/).at();
}
images.addEventListener("click", clickedImage =>{
    if (clickedImage.target.src || undefined) {
        bigSizeImage.src = clickedImage.target.src;
        discription.innerHTML = decodeURIComponent(getFileName(clickedImage.target.src));
    }
})

//close view.html
function closeView(){
    window.history.back();
}