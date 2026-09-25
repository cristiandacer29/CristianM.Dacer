const form = document.getElementById('emailForm');
const submitBtn = document.getElementById('submitBtn');
const submitText = document.getElementById('submitText');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const hCaptcha = form.querySelector('textarea[name=h-captcha-response]').value;

    if (!hCaptcha) {
        e.preventDefault();
        alert("Please fill out captcha field")
        return
    }
    
    submitText.textContent = "Please wait...";
    submitBtn.disabled = true;
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    if (object.website && object.website.trim() !== "") {
        console.warn("Spam bot detected!");
        return;
    }
    const json = JSON.stringify(object);

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
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
});