const viewParent_service = require("../service/viewParent_service");

exports.ParentView = async (req, res,next) => {
    const { tutor_id } = req.body;
    const { parent_id } = req.params;

    try {
        const result = await viewParent_service.viewed(parent_id, tutor_id);

        if (!result.success) {
            return res.status(result.success ? 200 : 400).json({ message: result.message });
        }
        return res.status(200).json(result);
    } catch (err) {
        next(err)
    }
};