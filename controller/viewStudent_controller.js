const viewStudent_service = require("../service/viewStudent_service");

exports.register = async (req, res, next) => {
    try {
        const { student_id,viewed } = req.body;

        const response = await viewStudent_service.ViewStudent(student_id,viewed);
        
        res.status(200).json(response)

    } catch (error) {
        next(error)
    }
}

exports.get = async(req,res,next) => {
    try {
        const {student_id} = req.query;
        const User = await viewStudent_service.get(student_id);
        res.status(200).json(User)
    } catch (error) {
        next(error);
    }
}
