'use strict';

import { Model, DataTypes } from "sequelize";
import { sequelize } from "../setup";

import { OrderRecordAttribute } from '@shared/types/order-record'
import { Status } from "@shared/enums";



class OrderRecord extends Model<OrderRecordAttribute> implements OrderRecordAttribute {
    public id!: string;
    public user_id!: string;
    public product_id!: string[];
    public status!: Status;
    

    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
    public readonly createdAt?: Date;
}

OrderRecord.init({
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
    type: DataTypes.JSON,
    allowNull: false,
  },

  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['pending', 'delivered', 'cancelled']]
    }
  }
  
}, {
  sequelize,
  modelName: 'order_record',
  tableName: 'order_record'
});


export default OrderRecord