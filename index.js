const express = require('express')
const cookieParser = require("cookie-parser");

const app = express()


app.use(cookieParser());

require('dotenv').config()
const PORT = process.env.PORT || 3000

app.use(express.json())

require("./config/database").connect();

const user = require("./routes/user")

app.use("/api/v1", user);

app.use("/", (req, res) => {
    res.send("Hello World");
})


app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})