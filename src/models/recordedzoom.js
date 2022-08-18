const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const zoomRecords = new Schema(
    {
        topic: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        }
    }, 
    { timestamps: true }
);

mongoose.exports = mongoose.model('Recordedzoom', zoomRecords);