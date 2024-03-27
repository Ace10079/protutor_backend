const ParentService = require('../service/parent_service');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ParentModel = require('../model/parent_model');

exports.register = async (req,res, next)=> {
    try {
        const { parent_id,fname,laname,gender,email,phone,address,state,postcode,password,kidname,grade,subject,tution_slot,credits } = req.body;
       

        const parent =  await ParentService.checkuser(email);
        if(parent){
            return res.status(401).json({message:"Email already exits"});
        }
            const successRes = await ParentService.registerUser(fname,laname,gender,email,phone,address,state,postcode,password,kidname,grade,subject,tution_slot,credits);
           let data = {parent_id:successRes.parent_id,fname: fname, laname: laname,gender:gender,email:email,phone: phone,address: address,state: state,postcode: postcode,password: password,kidname: kidname,grade: grade,subject: subject,tution_slot: tution_slot,credits : credits}
            console.log(successRes);
               res.status(200).json({status:true,success:"User Registered SuccessFully",data});
        
           
    } catch (error) {
        next (error)
 }
}

exports.parentLogin = async (req,res, next) =>{
    try {
        const { email,password } = req.body;
        const parent = await ParentService.loginParent(email);
        
        if(!parent) {
          return res.status(401).json({message:"Parent not found"})
        }
         //const isMatch1 = await parent.comparePassword1(password);
      const isMatch = await bcrypt.compare(password,parent.password);
        if(!isMatch){
          return  res.status(401).json({message : "Invalid Password"});
        }
        const tokenData = {
            parent_id:parent.parent_id,
            fname:parent.fname,
            laname:parent.laname,
            gender:parent.gender,
            email:parent.email,
            phone:parent.phone,
            password:parent.password,
            postcode:parent.postcode,
            state:parent.state,
            address:parent.address,
            kidname:parent.kidname,
            grade:parent.grade,
            subject:parent.subject,
            tution_slot:parent.tution_slot,
            credits : parent.credits
        }
          
        res.status(200).json(tokenData);
    } catch (error) {
        next (error)
    }
}  

exports.parentUpdate = async (req,res,next)=>{
    try {
        const {parent_id,fname,laname,gender,email,phone,address,state,postcode,kidname,grade,subject,tution_slot } = req.body;
        
        const successRes = await ParentService.updateParent(parent_id,fname,laname,gender,email,phone,address,state,postcode,kidname,grade,subject,tution_slot);
        res.status(200).json(successRes);
       
    } catch (error) {
       throw error
        
    }
}

exports.parentDelete = async (req,res,next) =>{
    try {
        const {parent_id:parent_id } = req.query;
        const Parent = await ParentService.deleteParent(parent_id);
        res.status(200).json({status:true,message:"Your Account is Deleted.",Parent});
    } catch (error) {
        throw error
        
    }
}

exports.changePassword = async(req, res, next)=>{
    try{
        const{email,password} = req.body;
        const successRes = await ParentService.changePassword(email,password);
        console.log(successRes);
        res.json({status: true, success: successRes});
    
    }catch(error){
        res.status(200).json({status:false, message: error})

    }
}

exports.verifyphone = async(req, res, next)=>{
    try{
        const{phone} = req.body;
        const patient = await ParentService.checkphone(phone);
        if(!patient){
            res.status(200).json({status:false, message: "Phone Number Not Found"})
        }else{
       
        console.log(patient);
        res.status(200).json({status:true, token: patient})
        
    }
    }catch(error){
        res.status(200).json({status:false, message: error})

    }
}

exports.parentreset = async (req,res,next) => {
    try {
        const {phone,password} = req.body;
        const successRes = await ParentService.resetPassword(phone,password);
        res.json({status: true, success: successRes});
    } catch (error) {
        res.status(200).json({status:false, message: error})
    }
}

exports.parentGet = async (req,res,next) =>{
    try {
        const { parent_id:parent_id } = req.query;
        const getData = await ParentService.getParent(parent_id);
        res.status(200).json(getData);
    } catch (error) {
        throw error
    }
}

exports.parentSubject = async (req,res,next) =>{
    try {
        const { subject:subject } = req.query;
        const getData = await ParentService.getSubject(subject);
        res.status(200).json(getData);
    } catch (error) {
        throw error
    }
}

exports.get = async (req,res,next) => {
    try {
        const getData = await ParentService.Parent()
        res.status(200).json(getData)
    } catch (error) {
        next (error)
    }
}

exports.parentCredit = async (req, res, next) => {
    try {
        const { parent_id, tutor_id } = req.body; 
        const result = await ParentService.reduceCredit(parent_id, tutor_id);

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

exports.creditUpdate = async (req,res,next) => {
    try {
        const { parent_id,credits } = req.body;
        const updateOne = await ParentService.creditsUpdate(parent_id,credits);
        res.status(200).json(updateOne);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"Internal Server Error"});
    }
}