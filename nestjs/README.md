# NestJs
## Introduction
Nest (NestJS) is a framework for building efficient, scalable Node.js server-side applications.

## Database Integration (Sequelize)
Install sequelize, types and the database driver of choice 

```bash

npm install --save @nestjs/sequelize  @nestjs/config sequelize dotenv-cli sequelize-typescript pg

npm install --save-dev @types/sequelize

```

Once the installation process is complete, we can import the SequelizeModule and ConfigModule into the root AppModule like so:

```ts

    @Module({
      imports: [
        AuthModule,
        ConfigModule.forRoot({
          isGlobal: true
        }),
        
        SequelizeModule.forRootAsync( {
          useFactory: getSequelizeConfig,
          inject: [ConfigService],
        })
      ]
    })
    export class AppModule {}

```


import a function that return sequelize config

```js 

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
    // models: [User], 
    autoLoadModels: true, 
    synchronize: false,
    logging: false, 
  };

  const sequelizeConfig: any = { ...baseConfig };

  if (configService.get<string>('NODE_ENV') === 'production') {
    sequelizeConfig.dialectOptions = {
      ssl: {
        require: true, // Enforce SSL connection
        rejectUnauthorized: true, // Set to false if you are using self-signed certificates in dev, but true for production
      },
    };
  }

  return sequelizeConfig;
};

```

You can add models. Setup migrations as you normally would.

## Running Migrations

Install Sequelize CLI tool

```bash

npm install --save-dev sequelize-cli

```

Run this code to create the database folder container the migrations config

```bash

npx sequelize-cli init

```

Move created database folder into the src directory and create .sequelizerc file in the root directory. Paste this in the file:

```js


const path = require('path');

module.exports = {
  config: path.resolve('src/database', 'config/config.js'),
  'models-path': path.resolve('src/database', 'models'),
  'seeders-path': path.resolve('src/database', 'seeders'),
  'migrations-path': path.resolve('src/database', 'migrations')
};

```

Modify the /database/config/config.json file to .js and paste. This is the config to be used when running migrations

```js

require('ts-node/register');

const development= {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT
}

const test = {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
        ssl: {
            require: true,
        rejectUnauthorized: false, // Required for Neon or some managed PG services
    }
  },
}

const production = {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT
}

module.exports = {
    
    production,
    test,
    development
  
};

```

## Creating Models
Create model files inside of the model folder like `User.ts` like so:

```ts

import { Column, Model, Table,  } from 'sequelize-typescript';

@Table( {
  tableName: 'user',
  timestamps: true,
  modelName: 'user', 

})

export class User extends Model {
  @Column({ 
    allowNull: false
  })
  first_name!: string;

  @Column({ 
    allowNull: false
  })
  last_name!: string;
  
  @Column({ unique: true, allowNull: false }) 
  email!: string;
  
  @Column({ 
    allowNull: false
  })
  password!: string;
}

```


Create the migration skeleton like so

```bash 
npx sequelize-cli migration:generate --name migration-skeleton
```

and modify the file to .ts and paste: 

```ts

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user');
  }
};

```


## Run Migration

```bash

npx dotenv -- sequelize-cli db:migrate

```

You can undo migration like so:

```bash

npx dotenv -- sequelize-cli db:migrate:undo

```