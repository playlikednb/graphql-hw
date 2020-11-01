import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { User } from '../user/user.entity'
import { checkPassword, createHash, generateRefreshToken } from '../utils/bcrypt'
import { AuthResponse, CreateUserDto } from '../@types'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  public async validateUser(username: string, password: string): Promise<Partial<User> | null> {
    const user = await this.userService.findOne({ username })
    if (user && user.password === password) {
      const { id } = user
      return { id }
    }
    return null
  }

  public async login(username: string, password: string): Promise<AuthResponse> {
    const user = await this.userService.findOne({ username })

    if (!user) throw new Error('User not found')

    const check = checkPassword(user.password, password)
    if (!check) {
      throw new Error('Password is invalid')
    }
    const payload = { username: user.username, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: user.refreshToken,
    }
  }

  public async register(payload: CreateUserDto): Promise<AuthResponse> {
    const exist = await this.userService.findOne({ username: payload.username })

    if (exist) {
      throw new Error(`User already exist: ${payload.username}`)
    }

    const hashPassword = createHash(payload.password)

    const refresh_token = generateRefreshToken()

    const user = await this.userService.create({
      ...payload,
      password: hashPassword,
    })

    return {
      access_token: this.jwtService.sign({ username: user.username, sub: user.id }),
      refresh_token,
    }
  }

  public async profile(token: string): Promise<Partial<User>> {
    const payload = this.jwtService.decode(token) as Partial<User>

    console.log('profile payload', payload)

    return this.userService.get(payload.id)
  }
}
