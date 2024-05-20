const express = require("express");
const app = express();
require("dotenv").config();

const connectDb = require("./db/connect");
const notes = require('./routes/notes');
const authRouter = require('./routes/authRouter');
const errorHandler = require("./middleware/error_handler")

const port = process.env.PORT || 5000;


app.use(express.json())


app.use("/users", authRouter)
app.use("/notes", notes);

app.use((req, res) => res.status(404).json({message: 'route cannot be found.'}))
app.use(errorHandler)


const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI);
        app.listen(port, console.log(`App is listen on port ${port}`));
    } catch (error) {
        console.log(error);
    }
}



start(); 