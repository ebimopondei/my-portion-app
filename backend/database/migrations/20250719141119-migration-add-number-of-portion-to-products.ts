'use strict';
import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface) {

    await queryInterface.sequelize.transaction( async (t) => {
      await queryInterface.addColumn(
        'product',
        'number_per_portion',
        {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,  // Temporary default to avoid NOT NULL constraint issues
        },
        { transaction: t }
      );

      await queryInterface.sequelize.query(
        `
        UPDATE product
        SET number_per_portion = CASE
            WHEN portion_size > 0 THEN total_quantity / portion_size
            ELSE 0
        END
        `,
        { transaction: t }
      );

      await queryInterface.changeColumn(
        'product',
        'number_per_portion',
        {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        { transaction: t }
      );

      await queryInterface.changeColumn(
        'product',
        'available_portions',
        {
          type: DataTypes.FLOAT,
          allowNull: false
        },
        { transaction: t }
      );
        
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
      await queryInterface.removeColumn('product', 'number_per_portion', { transaction: t }),
      await queryInterface.changeColumn('product', 'available_portions', {
          type: DataTypes.INTEGER,
          allowNull: false
        }, { transaction: t })
    })
  }
};
