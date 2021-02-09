document.getElementById("button").addEventListener("click", function(event){
    const name = document.getElementById("name");
    const password = document.getElementById("password");
    const address = document.getElementById("address");
    const email = document.getElementById("email");
    const mobile = document.getElementById("mobile");
    const status = document.getElementById("status");
    
    fetch("http://localhost:3000/register", { //Default method of fetch is GET
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: name.value,
            password: password.value,
            address: address.value,
            email: email.value,
            mobile: mobile.value
        })
    })
    .then(response => response.json())
    .then(user => {
        console.log(user);
        status.innerHTML = "<br>Registration Complete!";
    })
});