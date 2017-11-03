const pgp = require('pg-promise')()
const db = pgp('postgres://mparks@localhost:8080/httpauth')
// console.log(db)

function createUser() {
  var query = `CREATE TABLE users(id SERIAL PRIMARY KEY, email VARCHAR(255) not null, password VARCHAR(255) not null,)`


  // return db.none(query, [email, password])



};
createUser()