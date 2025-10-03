import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './User';
import { NotificationAttribute } from '@shared/types/notification';
import { NotificationType, Roles } from '@shared/enums';


@Table({
  tableName: 'notification',
  modelName: 'notification',
  timestamps: true,
  paranoid: false,
})

export class Notification extends Model<NotificationAttribute> implements NotificationAttribute {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  declare user_id: string | null;

  @BelongsTo(() => User)
  declare users: User;

  @Column({
    type: DataType.STRING,
    validate: {
        isIn: [Object.values(Roles)],
    },
    allowNull: true,
  })
  declare role_target: Roles | null;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  declare is_global: boolean;

  @Column({
    type: DataType.STRING,
    validate: {
        isIn: [Object.values(NotificationType)]
    },
    allowNull: false,
  })
  declare type: NotificationType;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare message: string;

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  declare meta_data: Record<string, any>;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  declare is_read: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare read_at: Date | null;
}
