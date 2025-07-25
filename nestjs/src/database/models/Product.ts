import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Default,
  AllowNull,
  ForeignKey,
  HasMany // Import HasMany for defining one-to-many relationships
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { CreationOptional } from 'sequelize';

// Import your shared types and enums
import { ProductAttribute } from '../../../../shared/types/product';
import { Status } from "../../../../shared/enums"; // Adjust path as necessary, from your provided snippet it's "../../../shared/enums"


// Import related models for ForeignKey and HasMany decorators (adjust paths as needed)
import { User } from './User'; // Assuming your User model is in './User.ts'
import { Order } from './Order'; // Assuming your Order model is in './Order.ts'

// Define an enum for QuantityUnit if you haven't already, for better type safety
// If it's already in @shared/enums, then simply import it.
// For demonstration, let's define it here if it's not yet an enum.
// If it's a simple string literal type, you can use that directly too.
/*
export enum QuantityUnit {
  Kg = 'Kg',
  Pack = 'Pack',
  Bunch = 'Bunch',
  Tubers = 'Tubers',
  Pieces = 'Pieces',
  Bag = 'Bag',
  Bucket = 'Bucket',
  Congo = 'Congo',
}
*/
// Assuming `QuantityUnit` is defined similar to `Status` in @shared/enums
// For example:
// export enum QuantityUnit {
//   KG = 'Kg',
//   PACK = 'Pack',
//   BUNCH = 'Bunch',
//   TUBERS = 'Tubers',
//   PIECES = 'Pieces',
//   BAG = 'Bag',
//   BUCKET = 'Bucket',
//   CONGO = 'Congo',
// }


@Table({
  tableName: 'product',
  modelName: 'product',
  timestamps: true, // Assuming you want createdAt and updatedAt
  paranoid: false, // Assuming you don't need soft deletes for products. Set to true if you do.
})
export class Product extends Model<ProductAttribute> implements ProductAttribute {
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  @Column(DataTypes.UUID)
  declare id: CreationOptional<string>;

  @ForeignKey(() => User) // References the User model
  @AllowNull(false)
  @Column(DataTypes.UUID)
  declare seller_id: string;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  declare name: string;

  @AllowNull(true)
  @Column(DataTypes.STRING)
  declare description: string; // Can be null

  @AllowNull(true)
  @Column(DataTypes.STRING)
  declare category: string; // Can be null

  @AllowNull(false)
  @Column(DataTypes.STRING)
  declare image_url: string;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  declare video_url: string;

  @AllowNull(false)
  @Column(DataTypes.INTEGER) // Assuming total_quantity is an integer
  declare total_quantity: number;

  @AllowNull(false)
  @Column(DataTypes.INTEGER) // Assuming number_per_portion is an integer
  declare number_per_portion: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
    validate: {
      // Use Object.values(QuantityUnit) if it's an enum, otherwise hardcode or use a type guard
      isIn: [['Kg', 'Pack', 'Bunch', 'Tubers', 'Pieces', 'Bag', 'Bucket', 'Congo']],
    },
  })
  // If QuantityUnit is an enum, use `declare quantity_unit: QuantityUnit;`
  declare quantity_unit: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
    validate: {
      isIn: [Object.values(Status)], // Using Object.values(Status) for enum validation
    },
  })
  declare status: Status; // Use the Status enum type directly

  @AllowNull(false)
  @Column(DataTypes.INTEGER) // Assuming portion_size is an integer
  declare portion_size: number;

  @AllowNull(false)
  @Column(DataTypes.DECIMAL(10, 2)) // Use DECIMAL for prices
  declare price_per_portion: number;

  @AllowNull(false)
  @Column(DataTypes.INTEGER) // Assuming available_portions is an integer
  declare available_portions: number;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  declare location: string;

  // Define the one-to-many relationship using @HasMany
  // This replaces Product.hasMany(Order, { foreignKey: 'product_id' });
  @HasMany(() => Order, { foreignKey: 'product_id', as: 'orders' })
  declare orders?: Order[]; // The 'as' option defines the alias for the associated models
}

// Product.hasMany(Order, { foreignKey: 'product_id' });
