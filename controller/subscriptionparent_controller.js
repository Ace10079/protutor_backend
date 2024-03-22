const ParentPlanServices = require('../service/subscriptionparent_service');


exports.CreateParentPlan = async (req, res, next) => {
    try {
        const { sub_id,parent_id,email,fname,plan_name,plancost,status,tnx_id,date,count,address,phone } = req.body;

        const Res = await ParentPlanServices.registerParentPlan(parent_id,email,fname,plan_name,plancost,status,tnx_id,date,count,address,phone);
        let ParentplanData = { sub_id,parent_id,email,fname,plan_name,plancost : plancost,status,tnx_id,date,count,address,phone};
        res.status(200).json(ParentplanData)

    } catch (error) {
        next(error)
    }
}

exports.Update = async (req,res, next) => {
    try {
        const { sub_id,parent_id,email,fname,plan_name,plancost,status,tnx_id,date,count,address,phone} = req.body;
        const updateData = await ParentPlanServices.updateParentPlan(sub_id,parent_id,email,fname,plan_name,plancost,status,tnx_id,date,count,address,phone);
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

exports.generatemail = async (req, res) => {
    try {
       
        const { sub_id } = req.query;

        const { date, plancost, fname, tnx_id, count, plan_name,email,address } = req.body;
       
        const result = await ParentPlanServices.sendOTPEmail(sub_id, date, plancost, fname, tnx_id, count, plan_name,email,address);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getparentIdPLAN = async(req,res,next) => {
    try {
        const {parent_id} = req.query;
        const User = await ParentPlanServices.getPLAN(parent_id);
        res.status(200).json(User)
    } catch (error) {
        next(error);
    }
}