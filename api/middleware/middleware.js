const usersModel = require('../users/users-model');

function logger(req, res, next) {
  console.log(`\n The request method is ${req.method}, \n The request URL is ${req.originalUrl} \n The timestamp is ${Date.now()}`);
  next();
}

function validateUserId(req, res, next) {
  id = req.params.id
  usersModel.getById(id)
  .then(result => {
    if (result) {
      req.user = result;
      next();
    } else {
      res.status(404).json({ message: "ID not found" })
      return;
    }
  })
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger, validateUserId, validateUser, validatePost
}