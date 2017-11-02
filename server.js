var express = require('express')
var cookieParser = require('cookie-parser')

var app = express()
app.use(cookieParser())

app.get('/', function (req, res) {
  res.send("hello world")
})

//COOKIE PARSER PARSES THE COOKIE HEADER AND POPULATE REQ.COOKIES WITH AN OBJECT KEYED BY THE COOKIE NAMES.
//TO SET A NEW COOKIE DEFINE A NEW ROUTE....
app.get('/cookie', function (req, res) {
  res.cookie(cookie_name, 'cookie_value').send('cookie is set')
})

//TO GET A COOKIE THAT THE BROWSER MIGHT BE SENDTING TO SERVER BY ATTACHING IT TO THE REQUEST HEADER
app.get('/', function (req, res) {
  console.log("cookies : ", req.cookies)
})

//DELETING AN EXISTING COOKIE USING THE CLEARCOOKIE METHOD("IT ACCEPTS THE NAME OF THE COOKIE YOU WANT TO DELETE")
app.get('/clearcookie', function (req, res) {
  clearCookie('cookie_name')
  res.send('Cookie deleted')
})

app.listen(3000)