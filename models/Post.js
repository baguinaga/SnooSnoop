const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type : String,
    required : true
  },
  link: {
    type: String,
    required : true
  },
  note : {
    type : Schema.Types.ObjectId,
    ref : "Note"
  }
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;