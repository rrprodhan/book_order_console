import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';

const app = express(); //Creates a server named app
app.use(express.urlencoded({extended: false})); //It will read the data sent by a HTML form
app.use(express.json()); //It will read the JSON data sent by a HTML page
app.use(cors()); //Included to avoide some browser specific issues

let database = {
    userInfo: [
        {id: 1, name:"Raiyan", password:"123", address:"130/10/1-C", email:"raiyan@gmail.com", mobile:"01797356651"},
        {id: 2, name:"abc", password:"123", address:"140/10/1-C", email:"abc@gmail.com", mobile:"01797356652"},
        {id: 3, name:"def", password:"123", address:"150/10/1-C", email:"def@gmail.com", mobile:"01797356653"}
    ],
    bookInfo: [
        {id: 1, name:"Web Design and Dev", writer:"Raiyan", price: 200, stock:30},
        {id: 2, name:"Math", writer:"IJK", price: 150, stock:10},
        {id: 3, name:"Biology", writer:"LMN", price: 100, stock:5},
        {id: 4, name:"Chemistry", writer:"OPQ", price: 50, stock:2}
    ],
    orderInfo: [
        {userId: 1, bookId: "3", quantity: 1, customerName:"Raiyan", shippingAddress:"130/10/1-C", email:"raiyan@gmail.com", mobile:"01797356651", format: "Hard copy", price: 150, status: "not ready for shipping"},
        {userId: 1, bookId: "1", quantity: 2, customerName:"Raiyan", shippingAddress:"130/10/1-B", email:"raiyan@gmail.com", mobile:"01797356651", format: "PDF", price: 150, status: "shipped"},
        {userId: 1, bookId: "2", quantity: 1, customerName:"Raiyan", shippingAddress:"130/10/1-E", email:"raiyan@gmail.com", mobile:"01797356651", format: "DJVU", price: 150, status: "shipped"}
    ],
    login: [
        {id: 1, email: "raiyan@gmail.com", hash: ""}
    ]
}

//Retrieve all user info
app.get('/', (req, res)=>{
    res.send(database.userInfo);
})

//Validate user login info
app.post('/login', (req, res)=>{
    let emailValid = false;
    let passValid = false;
    
    if(req.body.email && req.body.password){
        for(let index=0; index<database.userInfo.length; index++) {
            if(req.body.email === database.userInfo[index].email &&
                bcrypt.compareSync(req.body.password, database.userInfo[index].password)) {
                
                emailValid = true;
                passValid = true;
                res.json(database.userInfo[index]);
            }
        }

        if(!emailValid || !passValid) {
            res.status(400).json('error logging in');
        }
    } else {
        res.status(400).json('error logging in');
    }
})

//Register a new user
app.post('/register', (req, res)=>{
    const {name, password, address, email, mobile} = req.body;

    bcrypt.hash(password, null, null, function(err, hash) {
        database.userInfo.push({id: database.userInfo.length,
            name:name, 
            password:hash, 
            address:address, 
            email:email, 
            mobile:mobile}
        );
    });

    res.json(database.userInfo[database.userInfo.length-1]);
})

//Reduce book stock and add new order detail
app.post('/purchase', (req, res)=>{
    const {userId,name,address,email,mobile,bookName,writer,quantity,format,price} = req.body;
    let status = "";

    if(name && address && mobile){
        for(let index=0; index<database.bookInfo.length; index++) {
            if(database.bookInfo[index].name.includes(bookName) && 
            database.bookInfo[index].writer.includes(writer)) {
                if(database.bookInfo[index].stock > quantity) {
                    status = "shipped";
                } else {
                    status = "not ready for shipping";
                }

                database.bookInfo[index].stock -= quantity;

                database.orderInfo.push({userId: userId,
                    bookId: database.bookInfo[index].id, 
                    quantity: quantity, 
                    customerName: name,
                    shippingAddress:address, 
                    email:email, 
                    mobile:mobile,
                    format: format,
                    price: price,
                    status: status}
                );
                console.log(database.bookInfo[index].stock);
                console.log(status);
                res.json("success");
            }
        }
    } else {
        res.status(400).json('could not find a match');
    }
})

//Retrieve all book list
app.get('/booklist', (req, res)=>{
    res.json(database.bookInfo);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
