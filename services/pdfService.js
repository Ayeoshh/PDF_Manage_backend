const PDF = require('../models/pdf');
const ShareLink = require('../models/shareLink');
const crypto = require('crypto');
const Comment = require('../models/comment');
const fs = require('fs');
const path = require('path');
const {Op} = require('sequelize');



class PdfService{
    static async uploadPDF(userId, file){
        try{
            if(!file){
                throw new Error('No file uploaded');
            }
            if(file.mimetype!== 'application/pdf'){
                throw new Error('Invalid file format, Only PDFs are allowed');
            }
            const pdf = await PDF.create({
                filename: file.filename,
                originalname: file.originalname,
                fileUrl: `/uploads/${file.filename}`,
                filePath: file.path,
                uploadedBy: userId
            });

            return {message: 'PDF uploaded successfully', pdf};
        }catch(error){
            throw new Error(error.message);
        }
    }

    static async getAllPDFs(){
        try{
            return await PDF.findAll();
        }catch(error){
            throw new Error(error.message);
        }
    }

    static async getPDFById(id){
        try{
            const pdf = await PDF.findByPk(id);
            if(!pdf){
                throw new Error('PDF not found');
            }
            return pdf;
        }catch(error){
            throw new Error(error.message);
        }
    }
    static async deletePDF(id, userId){
        try{
            const pdf = await PDF.findOne({where: {id, uploadedBy: userId}});
            if(!pdf){
                throw new Error('PDF not found or unauthorized');
            }

            fs.unlinkSync(pdf.filePath);

            await pdf.destroy();
            return {message: 'PDF deleted successfully'};
        }catch(error){
            throw new Error(error.message);
        }
    }

    static async searchPDFs(query){
        try{
            const pdfs = await PDF.findAll({
                where:{originalname: {[Op.like]: `%${query}%`}},
            })
            return pdfs;
        }catch(error){
            throw new Error(error.message);
        }
    }
    // static async getUserPDFs(userId){
    //     try{
    //         const pdfs = await PDF.findAll({where: {uploadedBy: userId}});
    //         return {message: 'PDFs retrieved successfully', pdfs};
    //     }catch(error){
    //         throw new Error(error.message);
    //     }
    // }

    static async generateShareableLink(userId, pdfId){
        try{
            // const pdf = await PDF.findOne({where: {id: '3094307a-4813-4b5d-95ef-4fc906bc203b'}});
            // const pdf = await PDF.findAll();
            const pdf = await PDF.findOne({where: {id: pdfId, uploadedBy: userId}});
            console.log(pdf);
            console.log("pdf id", pdfId);
            console.log("uploaded by user - ", userId);
            if(!pdf){
                throw new Error('PDF not found or unauthorized');
            }

            const uniqueToken = crypto.randomBytes(16).toString('hex');
            const shareableLink = `${process.env.BASE_URL}/api/pdfs/shared/${uniqueToken}`;

            pdf.shareableLink = shareableLink;
            await pdf.save();
            await ShareLink.create({
                id: uniqueToken,
                pdfId,
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Link expires in 24 hours
            });
            //  // Set expiration time (Default: 24 hours from now)
            //  const expiryDate = new Date();
            //  expiryDate.setHours(expiryDate.getHours() + expiryHours);
 
            //  pdf.shareableLink = shareableLink;
            //  pdf.shareableLinkExpiry = expiryDate;
            //  await pdf.save();
 
            //  return { message: "Shareable link generated successfully", shareableLink, expiresAt: expiryDate };

            return {message: 'Shareable link generated successfully', shareableLink};
        }catch(error){
            throw new Error(error.message);
        }
    }

    static async getSharedPDF(token){
        try {
            const shareLink = await ShareLink.findOne({where: {id: token}});
            if(!shareLink || new Date()> new Date(shareLink.expiresAt)){
                throw new Error('Invalid or expired share link');
            }

            const pdf = await PDF.findByPk(shareLink.pdfId);
            if(!pdf){
                throw new Error('Pdf not found');
            }
            return pdf;
            // const pdf = await PDF.findOne({where: {shareableLink: `${process.env.BASE_URL}/api/pdf/shared/${token}`}});
            // if(!pdf){
            //     throw new Error('invalid or expired link');
            // }

            // //  // Check if the link has expired
            // //  if (pdf.shareableLinkExpiry && new Date() > pdf.shareableLinkExpiry) {
            // //     throw new Error("This link has expired");
            // // }
            // return {message: 'PDF found', fileUrl: pdf.fileUrl};

        }catch(error){
            throw new Error(error.message);
        }
    }

    static async addComment(pdfId, author, text){
        try{
            const pdf = await PDF.findByPk(pdfId);
            if(!pdf){
                throw new Error('PDF not found');
            }

            const comment = await Comment.create({pdfId, author, text});
            return {message: 'Comment added successfully', comment};
        }catch(error){
            throw new Error(error.message);
        }
    }

    static async getComments(pdfId){
        try{
            const comments = await Comment.findAll({where: {pdfId}});
            return {message: 'Comment retrieved successfully', comments};
        }catch(error){
            throw new Error(error.message);
        }
    }
}

module.exports = PdfService;