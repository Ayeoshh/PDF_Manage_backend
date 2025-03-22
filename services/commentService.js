const {v4:uuidv4} = require('uuid');
const Comment = require('../models/comment');

class CommentService{
    static async addComment(pdfId, userId, content){
        try{
            if(!content){
                throw new Error('Comment content is required');
            }

            const comment = await Comment.create({
                id: uuidv4(),
                pdfId,
                userId,
                content,
                parentId: null          
            });

            return {message: 'Comment added successfully', comment};
        }catch(error){
            throw new Error(error.message);
        }
    }

    static async getCommentsByPDF(pdfId){
        try{
            const comments = await Comment.findAll({
                where: { pdfId},
                order: [['createdAt', 'ASC']]
            });

            return comments;
        }catch(error){
            throw new Error(error.message);
        }
    }

    static async updateComment(commentId, userId, content){
        try{
            const comment = await Comment.findOne({where: {id: commentId, userId}});
            if(!comment){
                throw new Error('Comment not found or unauthorized');
            }

            comment.content = content;
            await comment.save();

            return {message: 'Comment updated successfully', comment};
        }catch(error){
            throw new Error(error.message);
        }
    }

    static async deleteComment(commentId, userId){
        try{
            const comment = await Comment.findOne({where: {id: commentId, userId}});
            if(!comment){
                throw new Error('Comment not found or unauthorized');
            }

            await comment.destroy();
            return {message: 'Comment deleted successfully'};
        }catch(error){
            throw new Error(error.message);
        }
    }

    static async replyToComment(parentId, userId, content){
        try{
            if(!content){
                throw new Error('Reply content is required');
            }
            const parentComment = await Comment.findByPk(parentId);
            if(!parentComment){
                throw new Error('Parent comment not found');
            }

            const reply = await Comment.create({
                id: uuidv4(),
                pdfId: parentComment.pdfId,
                userId,
                content,
                parentId
            });

            return {message: 'Reply added successfully', reply};
        }catch(error){
            throw new Error(error.message);
        }
    }
}

module.exports = CommentService;