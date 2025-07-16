'use strict';

import { Model, DataTypes } from "sequelize";
import { KycBusinessDocsAttribute } from '@shared/types/kyc-business-docs'

import { sequelize } from "../setup";


class KycBusinessDocs extends Model<KycBusinessDocsAttribute> implements KycBusinessDocsAttribute{
    public id!: string;
    public utility_bill!: string;
    public user_id!: string;
    public cac_certificate!: string;
    public tax_certificate!: string;
    
    
    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
    public readonly createdAt?: Date;
}

KycBusinessDocs.init({
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

          utility_bill: {
            type: DataTypes.STRING,
            allowNull: false,
          },

          cac_certificate: {
            type: DataTypes.STRING,
            allowNull: true
          },

          tax_certificate: {
            type: DataTypes.STRING,
            allowNull: true
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
  modelName: 'kyc_business_docs',
  tableName: 'kyc_business_docs'
});


export default KycBusinessDocs