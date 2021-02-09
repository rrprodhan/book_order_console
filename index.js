if(sessionStorage.getItem("name")) {
    window.location.href = "user/home.html";
}

document.getElementById("button").addEventListener("click", function(event){
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const status = document.getElementById("status");
    
    fetch("http://localhost:3000/login", { //Default method of fetch is GET
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    })
    .then(response => response.json())
    .then(user => {
        if(user !== "error logging in") {
            // Creating a session
            sessionStorage.setItem("userId", user.id);
            sessionStorage.setItem("name", user.name);
            sessionStorage.setItem("address", user.address);
            sessionStorage.setItem("email", user.email);
            sessionStorage.setItem("mobile", user.mobile);

            window.location.href = "user/home.html";
        } else {
            status.innerHTML = "<br>Invalid Email or Password!";
        }
    })
});