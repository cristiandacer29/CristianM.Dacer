const form = document.getElementById('emailForm');
const submitBtn = document.getElementById('submitBtn');
const submitText = document.getElementById('submitText');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    submitText.textContent = "Please wait...";
    submitBtn.disabled = true;

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
                //result.innerHTML = json.message;
                alert(json.message);
               // submitText.innerHTML = defaultHTML;
            } else {
                console.log(response);
                //result.innerHTML = json.message;
                alert(json.message);
                //submitText.innerHTML = defaultHTML;
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
            submitText.innerHTML = defaultHTML;
            submitButton.disabled = false; 
        });
});