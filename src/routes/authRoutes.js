const express = require('express');
const { MongoClient } = require('mongodb');
const passport = require('passport');
const debug = require('debug')('app:authRoutes');

const authRouter = express.Router();

function router(nav) {
  authRouter.route('/signUp')
    .post((req, res) => {
      // create user
      const { username, password } = req.body;
      const url = 'mongodb://localhost:27017';
      const dbName = 'Recipe-App';

      (async function addUser() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug(' connected properly');

          const db = client.db(dbName);
          const col = db.collection('users');
          const user = { username, password };
          const results = await col.insertOne(user);
          debug(results);

          req.login(results.ops[0], () => {
            res.redirect('/auth/profile');
          });
        } catch (error) {
          error.stack();
        }
      }());

      debug(req.body);
    });

  authRouter.route('/signin')
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/auth/signup',
    }));

  authRouter.route('/signup')
    .get((req, res) => {
      res.render('signUpView', {
        nav,
        title: 'Sign Up',
      });
    });

  authRouter.route('/profile')
    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      res.render('profile', {
        nav,
        title: 'Profile',
      });
    });

  authRouter.route('/signout')
    .get((req, res) => {
      req.logout();
      res.redirect('/');
    });

  return authRouter;
}

module.exports = router;
