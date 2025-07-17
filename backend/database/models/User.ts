import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../setup'
import { UserAttributes} from '@shared/types/user'
import { Role } from '@shared/types/role'
import Order from './Order';
import Product from './Product';


class User extends Model<UserAttributes> implements UserAttributes{
    public id!: string;
    public email!: string;
    public firstname!: string;
    public lastname!: string;
    public username!: string;
    public password!: string;
    public role!: Role;
    public email_verified!: Boolean;
    public kyc_verified!: Boolean;
    
    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
    public readonly createdAt?: Date;

}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
    username: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
      },
      
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { 
          isEmail: true,
        }
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false
      },

      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['user', 'vendor', 'admin', 'subadmin']]
        }
      },

      email_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },

      kyc_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
      
  }, {
    sequelize: sequelize,
    modelName: 'User',
    tableName: 'user',
    paranoid: true,
    
    hooks: {
      beforeCreate: (user) => {
        if (!user.username && user.firstname) {
          const baseUsername = user.firstname.toLowerCase().replace(/\s+/g, '');
          const randomSuffix = Math.floor(Math.random() * 10000);
          user.username = `${baseUsername}-${randomSuffix}`;
        }
      }
    }
  });

  export default User

  User.hasMany(Order, { foreignKey: 'user_id'})

  Order.belongsTo(Product, { foreignKey: 'product_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });
