
if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const expressError = require("./utils/expressError.js");
const Review = require("./models/review.js");
const listingsRoutes = require("./routes/listingsRoutes.js");
const reviewsRoutes = require("./routes/reviewsRoutes.js");
const userRoutes = require("./routes/userRoutes");
const MongoStore = require('connect-mongo');
const port = 8080;
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const multer  = require('multer')


app.use(express.urlencoded({ extended: true }));  // For parsing form data
app.use(express.json());  // For parsing JSON data (if you need it)
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname ,"/public")))
app.engine('ejs', ejsMate);
app.set("view engine" ,"ejs");
app.set("views" ,path.join(__dirname ,"views"));


const dbatlas = process.env.DBATLAS;

main().then((res)=>{
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbatlas);

}

const store = MongoStore.create({
    mongoUrl: dbatlas ,
    crypto:{
        secret: process.env.SECRET
    } ,
    touchAfter: 24 * 3600,
})


const sessionOptions = {
    store: store ,
    secret: process.env.SECRET ,
    resave: false ,
    saveUninitialized: true ,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000 ,
        maxAge: 7 * 24 * 60 * 60 * 1000 ,
        httpOnly: true
    }
}
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req ,res ,next)=>{
    res.locals.msg = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

app.get("/get" ,(req ,res)=>{
    console.log(req.user);
})

app.use("/listings" , listingsRoutes);
app.use("/listings/:id/reviews" ,reviewsRoutes);
app.use("/" ,userRoutes);

app.all("*" ,(req ,res ,next)=>{
    next(new expressError(404 ,"page not found"));
})

app.use((err ,req ,res ,next)=>{
    let {statusCode=500 ,message= "something went wrong"} = err;
    res.status(statusCode).render("./listings/error.ejs" ,{message});
})

app.listen(port ,()=>{
    console.log("app is listening");
})

