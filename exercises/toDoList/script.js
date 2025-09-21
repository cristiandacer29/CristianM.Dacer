
const newList = document.getElementById("newList");
const mainList = document.getElementById("mainList");
const flexContainer = document.getElementById("flexContainer");
function setLocalStorage(){
    localStorage.setItem("allList",mainList.innerHTML );
}
function GetLocalStorage(){
    mainList.innerHTML = localStorage.getItem("allList");
}
function toAddList(){
    if (newList.value == "" || newList.value == null) {
        alert("invalid input");
        newList.value = "";
    }
    else{
        var listCount = 0;
        var newDiv = document.createElement("div");
        newDiv.setAttribute("class", "flex-container");
        newDiv.setAttribute("id", "flexContainer");
        mainList.appendChild(newDiv);
    
        var p = document.createElement("p");
        p.innerHTML = newList.value;
        newDiv.appendChild(p);
    
        var img = document.createElement("img");
        img.setAttribute("src", "img/Error.png");
        newDiv.appendChild(img);
        listCount++;
        newList.value = "";
        setLocalStorage();
    }
}
mainList.addEventListener("click", (clickedElement)=>{
    if (clickedElement.target.tagName === "P") {
        clickedElement.target.classList.toggle("decoration");
        setLocalStorage();
    }
    else if(clickedElement.target.tagName == "IMG"){
        clickedElement.target.parentElement.remove();
        setLocalStorage();
    }
})
GetLocalStorage();
