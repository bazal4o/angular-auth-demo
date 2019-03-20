"use strict";
const  express  =  require('express');
const  bodyParser  =  require('body-parser');
const cors = require('cors')

const  sqlite3  =  require('sqlite3').verbose();
const  jwt  =  require('jsonwebtoken');
const  bcrypt  =  require('bcryptjs');

const SECRET_KEY = "secretkey23456";

const  app  =  express();
const  router  =  express.Router();
app.use(cors())
router.use(bodyParser.urlencoded({ extended:  false }));
router.use(bodyParser.json());
const database = new sqlite3.Database("./authentication-data.db");

const  createUsersTable  = () => {
    const  sqlQuery  =  `
        CREATE TABLE IF NOT EXISTS users (
        id integer PRIMARY KEY,
        firstName text,
        lastName text,
        email text UNIQUE,
        password text)`;

    return  database.run(sqlQuery);
}

const createCustomersTable = () => {
    const  sqlQuery  =  `
        CREATE TABLE IF NOT EXISTS customers (
        id integer PRIMARY KEY,
        firstName text,
        lastName text,
        email text UNIQUE,
        password text,
        phone number,
        facebook string)`;
    return  database.run(sqlQuery);
}
const createOrdersTable = () => {
    const  sqlQuery  =  `
        CREATE TABLE IF NOT EXISTS orders (
        id integer PRIMARY KEY,
        status integer NOT NULL, 
        customer_id integer NOT NULL,
            FOREIGN KEY (customer_id) REFERENCES customers(id))`;
    return  database.run(sqlQuery);
}

const createOrderDetailsTable = () => {
    const  sqlQuery  =  `
        CREATE TABLE IF NOT EXISTS order_details (
        id integer PRIMARY KEY,
        order_id integer NOT NULL references orders(id),
        product_id integer NOT NULL references products(id))`;
    return  database.run(sqlQuery, (err) => {
        if (err) {
            console.log(err);
        }
    });
}

const createProductsTable = () => {
    let  sqlQuery  =  `
    CREATE TABLE IF NOT EXISTS products (
    id integer PRIMARY KEY,
    name text UNIQUE,
    price number,
    description text)`;
    database.run(sqlQuery, (err) => {
        if (err) {
            console.log(err);
        }
    }); 

}
const feedProducts = () => {
    let products = [];
    const product1 = ["Full wash", 25, "This is full car wash"];
    const product2 = ["Inside wash", 20, "This is inside car wash only"];
    const product3 = ["Outside wash", 15, "This is outside car wash Only"];
    products.push(product1);
    products.push(product2);
    products.push(product3); 
    for (let index = 0; index < products.length; index++) {
        const element = products[index];
        const sqlQuery = `INSERT INTO products (name, price, description) VALUES (?,?,?)`;
        database.run(sqlQuery, element, function(err) {
            if (err) {
                console.log(err);
            }
        });
    }
}

const  findCustomerByEmail  = (email, cb) => {
    return  database.get(`SELECT * FROM customers WHERE email = ?`,[email], (err, row) => {
            cb(err, row)
    });
}

const findCustomerById = (id, cb) => {
    return database.get(`SELECT * FROM customers WHERE id = ?`,[id], (err, row) => {
            cb(err, row)
    });
}

const  createUser  = (user, cb) => {
    return  database.run('INSERT INTO users (firstName, lastName, email, password) VALUES (?,?,?,?)',user, (err) => {
        //callback for whatever reason
        cb(err)
    });
}

const createCustomer = (customer, cb) => {
    return database.run('INSERT INTO customers (firstName, lastName, phone, email, facebook, password ) VALUES (?,?,?,?,?,?)',
    customer, function(err) {
        if (err) {
            cb(err.message);
        } else {
            findCustomerById(this.lastID, (err, user) => {
                cb(err, {"lastId": this.lastID, "user": user});
            });
        }
    });
}

const getCustomers = (cb) => {
    return database.all(`SELECT id, firstName, lastName, email, phone FROM customers`, (err, customers) => {
        cb(err, customers);
    })
}
const dropTable = (table) => {
    const  sqlQuery  =  `DROP TABLE ${table}`;
    return  database.run(sqlQuery, (res, err) => {
        if (err) {
            console.log(err.message);
        }
    })
}
// createUsersTable();
// createCustomersTable();
// dropTable('orders');
//createProductsTable();
createOrdersTable();
createOrderDetailsTable();
// feedProducts();
router.get('/', (req, res) => {
    res.status(200).send('This is an authentication server. Status OK');
});
router.get('/customers', (req, res) => {
       getCustomers((err, response) => {
        if (err) {
            res.status(500).send("Server error: " + err.message );
        } else {
            res.status(200).send(response);
        }
       });
    } 
);

router.post('/registerCustomer', (req, res) => {
    // Validation required
    
    const firstName  =  req.body.firstName;
    const lastName = req.body.lastName;
    const email  =  req.body.email;
    const phone = req.body.phone;
    const password  =  bcrypt.hashSync(req.body.password)
    createCustomer([firstName, lastName, phone, email, "", password], (err, response)=> {
        if(err) { 
            return  res.status(500).send("Server error: " + err.message );
        } else { 
            return res.status(200).send(response);
        }
    })
});
router.post('/register', (req, res) => {

    const  firstName  =  req.body.firstName;
    const  lastName = req.body.lastName;
    const  email  =  req.body.email;
    console.log(req.body);
    const  password  =  bcrypt.hashSync(req.body.password);

    createUser([firstName, lastName, email, password], (err)=>{
        if(err) return  res.status(500).send("Server error!");
        findCustomerByEmail(email, (err, user)=>{
            if (err) return  res.status(500).send('Server error!');  
            const  expiresIn  =  24  *  60  *  60;
            const  accessToken  =  jwt.sign({ id:  user.id }, SECRET_KEY, {
                expiresIn:  expiresIn
            });
            res.status(200).send({ "user":  user, "access_token":  accessToken, "expires_in":  expiresIn          
            });
        });
    });
});


router.post('/login', (req, res) => {
    const  email  =  req.body.email;
    const  password  =  req.body.password;
    findCustomerByEmail(email, (err, user)=>{
        if (err) return  res.status(500).send('Server error!');
        if (!user) return  res.status(404).send('User not found!');
        const  result  =  bcrypt.compareSync(password, user.password);
        if(!result) return  res.status(401).send('Password not valid!');

        const  expiresIn  =  24  *  60  *  60;
        const  accessToken  =  jwt.sign({ id:  user.id }, SECRET_KEY, {
            expiresIn:  expiresIn
        });
        res.status(200).send({ "user":  user, "access_token":  accessToken, "expires_in":  expiresIn});
    });
});

app.use(router);
const  port  =  process.env.PORT  ||  3008;
app.listen(port, () => {
    console.log('Server listening at http://localhost:'  +  port);
});