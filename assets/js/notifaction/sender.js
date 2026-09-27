const form = document.getElementById("form");
const visitorName = document.getElementById("name");
const visitorPurpose = document.getElementById("purpose");
const submitButton = document.getElementById("submit");
const submitButtonText = document.getElementById("submitText");

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
form.addEventListener("submit", async (event)=>{
    event.preventDefault();

    const hCaptcha = form.querySelector('textarea[name=h-captcha-response]')?.value;
    if (!hCaptcha) {
        alert("Please fill out captcha field")
        return
    }
    if (submitButton) {
        submitButtonText.innerText = " Connecting...";
        submitButton.disabled = true;
    }
    const isNameValid = validateVisitorName();
    const isPurposeValid = validateVisitorPurpose();
    if (isNameValid && isPurposeValid) {
        const clearName = sanitizeInput(visitorName.value);
        const clearPurpose = sanitizeInput(visitorPurpose.value);

        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        if (object.website && object.website.trim() !== "") {
            form.reset();
            return;
        }
        delete object.website;
        object.name = clearName;
        object.purpose = clearPurpose;
        try {
            const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(object)
        });
        const resultJson = await response.json();
        if (response.ok) { // Safe approach checking for 200-299 status
            document.cookie = `cristianDacerPortfolioVisitorName=${encodeURIComponent(clearName)};max-age=${(30 * 60)}; path=/; Secure; SameSite=Lax`;
            submitButtonText.innerText = " Connected!";
            submitButton.disabled = false;
            if (typeof hcaptcha !== 'undefined') hcaptcha.reset();
            window.location.replace("./");
            return
        } else {
            console.error("Server Error Response:", response);
            alert(resultJson.message || "Failed to submit form.");
            if (typeof hcaptcha !== 'undefined') hcaptcha.reset();
            submitButtonText.innerText = " Connect";
            submitButton.disabled = false;  
        }
        } catch (error) {
            console.error("Network Error:", error);
            alert("Something went wrong with the network!");
            if (typeof hcaptcha !== 'undefined') hcaptcha.reset();
            submitButtonText.innerText = " Connect!";
            submitButton.disabled = false;  
        }
    }
    
})
