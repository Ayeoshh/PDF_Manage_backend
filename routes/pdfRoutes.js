const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const PdfController = require('../controllers/pdfController');
const upload = require('../config/multerConfig');

const router = express.Router();

router.post('/upload', authMiddleware, upload.single('pdf'), PdfController.upload);
router.get('/all', PdfController.getAll);
router.get('/view/pdf/:id', PdfController.get);
router.delete('/:id', authMiddleware, PdfController.delete);
router.get('/search', PdfController.search);
// router.get('/myPdfs', authMiddleware, PdfController.getUserPDFs);
router.post('/share/:id', authMiddleware, PdfController.generateShareableLink);
// router.post('/share/:id', authMiddleware, PdfController.share);
router.get('/shared/:token', PdfController.getSharedPDF);

module.exports = router;