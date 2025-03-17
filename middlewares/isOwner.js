const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.isOwner = async (req ,res ,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error" ,"You are not owner of this listing to do this operation");
        return res.redirect(`/listings/${id}`)
    };
    next();
}

module.exports.isReviewAuthor = async (req ,res ,next)=>{
    let {id ,reviewID} = req.params;
    let review = await Review.findById(reviewID);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error" ,"You are not author of this review to do this operation");
        return res.redirect(`/listings/${id}`)
    };
    next();
}