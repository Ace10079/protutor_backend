const StreetModel = require("../model/street_model");

class StreetServices{
    static async register(street_name,createdby){
        try{
            const createStreet = new StreetModel({street_name,createdby});
            return await createStreet.save();
        }catch(err){
            throw err;
        }
    }

    static async delete(street_name){
        try{
            var query = {street_name : street_name};
            return await StreetModel.findOneAndDelete(query);

        }catch(error){
            throw error;
        }
    }

    static async get(){
        try {
            return await StreetModel.find();
        } catch (error) {
            throw error
        }
    }

  
}
module.exports = StreetServices;