const BannerModel = require("../model/banner_model");
const IdcodeServices = require("./idcode_service");

class BannerService {
    static async createbanner(filename) {
        try {
            var banner_id = await IdcodeServices.generateCode("Banner");
            const newImage = new BannerModel({
                banner_id,
                image: filename,
            });
            return await newImage.save();
        } catch (error) {
            throw error;
        }
    }

    static async delete(banner_id){
        try {
            var query = { banner_id:banner_id };
            return await BannerModel.findOneAndDelete(query);
        } catch (error) {
            throw error
        }
    }

    static async get(){
        try {
           
            return await BannerModel.find();
        } catch (error) {
            throw error
        }
    }

}

module.exports = BannerService;