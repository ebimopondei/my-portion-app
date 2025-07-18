'use strict';

import { Model, DataTypes } from "sequelize";
import { sequelize } from "../setup";

import { OrderRecordAttribute } from '@shared/types/order-record'
import { Status } from "@shared/enums";


class OrderRecord extends Model<OrderRecordAttribute> implements OrderRecordAttribute {
    public id!: string;
    public user_id!: string;
    public product_id!: string[];
    public order_ids!: string | string[];
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

  order_ids: {
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
    
  },

  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [[Status.Pending, Status.Completed, Status.Cancelled]]
    }
  }
  
}, {
  sequelize,
  modelName: 'order_record',
  tableName: 'order_record'
});


export default OrderRecord