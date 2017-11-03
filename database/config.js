const pgp = require('pg-promise')()
const db = pgp('postgres://mparks@localhost:8080/httpauth')
console.log(db)

module.exports = db