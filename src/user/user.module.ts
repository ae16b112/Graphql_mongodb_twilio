import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { smsService }  from './sms.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],

    providers: [
        UserResolver, 
        UserService, 
        smsService
    ]
})

export class UserModule {}
