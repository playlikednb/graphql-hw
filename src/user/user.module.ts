import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { DatabaseModule } from '../database/database.module'
import { userProviders } from './user.providers'
import { UserResolver } from './user.resolver'

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...userProviders, UserResolver],
  exports: [UserService],
})
export class UserModule {}
