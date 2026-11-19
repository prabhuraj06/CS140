
document.getElementById('myform').addEventListener('submit', function(event) {

    event.preventDefault();

    const fullname = document.getElementById('personname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const age = document.getElementById('age').value;
    const comments = document.getElementById('comments').value;

    if (!fullname || !email) {
        alert("You need a name and email.");
        return;
    }

    if (!age || age < 18) {
        alert("You need to be 18.");
        return;
    }

    if (!password || password.length < 8) {
        alert("Password must be at least 8 characters.");
        return;
    }

    if (!comments || comments.length < 20) {
        alert("Please write at least 20 characters in the comments box.");
        return;
    }

    const formData = {
        name: fullname,
        email: email,
        password: password,
        age: age,
        comments: comments
    };

    console.log(formData);

    const xhr = new XMLHttpRequest();

    xhr.open("GET", "submit.json", true);

    xhr.onreadystatechange = function() {

        if (xhr.readyState === 4 && xhr.status === 200) {

            const response = JSON.parse(xhr.responseText);

            document.getElementById('message').innerText = response.message;

        } else if (xhr.readyState === 4) {

            alert("Error submitting form.");

        }
    };

    xhr.send(JSON.stringify(formData));

});
