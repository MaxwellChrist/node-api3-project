const express = require('express');
// You will need `users-model.js` and `posts-model.js` both
const usersModel = require('./users-model');
const postsModel = require('../posts/posts-model');
// The middleware functions also need to be required
const { logger, validateUserId, validateUser, validatePost } = require('../middleware/middleware')

const router = express.Router();
router.use(logger);

router.get('/',  (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
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
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
});

router.post('/', (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router