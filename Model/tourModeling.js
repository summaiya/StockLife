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
           values: ["easy", "medium", "difficult"],
           message: "Difficulty can only be easy, medium, difficult"
        }
    }, 
    ratingAverage: {
        required: [true, "must have rating average"],
        type: Number,
        default: 0,
        max: [5, "Maximum Rating is 5.0"],
        min: [0, "Minimum Rating is 0"]
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
    startDates: [Date],
    startLocation: {
        type: {
            type: String, 
            default: "Point",
            enum: ["Point"]
        },
        coordinates: [Number],
        address: String,
        description: String
    },
    location: [
        {
            type: {
                type: String, 
                default: "Point",
                enum: ["Point"]
            },
            coordinates: [Number],
            address: String,
            description: String
        }
    ],
    admins: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User" // Create a reference to User Data model
        }
    ]
    // ,reviewHistory:  [
    //     {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "Review" // Create a reference to User Data model
    //     }
    // ]
}, {
    toJSON: {virtuals: true}, 
    toObject: {virtuals: true}
})

tourSchema.virtual("reviewHistory", {
    ref: "Review",
    foreignField: "Tour",
    localField: "_id",
    justOne: false //turn it into an array
});
// tourSchema.pre("find", function(next){
//     this.populate("reviewHistory");
//     this.populate("admins");
//     next();
// })

const Tour = new mongoose.model("Tour", tourSchema);

module.exports = Tour;
//Schema ==> Model


/**
xxxSchema.virtual(<currentReferenceProperties>, {
    ref: <Actual Data Model that we want to refer from>, 
    foreignField: <properties name that the Actual Data Model refer to the currentReferenceProperties>
    localField: <local _id>
 */
 ///////////////////////////////////////
 /**
  * Find out what virtual does 
  * 
  */