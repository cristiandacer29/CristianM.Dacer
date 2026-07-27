//getImage
const images = document.getElementById("images");
const bigSizeImage = document.getElementById("bigSizeImage");
const description = document.getElementById("description");

var path = "img/";
var folderName;
var imageList = [];
var project = sessionStorage.getItem("project");
function updateDescription(newPath,newDescription){
    bigSizeImage.src = newPath;
    description.innerHTML = decodeURIComponent(newDescription);
}
if (project == "dishwashing") {
    folderName = "dishwashing/";
    imageList = ["Calamansi.png",
                "Lemon.png",
                "Mockup.png",
                "Actual Design of Calamansi.jpg",
                "Actual Design of Lemon.jpg"]; 
    updateDescription(path + folderName + imageList[0], imageList[0].split(/[.]/).at());
}
else if(project == "jersey"){
    folderName = "jersey/";
    imageList = ["Cycling team banner.png",
                "Tailor render.png",
                "Cycling shirt front view.png",
                "Cycling shirt back view.png",
                "Cycling shorts front view.png",
                "Cycling shorts back view.png",
                "Cycling socks.png",
                "Cycling glove.png",
                "Final design front view.png",
                "Final design back view.png"]; 
    updateDescription(path + folderName + imageList[0], imageList[0].split(/[.]/).at());
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
                "business Card mockup.png",
                "business Card.png",
                "2.5 gallon water jug mockup.jpg",
                "5 gallon water jug mockup.jpg",
                "5 gallon water dispenser jug mockup.jpg",
                "JME circular sticker.png",
                "JME rectangular sticker.png"]; 
    updateDescription(path + folderName + imageList[0], imageList[0].split(/[.]/).at());
}
else if(project == "tesda"){
    folderName = "tesda/";
    imageList = ["Class officers.jpg",
                "First day orientation in CSS NCII.jpg",
                "Class zoom Meeting.png",
                "Computer assemble and power supply checking.jpg",
                "Creating network cables.jpg",
                "Institutional assessment assemble and disassemble of system unit.jpg",
                "Institutional assessment creating bootable flash drive.jpg",
                "Institutional assessment setup local area network connections.jpg",
                "Peer to peer network connection activity.jpg",
                "Setup wired network environment by group.jpg",
                "National assessment group 2nd batch.jpeg",
                "National assessment group with our assessors.jpeg"];
    updateDescription(path + folderName + imageList[0], imageList[0].split(/[.]/).at());
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
        description.innerHTML = decodeURIComponent(getFileName(clickedImage.target.src));
        bigSizeImage.classList.remove('popup-animation');
        void bigSizeImage.offsetWidth;
        bigSizeImage.classList.add('popup-animation');
    }
})

//close view.html
function closeView(){
    window.history.back();
}
