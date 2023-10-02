import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import path from 'path'


const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.json());
app.use(express.static('public'))

const con = mysql.createConnection({
    host: "localhost",
    port: 3308,
    user: "root",
    password: "",
    database: "signup",
    
})

con.connect(function(err) {
    if(err) {
        console.log("Error in Connection");
    } else {
        console.log("Connected");
    }
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage
})

app.post('/login', (req, res) => {
    const sql ="SELECT * FROM users Where email = ? AND password = ?";
    con.query(sql, [req.body.email, req.body.password], (err, result) =>{
        if(err) return res.json({Status: "Error occured", Error: 'Error running query'});
        if(result.length > 0){
            return res.json({Status: "Success"})
        } else {
            return res.json({Status: "Error", Error: "Wrong Email or password"})
        }
    })
})



app.post('/create',upload.single('image'), (req, res) => {
    const sql = "INSERT INTO teachers (`name`,`email`, `phone`, `password`, `address`, `salary, `image`) VALUES (?)";
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        if(err) return res.json({Error: "Error in hashing password"});
        const values = [
            req.body.name,
            req.body.email,
            req.body.phone,
            hash,
            req.body.address,
            req.body.salary,
            
            req.file.filename
        ]
        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Error: "Inside signup query function"});
            return res.json({Status: "Success"});
        })
    } )
})

app.get('/getTeacher', (req, res) => {
    const sql = "SELECT * FROM teachers";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Get teacher error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})


app.listen(8080, ()=> {
    console.log("Running");
})