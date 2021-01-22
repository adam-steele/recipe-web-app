const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// const passport = require('passport');
// const { title } = require('process');

const app = express();

const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'library' }));

require('./src/config/passport.js')(app);

app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/dist', express.static(path.join(__dirname, 'node_modules/jquery')));
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});
app.set('views', 'src/views');
app.set('view engine', 'ejs');

const nav = [

  { link: '/recipes', title: 'Recipes' },
  { link: '/auth/profile', title: 'Profile' },

];

const recipeRouter = require('./src/routes/reciperoutes')(nav);
// eslint-disable-next-line import/no-unresolved
const adminRouter = require('./src/routes/adminroutes')(nav);
// eslint-disable-next-line import/no-unresolved
const authRouter = require('./src/routes/authroutes')(nav);

app.use('/recipes', recipeRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.render('index',
    {
      title: 'Recipe App',
      nav,
    });
});

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
