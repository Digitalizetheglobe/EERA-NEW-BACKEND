// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class add_notices extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   add_notices.init({
//     notice_title: DataTypes.STRING,
//     notice_description: DataTypes.TEXT,
//     date: DataTypes.DATE,
//     lawyer_name: DataTypes.STRING,
//     location: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'add_notices',
//   });
//   return add_notices;
// };


'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class add_notices extends Model {
    static associate(models) {
      // define association here
    }
  }
  add_notices.init({
    notice_title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    notice_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    lawyer_name: {
      type: DataTypes.STRING(255),  
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'add_notices',
  });
  return add_notices;
};
