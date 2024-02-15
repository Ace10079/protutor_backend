const TeacherWishlistModel = require('../model/teacher_wish_model');
const IdcodeServices = require('./idcode_service');

class TeacherWishListService {
    static async teacherWishRegister(parent_id,fname,laname,gender,email,phone,address,state,postcode,password,subject,kidname,grade,tution_slot,credits){
        try {
            var teacherwishid = await IdcodeServices.generateCode('TeacherWishList');
            const createUser = new TeacherWishlistModel({teacherwishid,parent_id,fname,laname,gender,email,phone,address,state,postcode,password,subject,kidname,grade,tution_slot,credits});

            return await createUser.save();
        } catch (error) {
           throw error; 
        }
    }

    static async teacherWishDelete(parent_id){
        try {
            var query = {parent_id:parent_id};
            return await TeacherWishlistModel.findOneAndDelete(query);
        } catch (error) {
            throw error
        }
    }

    static async TeacherWishList() {
        try {
            return await TeacherWishlistModel.find();  
        } catch (error) {
            throw error
        }
    }
}


module.exports = TeacherWishListService;