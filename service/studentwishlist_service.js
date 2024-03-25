const studentWishlistModel = require('../model/studentWishlist_model');
const IdcodeServices = require('./idcode_service');

class studentWishListService {
    static async studentwishlist(tutor_id,fname,lname,gender,email,phone,address,state,postcode,password,subject,experience,qualification,bio,verification,teacherimage,credits,status){
        try {
            var studentwish_id = await IdcodeServices.generateCode('studentWishList');
            const createUser = new studentWishlistModel({studentwish_id,tutor_id,fname,lname,gender,email,phone,address,state,postcode,password,subject,experience,qualification,bio,verification,teacherimage,credits,status});
            return await createUser.save();
        } catch (error) {
           throw error; 
        }
    }

    static async wishDelete(tutor_id){
        try {
            var query = {tutor_id:tutor_id};
            return await studentWishlistModel.findOneAndDelete(query);
        } catch (error) {
            throw error
        }
    }

    static async viewList() {
        try {
            return await studentWishlistModel.find();  
        } catch (error) {
            throw error
        }
    }
}


module.exports = studentWishListService;