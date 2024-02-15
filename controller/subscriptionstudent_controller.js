const StudentPlanServices = require('../service/subscriptionstudent_service');


exports.CreateStudentPlan = async (req, res, next) => {
    try {
        const { studentsub_id,student_id,fname,planname,plancost,status,tnxid,date,count } = req.body;

        const Res = await StudentPlanServices.registerStudentPlan(student_id,fname,planname,plancost,status,tnxid,date,count);
        let StudentplanData = { studentsub_id,student_id,fname,planname,plancost : plancost,status,tnxid,date,count };
        res.status(200).json(StudentplanData)

    } catch (error) {
        next(error)
    }
}

exports.Update = async (req,res, next) => {
    try {
        const { studentsub_id,student_id,fname,planname,plancost,status,tnxid,date,count} = req.body;
        const updateData = await StudentPlanServices.updateStudentPlan(studentsub_id,student_id,fname,planname,plancost,status,tnxid,date,count);
        res.status(200).json(updateData)
    } catch (error) {
        next (error);
    }

}

exports.delete = async(req, res, next)=>{
    try{
        const{studentsub_id} = req.query;
        const deleteData = await StudentPlanServices.deleteStudentPlan(studentsub_id);
        res.status(200).json(deleteData)
    }catch(error){
        next(error)
    }
}

exports.getId = async(req,res,next) => {
    try {
        const {studentsub_id} = req.query;
        const User = await StudentPlanServices.getStudentPlan(studentsub_id);
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
        const {planname} = req.query;
        const User = await StudentPlanServices.getid(planname);
        res.status(200).json(User)
    } catch (error) {
        next(error);
    }
}