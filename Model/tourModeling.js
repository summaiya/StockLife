const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        required: [true, "Must have a Name"],
        type: String,
        unique: true,
        trim: true,
        maxlength: [30, "A Tour Name Must Have less than 30 characters"],
        minlength: [6, "A Tour Name Must Have More than 6 Characters"]
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
        required: [true, "must have a difficulty"],
        enum: {
           values: ["easy", "medium", "hard"],
           message: "Difficulty can only be easy, medium, difficult"
        }
    }, 
    ratingAverage: {
        required: [true, "must have rating average"],
        type: Number,
        default: 0,
        max: [5, "Maximum Rating is 5.0"],
        min: [1, "Minimum Rating is 1.0"]
    },
    price:{
        required: [true, "must have a price"],
        type: Number
    },
    priceDiscount:{
        type: Number,
        validate: {
            validator: function(val){
                return val < this.price;
            },
            message: "Discounted Price ({VALUE}) Must be cheaper than the actual Price"
        }
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