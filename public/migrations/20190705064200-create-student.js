'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      isSubspend: {
        type: Sequelize.BOOLEAN
      },
      registedBy: {
        type: Sequelize.STRING,
        get() {
          return this.getDataValue('registedBy')
        },
        setterMethods: {
          function(val) {
            this.setDataValue('registedBy', val.slice(0, -1).join(','));
          }
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Students');
  }
};