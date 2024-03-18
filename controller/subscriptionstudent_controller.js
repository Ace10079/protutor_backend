const StudentPlanServices = require('../service/subscriptionstudent_service');


exports.CreateStudentPlan = async (req, res, next) => {
    try {
        const { sub_id,student_id,email,fname,plan_name,plancost,status,tnx_id,date,count,address,phone } = req.body;

        const Res = await StudentPlanServices.registerStudentPlan(student_id,email,fname,plan_name,plancost,status,tnx_id,date,count,address,phone);
        let StudentplanData = { sub_id,student_id,email,fname,plan_name,plancost,status,tnx_id,date,count,address,phone };
        res.status(200).json(StudentplanData)

    } catch (error) {
        next(error)
    }
}

exports.Update = async (req,res, next) => {
    try {
        const { sub_id,student_id,email,fname,plan_name,plancost,status,tnx_id,date,count,address,phone} = req.body;
        const updateData = await StudentPlanServices.updateStudentPlan(sub_id,student_id,email,fname,plan_name,plancost,status,tnx_id,date,count,address,phone);
        res.status(200).json(updateData)
    } catch (error) {
        next (error);
    }

}

exports.delete = async(req, res, next)=>{
    try{
        const{sub_id} = req.query;
        const deleteData = await StudentPlanServices.deleteStudentPlan(sub_id);
        res.status(200).json(deleteData)
    }catch(error){
        next(error)
    }
}

exports.getId = async(req,res,next) => {
    try {
        const {sub_id} = req.query;
        const User = await StudentPlanServices.getStudentPlan(sub_id);
        res.status(200).json(User)
    } catch (error) {
        next(error);
    }
}

exports.getStudentplan = async(req,res,next) =>{
    try {
        const tutor = await StudentPlanServices.get();
        res.status(200).json(tutor)
    } catch (error) {
        
    }
}

exports.getStudentId = async(req,res,next) => {
    try {
        const {plan_name} = req.query;
        const User = await StudentPlanServices.getid(plan_name);
        res.status(200).json(User)
    } catch (error) {
        next(error);
    }
}