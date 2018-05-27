const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// process.env.PORT is for heroku
const PORT = process.env.PORT || 3000;

var app = express();

// Below code is to define route
// Get method of express 
// First Arguement is url
// Second Arguement is request and reponse object.
// req object is use to get request header and body
// res object is use to send data to web-page
app.get('/', (req,res) => {
    //res.send('<h1>Hello Express !</h1>');
    res.send({
        name:'Nishit',
        lname:'Shah',
        likes:[
            'Biking',
            'Criket'
        ]
    });
});

//Express Middleware
// Middlware is works only those page that are set to be render
app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method}, ${req.originalUrl}`;
    console.log(log);
    fs.appendFileSync('server.log',log + '\n');
    // next function is important...
    next();
});
app.use((req,res,next) => {
    res.render('maintain.hbs');
});


// Method - 2 call using "localhost:3000/help.html"
app.use(express.static(__dirname+'/public'));

// Method - 3
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});
app.get('/about',(req,res) => {
    res.render('about.hbs',{
        pageTitle:'About',
        currentYear: new Date().getFullYear(),
        author:'Nishit Shah'
    });
});

// Method - 1
app.get('/bad',(req,res)=>{
    res.send({
        errormessage:'Unable to Handle request'
    });
});

app.listen(PORT);


