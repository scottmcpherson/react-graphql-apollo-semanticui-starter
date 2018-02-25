module.exports = (sequelize, DataTypes) => {
  var Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    isPublic: DataTypes.BOOLEAN
  })

  Task.associate = models => {
    Task.belongsTo(models.User)
  }
  return Task
}
