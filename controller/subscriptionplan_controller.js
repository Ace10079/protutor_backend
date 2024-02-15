const PlanServices = require('../service/subscriptionplan_service');

exports.plan = async (req, res, next) => {
    try {
      const { plan_id,plan_name,plancost,count } = req.body;
      const { filename } = req.file; 
  
      const plan = await PlanServices.createplan(plan_name,filename,plancost,count);
      let data = {plan_id,plan_name : plan_name ,planimage : req.file.filename,plancost : plancost,count : count};
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  exports.delete = async (req,res,next)=>{
    try {
     const { plan_id } = req.query;
     const deleteData = await PlanServices.delete(plan_id);
     res.status(200).json({message:"Plan Deleted",deleteData});   
    } catch (error) {
      next (error )
    }
}

  exports.getplan = async (req,res,next) =>{
    try {
       const getData = await PlanServices.getplan();
       res.status(200).json({token : getData});
    } catch (error) {
       next (error )
    }
}