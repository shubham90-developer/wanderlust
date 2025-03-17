const express = require("express");
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const ejsMate = require('ejs-mate');
const path = require("path");
const flash = require('connect-flash');


app.engine('ejs', ejsMate);
app.set("view engine" ,"ejs");
app.set("views" ,path.join(__dirname ,"views"));

app.use(cookieParser("secretcode"));
app.use(flash());

app.use(session({secret: 'keyboard cat' ,resave: false ,saveUninitialized: true}));
app.use((req ,res ,next)=>{
    res.locals.messages = req.flash("success");
    res.locals.name = req.session.name;
    next();
})

app.get("/sessionId" ,(req ,res)=>{
    res.send("this is session id");
})

// app.get("/reqcount" ,(req ,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count = 1;
//     }
//     res.send(`request is sent ${req.session.count} times`);
// })

app.get("/register" ,(req ,res)=>{
    let {name="shubham"} = req.query;
    req.session.name = name;
    req.flash("success" ,"user registered successfully");
    res.redirect("/hello");
})

app.get("/hello" ,(req ,res)=>{
    // console.log(req.flash("success"));
    res.render("list.ejs");

})

  

// app.get("/signedCookie" ,(req ,res)=>{
//     res.cookie("made-in" ,"india" ,{signed : true});
//     console.log(req.cookies);
//     res.send(req.cookies);
// })

// app.get("/cookies" ,(req ,res)=>{
//     let {name = "shubham"} = req.cookies;
//     res.send(`this is ${name}`);
//     res.cookie("greet" ,"hello");
//     res.send("this is cookies");
//     console.log(req.cookies);
// })




app.listen(port ,()=>{
    console.log("port is listening");
})