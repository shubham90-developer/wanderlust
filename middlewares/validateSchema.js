const {listingSchema ,reviewsSchema} = require("../schema.js");
const expressError = require("../utils/expressError.js");

module.exports = (req ,res ,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        throw new expressError(400 ,error);
    }else{
        next();
    }
    
};