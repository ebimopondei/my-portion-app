'use strict';

import { QueryInterface, DataTypes } from 'sequelize';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.sequelize.transaction( async(t) => {
  
      await queryInterface.createTable('rating', {
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

        seller_id: {
          type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'user',
              key: 'id',
            },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },

        order_id: {
          type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'order',
              key: 'id',
            },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
  
  
        stars: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
  
        comment: {
          type: Sequelize.STRING,
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
      await queryInterface.dropTable('rating');
    })
  }
};