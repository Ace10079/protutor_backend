const BannerService = require("../service/banner_service");
const fs = require('fs');
const path = require('path');


exports.createBanner = async (req, res, next) => {
    try {
      const { filename } = req.file; 
  
      const banner = await BannerService.createbanner(filename);
      let data = {image: req.file.image };
      res.status(200).json(banner);
    } catch (error) {
      next(error);
    }
  };

  exports.delete = async (req,res,next)=>{
    try {
     const { banner_id } = req.query;
     const data = await BannerService.delete(banner_id);

     if (data && data.image) {
      const filePath = path.join(__dirname, '../image', data.image);
      fs.unlink(filePath, (err) => {
          if (err) {
              console.error(`Error deleting file: ${err.message}`);
          }
      });
  }
     res.status(200).json({message:"Deleted",data});   
    } catch (error) {
        throw error
    }
}

exports.get = async (req,res,next) =>{
    try {
       const getData = await BannerService.get();
       res.status(200).json(getData);
    } catch (error) {
       throw error 
    }
}

 