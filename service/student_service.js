const StudentModel = require('../model/student_model');
const IdcodeServices = require('./idcode_service');
const bcrypt = require('bcrypt');

class StudentService{
    static async studentRegister(fname,lname,gender,dob,grade,email,phone,subject,tution_slot,gname,gphone,address,state,postcode,password,credits){
        try {
            var student_id = await IdcodeServices.generateCode("students");
            const createUser = new StudentModel({student_id,fname,lname,gender,dob,grade,email,phone,subject,tution_slot,gname,gphone,address,state,postcode,password,credits});
            return await createUser.save();
        } catch (error) {
            throw error
        }
    }

    static async checkuser(email){
        try {
            return await StudentModel.findOne({email})
        } catch (error) {
            throw error
        }
    }

    static async checkphone(phone){
        try {
            return await StudentModel.findOne({phone});     
        } catch (error) {
            throw error
        }
    }
    
    static async studentLogin(email){
        try {
            return await StudentModel.findOne({email})
        } catch (error) {
            throw error
        }
    }
    static async studentUpdate(student_id,fname,lname,gender,dob,grade,email,phone,subject,tution_slot,gname,gphone,address,state,postcode,password,credits){
        try {
            var query = { student_id:student_id};
            var values = { $set: {fname:fname,lname:lname,gender:gender,dob:dob,grade:grade,email:email,phone:phone,subject:subject,tution_slot:tution_slot,gname:gname,gphone:gphone,address:address,state:state,postcode:postcode,password:password}};
            return await StudentModel.updateOne(query,values);
        } catch (error) {
            throw error
        }
    }

    static async studentDelete(student_id){
        try {
            var query = {student_id:student_id};
            return await StudentModel.findOneAndDelete(query);    
        } catch (error) {
            throw error
        }
    }

    static async getStudent(student_id){
        try {
            var query = { student_id:student_id };
            return await StudentModel.find(query);
        } catch (error) {
            throw error
        }
    }

    static async student(){
        try {
            return await StudentModel.find()
        } catch (error) {
            throw error
        }
    } 

    static async creditsUpdate(student_id,credits) {
        try {
            var query = {student_id:student_id};
            var values = {
                $set:{
                    credits:credits,
                }
            };
            return await StudentModel.updateOne(query,values);  
        } catch (error) {
            throw error;
        }
    }

    static async getSubject(subject) {
        try {
            var query = {subject:subject};
            return await StudentModel.find(query); 
        } catch (error) {
            throw error
        }
    }
    
    static async changePassword(email,password){
        try{
            var query = { email: email };
            const salt = await(bcrypt.genSalt(10));
            const hashpass = await bcrypt.hash(password,salt);
            var values = { $set: { password: hashpass} };
            return await StudentModel.updateOne(query,values);
        }catch(error){
            print(error);
        }
    }

    static async resetPassword(phone,password){
        try {
            var query ={phone:phone};
            const salt = await(bcrypt.genSalt(10));
            const hashpass = await bcrypt.hash(password,salt);
            var values = { $set: { password: hashpass} };
            return await StudentModel.updateOne(query,values);
        } catch (error) {
            
        }
    }

    static async reduceCredit(student_id){
        try {
            const student = await StudentModel.findOne({student_id});
            if(!student){
                return { message : "Student not found"};
            }
            if(student.credits > 0 ){
                student.credits--;
                await student.save();
                return { count:student.credits}
            } 
            else {
               
                return { message: "Count is already zero" };
            }
        } catch (error) {
            console.error('Error decreasing credits:', error);
            throw new Error('Error decreasing credits');
        }
    }
}
module.exports = StudentService;