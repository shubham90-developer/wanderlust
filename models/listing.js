const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        url:{type: String} ,
        filename:{type: String}
    },
    price: {
        type: Number
    },
    location: {
        type: String
    },
    country: {
        type: String
    } ,
    reviews:[
        {
            type:Schema.Types.ObjectId ,
            ref: "review"
        }
    ] ,
    owner: {
        type: Schema.Types.ObjectId ,
        ref: "User"
    }
});

const Listing = mongoose.model("Listing", listingSchema);
// listingSchema.post("findByIdAndDelete" ,async (listing)=>{
//     if(listing){
//         await Review.deleteMany({_id: { $in: listing.reviews }});
//     }
// })

module.exports = Listing;
