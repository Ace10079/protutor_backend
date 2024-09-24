const LocationServices = require("../service/location_service");

exports.register = async (req, res, next) => {
    try {
        const { location_name,createdby } = req.body;

        const Res = await LocationServices.register(location_name,createdby);
        let lcnData = { location_name,createdby };
        res.status(200).json(lcnData)

    } catch (error) {
        next(error)
    }
}

exports.delete = async(req, res, next)=>{
    try{
        const{location_name} = req.query;
        const lcn = await LocationServices.delete(location_name);
        res.status(200).json(lcn)
    }catch(error){
        next(error)
    }
}

exports.get = async(req,res,next) =>{
    try {
        const lcn = await LocationServices.get();
        res.status(200).json(lcn)
    } catch (error) {
        
    }
}

