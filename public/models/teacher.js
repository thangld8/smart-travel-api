'use strict';
module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('Teacher', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    students: {
      type: DataTypes.STRING,
      get() {
        return this.getDataValue('students')
      },
      set(val) {
        this.setDataValue('students', val.join(','));
      }
    }
  }, {});
  Teacher.associate = function(models) {
    // associations can be defined here
    // models.Teacher.hasMany(models.Student)
  };
  return Teacher;
};