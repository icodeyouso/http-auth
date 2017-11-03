var Sequelize = require('sequelize')
var bcrypt = require('bcrypt')

var sequelize = new Sequelize('postgres://mparks@localhost:5432/auth-system')

var user = sequelize.define('users', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  hooks: {
    beforeCreate: (user) => {
      const salt = bcrypt.genSaltSync()
      user.password = bcrypt.hashSync(user.password, salt)
    }
  }
})
sequelize.sync()
  .then(() => console.log('users table has been successfully created, if one doesn\'t exist'))
  .catch(error => console.log('This error occured', error));

module.exports = user