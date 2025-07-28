'use strict';

import sequelize from "sequelize";
import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {

    await queryInterface.sequelize.transaction( async (t) => {
      
      await queryInterface.createTable('kyc_business_docs',
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

          utility_bill: {
            type: Sequelize.STRING,
            allowNull: false,
          },

          cac_certificate: {
            type: Sequelize.STRING,
            allowNull: true
          },

          tax_certificate: {
            type: Sequelize.STRING,
            allowNull: true
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
      await queryInterface.dropTable('kyc_business_docs', { transaction: t });
    })
  }
};
