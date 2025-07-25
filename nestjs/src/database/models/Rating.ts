import { Table, Column, Model, PrimaryKey, Default, AllowNull, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { CreationOptional } from 'sequelize';

// Import your shared types
import { RatingAttribute } from '../../../../shared/types/rating';

// Import related models for ForeignKey decorators (adjust paths as needed)
import { User } from './User'; // Assuming your User model is in './User.ts'
import { Order } from './Order'; // Assuming your Order model is in './Order.ts'

@Table({
  tableName: 'rating',
  modelName: 'rating',
  timestamps: true, // Assuming you want createdAt and updatedAt
  paranoid: false, // Assuming you don't need soft deletes for ratings, set to true if you do
})
export class Rating extends Model<RatingAttribute> implements RatingAttribute {
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  @Column(DataTypes.UUID)
  declare id: CreationOptional<string>;

  @ForeignKey(() => User) // References the User model
  @AllowNull(false)
  @Column(DataTypes.UUID)
  declare buyer_id: string;

  @ForeignKey(() => User) // References the User model
  @AllowNull(false)
  @Column(DataTypes.UUID)
  declare seller_id: string;

  @ForeignKey(() => Order) // References the Order model
  @AllowNull(false)
  @Column(DataTypes.UUID)
  declare order_id: string;

  @AllowNull(false)
  @Column(DataTypes.INTEGER) // Use DataTypes.INTEGER for number types
  declare stars: number;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  declare comment: string;
}