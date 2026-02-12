import express from "express"
import dotenv from "dotenv"

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Application started on PORT: ${process.env.PORT}`)
})