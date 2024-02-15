const PlanModel = require('../model/subscriptionplan_model');
const IdcodeServices = require("./idcode_service");

class PlanServices {

    static async createplan( plan_name,filename,plancost,count){
       try {
        var plan_id = await IdcodeServices.generateCode('PlanId');
        const newImage = new PlanModel({plan_id,plan_name : plan_name ,planimage : filename,plancost : plancost,count : count});
        return await newImage.save();
       } catch (error) {
         throw error
       }

    }

    static async delete(plan_id){
        try {
            var query = { plan_id:plan_id };
            return await PlanModel.deleteMany(query);
        } catch (error) {
            throw error
        }
    }

    static async getplan(){
        try {
           
            return await PlanModel.find();
        } catch (error) {
            throw error
        }
    }
};

module.exports = PlanServices;