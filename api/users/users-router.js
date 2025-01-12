const express = require('express');
// You will need `users-model.js` and `posts-model.js` both
const usersModel = require('./users-model');
const postsModel = require('../posts/posts-model');
// The middleware functions also need to be required
const { logger, validateUserId, validateUser, validatePost } = require('../middleware/middleware')

const router = express.Router();
router.use(logger);

router.get('/',  (req, res) => {
  usersModel.get()
  .then(result => {
    res.status(200).json(result);
  })
  .catch(result => {
    res.status(500).json({ message: "Error retrieving results" })
  })
});

router.get('/:id', validateUserId, (req, res) => {
    res.json(req.user);
});

router.post('/', validateUser, (req, res) => {
  usersModel.insert(req.body)
  .then(result => {
    res.status(201).json(result)
  })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  usersModel.update(req.params.id, req.body) 
    .then(result => {
      res.json(result)
    })
  })


router.delete('/:id', validateUserId, (req, res) => {
  usersModel.remove(req.params.id)
  .then(result => {
    if (result > 0) {
      res.json(req.user);
    }
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  usersModel.getUserPosts(req.params.id)
  .then(result => {
    res.json(result)
  })
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const post = {
    text: req.body.text,
    user_id: req.params.id
  }
  postsModel.insert(post)
  .then(result => {
    console.log(result)
    res.status(201).json(result);
  })
});

// do not forget to export the router
module.exports = router