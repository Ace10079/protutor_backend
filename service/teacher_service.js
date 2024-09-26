const TeacherModel = require('../model/teacher_model');
const ViewTutorModel = require('../model/viewedTutor_model');
const IdcodeServices = require('./idcode_service');
const bcrypt = require('bcrypt');


class TeacherService {
    static async teacherregister(fname,lname,gender,email,phone,unitnumber,address,location,city,state,postcode,password,subject,experience,qualification,bio,verification,teacherimage,credits,status){
        try {
            var tutor_id = await IdcodeServices.generateCode("teacher");
            const createUser = new TeacherModel({tutor_id,fname,lname,gender,email,phone,unitnumber,address,location,city,state,postcode,password,subject,experience,qualification,bio,verification,teacherimage,credits,status});
            return await createUser.save();
        } catch (error) {
            throw error;
        }
    }

    static async checkuser(email){
        try {
            return await TeacherModel.findOne({email})
        } catch (error) {
            throw error
        }
    }

    static async checkPhone(phone) {
        try {
            return await TeacherModel.findOne({phone})
        } catch (error) {
            throw error
        }
    }

    static async teacherLogin(email){
        try {
            return await TeacherModel.findOne({email})
        } catch (error) {
            throw error
        }
    }

    static async teacherUpdate(tutor_id, fname, lname, gender, email, phone, unitnumber,address, location,city,state, postcode, subject, experience, qualification, bio, filename) {
        try {
            const teacher = await TeacherModel.findOne({ tutor_id });
            if (!teacher) {
                throw new Error("Teacher not found");
            }
    
            const oldImage = teacher.teacherimage;
    
            var query = { tutor_id: tutor_id };
            var values = {
                $set: {
                    fname: fname,
                    laname: lname,
                    gender: gender,
                    email: email,
                    phone: phone,
                    unitnumber: unitnumber,
                    address: address,
                    location:location,
                    city:city,
                    state: state,
                    postcode: postcode,
                    subject: subject,
                    experience: experience,
                    qualification: qualification,
                    bio: bio,
                    teacherimage: filename 
                }
            };
    
            const updatedTeacher = await TeacherModel.updateOne(query, values);
    
            return { updatedTeacher, oldImage };
        } catch (error) {
            throw error;
        }
    }
    
    static async creditsUpdate(tutor_id,credits){
        try {
            var query = {tutor_id:tutor_id};
            var values = {
                $set:{
                    credits:credits,
                }
            };
            return await TeacherModel.updateOne(query,values);
        } catch (error) {
           throw error; 
        }
    }

    static async verificationUpdate(tutor_id,verification){
        try {
            var query = {tutor_id:tutor_id};
            var values = {
                $set:{
                    verification:verification,
                }
            };
            return await TeacherModel.updateOne(query,values);
        } catch (error) {
           throw error; 
        }
    }

    static async statusUpdate(tutor_id,status){
        try {
            var query = {tutor_id:tutor_id};
            var values = {
                $set:{
                    status:status,
                }
            };
            return await TeacherModel.updateOne(query,values);
        } catch (error) {
           throw error; 
        }
    }

    static async deleteTeacher(tutor_id){
        try {
            var query = {tutor_id:tutor_id};
            return await TeacherModel.findOneAndDelete(query);
        } catch (error) {
           throw error 
        }
    }

    static async getTeacher(tutor_id){
        try {
            var query = { tutor_id:tutor_id};
            return await TeacherModel.find(query);
        } catch (error) {
           throw error 
        }
    }

    static async Teacher(){
        try {
            return await TeacherModel.find({ verification: "verified" });
        } catch (error) {
            throw error;
        }
    }

    static async Teacher1(){
        try {
            return await TeacherModel.find();
        } catch (error) {
            throw error;
        }
    }

    static async changePassword(email,password){
        try{
            var query = { email: email };
            const salt = await(bcrypt.genSalt(10));
            const hashpass = await bcrypt.hash(password,salt);
            var values = { $set: { password: hashpass} };
            return await TeacherModel.updateOne(query,values);
        }catch(error){
            print(error);
        }
    } 
    static async getSubject(subject) {
        try {
            var query = {subject:subject};
            return await TeacherModel.find(query); 
        } catch (error) {
            throw error
        }
    }

    static async resetPassword(phone,password){
        try {
            var query = {phone:phone};
            const salt = await(bcrypt.genSalt(10));
            const hashpass = await bcrypt.hash(password,salt);
            var values = { $set: { password: hashpass} };
            return await TeacherModel.updateOne(query,values);
        } catch (error) {
           throw error 
        }
    }

    static async reduceCredit(tutor_id, ViewId) {
        try {
          const tutor = await TeacherModel.findOne({ tutor_id });
    
          if (!tutor) {
            return { message: "Tutor not  found" };
          }
    
          const viewtutor = await ViewTutorModel.findOne({ tutor_id });
          if (viewtutor && viewtutor.viewed.includes(ViewId)) {
            return { message: "Viewers already present" };
          }
    
          if (tutor.credits > 0) {
            tutor.credits--;
            await tutor.save();
    
            if (viewtutor) {
                viewtutor.viewed.push(ViewId);
              await viewtutor.save();
            }
    
            return { count: tutor.credits };
          } else {
            return { message: "Count is already zero" };
          }
        } catch (error) {
          console.error("Error decreasing credits:", error);
          throw new Error("Error decreasing credits");
        }
      }
}

module.exports = TeacherService;