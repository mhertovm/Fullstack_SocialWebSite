'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friends extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Friends.belongsTo(models.Users, {foreignKey: "user_id"});
      Friends.belongsTo(models.Users, {foreignKey: "friend_id"});
    }
  }
  Friends.init({
    user_id: DataTypes.INTEGER,
    friend_id: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Friends',
  });
  return Friends;
};