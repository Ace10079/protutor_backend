const StreetServices = require("../service/street_service");
const csvParser = require('csv-parser');
const fs = require('fs');
const path = require('path');

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
            const result = await StreetServices.bulkinsert(csvs);
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

