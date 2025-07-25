'use strict';

import { QueryInterface, DataTypes } from 'sequelize';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.sequelize.transaction( async(t) => {
      await queryInterface.createTable('wallet', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
          },
          
        user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      main_balance: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },

      sub_balance: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
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
      await queryInterface.dropTable('wallet');
    })
  }
};