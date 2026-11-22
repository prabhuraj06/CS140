const form = document.getElementById("myform");
const message = document.getElementById("message");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const fullname = document.getElementById("personname").value.trim();
    const lastname = document.getElementById("Lastname").value.trim();
    const emailInput = document.getElementById("email");
    const phone = document.getElementById("Phone").value.trim();
    const password = document.getElementById("password").value;
    const comments = document.getElementById("Comments").value.trim();
    const missionStart = document.getElementById("Missionstart").value;
    const missionEnd = document.getElementById("Missionends").value;
    const gender = form.querySelector('input[name="Gender"]:checked');
    const agreed = form.querySelector('input[name="Agree"]').checked;

    if (!fullname || !lastname || !emailInput.value.trim()) {
        alert("Please enter your first name, last name, and email.");
        return;
    }

    if (emailInput.validity.typeMismatch) {
        alert("Please enter a valid email address.");
        return;
    }

    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
        alert("Please enter a phone number with at least 10 digits.");
        return;
    }

    if (password.length < 8) {
        alert("Your password must be at least 8 characters long.");
        return;
    }

    if (comments.length < 20) {
        alert("Please write at least 20 characters in the comments box.");
        return;
    }

    if (!gender) {
        alert("Please choose a gender.");
        return;
    }

    if (!agreed) {
        alert("Please agree to the terms and conditions.");
        return;
    }

    if (missionStart && missionEnd && missionStart > missionEnd) {
        alert("The mission end date must be after the start date.");
        return;
    }

    // Collect the named form fields into one JavaScript object.
    const formData = Object.fromEntries(new FormData(form).entries());
    console.log(formData);

    // A static JSON file can return a response, but it cannot store form data.
    // Do not put the password in a GET URL.
    const requestData = { ...formData };
    delete requestData.Password;

    const queryString = new URLSearchParams(requestData).toString();
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "submit.json?" + queryString, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    message.textContent = response.message;
                    form.reset();
                } catch (error) {
                    alert("The response file does not contain valid JSON.");
                }
            } else {
                alert("Could not load submit.json. Check that it is in the same folder.");
            }
        }
    };

    xhr.send();
});