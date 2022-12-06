const authorController = require("../controllers/authorController");
const blogController = require("../controllers/blogController");
const middleWare = require("../middlewares/auth");
const express = require("express");
const router = express.Router();



//---------------------Author APIs---------------------------//
router.post("/authors", authorController.createAuthor);

router.get("/authors", authorController.getAuthor);

router.post("/login", authorController.loginAuthor);


//------------------Blog APIs-------------------------------//


router.post("/blogs",  blogController.createBlog);

router.get("/blogs", middleWare.authMid1, blogController.getBlog);


//-------------------Update API----------------------------//


router.put("/blogs/:blogId", middleWare.authMid1,middleWare.authMid2, blogController.updateBlog);


//---------------------Delete APIs------------------------//


router.delete("/blog/:blogId",middleWare.authMid1,middleWare.authMid2,blogController.deleteBlogByParams);

router.delete("/blogs",middleWare.authMid1,blogController.DeletedByQuery);



module.exports = router;
