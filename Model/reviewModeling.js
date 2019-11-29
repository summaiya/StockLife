// review / rating / createdAt / ref to tour / ref to user
const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: [true, "Must contain rating"]
    },
    createAt: {
        type: Date,
        default: Date.now()
    }

})

const Review = new mongoose.model("Review", reviewSchema);

module.exports = Review