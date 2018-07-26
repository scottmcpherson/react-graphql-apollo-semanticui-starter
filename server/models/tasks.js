module.exports = (sequelize, DataTypes) => {
  var Task = sequelize.define('task', {
    title: DataTypes.STRING,
    isPublic: DataTypes.BOOLEAN
  })

  Task.associate = models => {
    Task.belongsTo(models.user)
  }
  return Task
}
