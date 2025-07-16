'use strict';

import { Model, DataTypes } from "sequelize";
import { KycIdVerificationAttribute } from '@shared/types/kyc-id-verification'

import { sequelize } from "../setup";


class KycIdVerification extends Model<KycIdVerificationAttribute> implements KycIdVerificationAttribute{
    public id!: string;
    public id_type!: string;
    public user_id!: string;
    public id_number!: string;
    public id_front!: string;
    public id_back!: string;
    public passport!: string;
   
    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
    public readonly createdAt?: Date;
}

KycIdVerification.init({
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

          id_type: {
            type: DataTypes.STRING,
            allowNull: false,
          },

          id_number: {
            type: DataTypes.STRING,
            allowNull: false
          },

          id_front: {
            type: DataTypes.STRING,
            allowNull: false
          },

          id_back: {
            type: DataTypes.STRING,
            allowNull: true
          },

          passport: {
            type: DataTypes.STRING,
            allowNull: false
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
  modelName: 'kyc_id_verification',
  tableName: 'kyc_id_verification'
});


export default KycIdVerification