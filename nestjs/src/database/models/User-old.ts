import { Role } from '../../../../shared/types/role';
import { UserAttributes } from '../../../../shared/types/user';
import { Column, Model, Table } from 'sequelize-typescript';

@Table( {
  tableName: 'user',
  timestamps: true,
  modelName: 'user',
  paranoid: true,
  hooks: {
    beforeCreate: (user: User) => {
      if (!user.username && user.firstname) {
        const baseUsername = user.firstname.toLowerCase().replace(/\s+/g, '');
        const randomSuffix = Math.floor(Math.random() * 10000);
        user.username = `${baseUsername}-${randomSuffix}`;
      }
    } 
  }   

})
export class User extends Model<UserAttributes> implements UserAttributes {
  @Column({ 
    allowNull: false,
    unique: true,
  })
  username!: string;

  @Column({ 
    allowNull: false
  })
  firstname!: string;

  @Column({ 
    allowNull: false
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

  
}