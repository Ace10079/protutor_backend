const parentWishListService = require("../service/parentwishlist_service");

exports.register = async (req,res,next) => {
    try {
        const {tutor_id,fname,lname,gender,email,phone,address,state,postcode,password,subject,experience,qualification,bio,verification,teacherimage,credits} = req.body;
        const succesRes = await parentWishListService.parentwishlist(tutor_id,fname,lname,gender,email,phone,address,state,postcode,password,subject,experience,qualification,bio,verification,teacherimage,credits);
        res.status(200).json({status:true,success:"WishList Registered Successfully",succesRes});
    } catch (error) {
        throw error
    }
}
exports.delete = async (req,res,next) => {
    try {
        const {tutor_id:tutor_id} = req.query;
        const WishList = await parentWishListService.wishDelete(tutor_id);
        res.status(200).json({status:true,message:"WishList Account is Deleted..",WishList});
    } catch (error) {
        throw error
    }
}

exports.get = async (req,res,next) => {
    try {
        const getData = await parentWishListService.viewList()
        res.status(200).json(getData);
    } catch (error) {
       next (error) 
    }
}