
const StudentService = require('../service/student_service');
const bcrypt = require('bcrypt');
const TeacherService = require('../service/teacher_service');


exports.studentRegister = async (req,res,next) =>{
    try {
        const { student_id,fname,lname,gender,dob,grade,email,phone,subject,tution_slot,gname,gphone,address,state,postcode,password,credits } = req.body;
        const student = await StudentService.checkuser(email);
        if(student){
            return res.status(401).json({message:"Email is already registered"});
        }
        
        const successRes = await StudentService.studentRegister(fname,lname,gender,dob,grade,email,phone,subject,tution_slot,gname,gphone,address,state,postcode,password,credits);
        let data = {student_id:successRes.student_id,fname:fname,lname:lname,gender:gender,dob:dob,grade:grade,email:email,phone:phone,subject:subject,tution_slot:tution_slot,gname:gname,gphone:gphone,address:address,state:state,postcode:postcode,password:password,credits:credits}
        console.log(successRes); 
        res.status(200).json({status:true,success:"Students Registered Successfully",data});
        
    } catch (error) {
        throw error;
    }
}

exports.studentLogin = async (req,res,next)=>{
    try {
        const { email,password } = req.body;
        const student = await StudentService.studentLogin(email);
        if(!student){
           return res.status(401).json({message:"User not found"});
        }
        const isMatch = await bcrypt.compare(password,student.password);
        // const isMatch = await student.comparePassword2(password);
        if(!isMatch){
           return res.status(401).json({message:"Invalid Password"});
        }
        const tokenData = {
            student_id:student.student_id,
            fname:student.fname,
            lname:student.lname,
            gender:student.gender,
            dob:student.dob,
            gname:student.gname,
            email:student.email,
            phone:student.phone,
            password:student.password,
            postcode:student.postcode,
            state:student.state,
            address:student.address,
            gphone:student.gphone,
            grade:student.grade,
            subject:student.subject,
            tution_slot:student.tution_slot,
            credits:student.credits
        }
          
        // const token = jwt.sign({email:email,role:'Student'},'Hackwit',{expiresIn:'1h'});
        res.status(200).json({tokenData});
    } catch (error) {
        throw error
    }
}

exports.studentsUpdate = async (req,res,next)=>{
    try {
        const {student_id,fname,lname,gender,dob,grade,email,phone,subject,tution_slot,gname,gphone,address,state,postcode,password,credits } = req.body;
        const updateData = await StudentService.studentUpdate(student_id,fname,lname,gender,dob,grade,email,phone,subject,tution_slot,gname,gphone,address,state,postcode,password,credits);
        res.status(200).json(updateData);   
    } catch (error) {
        throw error
    }
}

exports.studentDelete = async (req,res,next)=> {
    try {
        const { student_id:student_id } = req.query;
        const Students = await StudentService.studentDelete(student_id);
        res.status(200).json({status:true,message:"Student Account is Deleted..",Students});
    } catch (error) {
        throw error
    }
}
exports.studentGet = async (req,res,next)=> {
    try {
        const { student_id:student_id } = req.query;
        const getData = await StudentService.getStudent(student_id);
        res.status(200).json(getData);
    } catch (error) {
        throw error
    }
}

exports.creditUpdate = async (req,res,next) => {
    try {
        const { student_id,credits } = req.body;
        const updateOne = await StudentService.creditsUpdate(student_id,credits);
        res.status(200).json(updateOne);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"Internal Server Error"});
    }
}


exports.get = async (req,res,next) => {
    try {
        const getData = await StudentService.student()
        res.status(200).json(getData)
    } catch (error) {
        next (error)
    }
}

exports.studentSubject = async (req,res,next) => {
    try {
        const {subject:subject } = req.query;
        const getData = await TeacherService.getSubject(subject);
        res.status(200).json(getData);
    } catch (error) {
       throw error 
    }
}
exports.studentCredit = async (req, res, next) => {
    try {
        const { student_id } = req.body; 

        const result = await StudentService.reduceCredit(student_id);

        if (result.message) {
          
            res.json({ message: result.message });
        } else {
            
            res.json({ count: result.count });
        }
    } catch (error) {
        console.error('Error in parentCredits:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.verifyphone = async(req, res, next)=>{
    try{
        const{phone} = req.body;
        const student = await StudentService.checkphone(phone);
        if(!student){
            res.status(200).json({status:false, message: "Phone Number Not Found"})
        }else{
       
        console.log(student);
        res.status(200).json({status:true, token: patient})
        
    }
    }catch(error){
        res.status(200).json({status:false, message: error})

    }
}

exports.changePassword = async(req, res, next)=>{
    try{
        const{email,password} = req.body;
        const successRes = await StudentService.changePassword(email,password);
        console.log(successRes);
        res.json({status: true, success: successRes});
    
    }catch(error){
        res.status(200).json({status:false, message: error})

    }
}
exports.studentReset = async(req,res,next) => {
    try {
        const {phone,password} = req.body;
        const successRes = await StudentService.resetPassword(phone,password);
        console.log(successRes);
        res.json({status:true,success:successRes});
    } catch (error) {
        res.status(200).json({status:false,message:error});      
    }
}