const form = document.getElementById("form");
const visitorName = document.getElementById("name");
const visitorPurpose = document.getElementById("purpose");
const submitButton = document.getElementById("submit");

const errorName = document.getElementById("errorName");
const errorPurpose = document.getElementById("errorPurpose");
let timeDelay;
let purposes = [
    "General inquiry",
    "I want to work together",
    "Just reviewing your work",
    "Freelance or contract project",
    "I'm just exploring"
];

//clear all when browser back button click
window.addEventListener("pageshow", (event)=>{
    if (event.persisted) {
        form.reset();
        errorName.textContent = "";
        errorPurpose.textContent = "";
        nameInput.style.borderBottomColor = "";
        visitorPurpose.style.borderBottomColor = "";
        if (window.location.search) {
            window.location.replace(window.location.pathname);
        }
    }
})

//covert specialized character for anti scripting
const sanitizeInput = (text)=>{
    if (typeof text !== 'string') return '';
    return text
        .trim()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;")
        .replace(/\//g, "&#x2F;"); 
}

//validation
const validateLength = (inputValue, errorName, inputFieldName, borderElement) => {
    const inputValueLength = inputValue.trim().length;
    if(inputValueLength === 0){
        errorName.textContent = `${inputFieldName} is required`;
        borderElement.style.borderBottomColor = "red";
        return false;
    }
    if(inputValueLength < 3){
        errorName.textContent = `${inputFieldName} must be at least 3 characters`;
        borderElement.style.borderBottomColor = "red";
        return false;
    }
    if(inputValueLength > 30){
        errorName.textContent = `${inputFieldName} must be less than 30 characters`;
        borderElement.style.borderBottomColor = "red";
        return false;
    }
    errorName.textContent = "";
    borderElement.style.borderBottomColor = "";
    return true;
};
const validateVisitorName = () => {
    if(!validateLength(visitorName.value, errorName, "Name", visitorName )) return false;
    errorName.textContent = "";
    visitorName.style.borderBottomColor = "";
    return true;
}
const validateVisitorPurpose = () =>{
    if (visitorPurpose.value === "") {
        errorPurpose.textContent = "Please select your purpose";
        visitorPurpose.style.borderBottomColor = "red";
        return false;
    }
    if (purposes.includes(visitorPurpose.value)) {
        errorPurpose.textContent = "";
        visitorPurpose.style.borderBottomColor = "";
        return true;
    }
    errorPurpose.textContent = "Invalid purpose";
    visitorPurpose.style.borderBottomColor = "red";
    return false;
}

visitorName.addEventListener("input",()=>{
    clearTimeout(timeDelay);
    timeDelay = setTimeout(()=>{
        validateVisitorName();
    }, 500)
});
visitorPurpose.addEventListener("change",validateVisitorPurpose);
//submit good entry
form.addEventListener("submit", (event)=>{
    event.preventDefault();
    if (submitButton) {
        submitButton.innerText = "Connecting...";
        submitButton.disabled = true;
    }
    const isNameValid = validateVisitorName();
    const isPurposeValid = validateVisitorPurpose();
    console.log(isNameValid, isPurposeValid);
    if (isNameValid && isPurposeValid) {
        const clearName = sanitizeInput(visitorName.value);
        const clearPurpose = sanitizeInput(visitorPurpose.value);
        const formData = {
            name: clearName,
            message: `Visitor Logged | Purpose: ${clearPurpose}`
        };
         //The Web App URL you copied from Google Apps Script
        const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbzXq4UEIbEWKmfHuXrip-29TT1nA2tuYm-wq2oD0VfwJLsYwpffvzjDRh7MrUoTmL9a6Q/exec'; 
        fetch(googleScriptUrl, {
            method: 'POST',
            mode: 'no-cors', // Essential for handling cross-origin requests to Google Scripts
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })  
        .then(() => {
            document.cookie = `cristianDacerPortfolioVisitorName=${encodeURIComponent(clearName)};max-age=${(30 * 60)}; path=/; Secure; SameSite=Lax`;
            submitButton.innerText = "Connected!";
            submitButton.disabled = false;
            window.location.replace("./");
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Something went wrong.');
        });
    }
    
})
