const db = require('./savetime')

const User = db.sequelize.define("users", {
  id: {
    type: db.Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: db.Sequelize.STRING
  },
  password: {
    type: db.Sequelize.STRING
  }
}, {
  tableName: 'users',
  modelName: 'user',
  underscored: true
})

// User.create({
//   username: 'teste',
//   password: 'teste'
// })

module.exports = User