const express = require('express');
const cors = require('cors');


const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());

app.use("/api/characters", require("./routes/api/charactersRouter"));

app.use("/api/users", require("./routes/api/usersRouter"));

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});