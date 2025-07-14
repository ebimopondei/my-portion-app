'use strict';

import { Model, DataTypes } from "sequelize";
import { sequelize } from "../setup";

import { ProductAttribute } from '@shared/types/product'


class Product extends Model<ProductAttribute> implements ProductAttribute{
    public id!: string;
    public seller_id!: string;
    public name!: string;
    public description!: string;
    public image_url!: string;
    public total_quantity!: number;
    public quantity_unit!: string;
    public portion_size!: number;
    public price_per_portion!: number;
    public available_portions!: number;
    public location!: string;


    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
    public readonly createdAt?: Date;
}

Product.init({
  id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
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

  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  description: {
    type: DataTypes.STRING,
    allowNull: true
  },

  image_url: {
    type: DataTypes.STRING,
    allowNull: false
  },

  total_quantity: {
    type: DataTypes.NUMBER,
    allowNull: false
  },

  quantity_unit: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['kg', 'bag', 'cup', 'rubber']]
    },
  },

  portion_size: {
    type: DataTypes.NUMBER,
    allowNull: false
  },

  price_per_portion: {
    type: DataTypes.NUMBER,
    allowNull: false
  },

  available_portions: {
    type: DataTypes.NUMBER,
    allowNull: false
  },

  location: {
    type: DataTypes.STRING,
    allowNull: false
  }

}, {
  sequelize,
  modelName: 'product',
  tableName: 'product'
});


export default Product