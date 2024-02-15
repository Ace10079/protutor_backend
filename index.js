const app = require('./app');
const db = require('./config/db');
const ParentModel = require('./model/parent_model');
const StudentModel = require('./model/student_model');
const TeacherModel = require('./model/teacher_model');
const CategoriesModel = require('./model/categories_model');
const FeadbackModel = require('./model/feedback_model'); 
const WishlistModel = require('./model/wishlist_model');
const IdcodeModel = require('./model/idcode_model');


const port = 3000;

app.get('/',(req,res) => {
    res.send("hello")
});

app.listen(port,() => {
    console.log(`Server Listening on Port http://localhost:${port}`);
});