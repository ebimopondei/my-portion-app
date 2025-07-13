import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../setup'
import { UserAttributes} from '@shared/types/user'
import { Role } from '@shared/types/role'


class User extends Model<UserAttributes> implements UserAttributes{
    public id!: number;
    public email!: string;
    public firstname!: string;
    public lastname!: string;
    public username!: string;
    public password!: string;
    public role!: Role;
    
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
        type: DataTypes.ENUM('buyer', 'seller', 'admin', 'subadmin'),
        allowNull: false
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