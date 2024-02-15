const express = require('express');
const body_parser = require('body-parser');
const router = require('./routes/router');
const cors = require('cors')


const app = express();

app.use(cors());
app.use(body_parser.json());
app.use(express.static("image"))

app.use('/',router);

module.exports = app;