'use strict';

import { QueryInterface, DataTypes } from 'sequelize';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.sequelize.transaction( async(t) => {

      await queryInterface.createTable('order', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
  
        buyer_id: {
          type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'user',
              key: 'id',
            },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },

        product_id: {
          type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'product',
              key: 'id',
            },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
  
        status: {
          type: Sequelize.ENUM('pending', 'delivered', 'cancelled'),
          allowNull: false
        },
  
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
  
        total_price: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        
        delivery_address: {
          type: Sequelize.STRING,
          allowNull: false
        },

        available_portions: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
  
        createdAt: {
          allowNull: false,
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
      await queryInterface.dropTable('order');
    })
  }
};