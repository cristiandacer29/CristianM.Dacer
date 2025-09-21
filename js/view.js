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
    imageList = ["calamansi.png",
                "lemon.png",
                "mockup.png"]; 
    apdateDiscription(path + folderName + imageList[0], imageList[0].split(/[.]/).at());
}
else if(project == "jersey"){
    folderName = "jersey/";
    imageList = ["banner-01.png",
                "gloves.png",
                "jersey-b01_03.png",
                "jersey-f01_02.png",
                "PANTS_b03.png",
                "PANTS_f02.png",
                "SOCKS.png"]; 
    apdateDiscription(path + folderName + imageList[0], imageList[0].split(/[.]/).at());
}
else if(project == "logoDesign"){
    folderName = "waterStationLogo/";
    imageList = ["jme-logo.png",
                "logo3d.png",
                "logo vertical.png",
                "logo_banner horizontal.png",
                "long banner.jpg",
                "BANNER.png",
                "schedule.jpg",
                "business Card mockup.png",
                "business Card.png",
                "mockup.jpg",
                "mockup1.jpg",
                "mockup2.jpg",
                "STICKER1.png",
                "STICKER2.png"]; 
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