const FeadBackService = require('../service/feedback_service');

exports.feadback = async(req,res,next)=>{
    try {
        const { user_id,user_type,tutor_id,ratings,feadback,datetime } = req.body;
        const data = await FeadBackService.createFeadBack(user_id,user_type,tutor_id,ratings,feadback,datetime);
        res.status(200).json(data);
    } catch (error) {
        throw error
    }
}