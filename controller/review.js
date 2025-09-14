const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.addReview = async(req ,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success" ,"Review added succesfully.");
    // if(!newReview){
    //     req.flash("error" ,"please add comment.");
    // }

    res.redirect(`/listings/${listing._id}`);
};

module.exports.deleteReview = async(req ,res)=>{
    let {id ,reviewID} = req.params;
    await Listing.findByIdAndUpdate(id ,{$pull:{reviews:reviewID}});
    await Review.findByIdAndDelete(reviewID);
    req.flash("success" ,"Review deleted succesfully.");
    res.redirect(`/listings/${id}`);

};