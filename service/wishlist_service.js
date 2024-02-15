const WishlistModel = require('../model/wishlist_model');
const IdcodeServices = require('./idcode_service');

class WishListService {
    static async wishRegister(tutor_id,fname,lname,gender,email,phone,address,state,postcode,password,subject,experience,qualification,bio,verification,teacherimage,credits){
        try {
            var wishid = await IdcodeServices.generateCode('WishList');
            const createUser = new WishlistModel({wishid,tutor_id,fname,lname,gender,email,phone,address,state,postcode,password,subject,experience,qualification,bio,verification,teacherimage,credits});
            return await createUser.save();
        } catch (error) {
           throw error; 
        }
    }

    static async wishDelete(tutor_id){
        try {
            var query = {tutor_id:tutor_id};
            return await WishlistModel.findOneAndDelete(query);
        } catch (error) {
            throw error
        }
    }

    static async WishList() {
        try {
            return await WishlistModel.find();  
        } catch (error) {
            throw error
        }
    }
}


module.exports = WishListService;