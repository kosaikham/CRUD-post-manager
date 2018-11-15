const express = require("express");
const router = express.Router();
const validatePostInput = require("../validation/post");
var { authenticate } = require("../middleware/authenticate");

const axios = require('axios');
const redis = require('redis');
const client = redis.createClient();

const User = require("../models/User");
const Post = require("../models/Post");

router.post("/add", authenticate, (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content,
    user: req.user._id,
    date: new Date().getTime()
  });
  newPost.save().then(post => {
    User.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { posts: newPost } },
      { new: true }
    ).then(updatedUser => {
      res.json({
        id: post.id,
        title: post.title,
        content: post.content,
        name: updatedUser.name,
        userId: updatedUser.id,
        time: post.date
      });
    });
  });
});

router.put("/update", authenticate, (req, res) => {
    Post.findOneAndUpdate(
        {_id: req.body.id},
        {$set: { title: req.body.title, content: req.body.content}},
        {new: true}
    ).populate('user').then(updatedPost => {
        res.json({
            id: updatedPost.id,
            title: updatedPost.title,
            content: updatedPost.content,
            name: updatedPost.user.name,
            userId: updatedPost.user.id,
            time: updatedPost.date
        })
    })
})

router.delete("/delete/:id", authenticate, (req, res) => {
    Post.findOneAndDelete({
        _id: req.params.id
    }).then(post => {
        User.findOneAndUpdate(
            { _id: req.user._id },
            { $pull: { posts: req.params.id } },
            { new: true }
          ).then(updateUser => {
              console.log('[post id]', post.id)
              res.json({
                id: post.id
              })
          })
    })
})

const getAllPosts = (req, res) => {
  Post.find()
    .sort({date: -1})
    .populate("user")
    .exec(function(err, posts) {
      if (err) return res.status(400).json(err);
      const allPosts = posts.map(post => {
        return {
          id: post.id,
          title: post.title,
          content: post.content,
          name: post.user.name,
          userId: post.user.id,
          time: post.date
        };
      });
    // res.json(allPosts)
      client.setex(alposts, 3600, JSON.stringify(allPosts));
      res.send(allPosts);
    });
};

const getCachePosts = (req, res) => {
  client.get(alposts, (err, result) => {
    if (result) {
      res.send(result);
    } else {
      getAllPosts(req, res);
    }
  });
}

router.get("/all", getCachePosts)

// router.get("/all", (req, res) => {
//   Post.find()
//     .sort({date: -1})
//     .populate("user")
//     .exec(function(err, posts) {
//       if (err) return res.status(400).json(err);
//       const allPosts = posts.map(post => {
//         return {
//           id: post.id,
//           title: post.title,
//           content: post.content,
//           name: post.user.name,
//           userId: post.user.id,
//           time: post.date
//         };
//       });
//     res.json(allPosts)
//     });
// });

module.exports = router;
