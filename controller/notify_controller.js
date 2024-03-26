const Notify_service = require('../service/notify_service')

exports.get = async(req,res,next) => {
    try {
        const {tutor_id} = req.query;
        const User = await Notify_service.get(tutor_id);
        res.status(200).json(User)
    } catch (error) {
        next(error);
    }
}