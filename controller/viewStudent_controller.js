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
