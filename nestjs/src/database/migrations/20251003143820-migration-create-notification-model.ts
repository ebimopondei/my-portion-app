'use strict';

import { DataTypes, QueryInterface } from "sequelize";

const Roles = {
    USER: "user",
    VENDOR: "vendor",
    ADMIN: "admin",
    SUBADMIN: "subadmin"
} as const;

const NotificationType = {
    ORDER: "order",
    PAYMENT: "payment",
    PAYOUT: "payout",
    SYSTEM: "system",
    ALERT: "alert"
} as const;

export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];
export type Roles = (typeof Roles)[keyof typeof Roles];
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.sequelize.transaction( async(t) => {
      await queryInterface.createTable('notification',
         {
          id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
          },

          user_id: {
            type: Sequelize.UUID,
              allowNull: true,
              references: {
                model: 'user',
                key: 'id',
              },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },

          role_target: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
              isIn: [Object.values(Roles)]
            }
          },

          is_global: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
          },

          type: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
              isIn: [Object.values(NotificationType)]
            }
          },

          title: {
            type: Sequelize.STRING,
            allowNull: false,
          },

          message: {
            type: Sequelize.TEXT,
            allowNull: false,
          },

          meta_data: {
            type: Sequelize.JSON,
            allowNull: true,
          },

          is_read: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },

          read_at: {
            type: Sequelize.DATE,
            allowNull: true,
          },

          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
          },

          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
          },


         }
      )
    })

    
  },

  async down (queryInterface: QueryInterface ) {
    await queryInterface.sequelize.transaction( async (t)=> {
      await queryInterface.dropTable('notification', { transaction: t });
    })
  }
};
