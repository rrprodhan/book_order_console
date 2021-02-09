if(!sessionStorage.getItem("name")) {
    window.location.href = "../index.html";
}

const destroySession = () => {
    sessionStorage.clear();
    window.location.href = "../index.html";
}
destroySession();


