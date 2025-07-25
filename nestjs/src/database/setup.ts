import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { Dialect } from 'sequelize';

export const getSequelizeConfig = (configService: ConfigService): SequelizeModuleOptions => {
  const baseConfig: SequelizeModuleOptions = {
    database: configService.get<string>('DB_NAME'),
    username: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASS'),
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    dialect: configService.get<Dialect>('DB_DIALECT'), 
    autoLoadModels: true, 
    synchronize: false,
    logging: false, 
  };

  const sequelizeConfig: any = { ...baseConfig };

  // if (configService.get<string>('NODE_ENV') === 'production') {
  //   sequelizeConfig.dialectOptions = {
  //     ssl: {
  //       require: true, // Enforce SSL connection
  //       rejectUnauthorized: true, // Set to false if you are using self-signed certificates in dev, but true for production
  //     },
  //   };
  // }

  return sequelizeConfig;
};