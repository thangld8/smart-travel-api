'use strict';
const Teacher = require('../models').Teacher;
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    email: DataTypes.STRING,
    isSubspend: DataTypes.BOOLEAN,
    registedBy: {
      type: DataTypes.STRING,
      getterMethods: {
        registedBy() {
          return this.getDataValue('registedBy')
        }
      },
      setterMethods: {
        registedBy(val) {
          this.setDataValue('registedBy', val.join(','));
        }
      }
    }
  }, {});
  Student.associate = function(models) {
    // associations can be defined here
    // Teacher.belongsTo(Student,  {foreignKey: 'student_id'})
    // models.Student.hasMany(models.Teacher);
  };
  return Student;
};