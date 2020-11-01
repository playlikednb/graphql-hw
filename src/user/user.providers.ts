import { USER_PROVIDER } from '../config/constants'
import { User } from './user.entity'

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useValue: User,
  },
]
