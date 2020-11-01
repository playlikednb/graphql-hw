import { Resolver, Query } from '@nestjs/graphql'

@Resolver()
export class AppResolver {
  @Query(() => String, {
    name: 'healthCheck'
  })
  public health(): string {
    return 'UP'
  }
}
