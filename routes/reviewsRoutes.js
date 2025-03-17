const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {listingSchema ,reviewsSchema} = require("../schema.js");
const {isLoggedIn} = require("../middlewares/isauthenticate.js");
const {isReviewAuthor} = require("../middlewares/isOwner.js");
const reviewController = require("../controller/review.js");


const validateReview = (req ,res ,next)=>{
    let {error} = reviewsSchema.validate(req.body);
    if(error){
        throw new expressError(400 ,error);
    }else{
        next();
    }
    
}


router.post("/" ,isLoggedIn ,validateReview ,wrapAsync(reviewController.addReview));

router.delete("/:reviewID" ,isLoggedIn ,isReviewAuthor ,wrapAsync(reviewController.deleteReview));

module.exports = router;

