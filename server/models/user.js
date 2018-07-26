module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('user', {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING,
    tokenExpiration: DataTypes.DATE,
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })

  User.associate = function(models) {
    User.hasMany(models.task)
  }

  return User
}
