const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { isLoggedIn } = require("../middlewares/isauthenticate.js");
const { isOwner } = require("../middlewares/isOwner.js");
const listingController = require("../controller/listing.js");
const validateSchema = require("../middlewares/validateSchema.js");
const { listingSchema } = require("../schema.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router.get("/", listingController.renderAllListings);

router
  .route("/new")
  .get(isLoggedIn, listingController.getListingForm)
  .post(
    isLoggedIn,
    upload.single("Listing[image]"),
    validateSchema,
    wrapAsync(listingController.createListing)
  );

router
  .route("/:id/edit")
  .get(isLoggedIn, isOwner, listingController.renderEditForm)
  .patch(
    isLoggedIn,
    isOwner,
    upload.single("Listing[image]"),
    validateSchema,
    wrapAsync(listingController.updateListing)
  );

router.route("/search").get(listingController.searchListing);

router
  .route("/:id")
  .get(listingController.renderListing)
  .delete(isLoggedIn, isOwner, listingController.deleteListing);

module.exports = router;
