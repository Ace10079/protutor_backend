const ViewParentModel = require("../model/viewedParent_model");

class viewParent_service {

    static async ViewParent(parent_id, viewed) {
        try {
            
            const existing = await ViewParentModel.findOne({ parent_id });
    
            if (existing) {
                return existing;
            }
            const create = new ViewParentModel({ parent_id, viewed });
            return await create.save();
        } catch (error) {
            throw error;
        }
    }

}

module.exports = viewParent_service