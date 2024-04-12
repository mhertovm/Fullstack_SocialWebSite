'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.Friends, {foreignKey: "user_id"});
      Users.hasMany(models.Friends, {foreignKey: "friend_id"});
      Users.hasMany(models.Likes, {foreignKey: "user_id"});
      Users.hasMany(models.Comments, {foreignKey: "user_id"});
    }
  }
  Users.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    description: DataTypes.STRING,
    gender: DataTypes.STRING,
    age: DataTypes.INTEGER,
    phone: DataTypes.INTEGER,
    avatar: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    premium: DataTypes.BOOLEAN,
    role: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Users',
  });
  return Users;
};