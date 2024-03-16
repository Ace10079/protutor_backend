const ViewParentModel = require("../model/viewedParent_model");

class viewParent_service {

    static async viewed(parent_id, tutor_id) {
        try {
            const ViewParent = await ViewParentModel.findOne({parent_id});

            if (!ViewParent) {
                return { success: false, message: 'ViewParent  not found' };
            }

            if (ViewParent.viewed.includes(tutor_id)) {
                return { success: false, message: 'tutor_id already present' };
            }

            ViewParent.viewed.push(tutor_id);
            await ViewParent.save();

            return { success: true, message: 'tutor_id successfully', ViewParent };
        } catch (err) {
            throw err
        }
    };
}

module.exports = viewParent_service