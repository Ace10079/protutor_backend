const StudentPlanModel = require('../model/subscriptionstudent_model');
const IdcodeServices = require("./idcode_service");

class StudentPlanServices{
    static async registerStudentPlan(student_id,fname,planname,plancost,status,tnxid,date,count){
        try{
            var sub_id = await IdcodeServices.generateCode("StudentPlan");
            const createUser = new StudentPlanModel({sub_id,student_id,fname,planname,plancost,status,tnxid,date,count});
            return await createUser.save();
        }catch(err){
            throw err;
        }
    }

    static async updateStudentPlan(sub_id,student_id,fname,planname,plancost,status,tnxid,date,count){
        try {
            var query = {sub_id :sub_id};
            var values = {$set : {student_id : student_id,fname : fname,planname : planname,plancost : plancost,status : status,tnxid : tnxid,date : date,count:count}};

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

    static async getid(planname){
        try {
            
            return await StudentPlanModel.findOne({planname})
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