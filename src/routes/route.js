const authorController = require("../controllers/author");
const blogController = require("../controllers/blog");
const middleWare = require("../middlewares/middleware");
const router = require("express").Router();




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


//--------------------------------------- Invalid Path API ----------------------------------------//
router.all('/*', (req, res) => {
    res.status(400).send({ status: false, message: " path invalid" });
});


module.exports = router;
