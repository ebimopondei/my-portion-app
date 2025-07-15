'use strict';

import { Status } from "../../../shared/enums";
import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface) {

    await queryInterface.sequelize.transaction( async (t) => {
      await queryInterface.addColumn(
        'product',
        'category', 
        {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue:'food'

      }, { transaction: t })
      await queryInterface.addColumn(
        'product',
        'video_url', 
        {
          type: DataTypes.STRING,
          allowNull: true,

      }, { transaction: t })
      await queryInterface.addColumn(
        'product',
        'status', 
        {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isIn: [[Status.Cancelled, Status.Pending, Status.Delivered]]
          },
          defaultValue: Status.Pending

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
      await queryInterface.removeColumn('product', 'status', { transaction: t });
      await queryInterface.removeColumn('product', 'category', { transaction: t });
      await queryInterface.removeColumn('product', 'video_url', { transaction: t });
    })
  }
};
