const jwt = require("jsonwebtoken");
const blogModel = require("../models/blogModel");
const { isValidObjectId } = require("mongoose");

//------AUTHENTICATE-------------//

exports.authMid1 = async (req, res, next) => {
  try {
    let blogId = req.params.blogId;

    if (!blogId) return res.status(400).send("Please provide the blogId.");

    if (!isValidObjectId(blogId))
      return res
        .status(400)
        .send({ status: false, msg: "Given blogId is not valid id" });

    let token = req.headers["x-api-key"];

    if (!token) {
      return res
        .status(400)
        .send({ status: false, msg: "Header is not present" });
    }

    jwt.verify(token, "project-blogging", function (err, decoded) {
      if (err) {
        return res.status(401).send({ status: false, msg: "Token invalid" });
      } else {
        req.authorId = decoded.authorId;
        return next();
      }
    });
  } catch (error) {
    console.log("Middleware1", error);

    return res.status(500).send({ status: false, error: error.message });
  }
};

//-----------AUTHERISATION-------------//

exports.authMid2 = async (req, res, next) => {
  try {
    let blogId = req.params.blogId;

    if (!blogId) return res.status(400).send("Please provide the blogId.");

    if (!isValidObjectId(blogId))
      return res
        .status(400)
        .send({ status: false, msg: "Given blogId is not valid id" });

    let blogData = await blogModel.findById(blogId);

    if (!blogData)
      return res.status(404).send({ msg: "Blog not found for this id." });

    if (blogData.isDeleted == true)
      return res
        .status(404)
        .send({ status: false, msg: "blog already deleted" });

    if (blogData.authorId.toString() !== req.authorId) {
      return res.status(403).send({
        status: false,
        msg: "You are not autharised to do this operation",
      });
    }

    next();
  } catch (error) {
    console.log("Middleware2", error);

    return res.status(500).send({ status: false, error: error.message });
  }
};
