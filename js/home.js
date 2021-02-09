if(!sessionStorage.getItem("name")) {
    window.location.href = "../login.html";
}

const username = document.getElementById("username");
// Retrieve user name from session
username.innerText = sessionStorage.getItem("name");

//Retrieve order status from url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const status = parseInt(urlParams.get('status'));
const alert = document.getElementById('alert');

if(status === 1) {
    alert.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
    Order Complete!
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    </div>`;
}

const showBookList = () => {
    const booklist = document.getElementById("booklist");

    fetch("http://localhost:3000/booklist")
    .then(response => response.json())
    .then(book => {
        console.log(book);
        book.forEach(book => {
            booklist.innerHTML += `<tr><td>${book.name}</td>
            <td>${book.writer}</td>
            <td><a href="order.html?id=${book.id}"><input type="button" class="btn btn-dark button purchase" name="submit" value="Purchase"/></a></td></tr>`;
        })
    })
}

showBookList();

document.getElementById("button").addEventListener("click", function(event){
    const name = document.getElementById("name").value;
    
    fetch("http://localhost:3000/booklist")
    .then(response => response.json())
    .then(book => {
        console.log(book);
        booklist.innerHTML = `<tr><th>Book Name</th>
        <th>Writer</th>
        <th>Place Order</th></tr>`;

        book.forEach(book => {
            if(book.name.includes(name)) {
                booklist.innerHTML += `
                <tr><td>${book.name}</td>
                <td>${book.writer}</td>
                <td><a href="order.html?id=${book.id}"><input type="button" class="btn btn-dark button purchase" name="submit" value="Purchase"/></a></td></tr>`;
            }
        })
    })
});


