'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Posts.hasMany(models.Likes, {foreignKey: "post_id"});
      Posts.hasMany(models.Comments, {foreignKey: "post_id"});
    }
  }
  Posts.init({
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    public: DataTypes.BOOLEAN
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Posts',
  });
  return Posts;
};