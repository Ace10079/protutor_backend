const CategoriesService = require("../service/categories_servide");
const fs = require('fs');
const path = require('path');


exports.categories = async (req, res, next) => {
    try {
      const { subject } = req.body;
      const { filename } = req.file; 
  
      const image1 = await CategoriesService.createCategories(subject, filename);
      let data = { subject: subject, categoryimage: req.file.filename };
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };


exports.update = async (req,res,next)=>{
    try {
        const { subject } = req.body;
        const { filename } = req.file;
        const updateData = await CategoriesService.update(subject, filename);
        res.status(200).json(updateData);
    } catch (error) {
        next(error);
    }
}
exports.delete = async (req,res,next)=>{
    try {
     const { subject } = req.query;
     const data = await CategoriesService.delete(subject);

     if (data && data.categoryimage) {
        const filePath = path.join(__dirname, '../image', data.categoryimage);
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Error deleting file: ${err.message}`);
            }
        });
    }

     res.status(200).json({message:"Categoires Deleted",data});   
    } catch (error) {
        throw error
    }
}
exports.get = async (req,res,next) =>{
    try {
       const { subject } = req.query;
       const getData = await CategoriesService.get(subject);
       res.status(200).json(getData);
    } catch (error) {
       throw error 
    }
}

exports.getCategory = async (req,res,next) =>{
    try {
       const getData = await CategoriesService.getCategory();
       res.status(200).json({token : getData});
    } catch (error) {
       throw error 
    }
}
