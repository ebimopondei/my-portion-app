'use strict';

import { QueryInterface, DataTypes } from 'sequelize';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },

      username: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      
      lastname: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: { 
          isEmail: true,
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
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('Users');
  }
};