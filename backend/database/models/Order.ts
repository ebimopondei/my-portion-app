'use strict';

import { Model, DataTypes } from "sequelize";
import { sequelize } from "../setup";

import { Status } from "@shared/enums";
import { OrderAttribute } from "@shared/types/order";



class Order extends Model<OrderAttribute> implements OrderAttribute{
    public id!: string;
    public user_id!: string;
    public portion!: number;
    public status!: Status;
    public amount!: string;
    public product_id!: string;
    public order_record_id!: string;


    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
    public readonly createdAt?: Date;
}

Order.init({
  id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },

  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  
  product_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'product',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },

  order_record_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'order_record',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },

  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['pending', 'delivered', 'cancelled']]
    }
  },

  amount: {
    type: DataTypes.NUMBER,
    allowNull: false
  },

  portion: {
    type: DataTypes.NUMBER,
    allowNull: false
  },

}, {
  sequelize,
  modelName: 'order',
  tableName: 'order'
});


export default Order

// Order.belongsTo(User, { foreignKey: 'user_id' });