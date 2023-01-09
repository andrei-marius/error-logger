'use strict';

const express = require('express');
const cors = require('cors');
const config = require('./config');
const errorRoutes = require('./routes/error-routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', errorRoutes.routes);

app.listen(config.port, () => console.log(`up and running on ${config.url}`));