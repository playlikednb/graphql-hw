import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'

import { AuthModule } from './auth/auth.module'
import { GraphQLModule } from '@nestjs/graphql'
import { AppResolver } from './app.resolver'

@Module({
  imports: [
    UserModule,
    AuthModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true, // For subscriptions
      // autoSchemaFile: 'schema.gql', // For code first
      typePaths: ['src/**/*/*.graphql'], // For schema first
      definitions: {
        path: 'src/graphql.ts',
        // outputAs: 'class',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
