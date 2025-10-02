'use strict';

import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {

    await queryInterface.sequelize.transaction( async (t) => {
      
      await queryInterface.createTable('transaction',
        {

          id: { 
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },

          order_id: {
            type: Sequelize.UUID,
              allowNull: true,
              references: {
                model: 'order',
                key: 'id',
              },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
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

          type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              isIn: [['payment', 'payout', 'refund', 'deposit']]
            }

          },

          amount: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            defaultValue: 0.0,
          },

          status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "pending",
            validate: {
              isIn: [['pending', 'confirmed', 'failed']]
            }
          },

          reference: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
          },

          confirmedBy: {
            type: Sequelize.UUID,
              allowNull: true,
              references: {
                model: 'user',
                key: 'id',
              },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },

          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },

          confirmedAt: {
            allowNull: true,
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

        }
        , { transaction: t })
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface: QueryInterface ) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     * 
     */

    await queryInterface.sequelize.transaction( async (t)=> {
      await queryInterface.dropTable('transaction', { transaction: t });
    })
  }
};
