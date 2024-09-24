const router = require("express").Router();
const { route } = require("../app");
const multer = require("multer");
const path = require("path");
const idcodeController = require("../controller/idcode_controller");
const parentController = require("../controller/parent_controller");
const studentController = require("../controller/student_controller");
const teacherController = require("../controller/teacher_controller");
const categoriesController = require("../controller/categories_controller");
const feadbackController = require("../controller/feadback_controller");
const AdminController = require("../controller/admin_controller");
const ImageController = require("../controller/image_controller");
const PlanController = require("../controller/subscriptionplan_controller");
const ParentPlanController = require("../controller/subscriptionparent_controller");
const TutorPlanController = require("../controller/subscriptiontutor_controller");
const StudentPlanController = require("../controller/subscriptionstudent_controller");
const ParentWishListController = require("../controller/parentwishlist_controller");
const StudentWishListController = require("../controller/studentwishlist_controller");
const TeacherWishListParentController = require("../controller/teacherwishlistparent_controller");
const TeacherWishListStudentController = require("../controller/teacherwishliststudent_controller");
const DocumentsController = require("../controller/verification_controller");
const viewParentController = require("../controller/viewParent_controller");
const ViewStudentController = require("../controller/viewStudent_controller");
const ViewTutorController = require("../controller/viewTutor_controller");
const NotifyController = require("../controller/notify_controller");
const BannerController = require("../controller/banner_controller");
const LocationController = require('../controller/location_controller');
const StreetController = require('../controller/street_controller');


const storage = multer.diskStorage({
  destination: "./image",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage }).single("Profile");
const upload1 = multer({ storage: storage }).single("categoryimage");
const plan = multer({ storage: storage }).single("planimage");
const teacher = multer({ storage: storage }).single("teacherimage");
const banner = multer({ storage: storage }).single("image");

const documents = multer({ storage: storage }).fields([
  { name: "cv", maxCount: 1 },
  { name: "certificate", maxCount: 1 },
  { name: "id_proof", maxCount: 1 },
  { name: "address_proof", maxCount: 1 },
]);

router.post("/upload", upload, ImageController.image);
router.post("/updateimage", upload, ImageController.update);
router.delete("/deleteimage", ImageController.delete);
router.get("/getimageId", ImageController.get);
router.get("/getimage", ImageController.getimage);

router.post("/idcode", idcodeController.idcode);

// Admin routes:-
router.post("/admin", AdminController.register);
router.post("/adminlogin", AdminController.login);
router.get("/getadmin", AdminController.get);
router.get("/getadmin1", AdminController.getAdmin);
router.get("/getemail", AdminController.getEmail);
router.put("/updateadmin", AdminController.Update);
router.delete("/deleteadmin", AdminController.delete);

// Parent routes:-
router.post("/parentregister", parentController.register);
router.post("/parentLogin", parentController.parentLogin);
router.put("/parentUpdate", parentController.parentUpdate);
router.get("/parentGetData", parentController.parentGet);
router.get("/parentsubject", parentController.parentSubject);
router.get("/parentget", parentController.get);
router.delete("/parentDelete", parentController.parentDelete);
router.put("/changePassword", parentController.changePassword);
router.put("/creditscountUpdate", parentController.creditUpdate);
router.put("/parentreset", parentController.parentreset);
router.post("/phonenumber", parentController.verifyphone);
router.post("/creditCount", parentController.parentCredit);

// Student routes:-
router.post("/studentregister", studentController.studentRegister);
router.post("/studentLogin", studentController.studentLogin);
router.put("/studentUpdate", studentController.studentsUpdate);
router.get("/studentGetData", studentController.studentGet);
router.get("/studentSubject", studentController.studentSubject);
router.get("/studentget", studentController.get);
router.delete("/studentDelete", studentController.studentDelete);
router.put("/studentChangePassword", studentController.changePassword);
router.put("/creditsUpdate", studentController.creditUpdate);
router.put("/studentReset", studentController.studentReset);
router.post("/studentVerifyPhone", studentController.verifyphone);
router.post("/creditsCount", studentController.studentCredit);

// Tutor routes:-
router.post("/teacherregister", teacherController.teacherregister);
router.post("/teacherlogin", teacherController.teacherLogin);
router.post("/teacherUpdate", teacher, teacherController.teacherUpdate);
router.get("/teacherGetData", teacherController.teacherGet);
router.get("/teacherget", teacherController.get);
router.get("/teacherget1", teacherController.get1);
router.put("/teacherPasswordChange", teacherController.changePassword);
router.delete("/teacherDelete", teacherController.teacherDelete);
router.put("/creditUpdate", teacherController.creditUpdate);
router.put("/verifyUpdate", teacherController.verifyUpdate);
router.put("/verifyUpdate1", teacherController.verifyUpdate1);
router.put("/statusUpdate", teacherController.statusUpdate);
router.put("/teacherReset", teacherController.teacherReset);
router.post("/teacherVerifyPhone", teacherController.verfityPhone);
router.post("/teacherCreditCount", teacherController.tutorCredit);

