const StudentPlanModel = require('../model/subscriptionstudent_model');
const IdcodeServices = require("./idcode_service");

class StudentPlanServices{
    static async registerStudentPlan(student_id,fname,planname,plancost,status,tnxid,date,count){
        try{
            var studentsub_id = await IdcodeServices.generateCode("StudentPlan");
            const createUser = new StudentPlanModel({studentsub_id,student_id,fname,planname,plancost,status,tnxid,date,count});
            return await createUser.save();
        }catch(err){
            throw err;
        }
    }

    static async updateStudentPlan(studentsub_id,student_id,fname,planname,plancost,status,tnxid,date,count){
        try {
            var query = {studentsub_id :studentsub_id};
            var values = {$set : {student_id : student_id,fname : fname,planname : planname,plancost : plancost,status : status,tnxid : tnxid,date : date,count:count}};

            return await StudentPlanModel.updateOne(query,values)
            
        } catch (error) {
           throw error 
        }
    }

    static async deleteStudentPlan(studentsub_id){
        try{
            var query = {studentsub_id : studentsub_id};
            return await StudentPlanModel.findOneAndDelete(query);

        }catch(error){
            throw error;
        }
    }

    static async getStudentPlan(studentsub_id){
        try {
            
            return await StudentPlanModel.findOne({studentsub_id})
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