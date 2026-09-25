
const form = document.getElementById('emailForm');
const submitButton =  document.getElementById('submitBtn');
const submitButtonText = document.getElementById('submitText');

const inputName = document.getElementById('name');
const inputEmail = document.getElementById('email');
const inputMessage = document.getElementById('message');

const errorName = document.getElementById('errorName');
const errorEmail = document.getElementById('errorEmail');
const errorMessage = document.getElementById('errorMessage');

let timeDelay;

//email pattern
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//validation=====================================================

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
//validate range of input character
const validateLength = (inputValue, errorContainer, inputName)=>{
    const inputLength = inputValue.length;
    const maxLength = (inputName === "Message")? 1000 : 50;
    if (inputLength === 0) {
        errorContainer.textContent = inputName + " is required.";
        return false;
    }
    if (inputLength < 3) {
        errorContainer.textContent = inputName + " must be at least 3 characters.";
        return false;
    }
    if (inputLength > maxLength) {
        errorContainer.textContent = inputName + " cannot exceed " + maxLength + " characters.";
        return false;
    }
    errorContainer.textContent = "";
    return true
}
const validateName = ()=>{
    const trimmedName = inputName.value.trim();
    inputName.value = trimmedName;
    if (!validateLength(trimmedName, errorName, "Name")) return false;
    errorName.textContent = "";
    return true;
}
const validateEmail = ()=>{
    const cleanEmail = inputEmail.value.replace(/\s/g, "");
    inputEmail.value = cleanEmail;
    if (cleanEmail === "") {
        errorEmail.textContent = "Email address is required.";
        return false;
    }
    if (!emailRegex.test(cleanEmail)) {
        errorEmail.textContent = "Please enter a valid email format.";
        return false
    }
    errorEmail.textContent = "";
    return true;
}
const validateMessage = ()=>{
    if (!validateLength(inputMessage.value, errorMessage, "Message")) return false;
    errorMessage.textContent = "";
    return true;
}

//real time validation
inputName.addEventListener("input", ()=>{
    clearTimeout(timeDelay);
    timeDelay = setTimeout(()=>{
        validateName();
    }, 500)
});
inputEmail.addEventListener("input", ()=>{
    clearTimeout(timeDelay);
    timeDelay = setTimeout(()=>{
        validateEmail();
    }, 500)
});
inputMessage.addEventListener("input", ()=>{
    clearTimeout(timeDelay);
    timeDelay = setTimeout(()=>{
        validateMessage();
    }, 500)
});

//send email=============================================
form.addEventListener('submit', async (event)=>{
    event.preventDefault();  
    const hCaptcha = form.querySelector('textarea[name=h-captcha-response]').value;

    if (!hCaptcha) {
        e.preventDefault();
        alert("Please fill out captcha field")
        return
    } 
    
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();
    if(isNameValid && isEmailValid && isMessageValid){
        //disabled button while sending
        if (submitButton) {
            submitButtonText.innerText = " Sending...";
            submitButton.disabled = true;
        }
        //send message every 5mins only
        const coolDownMS = 5 * 60 * 1000;
        const lastSubmission = localStorage.getItem('formLastSubmitted');
        const now = Date.now();
        if (lastSubmission && now - lastSubmission < coolDownMS) {
            const minutesLeft = Math.ceil((coolDownMS - (now - lastSubmission)) / 60000);
            alert(`Please wait ${minutesLeft} minute(s) before sending another message.`);
            submitButtonText.innerText = " Send";
            submitButton.disabled = false;
            document.getElementById('emailForm').reset();
            return;
        }
        const formData = {
            name: sanitizeInput(inputName.value),
            email: sanitizeInput(inputEmail.value),
            message: sanitizeInput(inputMessage.value),
        };
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                alert(json.message);
            } else {
                console.log(response);
                alert(json.message);
            }
        })
        .catch(error => {
            console.log(error);
            alert("Something went wrong!");
        })
        .then(function() {
            form.reset();
        })
        .finally(function() {
            submitText.innerHTML = "Send";
            submitBtn.disabled = false; 
        });

        
    }
})
