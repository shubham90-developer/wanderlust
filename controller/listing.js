const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.getListingForm = (req ,res)=>{
    res.render("./listings/form");
};


module.exports.renderListing = async (req ,res)=>{
    let {id} = req.params;
    let list = await Listing.findById(id)
    .populate({
    path: "reviews",
    populate: {
      path: "author",
    },
  })
  .populate("owner");
    console.log("this is list",list);
    if(!list){
        req.flash("error" ,"The listing you have requested for does not exist");
        res.redirect("/listings");
    }
    res.render("./listings/show.ejs" ,{list});
};

module.exports.renderEditForm = async(req ,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("error" ,"The listing you have requested for does not exist");
        res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload" ,"/upload/w_250");
    res.render("./listings/edit.ejs" ,{listing ,originalImageUrl});
    console.log(id);
};

module.exports.updateListing = (async (req ,res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id ,{...req.body.Listing});
    if(typeof req.file != "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url ,filename};
        await listing.save();
    }
    res.redirect("/listings");

});

module.exports.deleteListing = async (req, res) => {
    const { id } = req.params;

    // Step 1: Find the listing by ID
    const listing = await Listing.findById(id);

    if (!listing) {
        return res.status(404).send("Listing not found");
    }

    // Step 2: Delete all reviews associated with this listing
    await Review.deleteMany({ _id: { $in: listing.reviews } });

    // Step 3: Use `findByIdAndDelete` instead of `remove` to delete the listing
    await Listing.findByIdAndDelete(id);  // Automatically deletes the listing
    req.flash("success" ,"Listing deleted succesfully.");

    console.log("Listing and its reviews deleted.");

    // Redirect or send success response
    res.redirect("/listings");
};

module.exports.renderAllListings = async (req ,res)=>{
    const allListings = await Listing.find();
    res.render("./listings/index.ejs" ,{allListings});
};

module.exports.createListing = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    let newListing = new Listing(req.body.Listing);
    newListing.image = {url ,filename};
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "Listing added successfully.");
    res.redirect("/listings");
}




  