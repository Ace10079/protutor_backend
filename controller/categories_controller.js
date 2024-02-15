const CategoriesService = require("../service/categories_servide");


exports.categories = async (req, res, next) => {
    try {
      const { subject } = req.body;
      const { filename } = req.file; // Ensure multer middleware parses the file
  
      const image1 = await CategoriesService.createCategories(subject, filename);
      let data = { subject: subject, categoryimage: req.file.filename };
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

// exports.categories = async (req, res, next) => {
//     try {
//         const { subject } = req.body;
//         const files = req.files; // Access multiple files using req.files
//         let images = [];
        
//         // Create an array of promises to save each file
//         const promises = files.map(async (file) => {
//             const image = await CategoriesService.createCategories(subject, file.filename);
//             images.push({ image: file.filename }); // Push each file's details to the images array
//         });

//         // Wait for all promises to resolve
//         await Promise.all(promises);

//         res.status(200).json({ subject: subject, images: images }); // Return all file details in the response
//     } catch (error) {
//         next(error);
//     }
// };


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
     const deleteData = await CategoriesService.delete(subject);
     res.status(200).json({message:"Categoires Deleted",deleteData});   
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
