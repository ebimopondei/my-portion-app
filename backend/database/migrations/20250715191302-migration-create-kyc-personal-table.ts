'use strict';

import sequelize from "sequelize";
import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {

    await queryInterface.sequelize.transaction( async (t) => {
      
      await queryInterface.createTable('kyc_personal',
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

          firstname: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          
          lastname: {
            type: Sequelize.STRING,
            allowNull: false,
          },

          date_of_birth: {
            type: Sequelize.DATE,
            allowNull: false,
          },

          phone_number: {
            type: Sequelize.STRING,
            allowNull: false
          },

          email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: { 
              isEmail: true,
            }
          },

          bvn: {
            type: Sequelize.STRING,
            allowNull: false,
          },

          address: {
            type: Sequelize.STRING,
            allowNull: false,
          },

          town: {
            type: Sequelize.STRING,
            allowNull: false,
          },

          city: {
            type: Sequelize.STRING,
            allowNull: false
          },

          state: {
            type: Sequelize.STRING,
            allowNull: false
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
      await queryInterface.dropTable('kyc_personal', { transaction: t });
    })
  }
};
