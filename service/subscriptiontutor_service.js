const TutorPlanModel =require('../model/subscriptiontutor_model')
const IdcodeServices = require("./idcode_service");

class TutorPlanServices{
    static async registerTutorPlan(tutor_id,fname,plan_name,plancost,status,tnx_id,date,count){
        try{
            var tutorsub_id = await IdcodeServices.generateCode("TutorPlan");
            const createUser = new TutorPlanModel({tutorsub_id,tutor_id,fname,plan_name,plancost,status,tnx_id,date,count});
            return await createUser.save();
        }catch(err){
            throw err;
        }
    }

    static async updateTutorPlan(tutorsub_id,tutor_id,fname,plan_name,plancost,status,tnx_id,date,count){
        try {
            var query = {tutorsub_id :tutorsub_id};
            var values = {$set : {tutor_id : tutor_id,fname : fname,plan_name : plan_name,plancost : plancost,status : status,tnx_id : tnx_id,date : date,count:count}};

            
            return await TutorPlanModel.updateOne(query,values)
            
        } catch (error) {
           throw error 
        }
    }

    static async deleteTutorPlan(tutorsub_id){
        try{
            var query = {tutorsub_id : tutorsub_id};
            return await TutorPlanModel.findOneAndDelete(query);

        }catch(error){
            throw error;
        }
    }

    static async getTutorPlan(tutorsub_id){
        try {
            
            return await TutorPlanModel.findOne({tutorsub_id})
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

  
}
module.exports = TutorPlanServices;