const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontroller');

const {
    getAllUsers,
    signup
} = authController;

router.route('/').get(getAllUsers)
router.route('/signup').post(signup);

module.exports = router;