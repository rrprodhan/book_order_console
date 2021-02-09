if(!sessionStorage.getItem("name")) {
    window.location.href = "../login.html";
}

const destroySession = () => {
    sessionStorage.clear();
    window.location.href = "../login.html";
}
destroySession();


