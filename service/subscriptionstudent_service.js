const StudentPlanModel = require('../model/subscriptionstudent_model');
const IdcodeServices = require("./idcode_service");

class StudentPlanServices{
    static async registerStudentPlan(email,student_id,fname,plan_name,plancost,status,tnx_id,date,count,address){
        try{
            var sub_id = await IdcodeServices.generateCode("StudentPlan");
            const createUser = new StudentPlanModel({sub_id,email,student_id,fname,plan_name,plancost,status,tnx_id,date,count,address});
            return await createUser.save();
        }catch(err){
            throw err;
        }
    }

    static async updateStudentPlan(sub_id,student_id,fname,plan_name,plancost,status,tnx_id,date,count,address){
        try {
            var query = {sub_id :sub_id};
            var values = {$set : {student_id : student_id,fname : fname,plan_name : plan_name,plancost : plancost,status : status,tnx_id : tnx_id,date : date,count:count,address:address}};

            return await StudentPlanModel.updateOne(query,values)
            
        } catch (error) {
           throw error 
        }
    }

    static async deleteStudentPlan(sub_id){
        try{
            var query = {sub_id : sub_id};
            return await StudentPlanModel.findOneAndDelete(query);

        }catch(error){
            throw error;
        }
    }

    static async getStudentPlan(sub_id){
        try {
            
            return await StudentPlanModel.findOne({sub_id})
        } catch (error) {
            throw error
        }
    }

    static async getid(plan_name){
        try {
            
            return await StudentPlanModel.findOne({plan_name})
        } catch (error) {
            throw error
        }
    }

    static async get(){
        try {
            return await StudentPlanModel.find();
        } catch (error) {
            throw error
        }
    }

  
}
module.exports = StudentPlanServices;