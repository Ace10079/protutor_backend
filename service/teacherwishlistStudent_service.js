const IdcodeServices = require('./idcode_service');
const TeacherWishlistStudentModel = require('../model/teacherWishlistStudent_model')

class TeacherWishListStudentService {
    static async TeacherWishRegisterStudent(student_id,fname,lname,gender,dob,grade,email,phone,subject,tution_slot,gname,gphone,address,state,postcode,password,credits){
        try {
            var teacherwishid = await IdcodeServices.generateCode('TeacherWishListStudent');
            const createUser = new TeacherWishlistStudentModel({teacherwishid,student_id,fname,lname,gender,dob,grade,email,phone,subject,tution_slot,gname,gphone,address,state,postcode,password,credits});

            return await createUser.save();
        } catch (error) {
           throw error; 
        }
    }

    static async teacherWishDelete(student_id){
        try {
            var query = {student_id:student_id};
            return await TeacherWishlistStudentModel.findOneAndDelete(query);
        } catch (error) {
            throw error
        }
    }

    static async TeacherWishListStudent() {
        try {
            return await TeacherWishlistStudentModel.find();  
        } catch (error) {
            throw error
        }
    }
}


module.exports = TeacherWishListStudentService;