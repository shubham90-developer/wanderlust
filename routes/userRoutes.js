const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middlewares/isauthenticate.js");
const userController = require("../controller/user.js");


router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signup));

router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl ,passport.authenticate('local', { failureRedirect: '/login' ,failureFlash: true }) ,userController.saveRedirectUrl);

router.get("/logout" ,userController.logOut);
module.exports = router;