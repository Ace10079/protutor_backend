const CategoriesModel = require("../model/categories_model");

class CategoriesService {

    static async createCategories(subject,filename) {
        try {
            const newImage = new CategoriesModel({
                subject: subject,
                categoryimage: filename
            });
            return await newImage.save();
        } catch (error) {
            throw error;
        }
    }
    static async update(subject,filename) {
        try {
            var query = {subject : subject};
            var values = {$set : {categoryimage : filename}};
            
            return await CategoriesModel.updateOne(query,values)
            
        } catch (error) {
           throw error 
        }
    }

    static async delete(subject){
        try {
            var query = { subject:subject };
            return await CategoriesModel.deleteMany(query);
        } catch (error) {
            throw error
        }
    }

    static async get(subject){
        try {
            var query = { subject:subject };
            return await CategoriesModel.find(query);
        } catch (error) {
            throw error
        }
    }

    static async getCategory(){
        try {
           
            return await CategoriesModel.find();
        } catch (error) {
            throw error
        }
    }
}
module.exports = CategoriesService;