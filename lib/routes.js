const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.send('Hello Stranger')
})

router.get('/login', function (req, res) {
  res.render('login')
})

router.get('/signup', function (req, res) {
  res.render('signup')
})

router.get('/cookie', function (req, res) {
  res.cookie(cookie_name, 'cookie_value').send('cookie is set')
})

router.get('/clearcookie', function (req, res) {
  res.send('Cookie deleted')
})

module.exports = router