const { idcode } = require("../controller/idcode_controller");
const FeadbackModel = require("../model/feedback_model");
const IdcodeServices = require("./idcode_service")


class FeedBackService{

    static async createFeadBack(user_id,user_type,tutor_id,ratings,feedback,datetime){
        try {
            const create = new FeadbackModel({user_id,user_type,tutor_id,ratings,feedback,datetime});
            return await create.save();
        } catch (error) {
            throw error
        }
    }
}

module.exports = FeedBackService;