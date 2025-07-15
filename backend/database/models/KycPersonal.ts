'use strict';

import { Model, DataTypes } from "sequelize";
import { SellerKycAttribute } from '@shared/types/sellerkyc'

import { sequelize } from "../setup";


class SellerKyc extends Model<SellerKycAttribute> implements SellerKycAttribute{
    public id!: string;
    public user_id!: string;
    public id_image_url!: string;
    public address_proof_url!: string;
    public is_verified!: boolean;


    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
    public readonly createdAt?: Date;
}

SellerKyc.init({
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

  id_image_url: {
    type: DataTypes.STRING,
    allowNull: true
  },

  address_proof_url: {
    type: DataTypes.STRING,
    allowNull: true
  },

  is_verified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }

}, {
  sequelize,
  modelName: 'seller_kyc',
  tableName: 'seller_kyc'
});


export default SellerKyc