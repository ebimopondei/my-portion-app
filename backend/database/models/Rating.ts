'use strict';

import { Model, DataTypes } from "sequelize";
import { sequelize } from "../setup";

import { RatingAttribute} from '@shared/types/rating'

class Rating extends Model<RatingAttribute> implements RatingAttribute{
    public id!: string;
    public buyer_id!: string;
    public seller_id!: string;
    public order_id!: string;
    public stars!: number;
    public comment!: string;


    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
    public readonly createdAt?: Date;
}

Rating.init({
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

  seller_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  
  order_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'order',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },

  stars: {
    type: DataTypes.NUMBER,
    allowNull: false
  },

  comment: {
    type: DataTypes.STRING,
    allowNull: false
  }

}, {
  sequelize,
  modelName: 'rating',
  tableName: 'rating'
});


export default Rating