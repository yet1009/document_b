const path = require('path');
const dotenv = require('dotenv');
const express = require("express");
const createError = require('http-errors')

const autoRoutes = require('../src/middleware/AutoLoadRoutes');
const cors = require('cors')

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());

// console.log('line 4', path)
// console.log(dotenv)
// console.log('line 6...........',__dirname)

autoRoutes(path.join(__dirname, 'routes'), app)

app.use((req, res, next) => {
    next(createError(404))
})

app.listen(port, () => {
    try{
        process.send('ready'); //PM2 Graceful Reload
    }catch (e) {
        console.log('not pm2 cluster');
    }

    console.log(`Express server listening on port ${port}`);
});

