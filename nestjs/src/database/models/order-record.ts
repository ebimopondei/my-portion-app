import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Default,
  AllowNull,
  ForeignKey,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { CreationOptional } from 'sequelize';

// Import your shared types and enums
import { OrderRecordAttribute } from '../../../../shared/types/order-record';
import { Status } from "../../../../shared/enums"; // Assuming Status is an enum

// Import related models for ForeignKey decorators (adjust paths as needed)
import { User } from './User'; // Assuming your User model is in './User.ts'

@Table({
  tableName: 'order_record',
  modelName: 'order_record',
  timestamps: true, // Assuming you want createdAt and updatedAt
  paranoid: false, // Assuming you don't need soft deletes. Set to true if you do.
})
export class OrderRecord extends Model<OrderRecordAttribute> implements OrderRecordAttribute {
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  @Column(DataTypes.UUID)
  declare id: CreationOptional<string>;

  @ForeignKey(() => User) // References the User model
  @AllowNull(false)
  @Column(DataTypes.UUID)
  declare user_id: string;

  @AllowNull(false)
  @Column(DataTypes.JSON) // Storing an array of strings as JSON
  declare product_id: string[]; // TypeScript type is an array of strings

  @AllowNull(false)
  @Default([]) // Default value for the column in the database
  @Column({
    type: DataTypes.JSON, // Storing an array of strings as JSON
    // Custom getter and setter logic
    get(): string[] {
      const rawValue = this.getDataValue('order_ids');
      // Ensure the returned value is always an array of strings
      return Array.isArray(rawValue) ? rawValue : [];
    },
    set(value: string | string[]) {
      const current = this.getDataValue('order_ids') || [];
      if (typeof value === 'string') {
        // Append new string to existing array
        this.setDataValue('order_ids', [...current, value]);
      } else if (Array.isArray(value)) {
        // Replace with new array
        this.setDataValue('order_ids', value);
      } else {
        // Handle unexpected input, e.g., set to empty array or throw error
        this.setDataValue('order_ids', []);
      }
    },
  })
  // TypeScript type can be string[] or string | string[] depending on your preference for `set` input
  declare order_ids: string[];

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
    validate: {
      isIn: [Object.values(Status)], // Using Object.values(Status) for enum validation
    },
  })
  declare status: Status; // Use the Status enum type directly

}