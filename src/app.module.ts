import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import {GraphQLModule} from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { TwilioModule } from 'nestjs-twilio';
import { FrameworkModule } from './framework/framework.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/users',
      synchronize: true,
      useUnifiedTopology: true,
      keepConnectionAlive: true,
      entities: [
        User
      ]

    }),

    TwilioModule.forRoot({
      accountSid: process.env.accountSid,
      authToken: process.env.authToken,
    }),

    GraphQLModule.forRoot({
      autoSchemaFile:true
    }),
    UserModule,
    FrameworkModule
  ],
})
export class AppModule {}
