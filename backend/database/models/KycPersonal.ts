'use strict';

import { Model, DataTypes } from "sequelize";
import { KycPersonalAttribute } from '@shared/types/KycPersonal'

import { sequelize } from "../setup";


class KycPersonal extends Model<KycPersonalAttribute> implements KycPersonalAttribute{
    public id!: string;
    public firstname!: string;
    public lastname!: string;
    public date_of_birth!: Date;
    public phone_number!: string;
    public email!: string;
    public bvn!: string;
    public address!: string;
    public town!: string;
    public city!: string;
    public user_id!: string;
    public state!: string;

    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
    public readonly createdAt?: Date;
}

KycPersonal.init({
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

    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    phone_number: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { 
        isEmail: true,
      }
    },

    bvn: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    town: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    city: {
      type: DataTypes.STRING,
      allowNull: false
    },

    state: {
      type: DataTypes.STRING,
      allowNull: false
    },

}, {
  sequelize,
  modelName: 'kyc_personal',
  tableName: 'kyc_personal'
});


export default KycPersonal