// Category routes:-
router.post("/categories", upload1, categoriesController.categories);
router.post("/updatecategories", upload1, categoriesController.update);
router.get("/categoriesGet", categoriesController.get);
router.get("/getcategories", categoriesController.getCategory);
router.delete("/categoriesDelete", categoriesController.delete);

// Subscription Plan routes:-
router.post("/plan", plan, PlanController.plan);
router.get("/getplans", PlanController.getplan);
router.put("/updateplans",PlanController.Update);
router.delete("/deleteplan", PlanController.delete);

// Parent Subscription routes:-
router.post("/parentplan", ParentPlanController.CreateParentPlan);
router.get("/getparentplan", ParentPlanController.getParentplan);
router.get("/getparentplanId", ParentPlanController.getId);
router.get("/getplanparentid", ParentPlanController.getparentId);
router.put("/updateparentplan", ParentPlanController.Update);
router.get("/getparentPLAN",ParentPlanController.getparentIdPLAN);
router.delete("/deleteparentplan", ParentPlanController.delete);
router.post("/parentemail", ParentPlanController.generatemail);

// tutor Subscription routes:-
router.post("/tutorplan", TutorPlanController.CreateTutorPlan);
router.get("/gettutorplan", TutorPlanController.getTutorplan);
router.get("/gettutorplanId", TutorPlanController.getId);
router.get("/getplantutorid", TutorPlanController.getTutorId);
router.get("/gettutorPLAN", TutorPlanController.getTutorIdplan);
router.put("/updatetutorplan", TutorPlanController.Update);
router.delete("/deletetutorplan", TutorPlanController.delete);

// student Subscription routes:-
router.post("/studentplan", StudentPlanController.CreateStudentPlan);
router.get("/getstudentplan", StudentPlanController.getStudentplan);
router.get("/getstudentplanid", StudentPlanController.getId);
router.get("/getstudentid", StudentPlanController.getStudentId);
router.get("/getstudentPLAN",StudentPlanController.getStudentIdPLAN)
router.put("/updatestudentplan", StudentPlanController.Update);
router.delete("/deletestudentplan", StudentPlanController.delete);

// Parent WishList routes:-
router.delete("/deletewish", ParentWishListController.delete);
router.post("/wishlistRegister", ParentWishListController.register);
router.get("/wishlistget", ParentWishListController.get);

// Student WishList routes:-
router.delete("/deletestudentwishList", StudentWishListController.delete);
router.post("/studentwishlist", StudentWishListController.register);
router.get("/getstudentwishlist", StudentWishListController.get);

// Teacher WishList Parent routes:-
router.delete("/deletetutorwishlistParent", TeacherWishListParentController.Teacherwishdelete);
router.post("/tutorwishlistParent",TeacherWishListParentController.TeacherParent);
router.get("/gettutorwishlistParent", TeacherWishListParentController.get);

// Teacher WishList Student routes:-
router.delete("/deletetutorwishlistStudent", TeacherWishListStudentController.Teacherwishdelete);
router.post("/tutorwishlistStudent",TeacherWishListStudentController.TeacherStudent);
router.get("/gettutorwishlistStudent", TeacherWishListStudentController.get);

// feedback routes:-
router.post("/feedback", feadbackController.feadback);

// Documents routes:-
router.post("/documents", documents, DocumentsController.documents);
router.get("/getdocument", DocumentsController.get);
router.put("/commentUpdate", DocumentsController.CommentUpdate);
router.put("/email", DocumentsController.verifyUpdate1);
router.put("/docsupdate", documents, DocumentsController.updateDocs);

// Parent Viewed routes:-
router.post("/createviewParent", viewParentController.register);
router.get("/viewedParent", viewParentController.get);

// Student Viewed routes:-
router.post("/createviewStudent", ViewStudentController.register);
router.get("/viewedStudent", ViewStudentController.get);

// Tutor Viewed routes:-
router.post("/createviewTutor", ViewTutorController.register);
router.get("/viewedTutor", ViewTutorController.get);

// Notify routes:-
router.get("/notify", NotifyController.get);

// Banner routes
router.post('/banner',banner,BannerController.createBanner);
router.delete('/deletebanner',BannerController.delete);
router.get('/getbanner',BannerController.get)

// location
router.post('/location',LocationController.register);
router.get('/getlocation',LocationController.get);
router.delete('/deletelocation',LocationController.delete);

// street
router.post('/street',StreetController.register);
router.get('/getstreet',StreetController.get);
router.delete('/deletestreet',StreetController.delete);


module.exports = router;
