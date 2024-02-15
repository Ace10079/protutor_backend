const WishListService = require('../service/wishlist_service');

exports.wishListRegister = async (req,res,next) => {
    try {
        const {wishid,tutor_id,fname,lname,gender,email,phone,address,state,postcode,password,subject,experience,qualification,bio,verification,teacherimage,credits} = req.body;
        const succesRes = await WishListService.wishRegister(tutor_id,fname,lname,gender,email,phone,address,state,postcode,password,subject,experience,qualification,bio,verification,teacherimage,credits);
        var data = {tutor_id : tutor_id,fname:fname,lname:lname,gender:gender,email:email,phone:phone,address:address,state:state,postcode:postcode,password:password,subject:subject,experience:experience,qualification:qualification,bio:bio,verification:verification,teacherimage:teacherimage,credits:credits};
        console.log(succesRes);
        res.status(200).json({status:true,success:"WishList Registered Successfully",data});
    } catch (error) {
        throw error
    }
}
exports.wishdelete = async (req,res,next) => {
    try {
        const {tutor_id:tutor_id} = req.query;
        const WishList = await WishListService.wishDelete(tutor_id);
        res.status(200).json({status:true,message:"WishList Account is Deleted..",WishList});
    } catch (error) {
        throw error
    }
}

exports.get = async (req,res,next) => {
    try {
        const getData = await WishListService.WishList()
        res.status(200).json(getData);
    } catch (error) {
       next (error) 
    }
}