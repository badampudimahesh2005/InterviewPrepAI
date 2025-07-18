const express = require('express');

const { loginUser, registerUser, logoutUser, getUserProfile} = require('../controllers/authController');
const {protect} = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router();

//Auth routes
router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/logout',logoutUser);
router.get('/profile', protect, getUserProfile);

router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(200).json({ message: 'Image uploaded successfully', imageUrl });
} )

module.exports = router;