'use strict';

import { Status } from "../../../shared/enums";
import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface) {

    await queryInterface.sequelize.transaction( async (t) => {
      await queryInterface.addColumn(
        'order',
        'order_record_id', 
        {    type: DataTypes.UUID,
              allowNull: true,
              references: {
                model: 'order_record',
                key: 'id',
              },
              onUpdate: 'CASCADE',
              onDelete: 'CASCADE'
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
      await queryInterface.removeColumn('order', 'order_record_id', { transaction: t });
    })
  }
};
