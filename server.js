const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const session = require('cookie-session')
const bodyParser = require('body-parser')
const path = require('path')
const routes = require('./lib/routes')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(routes)

app.listen(3000)