const mongoose = require("mongoose");



const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        default: "Untitled",
        maxLength: [50, "Title must not be longer than 50 characters"]
    },
    content: {
        type: String,
        required: [true, "note cannot be empty"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    parent: {
        type: String,
        required: true,
        default: 'root'
    }
})

const Note = mongoose.model("Note", notesSchema);


module.exports = Note