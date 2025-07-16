'use strict';

import { Model, DataTypes } from "sequelize";
import { KycBusinessAttribute } from '@shared/types/KycBusiness'

import { sequelize } from "../setup";


class KycBusiness extends Model<KycBusinessAttribute> implements KycBusinessAttribute{
    public id!: string;
    public user_id!: string;
    public business_name!: string;
    public business_email!: string;
    public business_phone_number!: string;
    public cac_number!: string;
    public tax_id!: string;
    public business_address!: string;

    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
    public readonly createdAt?: Date;
}

KycBusiness.init({
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
  
            business_name: {
              type: DataTypes.STRING,
              allowNull: false,
            },
  
            business_phone_number: {
              type: DataTypes.STRING,
              allowNull: false
            },
  
            business_email: {
              type: DataTypes.STRING,
              allowNull: false,
              unique: true,
              validate: { 
                isEmail: true,
              }
            },
  
            cac_number: {
              type: DataTypes.STRING,
              allowNull: true,
            },
  
            tax_id: {
              type: DataTypes.STRING,
              allowNull: true,
            },
            
            business_address: {
              type: DataTypes.STRING,
              allowNull: true,
            },
   
            createdAt: {
              allowNull: false,
              type: DataTypes.DATE
            },
  
            deletedAt: {
              allowNull: true,
              type: DataTypes.DATE
            },
      
            updatedAt: {
              allowNull: false,
              type: DataTypes.DATE
            }

}, {
  sequelize,
  modelName: 'kyc_business',
  tableName: 'kyc_business'
});


export default KycBusiness