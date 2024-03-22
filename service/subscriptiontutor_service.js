const TutorPlanModel =require('../model/subscriptiontutor_model')
const IdcodeServices = require("./idcode_service");

class TutorPlanServices{
    static async registerTutorPlan(tutor_id,email,fname,plan_name,plancost,status,tnx_id,date,count,address,phone){
        try{
            var sub_id = await IdcodeServices.generateCode("TutorPlan");
            const createUser = new TutorPlanModel({sub_id,tutor_id,email,fname,plan_name,plancost,status,tnx_id,date,count,address,phone});
            return await createUser.save();
        }catch(err){
            throw err;
        }
    }

    static async updateTutorPlan(sub_id,tutor_id,email,fname,plan_name,plancost,status,tnx_id,date,count,address,phone){
        try {
            var query = {sub_id :sub_id};
            var values = {$set : {tutor_id : tutor_id,email:email,fname : fname,plan_name : plan_name,plancost : plancost,status : status,tnx_id : tnx_id,date : date,count:count,address:address,phone:phone}};

            
            return await TutorPlanModel.updateOne(query,values)
            
        } catch (error) {
           throw error 
        }
    }

    static async deleteTutorPlan(sub_id){
        try{
            var query = {sub_id : sub_id};
            return await TutorPlanModel.findOneAndDelete(query);

        }catch(error){
            throw error;
        }
    }

    static async getTutorPlan(sub_id){
        try {
            
            return await TutorPlanModel.findOne({sub_id})
        } catch (error) {
            throw error
        }
    }

    static async getid(plan_name){
        try {
            
            return await TutorPlanModel.findOne({plan_name})
        } catch (error) {
            throw error
        }
    }

    static async get(){
        try {
            return await TutorPlanModel.find();
        } catch (error) {
            throw error
        }
    }

    static async getPLAN(tutor_id){
        try {
            
            return await TutorPlanModel.findOne({tutor_id})
        } catch (error) {
            throw error
        }
    }

  
}
module.exports = TutorPlanServices;