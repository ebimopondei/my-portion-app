import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../setup'
import { BankAttributes } from '@shared/types/bank'
import User from './User';


class Bank extends Model<BankAttributes> implements BankAttributes{
    public id!: string;
    public user_id!: string;
    public bank_name!: string;
    public account_number!: string;
    public account_name!: string;
        
    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
    public readonly createdAt?: Date;

}

Bank.init({
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

  bank_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  account_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  account_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
      
  }, {
    sequelize: sequelize,
    modelName: 'bank',
    tableName: 'bank',
    paranoid: true,
    
  });

export default Bank

User.hasOne(Bank, { foreignKey: 'user_id'})

Bank.belongsTo(User, { foreignKey: 'user_id' });
