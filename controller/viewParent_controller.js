const viewParent_service = require("../service/viewParent_service");

exports.register = async (req, res, next) => {
    try {
        const { parent_id,viewed } = req.body;

        const response = await viewParent_service.ViewParent(parent_id,viewed);
        
        res.status(200).json(response)

    } catch (error) {
        next(error)
    }
}
exports.get = async(req,res,next) => {
    try {
        const {parent_id} = req.query;
        const User = await viewParent_service.get(parent_id);
        res.status(200).json(User)
    } catch (error) {
        next(error);
    }
}