const express = require('express');
const createError = require('http-errors')
const router = express.Router();

router.get('/', function(req, res, next) {
    next(createError(404))
})

module.exports = router