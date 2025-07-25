'use strict';

import { QueryInterface, DataTypes } from 'sequelize';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.sequelize.transaction( async(t) => {
      await queryInterface.createTable('user', {
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

        role: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isIn: [['user', 'vendor', 'admin', 'subadmin']]
          }
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

        deletedAt: {
          allowNull: true,
          type: Sequelize.DATE
        },
  
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }, { transaction: t });

    })
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.sequelize.transaction( async(t) => {
      await queryInterface.dropTable('user');
    })
  }
};