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
const WishListController = require("../controller/wishlist_controller");
const TeacherWishController = require("../controller/teacher_wishlist_controller");
const DocumentsController = require("../controller/verification_controller");
const viewParentController = require("../controller/viewParent_controller")
const { runInContext } = require("vm");

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
//const parent = multer({storage: storage}).single('image');
const plan = multer({ storage: storage }).single("planimage");
const teacher = multer({ storage: storage }).single("teacherimage");
//const upload1 = multer({storage: storage}).array('Categories', 4)

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

router.post("/admin", AdminController.register);
router.post("/adminlogin", AdminController.login);
router.get("/getadmin", AdminController.get);
router.get("/getadmin1", AdminController.getAdmin);
router.get("/getemail", AdminController.getEmail);
router.put("/updateadmin", AdminController.Update);
router.delete("/deleteadmin", AdminController.delete);

router.post("/parentregister", parentController.register);
router.post("/parentLogin", parentController.parentLogin);
router.put("/parentUpdate", parentController.parentUpdate);
router.get("/parentGetData", parentController.parentGet);
router.get("/parentsubject", parentController.parentSubject);
router.get("/parentget", parentController.get);
router.delete("/parentDelete", parentController.parentDelete);
router.put("/changePassword", parentController.changePassword);
router.put("/parentreset", parentController.parentreset);
router.post("/phonenumber", parentController.verifyphone);
router.post("/creditCount", parentController.parentCredit);

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

router.post("/teacherregister", teacherController.teacherregister);
router.post("/teacherlogin", teacherController.teacherLogin);
router.post("/teacherUpdate", teacher, teacherController.teacherUpdate);
router.get("/teacherGetData", teacherController.teacherGet);
router.get("/teacherget", teacherController.get);
router.put("/teacherPasswordChange", teacherController.changePassword);
router.delete("/teacherDelete", teacherController.teacherDelete);
router.put("/creditUpdate", teacherController.creditUpdate);
router.put("/verifyUpdate", teacherController.verifyUpdate);
router.put("/teacherReset", teacherController.teacherReset);
router.post("/teacherVerifyPhone", teacherController.verfityPhone);
router.post("/teacherCreditCount", teacherController.teacherCredit);

router.post("/categories", upload1, categoriesController.categories);
router.post("/updatecategories", upload1, categoriesController.update);
router.get("/categoriesGet", categoriesController.get);
router.get("/getcategories", categoriesController.getCategory);
router.delete("/categoriesDelete", categoriesController.delete);

router.post("/plan", plan, PlanController.plan);
router.get("/getplans", PlanController.getplan);
router.delete("/deleteplan", PlanController.delete);

router.post("/parentplan", ParentPlanController.CreateParentPlan);
router.get("/getparentplan", ParentPlanController.getParentplan);
router.get("/getparentplanId", ParentPlanController.getId);
router.get("/getplanparentid", ParentPlanController.getparentId);
router.put("/updateparentplan", ParentPlanController.Update);
router.delete("/deleteparentplan", ParentPlanController.delete);
router.post("/parentemail", ParentPlanController.generatemail);

router.post("/tutorplan", TutorPlanController.CreateTutorPlan);
router.get("/gettutorplan", TutorPlanController.getTutorplan);
router.get("/gettutorplanId", TutorPlanController.getId);
router.get("/getplantutorid", TutorPlanController.getTutorId);
router.put("/updatetutorplan", TutorPlanController.Update);
router.delete("/deletetutorplan", TutorPlanController.delete);

router.post("/studentplan", StudentPlanController.CreateStudentPlan);
router.get("/getstudentplan", StudentPlanController.getStudentplan);
router.get("/getstudentplanid", StudentPlanController.getId);
router.get("/getstudentid", StudentPlanController.getStudentId);
router.put("/updatestudentplan", StudentPlanController.Update);
router.delete("/deletestudentplan", StudentPlanController.delete);

router.delete("/deletewish", WishListController.wishdelete);
router.post("/wishlistRegister", WishListController.wishListRegister);
router.get("/wishlistget", WishListController.get);
router.delete("/teacherwishdelete", TeacherWishController.teacherwishdelete);
router.post(
  "/teahcerwishlistRegister",
  TeacherWishController.teacherWishListRegister
);
router.get("/teacherwishlist", TeacherWishController.get);
router.post("/feedback", feadbackController.feadback);

router.post("/documents", documents, DocumentsController.documents);
router.get('/getdocument', DocumentsController.get)
router.put('/commentUpdate',DocumentsController.CommentUpdate);
router.put('/docsupdate' ,documents,DocumentsController.updateDocs);

router.post('/viewParent/:parent_id',viewParentController.ParentView);

module.exports = router;
