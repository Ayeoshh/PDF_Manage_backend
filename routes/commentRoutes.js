const express = require('express');
const CommentController = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// router.get('/', CommentController.addComment);
// router.get('/:pdfId', CommentController.getComments);
router.get("/:pdfId", CommentController.getComments);
router.post("/:pdfId", authMiddleware, CommentController.addComment);
router.put("/:commentId", authMiddleware, CommentController.updateComment);
router.delete("/:commentId", authMiddleware, CommentController.deleteComment);
router.post("/reply/:commentId", authMiddleware, CommentController.replyToComment);

module.exports = router;