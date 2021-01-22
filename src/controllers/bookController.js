const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookController');

const app = {

};

function bookController(nav) {
  function getIndex(req, res) {
    const url = 'mongodb://localhost:27017';
    const dbName = 'Recipe-App';
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('connected to server');
        const db = client.db(dbName);
        const collection = await db.collection('recipes');
        const recipes = await collection.find().toArray();

        res.render('recipesListView',
          {
            title: 'Recipes',
            recipes,
            nav,
          });
      } catch (err) {
        debug(err.stack);
      }

      client.close();
    }());
  }

  function getById(req, res) {
    const { id } = req.params;
    const url = 'mongodb://localhost:27017';
    const dbName = 'Recipe-App';
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('connected to server');
        const db = client.db(dbName);
        const collection = await db.collection('recipes');
        const recipe = await collection.findOne({ _id: new ObjectID(id) });
        debug(recipe);
        recipe.setNumServings = function (n) {
          this.numServings = n;
          debug(this.numServings);
        };
        recipe.setNumServings(1);
        app.recipe = recipe;
        // book.details = await bookService.getBookById(book.bookId);
        res.render('recipeView',
          {
            nav,
            title: 'Recipe',
            recipe,
          });
      } catch (err) {
        debug(err.stack);
      }

      client.close();
    }());
  }

  function getRecipeById(req, res) {
    const { id } = req.params;
    const url = 'mongodb://localhost:27017';
    const dbName = 'Recipe-App';
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('connected to server');
        const db = client.db(dbName);
        const collection = await db.collection('recipes');
        const recipe = await collection.findOne({ _id: new ObjectID(id) });
        // debug(recipe);

        // book.details = await bookService.getBookById(book.bookId);
        res.send(recipe);
        debug(recipe);
      } catch (err) {
        debug(err.stack);
      }

      client.close();
    }());
  }

  function middleware(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  }

  return {
    getIndex,
    getById,
    middleware,
    // updateRecipe,
    getRecipeById,
  };
}

debug(app.recipe);
module.exports = bookController;
