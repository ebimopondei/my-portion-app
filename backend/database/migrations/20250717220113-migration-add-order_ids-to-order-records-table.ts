'use strict';

import { Status } from "../../../shared/enums";
import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface) {

    await queryInterface.sequelize.transaction( async (t) => {
      await queryInterface.addColumn(
        'order_record',
        'order_ids', 
        {
           
          type: DataTypes.JSON,
          allowNull: false,
          defaultValue: [],

          get(){
            const rawValue = this.getDataValue('order_ids');
            return Array.isArray(rawValue) ? rawValue : []
          },
          set(value: string | string []){
            const current = this.getDataValue('order_ids') || [];
            if( typeof value === 'string'){
              this.setDataValue('order_ids', [...current, value])
            }else if(Array.isArray(value)){
              this.setDataValue('order_ids', value)
            }
          }

      }, { transaction: t })
      await queryInterface.changeColumn(
        'order_record',
        'status', 
        {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              isIn: [[Status.Pending, Status.Completed, Status.Cancelled]]
            }
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
      await queryInterface.removeColumn('order_record', 'order_ids', { transaction: t });
      await queryInterface.changeColumn('order_record', 'status', { type: DataTypes.STRING,
            allowNull: false,
            validate: {
              isIn: [['pending', 'delivered', 'cancelled']]
            }
          }, { transaction: t });
    })
  }
};
