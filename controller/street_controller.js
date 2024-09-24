const StreetServices = require("../service/street_service");

exports.register = async (req, res, next) => {
    try {
        const { street_name,createdby } = req.body;

        const Res = await StreetServices.register(street_name,createdby);
        let streetData = { street_name,createdby };
        res.status(200).json(streetData)

    } catch (error) {
        next(error)
    }
}

exports.delete = async(req, res, next)=>{
    try{
        const{street_name} = req.query;
        const streetData = await StreetServices.delete(street_name);
        res.status(200).json(streetData)
    }catch(error){
        next(error)
    }
}

exports.get = async(req,res,next) =>{
    try {
        const streetData = await StreetServices.get();
        res.status(200).json(streetData)
    } catch (error) {
        
    }
}

