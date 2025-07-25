'use strict';

import { QueryInterface, DataTypes } from 'sequelize';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.sequelize.transaction( async(t) => {

      await queryInterface.createTable('product', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
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
        
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        
        description: {
          type: Sequelize.STRING,
          allowNull: true,
        },
  
        image_url: {
          type: Sequelize.STRING,
          allowNull: true
        },
  
        total_quantity: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
  
        quantity_unit: {
          type: Sequelize.STRING,
          validate: {
            isIn: [['Kg', 'Pack', 'Bunch', 'Tubers', 'Pieces', 'Bag', 'Bucket', 'Congo']]
          },
          allowNull: false
        },
  
        portion_size: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
  
        price_per_portion: {
          type: Sequelize.INTEGER,
          allowNull: false
        },

        available_portions: {
          type: Sequelize.INTEGER,
          allowNull: false
        },

        location: {
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
      await queryInterface.dropTable('product');
    })
  }
};