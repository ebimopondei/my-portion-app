import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Default,
  AllowNull,
  ForeignKey,
  BelongsTo, // Import BelongsTo for defining many-to-one relationships
  CreatedAt,
  UpdatedAt,
  DeletedAt
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { CreationOptional } from 'sequelize';

// Import your shared types
import { BankAttributes } from '@shared/types/bank';

// Import related models for ForeignKey and BelongsTo decorators (adjust paths as needed)
import { User } from './User'; // Assuming your User model is in './User.ts'

@Table({
  tableName: 'bank',
  modelName: 'bank',
  timestamps: true, // Let Sequelize manage createdAt and updatedAt automatically
  paranoid: true, // This enables soft deletes and manages the deletedAt column
})
export class Bank extends Model<BankAttributes> implements BankAttributes {
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  @Column(DataTypes.UUID)
  declare id: CreationOptional<string>;

  @ForeignKey(() => User) // References the User model
  @AllowNull(false)
  @Column(DataTypes.UUID)
  declare user_id: string;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  declare bank_name: string;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  declare account_name: string;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  declare account_number: string;

  // Sequelize-typescript manages these automatically when `timestamps: true` and `paranoid: true`
  @CreatedAt
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  declare updatedAt: CreationOptional<Date>;

  @DeletedAt
  declare deletedAt?: Date; // Optional because it's only set on soft delete

  // Define the many-to-one relationship (Bank belongs to User)
  // This replaces Bank.belongsTo(User, { foreignKey: 'user_id' });
  @BelongsTo(() => User, { foreignKey: 'user_id', as: 'user' })
  declare user?: User; // The 'as' option defines the alias for the associated model
}

// For the User.hasOne(Bank) association, you'll define it on the User model itself.
// This allows you to remove the `User.hasOne(Bank, { foreignKey: 'user_id'})` line from here.
// In your User model:
// import { HasOne } from 'sequelize-typescript';
// import { Bank } from './Bank'; // Adjust path
// class User extends Model<UserAttributes> {
//   // ... other User properties
//   @HasOne(() => Bank, { foreignKey: 'user_id', as: 'bank' })
//   declare bank?: Bank;
// }

// User.hasOne(Bank, { foreignKey: 'user_id'})

// Bank.belongsTo(User, { foreignKey: 'user_id' });