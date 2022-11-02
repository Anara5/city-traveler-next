const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        unique: true,
        trim: true,
        maxlength: [40, 'Title cannot be more than 40 characters']
    }
})

module.exports = mongoose.models.City || mongoose.model('City', CitySchema);