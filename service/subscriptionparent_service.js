const ParentPlanModel =require('../model/subscriptionparent_model')
const IdcodeServices = require("./idcode_service");

class ParentPlanServices{
    static async registerParentPlan(parent_id,fname,plan_name,plancost,status,tnx_id,date,count){
        try{
            var sub_id = await IdcodeServices.generateCode("ParentPlan");
            const createUser = new ParentPlanModel({sub_id,parent_id,fname,plan_name,plancost,status,tnx_id,date,count});
            return await createUser.save();
        }catch(err){
            throw err;
        }
    }

    static async updateParentPlan(sub_id,parent_id,fname,plan_name,plancost,status,tnx_id,date,count){
        try {
            var query = {sub_id :sub_id};
            var values = {$set : {parent_id : parent_id,fname : fname,plan_name : plan_name,plancost : plancost,status : status,tnx_id : tnx_id,date : date,count:count}};
            
            return await ParentPlanModel.updateOne(query,values)
            
        } catch (error) {
           throw error 
        }
    }

    static async deleteParentPlan(sub_id){
        try{
            var query = {parentsub_id : parentsub_id};
            return await ParentPlanModel.findOneAndDelete(query);

        }catch(error){
            throw error;
        }
    }

    static async getParentPlan(sub_id){
        try {
            
            return await ParentPlanModel.findOne({sub_id})
        } catch (error) {
            throw error
        }
    }

    static async getid(plan_name){
        try {
            
            return await ParentPlanModel.findOne({plan_name})
        } catch (error) {
            throw error
        }
    }

    static async get(){
        try {
            return await ParentPlanModel.find();
        } catch (error) {
            throw error
        }
    }

  
}
module.exports = ParentPlanServices;