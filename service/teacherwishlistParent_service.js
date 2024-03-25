const IdcodeServices = require('./idcode_service');
const TeacherWishlistParentModel = require('../model/teacherWishlistParent_model')

class TeacherWishListParentService {
    static async TeacherWishRegisterParent(parent_id,fname,laname,gender,email,phone,address,state,postcode,password,subject,kidname,grade,tution_slot,credits){
        try {
            var teacherwishparent_id = await IdcodeServices.generateCode('TeacherWishListParent');
            const createUser = new TeacherWishlistParentModel({teacherwishparent_id,parent_id,fname,laname,gender,email,phone,address,state,postcode,password,subject,kidname,grade,tution_slot,credits});

            return await createUser.save();
        } catch (error) {
           throw error; 
        }
    }

    static async teacherWishDelete(parent_id){
        try {
            var query = {parent_id:parent_id};
            return await TeacherWishlistParentModel.findOneAndDelete(query);
        } catch (error) {
            throw error
        }
    }

    static async TeacherWishListParent() {
        try {
            return await TeacherWishlistParentModel.find();  
        } catch (error) {
            throw error
        }
    }
}


module.exports = TeacherWishListParentService;