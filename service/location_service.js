const LocationModel = require("../model/location_model");

class LocationServices{
    static async register(location_name,createdby){
        try{
            const createLocation = new LocationModel({location_name,createdby});
            return await createLocation.save();
        }catch(err){
            throw err;
        }
    }

    static async delete(location_name){
        try{
            var query = {location_name : location_name};
            return await LocationModel.findOneAndDelete(query);

        }catch(error){
            throw error;
        }
    }

    static async get(){
        try {
            return await LocationModel.find();
        } catch (error) {
            throw error
        }
    }

  
}
module.exports = LocationServices;