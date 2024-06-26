'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Likes.belongsTo(models.Users, {foreignKey: "user_id"});
      Likes.belongsTo(models.Posts, {foreignKey: "post_id"});
    }
  }
  Likes.init({
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER,
    type: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Likes',
  });
  return Likes;
};