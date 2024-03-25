const parentWishlistModel = require('../model/parentWishlist_model');
const IdcodeServices = require('./idcode_service');

class parentWishListService {
    static async parentwishlist(tutor_id,fname,lname,gender,email,phone,address,state,postcode,password,subject,experience,qualification,bio,verification,teacherimage,credits,status){
        try {
            var parentwish_id = await IdcodeServices.generateCode('parentWishList');
            const createUser = new parentWishlistModel({parentwish_id,tutor_id,fname,lname,gender,email,phone,address,state,postcode,password,subject,experience,qualification,bio,verification,teacherimage,credits,status});
            return await createUser.save();
        } catch (error) {
           throw error; 
        }
    }

    static async wishDelete(tutor_id){
        try {
            var query = {tutor_id:tutor_id};
            return await parentWishlistModel.findOneAndDelete(query);
        } catch (error) {
            throw error
        }
    }

    static async viewList() {
        try {
            return await parentWishlistModel.find();  
        } catch (error) {
            throw error
        }
    }
}


module.exports = parentWishListService;