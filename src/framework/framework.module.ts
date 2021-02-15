import { Module } from '@nestjs/common';
import { SmsModuleModule } from './sms-module/sms-module.module';
import { DatabaseModule } from './database/database.module';


@Module({
  imports: [SmsModuleModule, DatabaseModule]
})
export class FrameworkModule {}
