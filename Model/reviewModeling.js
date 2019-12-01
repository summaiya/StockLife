// review / rating / createdAt / ref to tour / ref to user
const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
    rating: {
        required: [true, "must have rating average"],
        type: Number,
        default: 0,
        max: [5, "Maximum Rating is 5.0"],
        min: [0, "Minimum Rating is 0"]
    },
    review: {
        type: String,
        require: [true, "Review must not be empty!"]
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    category: {
        enum: ["tour", "user"],
        type: String,
        required: [true, "Specify who you want to write the review"]
    }
})

const Review = new mongoose.model("Review", reviewSchema);

module.exports = Review