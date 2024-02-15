const TeacherWishListService = require('../service/teacher_visitlist_service');

exports.teacherWishListRegister = async (req,res,next) => {
    try {
        const {teacherwishid,parent_id,fname,laname,gender,email,phone,address,state,postcode,password,subject,kidname,grade,tution_slot,credits} = req.body;
        const succesRes = await TeacherWishListService.teacherWishRegister(parent_id,fname,laname,gender,email,phone,address,state,postcode,password,subject,kidname,grade,tution_slot,credits);
        var data = {parent_id : parent_id,fname:fname,laname:laname,gender:gender,email:email,phone:phone,address:address,state:state,postcode:postcode,password:password,subject:subject,kidname:kidname,grade:grade,tution_slot:tution_slot,credits:credits};
        console.log(succesRes);
        res.status(200).json({status:true,success:"WishList Registered Successfully",data});
    } catch (error) {
        throw error
    }
}
exports.teacherwishdelete = async (req,res,next) => {
    try {
        const {parent_id:parent_id} = req.query;
        const WishList = await TeacherWishListService.teacherWishDelete(parent_id);
        res.status(200).json({status:true,message:"WishList Account is Deleted..",WishList});
    } catch (error) {
        throw error
    }
}

exports.get = async (req,res,next) => {
    try {
        const getData = await TeacherWishListService.TeacherWishList()
        res.status(200).json(getData);
    } catch (error) {
       next (error) 
    }
}