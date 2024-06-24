const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    thumbnail: {
        path: { type: String, default:'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'},
        extension: { type: String, default: 'jpg'},
    },
    comics: {
        available: { type: Number, default: 0 },
    },
    series: {
        available: { type: Number, default: 0 },
    },
    stories: {
        available: { type: Number, default: 0 },
    },
    events: {
        available: { type: Number, default: 0 },
    },
}, { collection: 'characters' });

module.exports = mongoose.model('Character', characterSchema);

