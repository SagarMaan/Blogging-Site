const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    body: {
      type: String,
      required: true,
      trim: true,
    },

    authorId: {
      type: ObjectId,
      ref: "author",
      required: true,
    },

    tags: [{ 
      type: String,
      lowercase :true,
  }],

    category: {
      type: String,
      required: true,
      trim: true,
      lowercase :true,
    },

    subcategory: [{ 
      type: String ,
      lowercase :true,
    }],

    deletedAt: {
      type: Date,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    publishedAt: {
      type: Date,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  
  { timestamps: true }
);

module.exports = mongoose.model("blog", blogSchema);
