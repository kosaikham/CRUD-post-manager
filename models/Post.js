const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Number,
    required: true
  },
  user: { type: Schema.Types.ObjectId, ref: 'users' }
});

const Post = mongoose.model("posts", PostSchema);
module.exports = Post;
