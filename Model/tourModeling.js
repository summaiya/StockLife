const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        required: [true, "Must have a Name"],
        type: String,
        unique: true,
        trim: true
    },
    duration: {
        type: Number, 
        required: [true, "must have durations"]
    },
    maxGroupSize: {
        type: Number,
        required: [true, "must have a group size"]
    },
    difficulty: {
        type: String, 
        required: [true, "must have a difficulty"]
    }, 
    ratingAverage: {
        required: [true, "must have rating average"],
        type: Number,
        default: 0
    },
    price:{
        required: [true, "must have a price"],
        type: Number
    },
    priceDiscount:{
        type: Number
    },
    summary:{
        type: String,
        trim: true,
        required: [true, "must have a summary"]
    },
    imageCover: {
        type: String, 
        required: [true, "A tour must have a cover image"]
    },
    images: [String],
    ratingsQuantity: {
        required: [true, "must have a rating"],
        type: Number,
        default: 0
    },
    description:{
        type: String, 
        trim: true
    },
    createdAt:{
         type: Date,
        default: Date.now()
    }, 
    startDates: [Date]
})
const Tour = new mongoose.model("Tour", tourSchema);

module.exports = Tour;