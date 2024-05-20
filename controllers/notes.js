const Note = require("../models/notes")
const asyncWrapper = require("../utils/async")
const CustomErrors = require("../utils/customErrorHandler")


const getAllNotes = asyncWrapper (async (req, res) => {
    const notes = await Note.find({});
    res.status(200).json(notes);
})

const createNote = asyncWrapper ( async (req, res) => {
    const note = await Note.create(req.body)
    res.status(200).json(note)
})

const getNote = asyncWrapper( async (req, res, next) => {
    const {id: noteID} = req.params
    const note = await Note.findOne({_id: noteID})

    if (!note) {
        const err = CustomErrors('Note cannot be found', 500)
        return next(err)
    }

    res.status(200).json(note)
})
 
const updateNote = asyncWrapper( async (req, res) => {
    const {id: noteID} = req.params
    const note = await Note.findOneAndUpdate({_id: noteID}, req.body,{
        new: true,
        runValidators: true
    })

    if (!note) {
        const err = CustomErrors('Note cannot be found', 500)
        return next(err)
    }

    res.status(200).json({message: "Success!", note})
})

const deleteNote = asyncWrapper( async (req, res, next) => {
    const {id: noteID} = req.params
    const note = await Note.findOneAndDelete({_id: noteID})

    if (!note) {
        const err = CustomErrors('Note cannot be found', 500)
        return next(err)
    }

    res.status(200).json({message: "Success!"})
})

module.exports = {
    getAllNotes,
    createNote,
    getNote,
    updateNote,
    deleteNote
}