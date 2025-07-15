'use strict';

import { Status } from "../../../shared/enums";
import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface) {

    await queryInterface.sequelize.transaction( async (t) => {
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
      await queryInterface.removeColumn('Person', 'petName', { transaction: t });
    })
  }
};
