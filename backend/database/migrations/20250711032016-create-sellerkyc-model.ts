'use strict';

import { QueryInterface, DataTypes } from 'sequelize';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.sequelize.transaction( async(t) => {
      await queryInterface.createTable('seller_kyc', {
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
        
        id_image_url: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        
        address_proof_url: {
          type: Sequelize.STRING,
          allowNull: true,
        },
  
        is_verified: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
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
      await queryInterface.dropTable('seller_kyc')
    })
  }
};