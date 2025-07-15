'use strict';

import sequelize from "sequelize";
import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {

    await queryInterface.sequelize.transaction( async (t) => {
      
      await queryInterface.createTable('kyc_business',
        {

          id: { 
            type: Sequelize.UUID,
            defaultValue: sequelize.UUIDV4,
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

          business_name: {
            type: Sequelize.STRING,
            allowNull: false,
          },

          business_phone_number: {
            type: Sequelize.STRING,
            allowNull: false
          },

          business_email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: { 
              isEmail: true,
            }
          },

          cac_number: {
            type: Sequelize.STRING,
            allowNull: true,
          },

          tax_id: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          
          buiness_address: {
            type: Sequelize.STRING,
            allowNull: true,
          },

          town: {
            type: Sequelize.STRING,
            allowNull: false,
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
      await queryInterface.dropTable('kyc_business', { transaction: t });
    })
  }
};
