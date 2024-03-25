const TeacherWishListStudentService = require("../service/teacherwishlistStudent_service");


exports.TeacherStudent = async (req,res,next) => {
    try {
        const {student_id,fname,lname,gender,dob,grade,email,phone,subject,tution_slot,gname,gphone,address,state,postcode,password,credits} = req.body;
        const succesRes = await TeacherWishListStudentService.TeacherWishRegisterStudent(student_id,fname,lname,gender,dob,grade,email,phone,subject,tution_slot,gname,gphone,address,state,postcode,password,credits);
       
        res.status(200).json({status:true,success:"WishListStudent Registered Successfully",succesRes});
    } catch (error) {
        throw error
    }
}
exports.Teacherwishdelete = async (req,res,next) => {
    try {
        const {student_id:student_id} = req.query;
        const WishList = await TeacherWishListStudentService.teacherWishDelete(student_id);
        res.status(200).json({status:true,message:"WishListStudent Account is Deleted..",WishList});
    } catch (error) {
        throw error
    }
}

exports.get = async (req,res,next) => {
    try {
        const getData = await TeacherWishListStudentService.TeacherWishListStudent()
        res.status(200).json(getData);
    } catch (error) {
       next (error) 
    }
}