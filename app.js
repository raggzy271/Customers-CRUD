const express = require('express');
const bodyParser = require('body-parser');

const customerRouter = require('./routes/customer');

const app = express();

const SERVER_PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', customerRouter);

app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found</h1>');
});

app.listen(SERVER_PORT, () => {
    console.log(`Server is listening on port ${SERVER_PORT}`);
    console.log(`http://localhost:${SERVER_PORT}`)
});