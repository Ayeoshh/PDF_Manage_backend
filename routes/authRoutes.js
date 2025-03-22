const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const validateSchema = require('../utils/validateSchema');
const {registerSchema} = require('../utils/registerSchema');

const router = express.Router();

router.post("/register", validateSchema(registerSchema), authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/reset-password", authController.resetPassword);
router.post("/update-password", authController.updatePassword);

module.exports = router;







// router.post('/register', validateSchema(registerSchema), authController.register);

// router.post('/login', authController.login);

// router.get('/protected', authMiddleware, authController.protectedRoute);