const express = require('express');
const app = express();


app.get('/', (req, res) => {
    res.send("Hello world from node.js");
});

const port = process.env.PORT|| 5000

app.listen(port, () => {
    console.log(`Running on port ${port}`);
})
