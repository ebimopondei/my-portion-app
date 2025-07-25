import { Role } from '@shared/types/role';
import { UserAttributes } from '@shared/types/user';
import { Column, Model, Table, CreatedAt, UpdatedAt, AllowNull, PrimaryKey, Default, DataType, BeforeCreate, HasMany, BelongsTo } from 'sequelize-typescript';
import { Col } from 'sequelize/types/utils';
import { Order } from './Order';

@Table( {
  tableName: 'user',
  timestamps: true,
  modelName: 'user',
  paranoid: true,
   

})
export class User extends Model<UserAttributes> implements UserAttributes {

  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;
  
  @AllowNull(true)
  @Column(DataType.STRING)
  username!: string;
  @BeforeCreate({ name: 'username' })
  static async generateUsername(user: User) {

    const baseUsername = user.dataValues.firstname.toLowerCase().replace(/\s+/g, '');
    const randomSuffix = Math.floor(Math.random() * 10000);
    user.dataValues.username = `${baseUsername}-${randomSuffix}`;
  }

  @Column( {
    allowNull: false,
  })
  firstname!: string;
  @Column( {
    allowNull: false,
  })
  lastname!: string;
  
  // Assuming 'email' is a string type for an email address, not a boolean
  @Column({ 
    unique: true, 
    allowNull: false,
    validate: {
      isEmail: true, // Validates that the value is a valid email format
    }
   }) // Added unique constraint for email
  email!: string;
  
  @Column({ 
    allowNull: false
  })
  password!: string;

  @Column({ 
    allowNull: false,
    validate: {
      isIn: [['user', 'vendor', 'admin', 'subadmin']], 
    }
  })
  role!: Role;

  @Column({ 
    allowNull: false,
    defaultValue: false
  })
  email_verified!: boolean;

  @Column({ 
    allowNull: false,
    defaultValue: false
  })
  kyc_verified!: boolean;

  @HasMany(() => Order, { foreignKey: 'user_id', as: 'orders' })
  declare orders?: Order[]; 

}

//   User.hasMany(Order, { foreignKey: 'user_id'})

//   Order.belongsTo(Product, { foreignKey: 'product_id' });
// Order.belongsTo(User, { foreignKey: 'user_id' });
