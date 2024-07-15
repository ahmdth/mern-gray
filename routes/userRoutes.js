const express = require('express')
const { index, create, show, update, destroy } = require('../controllers/usersController')
const router = express.Router()

router.route('/')
  .get(index)
  .post(create)

router.route('/:id')
  .get(show)
  .patch(update)
  .delete(destroy)

module.exports = router