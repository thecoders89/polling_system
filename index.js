const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8000;
const db = require('./config/mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
//route all req to routes
app.use('/', require('./routes'));

app.listen(PORT, function(){
    console.log('Server listening on port: ',PORT);
});