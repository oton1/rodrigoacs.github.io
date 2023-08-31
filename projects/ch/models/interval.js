const User = require('./user')
const db = require('./savetime')

const Interval = db.sequelize.define("intervals", {
  id: {
    type: db.Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  started_at: {
    type: db.Sequelize.DATE
  },
  finished_at: {
    type: db.Sequelize.DATE
  },
  description: {
    type: db.Sequelize.STRING
  },
  user_id: {
    type: db.Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    }
  }
}, {
  tableName: 'intervals',
  modelName: 'interval',
  underscored: true
})

module.exports = Interval

