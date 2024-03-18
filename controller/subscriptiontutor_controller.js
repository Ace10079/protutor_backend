const TutorPlanServices = require('../service/subscriptiontutor_service');


exports.CreateTutorPlan = async (req, res, next) => {
    try {
        const { sub_id,email,tutor_id,fname,plan_name,plancost,status,tnx_id,date,count,address,phone } = req.body;

        const Res = await TutorPlanServices.registerTutorPlan(sub_id,email,tutor_id,fname,plan_name,plancost,status,tnx_id,date,count,address,phone);
        let TutorplanData = { sub_id,email,tutor_id,fname,plan_name,plancost,status,tnx_id,date,count,address,phone };
        res.status(200).json(TutorplanData)

    } catch (error) {
        next(error)
    }
}

exports.Update = async (req,res, next) => {
    try {
        const { sub_id,tutor_id,fname,plan_name,plancost,status,tnx_id,date,count,address,phone} = req.body;
        const updateData = await TutorPlanServices.updateTutorPlan(sub_id,tutor_id,fname,plan_name,plancost,status,tnx_id,date,count,address,phone);
        res.status(200).json(updateData)
    } catch (error) {
        next (error);
    }

}

exports.delete = async(req, res, next)=>{
    try{
        const{sub_id} = req.query;
        const deleteData = await TutorPlanServices.deleteTutorPlan(sub_id);
        res.status(200).json(deleteData)
    }catch(error){
        next(error)
    }
}

exports.getId = async(req,res,next) => {
    try {
        const {sub_id} = req.query;
        const User = await TutorPlanServices.getTutorPlan(sub_id);
        res.status(200).json(User)
    } catch (error) {
        next(error);
    }
}

exports.getTutorplan = async(req,res,next) =>{
    try {
        const tutor = await TutorPlanServices.get();
        res.status(200).json(tutor)
    } catch (error) {
        
    }
}

exports.getTutorId = async(req,res,next) => {
    try {
        const {plan_name} = req.query;
        const User = await TutorPlanServices.getid(plan_name);
        res.status(200).json(User)
    } catch (error) {
        next(error);
    }
}