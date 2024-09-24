const LocationServices = require("../service/location_service");
const csvParser = require('csv-parser');
const fs = require('fs');
const path = require('path');

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


exports.uploadCSV = async (req, res, next) => {
    try {
     
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      const csvs = [];
      const filePath = path.join(__dirname, '../image', req.file.filename);
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => {
          csvs.push(row);
        })
        .on('end', async () => {
          try {
            const result = await LocationServices.bulkinsert(csvs);
            res.status(200).json(result);
          } catch (error) {
            next(error);
          } finally {
            // Remove the file after processing
            fs.unlinkSync(filePath);
          }
        });
    } catch (error) {
      next(error);
    }
  };

