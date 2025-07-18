import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../setup'
import { WalletAttributes} from '@shared/types/wallet'
import User from './User';


class Wallet extends Model<WalletAttributes> implements WalletAttributes{
    public id!: string;
    public user_id!: string;
    public main_balance!: number;
    public sub_balance!: number;
        
    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
    public readonly createdAt?: Date;

}

Wallet.init({
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

  main_balance: {
    type: DataTypes.NUMBER,
    allowNull: false,
    defaultValue: 0
  },

  sub_balance: {
    type: DataTypes.NUMBER,
    allowNull: false,
    defaultValue: 0
  },
      
  }, {
    sequelize: sequelize,
    modelName: 'wallet',
    tableName: 'wallet',
    paranoid: true,
    
  });

export default Wallet

User.hasOne(Wallet, { foreignKey: 'user_id'})

Wallet.belongsTo(User, { foreignKey: 'user_id' });
