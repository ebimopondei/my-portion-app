import { DataTypes } from 'sequelize'
import { WalletAttributes} from '@shared/types/wallet'
import { Column, Table, Model } from 'sequelize-typescript';
import { User } from './User';


@Table( {
  tableName: 'wallet',
  timestamps: true,
  modelName: 'wallet',
  paranoid: true,
})

export class Wallet extends Model<WalletAttributes> implements WalletAttributes {

  @Column({ 
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  }) 

  @Column({ 
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  user_id!: string;

  @Column({ 
    type: DataTypes.NUMBER,
    allowNull: false,
    defaultValue: 0
  })
  main_balance!: number;

  @Column({ 
    type: DataTypes.NUMBER,
    allowNull: false,
    defaultValue: 0
  })
  sub_balance!: number;
}  


