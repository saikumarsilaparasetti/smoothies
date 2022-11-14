const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const { requireAuth, checkUser } = require('./middleware/authMiddleware')


const app = express();
const authRoutes = require('./routes/authRoutes')
// middleware
app.use(express.static('public'));
app.use(bodyParser.json())
app.use(cookieParser())
// view engine
app.set('view engine', 'ejs');

// database connection
mongoose.connect('mongodb://localhost:27017/smoothies');
mongoose.connection.on('connected', ()=>{
    console.log('Connected to database');
})
mongoose.connection.on('error', (err)=>{
    if(err)
        console.log('Error Connecting to database'+err);
})

const port = 3000
app.listen(port, ()=>{
  console.log('Server is runnig at port '+port)
})

// routes
app.get('*', checkUser)
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth , (req, res) => res.render('smoothies'));
app.use(authRoutes)


app.get('/get-cookies', (req, res) => {
    // res.setHeader('Set-Cookie', 'newUser=true');
    res.cookie('newUser', false)
    res.send('You got the cookie!')

})

app.get('/read-cookies', (req, res) => {

})
