const ParentPlanServices = require('../service/subscriptionparent_service');


exports.CreateParentPlan = async (req, res, next) => {
    try {
        const { sub_id,parent_id,fname,plan_name,plancost,status,tnx_id,date,count } = req.body;

        const Res = await ParentPlanServices.registerParentPlan(parent_id,fname,plan_name,plancost,status,tnx_id,date,count);
        let ParentplanData = { sub_id,parent_id,fname,plan_name,plancost : plancost,status,tnx_id,date,count };
        res.status(200).json(ParentplanData)

    } catch (error) {
        next(error)
    }
}

exports.Update = async (req,res, next) => {
    try {
        const { sub_id,parent_id,fname,plan_name,plancost,status,tnx_id,date,count} = req.body;
        const updateData = await ParentPlanServices.updateParentPlan(sub_id,parent_id,fname,plan_name,plancost,status,tnx_id,date,count);
        res.status(200).json(updateData)
    } catch (error) {
        next (error);
    }

}

exports.delete = async(req, res, next)=>{
    try{
        const{sub_id} = req.query;
        const deleteData = await ParentPlanServices.deleteParentPlan(sub_id);
        res.status(200).json(deleteData)
    }catch(error){
        next(error)
    }
}

exports.getId = async(req,res,next) => {
    try {
        const {sub_id} = req.query;
        const User = await ParentPlanServices.getParentPlan(sub_id);
        res.status(200).json(User)
    } catch (error) {
        next(error);
    }
}

exports.getParentplan = async(req,res,next) =>{
    try {
        const Admin = await ParentPlanServices.get();
        res.status(200).json(Admin)
    } catch (error) {
        
    }
}

exports.getparentId = async(req,res,next) => {
    try {
        const {plan_name} = req.query;
        const User = await ParentPlanServices.getid(plan_name);
        res.status(200).json(User)
    } catch (error) {
        next(error);
    }
}