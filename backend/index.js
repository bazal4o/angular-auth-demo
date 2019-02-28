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

const  findUserByEmail  = (email, cb) => {
    return  database.get(`SELECT * FROM users WHERE email = ?`,[email], (err, row) => {
            cb(err, row)
    });
}

const  createUser  = (user, cb) => {
    return  database.run('INSERT INTO users (firstName, lastName, email, password) VALUES (?,?,?,?)',user, (err) => {
        cb(err)
    });
}

createUsersTable();

router.get('/', (req, res) => {
    res.status(200).send('This is an authentication server. Status OK');
});

router.post('/register', (req, res) => {

    const  firstName  =  req.body.firstName;
    const  lastName = req.body.lastName;
    const  email  =  req.body.email;
    console.log(req.body);
    const  password  =  bcrypt.hashSync(req.body.password);

    createUser([firstName, lastName, email, password], (err)=>{
        if(err) return  res.status(500).send("Server error!");
        findUserByEmail(email, (err, user)=>{
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
    findUserByEmail(email, (err, user)=>{
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