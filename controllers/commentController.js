const PdfService = require('../services/pdfService');
const CommentService = require('../services/commentService');


class CommentController{

    static async addComment(req, res){
        try{
            const { pdfId } = req.params;
            const { content} = req.body;
            const userId = req.user.id;

            const response = await CommentService.addComment(pdfId, userId, content);
            res.status(201).json(response);
        }catch(error){
            res.status(400).json({error: error.message});
        }
    }

    static async getComments(req, res){
        try{
            const {pdfId} = req.params;
            const response = await CommentService.getCommentsByPDF(pdfId);
            res.status(200).json(response);
        }catch(error){
            res.status(400).json({error: error.message});
        }
    }

    static async updateComment(req, res){
        try{
            const {commentId}= req.params;
            const {content} = req.body;
            const userId = req.user.id;

            const response = await CommentService.updateComment(commentId, userId, content);
            res.status(200).json(response);
        }catch(error){
            res.status(400).json({error: error.message});
        }
    }

    static async deleteComment(req, res){
        try{
            const {commentId} = req.params;
            const userId = req.user.id;

            const response = await CommentService.deleteComment(commentId, userId);
            res.status(200).json(response);
        }catch(error){
            res.status(400).json({error: error.message});
        }
    }

    static async replyToComment(req, res){
        try{
            const {commentId} = req.params;
            const {content} = req.body;
            const userId = req.user.id;

            const response = await CommentService.replyToComment(commentId, userId, content);
            res.status(201).json(response);
        }catch(error){
            res.status(400).json({error: error.message});
        }
    }
    // static async addComment(req, res){
    //     try{
    //         const {pdfId, author, text} = req.body;
    //         const response = await PdfService.addComment(pdfId, author, text);

    //         res.status(201).json(response);
    //     }catch(error){
    //         res.status(400).json({error: error.message});
    //     }
    // }

    // static async getComments(req, res){
    //     try{
    //         const pdfId = req.param.pdfid;
    //         const response = await PdfService.getComments(pdfId);

    //         res.status(201).json(response);
    //     }catch(error){
    //         res.status(400).json({error: error.message});
    //     }
    // }
}

module.exports = CommentController;