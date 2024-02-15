const ImageService = require('../service/image_services');

exports.image = async (req, res, next) => {
    try {
        const { id } = req.body;
        const { filename } = req.file;
        const image = await ImageService.createImage(id, filename);
        let data = { id: id, img: req.file.filename };
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const { id } = req.body;
        const { filename } = req.file;
        const updateData = await ImageService.updateimage(id, filename);
        res.status(200).json(updateData);
    } catch (error) {
        next(error);
    }
};

exports.delete = async(req, res, next)=>{
    try{
        const{id} = req.query;
        const deleteData = await ImageService.deleteimage(id);
        res.status(200).json(deleteData)
    }catch(error){
        next(error)
    }
}

exports.get = async(req,res,next) => {
    try {
        const {id} = req.query;
        const getData = await ImageService.getimage(id);
       // res.status(200).json(getData)
        res.status(200).json({token : getData})
    } catch (error) {
        next(error);
    }
}

exports.getimage = async(req,res,next) => {
    try {
        const User = await ImageService.get();
        res.status(200).json(User)
    } catch (error) {
        next(error);
    }
}
