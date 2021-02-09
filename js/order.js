if(!sessionStorage.getItem("name")) {
    window.location.href = "../login.html";
}

const username = document.getElementById("username");
// Retrieve user name from session
username.innerText = sessionStorage.getItem("name");

//Retrieve bookId from url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const bookId = parseInt(urlParams.get('id'));

const customerName = document.getElementById("recipient-name");
const customerAddress = document.getElementById("recipient-address");
const customerEmail = document.getElementById("recipient-email");
const customerMobile = document.getElementById("recipient-mobile");
const bookName = document.getElementById("recipient-book-name");
const bookWriter = document.getElementById("recipient-writer");
const bookQuantity = document.getElementById("recipient-quantity");
const bookFormat = document.getElementById("recipient-format");
const bookPrice = document.getElementById("recipient-price");
const alert = document.getElementById("alert");

fetch("http://localhost:3000/booklist")
.then(response => response.json())
.then(book => {
    book.forEach(book => {
        if(book.id === bookId) {
            customerName.value = sessionStorage.getItem("name");
            customerAddress.value = sessionStorage.getItem("address");
            customerEmail.value = sessionStorage.getItem("email");
            customerMobile.value = sessionStorage.getItem("mobile");
            bookName.value = book.name;
            bookWriter.value = book.writer;
            bookPrice.value = book.price;
            for(let index=1; index<=50; index++) {
                bookQuantity.innerHTML += `<option value="${index}">${index}</option>`;
            }
            
            let tempBookPrice = parseInt(bookPrice.value);
            document.getElementById("recipient-format").addEventListener("click", function(event){
                if(bookFormat.value === "hardCopy") {
                    tempBookPrice = book.price;
                } else if(bookFormat.value === "pdf") {
                    tempBookPrice = book.price;
                    tempBookPrice -= book.price*0.1;
                } else if (bookFormat.value === "djvu") {
                    tempBookPrice = book.price;
                    tempBookPrice -= book.price*0.2;
                }

                bookPrice.value = tempBookPrice;
            })

            document.getElementById("recipient-quantity").addEventListener("click", function(event){
                if(bookQuantity.value > book.stock && bookFormat.value === "hardCopy") {
                    alert.innerHTML = `<div class="alert alert-danger" role="alert">
                        Sorry! Specified amount of copies are not available right now, but we can ship it within 1 month.
                    </div>`;
                } else {
                    alert.innerHTML = `<div></div>`;
                }
            })
        }
    })
})

document.getElementById("order").addEventListener("click", function(event){
    const name = customerName.value;
    const address = customerAddress.value;
    const email = customerEmail.value;
    const mobile = customerMobile.value;
    const bkName = bookName.value;
    const bkWriter = bookWriter.value;
    const bkQuantity = bookQuantity.value;
    const bkFormat = bookFormat.value;
    const bkPrice = bookPrice.value;
    
    fetch("http://localhost:3000/booklist")
    .then(response => response.json())
    .then(book => {
        console.log(book);
        book.forEach(book => {
            if(book.id === bookId) {
                fetch("http://localhost:3000/purchase", { //Default method of fetch is GET
                    method: "post",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        userId: sessionStorage.getItem("userId"),
                        name: name,
                        address: address,
                        email: email,
                        mobile: mobile,
                        bookName: bkName,
                        writer: bkWriter,
                        quantity: bkQuantity,
                        format: bkFormat,
                        price: bkPrice
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if(data === "success") {
                        status.innerHTML = `<br><span style="color:green;">Order Complete!</span>`;
                    }
                })

                let status = 1;
                window.location.href = `home.html?status=${status}`;
            }
        })
    })
});


