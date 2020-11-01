import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { CreateUserDto } from '../@types'
import { User } from './user.model'
import { UserService } from './user.service'
import { PubSub } from 'graphql-subscriptions'
import { UserWhereInput } from '../graphql'

const pubSub = new PubSub()

const SUBSCRIPTION_TRIGGER = 'USER_RESOLVER_SUBSCRIPTION_TRIGGER'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('allUsers')
  public async allUsers(@Args() args: { where: UserWhereInput }): Promise<{ rows: User[]; count: number }> {
    return this.userService.find({ ...args.where })
  }

  @Query('users')
  public async users(): Promise<User[]> {
    const connection = await this.userService.find({})

    return connection.rows
  }

  @Mutation('createUser')
  public async create(@Args('data') data: CreateUserDto): Promise<User> {
    const user = await this.userService.create(data)
    // const userCreated = `User (${user.id})  ${user.username} created!`
    pubSub.publish(SUBSCRIPTION_TRIGGER, { userCreated: user })
    return user
  }

  @Subscription('userCreated')
  public async userCreatedTrigger(): Promise<AsyncIterator<string>> {
    return pubSub.asyncIterator(SUBSCRIPTION_TRIGGER)
  }
}
