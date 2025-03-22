const PdfService = require('../services/pdfService');

class PdfController{

    static async upload(req, res){
        try{
            const userId = req.user.id;
            const file = req.file;
            if(!userId){
                return res.status(401).json({message: 'Unauthorized user'});
            }
            if(!file){
                return res.status(401).json({message: 'File not found'});
            }
            const response = await PdfService.uploadPDF(userId, file);
            res.status(201).json(response);
        }catch(error){
            res.status(400).json({error: error.message});
        }
    }
    static async getAll(req, res){
        try{
            const response = await PdfService.getAllPDFs();
            res.status(200).json(response);
        }catch(error){
            res.status(400).json({error: error.message});
        }
    }

    static async get(req, res){
        try{
            const { id} = req.params;
            const response = await PdfService.getPDFById(id);
            res.status(200).json(response);
        }catch(error){
            res.status(400).json({error: error.message});
        }
    }

    static async delete(req, res){
        try{
            const {id}= req.params;
            const userId = req.user.id;
            const response= await PdfService.deletePDF(id, userId);
            res.status(200).json(response);
        }catch(error){
            res.status(400).json({error: error.message});
        }
    }

    static async search(req, res){
        try{
            const {query} = req.query;
            console.log(req.query, "*****************************************");
            const response = await PdfService.searchPDFs(query);
            res.status(200).json(response);
        }catch(error){
            res.status(400).json({error: error.message});
        }
    }

    // static async share(req, res){
    //     try{
    //         const {id}= req.params;
    //         const userId = req.user.id;
    //         const response = await PdfService.generateShareableLink(id, userId);
    //         res.status(200).json(response);
    //     }catch(error){
    //         res.status(400).json({error: error.message});
    //     }
    // }


    static async getUserPDFs(req, res){
        try{
            const userId = req.user.id;
            if(!userId){
                return res.status(401).json({message: 'Unauthorized user'});
            }
            const response = await PdfService.getUserPDFs(userId);
            res.status(201).json(response);
        }catch(error){
            res.status(400).json({error: error.message});
        }
    }

    static async generateShareableLink(req, res){
        try{
            const userId = req.user.id;
            const pdfId = req.params.id;
            console.log("Incoming PDF ID from params:", req.params.pdfid);
            console.log("User from token:", req.user.id);
            const response = await PdfService.generateShareableLink(userId, pdfId);

            // const expiryHours = req.body.expiryHours || 24; // Default expiry: 24 hours
            // const response = await PdfService.generateShareableLink(req.user.id, req.params.pdfId, expiryHours);
            res.status(200).json(response);
        }catch(error){
            res.status(400).json({error: error.message});
        }
    }

    static async getSharedPDF(req, res){
        try{
            const {token} = req.params;
            const response = await PdfService.getSharedPDF(token);
            res.status(200).json(response);
        }catch(error){
            console.error(error);
            res.status(400).json({error: error.message});
        }
    }
}

module.exports = PdfController;