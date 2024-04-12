'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comments.belongsTo(models.Users, {foreignKey: "user_id"});
      Comments.belongsTo(models.Posts, {foreignKey: "post_id"});
    }
  }
  Comments.init({
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Comments',
  });
  return Comments;
};