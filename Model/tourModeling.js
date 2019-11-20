const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        required: [true, "Must have a Name"],
        type: String,
        unique: true
    },
    price:{
        required: [true, "must have a price"],
        type: Number
    }, 
    rating: {
        required: [true, "must have a rating"],
        type: Number
    }
})
const Tour = new mongoose.model("Tour", tourSchema);

module.exports = Tour;