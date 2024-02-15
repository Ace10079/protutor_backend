const ImageModel = require('../model/image_model');

class ImageService {
    static async createImage(id, filename) {
        try {
            const newImage = new ImageModel({
                id: id,
                img: filename
            });
            return await newImage.save();
        } catch (error) {
            throw error;
        }
    }

    static async updateimage(id, filename){
        try {
            var query = {id : id};
            var values = {$set : {img:filename}};
            
            return await ImageModel.updateOne(query,values)
            
        } catch (error) {
           throw error 
        }
    }

    static async deleteimage(id){
        try{
            var query = {id : id};
            return await ImageModel.findOneAndDelete(query);

        }catch(error){
            throw error;
        }
    }

    static async getimage(id){
        try {
            
            return await ImageModel.find({id})
        } catch (error) {
            throw error
        }
    }

    
    static async get(){
        try {
           
            return await ImageModel.find()
        } catch (error) {
            throw error
        }
    }

}

module.exports = ImageService;
