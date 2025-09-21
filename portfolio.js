
function changeImage(imageList) 
{
    document.getElementById("img-view").src = document.getElementById(imageList).src;
    document.getElementById("jerseyName").innerHTML = document.getElementById(imageList).alt;
} 
function imageFullScreen(illustratorImage)
{
    const createDiv = document.createElement("div");
    createDiv.setAttribute("class", "col-12 img-full-screen");
    createDiv.setAttribute("id", "viewImage");
    const elementHeader = document.header;
    document.body.insertBefore(createDiv, elementHeader);

    const createButton = document.createElement("button");
    createButton.setAttribute("class", "close-btn");
    createButton.setAttribute("onclick", "closeFullScreen()");
    createButton.innerHTML = "X";
    document.getElementById("viewImage").appendChild(createButton);

    const createDivChild = document.createElement("div");
    createDivChild.setAttribute("class", "full-screen-image");
    createDivChild.setAttribute("id", "viewImageChildDiv");
    document.getElementById("viewImage").appendChild(createDivChild);

    const createImg = document.createElement("img");
    createImg.setAttribute("class", "image-center");
    createImg.setAttribute("id", "fullViewImage");
    document.getElementById("viewImageChildDiv").appendChild(createImg);
    document.getElementById("fullViewImage").src = document.getElementById(illustratorImage).src

    document.body.style.overflow = "hidden";
}
function closeFullScreen()
{
    document.body.style.overflow = "visible";
    document.getElementById("viewImage").remove();
}
function notification()
{
    const triggerDesign = document.getElementById("trigger-design").value;
    const glowStyleEffect = document.getElementById("glow-style-effect");
    const iconImage = document.getElementById("change-icon");
    const notifyHeader = document.getElementById("notify-header");
    const notifyMessage = document.getElementById("notify-message");

    if (triggerDesign ==='success') {
        glowStyleEffect.style.boxShadow = "0 0 1rem rgb(61, 231, 72)";
        iconImage.src = "img/icons/Successful.png";
        notifyHeader.style.color = "rgb(61, 231, 72)";
        notifyHeader.innerHTML = "The message has been sent";
        notifyMessage.innerHTML = "Thank you for contacting me. I will respond as soon as possible.";
    }
    else if (triggerDesign ==='error')
    {
        glowStyleEffect.style.boxShadow = "0 0 1rem rgb(219, 59, 59)";
        iconImage.src = "img/icons/Error.png";
        notifyHeader.style.color = "rgb(219, 59, 59)";
        notifyHeader.innerHTML = "The message could not be sent";
        notifyMessage.innerHTML = "There is some problem while sending your message.";
    }
    else if (triggerDesign ==='useRobot')
        {
            glowStyleEffect.style.boxShadow = "0 0 1rem rgb(219, 59, 59)";
            iconImage.src = "img/icons/Error.png";
            notifyHeader.style.color = "rgb(219, 59, 59)";
            notifyHeader.innerHTML = "The message could not be sent";
            notifyMessage.innerHTML = "This message is being sent by a robot.";
        }
    else
    {
        // window.location = 'index.html';
    }
}
function toLink()
{
    window.location = "contact.html"
}
function scrollToSide(way)
{
    if (way === 'right')
    {
        document.getElementById("scrollToLeftOrRight").scrollLeft += 300;
    }
    else if(way === 'left')
    {
        document.getElementById("scrollToLeftOrRight").scrollLeft -= 300;
    }
}
