import { Table, Column, Model, PrimaryKey, Default, AllowNull, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize'; // Import DataTypes from original sequelize for specific types
import { CreationOptional } from 'sequelize'; // For attributes with default values
import { User } from './User'; // Assuming you have a User model, adjust path as needed
import { SellerKycAttribute } from '@shared/types/sellerkyc';

// import { SellerKycAttribute } from '@shared/types/sellerKyc'; // Adjust the import path as needed

@Table({
  tableName: 'seller_kyc',
  modelName: 'seller_kyc',
  timestamps: true, // Assuming you want createdAt and updatedAt to be managed by Sequelize
})
export class SellerKyc extends Model<SellerKycAttribute> implements SellerKycAttribute {
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  @Column(DataTypes.UUID)
  declare id: CreationOptional<string>; // Use CreationOptional for attributes with default values on creation

  @ForeignKey(() => User) // Define the foreign key relationship
  @AllowNull(false)
  @Column(DataTypes.UUID)
  declare user_id: string;

  @AllowNull(true)
  @Column(DataTypes.STRING)
  declare id_image_url: string;

  @AllowNull(true)
  @Column(DataTypes.STRING)
  declare address_proof_url: string;

  @AllowNull(false)
  @Default(false)
  @Column(DataTypes.BOOLEAN)
  declare is_verified: boolean;
}