const IdcodeServices = require('../service/idcode_service');

exports.idcode = async(req,res, next) =>{
    try {
        const{idname} = req.body;
        const successRes = await IdcodeServices.generateCode(idname);
        res.json({status: true, idcode: successRes});
    } catch (error) {
        res.json({status: false, success: error});
    }
}