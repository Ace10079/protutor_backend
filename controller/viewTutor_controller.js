const viewTutor_service = require("../service/viewTutor_service");

exports.register = async (req, res, next) => {
    try {
        const { tutor_id,viewed } = req.body;

        const response = await viewTutor_service.ViewTutor(tutor_id,viewed);
        
        res.status(200).json(response)

    } catch (error) {
        next(error)
    }
}

exports.get = async(req,res,next) => {
    try {
        const {tutor_id} = req.query;
        const User = await viewTutor_service.get(tutor_id);
        res.status(200).json(User)
    } catch (error) {
        next(error);
    }
}
