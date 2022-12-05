const blogModel = require("../models/blogModel");
const authorModel = require("../models/authorModel");
const { isValidObjectId } = require("mongoose");



//---------CREATE BLOG-------------//



exports.createBlog = async (req, res) => {
  try {
    let data = req.body;

    if (Object.keys(data).length === 0)
      return res
        .status(400)
        .send({ status: false, msg: "Please provide all the required data" });

    if (!data.authorId || data.authorId == "")
      return res
        .status(400)
        .send({ status: false, msg: "Please Provide authorId" });

    if (!data.title || data.title == "")
      return res
        .status(400)
        .send({ status: false, msg: "Please Provide title" });

    if (!data.body || data.body == "")
      return res
        .status(400)
        .send({ status: false, msg: "Please Provide body" });

    if (!data.category || data.category == "")
      return res
        .status(400)
        .send({ status: false, msg: "Please Provide category" });

    let authors = await authorModel.findById(data.authorId);
    //---Agr author id ka data delete ho chuka ho ya authorId vala Doc nhi milla h to vo empty {} ya null dega response me uske liye ye msgsend krna h-------// 
    if (!authors)
      return res.status(404).send({ status: false, msg: "Author not exists" });

    let blogData = await blogModel.create(data);

    res.status(201).send({ status: true, data: blogData });
  } catch (error) {
    console.log("Create Blog", error.message);

    res.status(500).send({ status: false, msg: error.message });
  }
};


//---------GET BLOG---------------//



exports.getBlog = async (req, res) => {
  try {
    if (Object.keys(req.query).length == 0) {
      return res.status(404).send({
        status: false,
        msg: "please provide query",
      })};

    let { authorId, category, subcategory, tags } = req.query;


    // if(req.query != { authorId, category, subcategory, tags } ){
    //   return res.status(400).send({status:false,msg:"Invalid input detaisl"})
    //  }

    if (authorId) {     
      if (!isValidObjectId(authorId))
        return res
          .status(400)
          .send({ status: false, msg: "Given AuthorId is not a valid id" });
    }

    let blogs = await blogModel.find({
      isDeleted: false,
      isPublished: true,
      authorId: req.authorId,
      $or: [
        { authorId: authorId },
        { category: category },
        { subcategory: subcategory },
        { tags: tags },
      ],
    });

    if (blogs.length == 0) {
      return res.status(404).send({
        status: false,
        msg: "No such blog found",
      });
    }

    res.status(200).send({ status: true, data: blogs });
  } catch (error) {
    console.log("Get Blog", error.message);

    res.status(500).send({ status: false, msg: error.message });
  }
};



//---------UPDATE BLOGS---------------//



exports.updateBlog = async (req, res) => {
  try {
    let data = req.body;

    let blogId = req.params.blogId;

    if (blogId) {
      if (!isValidObjectId(blogId))
        return res
          .status(400)
          .send({ status: false, msg: "Given blogId is not a valid id" });
    }

    if ( Object.keys(data).length == 0 || Object.keys(data) == "" ){
      return res.status(404).send({ status : false , msg : "Data is not provided for update "}) 
    }

    let updatedBlogData = await blogModel.findOneAndUpdate(
      { _id: blogId },
      {
        $set: {
          title: data.title,
          body: data.body,
          isPublished: true,
          publishedAt: new Date(),
        },
        $push: { tags: data.tags, subcategory: data.subcategory },
      },
      { new: true }
    );

    res.status(201).send({ status: true, data: updatedBlogData });
  } catch (error) {
    console.log("Update Blog", error.message);

    res.status(500).send({ status: false, msg: error.message });
  }
};



//---------DELETE BLOG BY PATH PARAMS-------------//



exports.deleteBlogByParams = async (req, res) => {
  try {
    let blogId = req.params.blogId;

      if (!isValidObjectId(blogId))
        return res
          .status(400)
          .send({ status: false, msg: "Given blogId is not a valid id" });

    let deleteBlog = await blogModel.findOneAndUpdate(
      { _id: blogId },
      { $set: { isDeleted: true, deletedAt: new Date() } },
      { new: true }
    );

    res.status(200).send({ status: true, msg: "Blog sucessfully deleted" });
  } catch (error) {
    console.log("Delete by Path Params", error.message);

    res.status(500).send({ status: false, msg: error.message });
  }
};



//-----------DELETE BY QUERY PARAMS-------------//



exports.DeletedByQuery = async (req, res) => {
  try {
   
    let filterdata = { isDeleted: false, authorId: req.authorId };  
    //yha req.authorId kyon kiya ye to req.query.authorId hona chahiye tha
    let { authorId, category, tags, subcategory } = req.query;

    if (authorId) {
      
      if (!isValidObjectId(authorId)) {
        
        return res
          .status(400)
          .send({ status: false, msg: "Please provide valid id" });
      } else {
          filterdata.authorId = authorId;
      }
    }

    if (category) {
      filterdata.category = category;
    }

    if (tags) {
      filterdata.tags = tags;
    }

    if (subcategory) {
      filterdata.subcategory = subcategory;
    }

    let blogData = await blogModel.findOne(filterdata);

    if (!blogData) {
      return res
        .status(404)
        .send({ status: false, msg: "No blog found may be blog already deleted" });
    }

    if (blogData.authorId.toString() !== req.authorId) {
      return res.status(404).send({
        status: false,
        msg: "You are not authorised to perform this action",
      });
    }

    let updateData = await blogModel.updateOne(
      filterdata,
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );

    return res.status(200).send({ status: true, msg: "blog is deleted" });
  } catch (error) {
    console.log("Delete By Query", error.message);

    res.status(500).send({ status: false, msg: error.message });
  }
};
