const express = require('express');
// const { MongoClient, ObjectID } = require('mongodb');
// const debug = require('debug')('app:reciperoutes');
const bookController = require('../controllers/bookController.js');
// const mainRecipefuncs = require('../../public/js/utils.js');

const bookRouter = express.Router();
const bookService = require('../services/goodreadsService');

function router(nav) {
  const {
    getIndex, getById, middleware,
  } = bookController(nav, bookService);
   /*const {
    Ingredients,
    write2Class,
    writeName2Class,
    writeQuant2Class,
    convertAll,
    writeRecipe,
    createIngreds,
  } = mainRecipefuncs(recipe);*/ 

  bookRouter.use(middleware);
  bookRouter.route('/')
    .get(getIndex);
  /* Ingredients,
      write2Class,
      writeName2Class,
      writeQuant2Class,
      convertAll,
      writeRecipe,
      createIngreds */

  bookRouter.route('/:id')
    .get(getById);

  return bookRouter;
}

module.exports = router;
