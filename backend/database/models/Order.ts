'use strict';

import { Model, DataTypes } from "sequelize";
import { sequelize } from "../setup";

import { OrderAttribute } from '@shared/types/order'
import { Status } from "@shared/enums";



class Order extends Model<OrderAttribute> implements OrderAttribute{
    public id!: string;
    public buyer_id!: string;
    public product_id!: string;
    public status!: Status;
    public quantity!: number;
    public total_price!: number;
    public delivery_address!: number;
    public available_portions!: number;


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

  buyer_id: {
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

  status: {
    type: DataTypes.ENUM('pending', 'delivered', 'cancelled'),
    allowNull: false
  },

  quantity: {
    type: DataTypes.NUMBER,
    allowNull: false
  },

  total_price: {
    type: DataTypes.NUMBER,
    allowNull: false
  },

  delivery_address: {
    type: DataTypes.STRING,
    allowNull: false
  },

  available_portions: {
    type: DataTypes.NUMBER,
    allowNull: false
  },

}, {
  sequelize,
  modelName: 'order',
  tableName: 'order'
});


export default Order