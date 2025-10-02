import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Default,
  AllowNull,
  ForeignKey,
  BelongsTo,
  AutoIncrement
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { CreationOptional } from 'sequelize';

// Import your shared types and enums
import { Status, TransactionTypes } from "../../../../shared/enums"; // Adjust path as necessary, from your provided snippet it's "../../../shared/enums"


// Import related models for ForeignKey and HasMany decorators (adjust paths as needed)
import { User } from './User'; // Assuming your User model is in './User.ts'
import { Order } from './Order'; // Assuming your Order model is in './Order.ts'
import { TransactionAttribute } from '@shared/types/transaction';


@Table({
  tableName: 'transaction',
  modelName: 'transaction',
  timestamps: true, // Assuming you want createdAt and updatedAt
  paranoid: true,
})

export class Transaction extends Model<TransactionAttribute> implements TransactionAttribute {
  @PrimaryKey
  @AutoIncrement
  @Column(DataTypes.INTEGER)
  declare id: CreationOptional<string>;

  @ForeignKey(() => Order)
  @AllowNull(true)
  @Column(DataTypes.UUID)
  declare order_id: string;

  @ForeignKey(() => User) // References the User model
  @AllowNull(false)
  @Column(DataTypes.UUID)
  declare user_id: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
    validate: {
        isIn: [Object.values(TransactionTypes)]
    }
  })
  declare type: TransactionTypes;

  @Default(0.0)
  @AllowNull(false)
  @Column(DataTypes.DECIMAL(10,2))
  declare amount: number; // Can be null

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
    validate: {
      isIn: [Object.values(Status)],
    },
  })
  declare status: Status;

  @AllowNull(true)
  @Default(null)
  @Column(DataTypes.STRING)
  declare reference: string;

  @BelongsTo(() => User, { foreignKey: 'user_id', as: 'user' })
  declare confirmedBy?: User;

  @BelongsTo(() => Order, { foreignKey: 'order_id', as: 'orders' })
  declare orders?: Order[];
}

