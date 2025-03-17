const User = require("../models/user.js");
module.exports.renderSignupForm = (req ,res)=>{
    res.render("./user/signup.ejs");
};

module.exports.signup = async(req ,res)=>{
    try{
        const {email ,username ,password} = req.body;
        const newUser = new User({username ,email});
        const registeredUser = await User.register(newUser ,password);
        console.log(registeredUser);
        req.login(registeredUser ,(err)=>{
            if(err){
                return next(err);
            };
            req.flash("success" ,"welcome to wanderlust");
            res.redirect("/listings");
        })
        
    } catch(e){
        req.flash("error" ,e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req ,res)=>{
    res.render("./user/login.ejs");
};

module.exports.saveRedirectUrl = async(req ,res)=>{
    req.flash("success" ,"welcome to Wanderlust");
    let redirectUrl = res.locals.redirectUrl || "/listings" ;
    res.redirect(redirectUrl);
}

module.exports.logOut = (req ,res ,next)=>{
    req.logOut((err)=>{
        if(err){
            next(err);
        };
        req.flash("success" ,"You are logged out");
        res.redirect("/listings");
    })
}