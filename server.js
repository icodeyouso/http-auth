const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const session = require('cookie-session')
const bodyParser = require('body-parser')
const path = require('path')
const routes = require('./src/routes')
var morgan = require('morgan')
var User = require('./models/user')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(routes)
app.use(morgan('dev'));

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({
  extended: true
}));

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
}));


// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
});


// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect('/dashboard');
  } else {
    next();
  }
};


// route for Home-Page
app.get('/', sessionChecker, (req, res) => {
  res.redirect('/signup');
});


// route for user signup
app.route('/signup')
  .get(sessionChecker, (req, res) => {
    res.sendFile(__dirname + '/views/signup.jade');
  })
  .post((req, res) => {
    User.create({
        email: req.body.email,
        password: req.body.password
      })
      .then(user => {
        req.session.user = user.dataValues;
        res.redirect('/dashboard');
      })
      .catch(error => {
        res.redirect('/signup');
      });
  });


// route for user Login
app.route('/login')
  .get(sessionChecker, (req, res) => {
    res.sendFile(__dirname + '/views/login.jade');
  })
  .post((req, res) => {
    var email = req.body.email,
      password = req.body.password;

    User.findOne({
      where: {
        email: email
      }
    }).then(function (user) {
      if (!user) {
        res.redirect('/login');
      } else if (!user.validPassword(password)) {
        res.redirect('/login');
      } else {
        req.session.user = user.dataValues;
        res.redirect('/dashboard');
      }
    });
  });


// route for user's dashboard
app.get('/dashboard', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.sendFile(__dirname + '/views/dashboard.jade');
  } else {
    res.redirect('/login');
  }
});


// route for user logout
app.get('/logout', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.clearCookie('user_sid');
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});


// route for handling 404 requests(unavailable routes)
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
});


// start the express server
// app.listen(app.get('port'), () => console.log(`App started on port ${app.get('port')}`));

app.listen(3000)