'use strict';

import sequelize from "sequelize";
import { Status } from "../../../../shared/enums";
import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {

    await queryInterface.sequelize.transaction( async (t) => {
      await queryInterface.addColumn(
        'user',
        'email_verified', 
        {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue:false

      }, { transaction: t })
      
    })

    await queryInterface.sequelize.transaction( async (t) => {
      await queryInterface.addColumn(
        'user',
        'kyc_verified', 
        {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue:false

      }, { transaction: t })
      
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
      await queryInterface.removeColumn('user', 'email_verified', { transaction: t });
      await queryInterface.removeColumn('user', 'kyc_verified', { transaction: t });
    })
  }
};
