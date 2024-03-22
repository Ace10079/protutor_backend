const TeacherService = require("../service/teacher_service");
const bcrypt = require('bcrypt');


exports.teacherregister = async (req,res,next) => {
    try {
        const { tutor_id,fname,lname,gender,email,phone,address,state,postcode,password,subject,experience,qualification,bio,verification,teacherimage,credits,status } = req.body;
        //const { filename } = req.file; 
        const teacher = await TeacherService.checkuser(email);
        if(teacher){
            return res.status(401).json({message:"Email is Already registered"});
        }
        const successRes = await TeacherService.teacherregister(fname,lname,gender,email,phone,address,state,postcode,password,subject,experience,qualification,bio,verification,teacherimage,credits,status);
        let data = {tutor_id:successRes.tutor_id,fname: fname, lname: lname,gender:gender,email:email,phone: phone,address: address,state: state,postcode: postcode,password: password,subject: subject,experience:experience,qualification: qualification,bio:bio,verification:verification,teacherimage : teacherimage,credits:credits,status:status};
        console.log(successRes);
        res.status(200).json({status: true,success:"Teacher Registered Successfully",data});
    } catch (error) {
        throw error
    } 
}

exports.teacherLogin = async (req,res,next)=>{
    try {
        const { email,password } = req.body;
        const teacher = await TeacherService.teacherLogin(email);
        if(!teacher) {
          return  res.status(401).json({message:"User not found."});
        }
        const isMatch = await bcrypt.compare(password,teacher.password);
        if(!isMatch) {
          return res.status(401).json({message:"Invaild Password"})
        }
        const tokenData = {
            tutor_id:teacher.tutor_id,
            fname:teacher.fname,
            lname:teacher.lname,
            gender:teacher.gender,
            email:teacher.email,
            phone:teacher.phone,
            password:teacher.password,
            postcode:teacher.postcode,
            state:teacher.state,
            address:teacher.address,
            qualification:teacher.qualification,
            experience:teacher.experience,
            bio:teacher.bio,
            verification:teacher.verification,
            subject:teacher.subject,
            credits:teacher.credits,
            teacherimage:teacher.teacherimage,

        }
        res.status(200).json({tokenData});
    } catch (error) {
      next (error)  
    }
}

exports.teacherUpdate = async (req, res, next) => {
    try {
        const { tutor_id, fname, lname, gender, email, phone, address, state, postcode, password, subject, experience, qualification, bio, verification, credits } = req.body;
        const { filename } = req.file;
        
        const updateData = await TeacherService.teacherUpdate(tutor_id, fname, lname, gender, email, phone, address, state, postcode, password, subject, experience, qualification, bio, verification, credits, filename);

        let data = {tutor_id,fname, lname,gender,email,phone,address,state,postcode,password,subject,experience,qualification,bio,verification,teacherimage: filename, credits};
        
        res.status(200).json(data); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
};

exports.creditUpdate = async (req,res,next) => {
    try {
        const { tutor_id,credits } = req.body;
        const updateOne = await TeacherService.creditsUpdate(tutor_id,credits);
        res.status(200).json(updateOne);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"Internal Server Error"});
    }
}

exports.verifyUpdate = async (req,res,next) => {
    try {
        const {tutor_id} = req.query
        const { verification } = req.body;
        const updateOne = await TeacherService.verificationUpdate(tutor_id,verification);
        res.status(200).json(updateOne);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"Internal Server Error"});
    }
}

exports.statusUpdate = async (req,res,next) => {
    try {
        const {tutor_id} = req.query
        const { status } = req.body;
        const updateOne = await TeacherService.statusUpdate(tutor_id,status);
        res.status(200).json(updateOne);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"Internal Server Error"});
    }
}

exports.teacherDelete = async (req,res,next)=> {
    try {
       const {tutor_id:tutor_id } = req.query;
       const Teacher = await TeacherService.deleteTeacher(tutor_id);
       res.status(200).json({status:true,message:"Teacher Account is Deleted..",Teacher}); 
    } catch (error) {
        throw error
    }
}
exports.teacherGet = async (req,res,next)=>{
    try {
       const {tutor_id: tutor_id } = req.query;
       const getData = await TeacherService.getTeacher(tutor_id);
       res.status(200).json(getData); 
    } catch (error) {
        throw error
    }
}

exports.get = async (req,res,next) => {
    try {
        const getData = await TeacherService.Teacher()
        res.status(200).json(getData)
    } catch (error) {
        next (error)
    }
}

exports.verfityPhone = async(req,res,next) =>{
    try {
        const {phone} = req.body;
        const teacher = await TeacherService.checkPhone(phone);
        if(!teacher){
            res.status(200).json({status:false,message:"Phone Number Not Found"});
        } else {
            console.log(teacher);
        res.status(200).json({status:true, token: teacher})
        }
    } catch (error) {
        res.status(200).json({status:false, message: error})
    }
}

exports.changePassword = async(req,res,next) =>{
    try {
        const{email,password} = req.body;
        const successRes = await TeacherService.changePassword(email,password);
        console.log(successRes);
        res.json({status: true, success: successRes});
    } catch (error) {
        res.status(200).json({status:false, message: error})
    }
}
exports.teacherReset = async(req,res,next) => {
    try {
        const {phone,password } = req.body;
        const successRes = await TeacherService.resetPassword(phone,password);
        res.json({status: true,success:successRes});
    } catch (error) {
        res.status(200).json({status:false,success:error})
    }
}

exports.tutorCredit = async (req, res, next) => {
    try {
        const { tutor_id, viewId } = req.body; 
        const result = await TeacherService.reduceCredit( tutor_id,viewId);

        if (result.message) {
            res.json({ message: result.message });
        } else {
            res.json({ count: result.count });
        }
    } catch (error) {
        console.error('Error decreasing credits:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}