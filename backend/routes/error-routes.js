const express = require('express');
const {addError, getErrors, deleteError, deleteErrors} = require('../controllers/errorController');

const router = express.Router();

router.post('/add-error', addError);
router.get('/get-errors', getErrors);
router.delete('/delete-error/:id', deleteError);
router.delete('/delete-errors', deleteErrors);

module.exports = {
    routes: router
};