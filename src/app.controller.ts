import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth/auth.service'
import { LocalAuthGuard } from './auth/local.auth.guard'
import { User } from './user/user.entity'
import { UserService } from './user/user.service'
import { Authorization } from './utils/decorators/authorization.decorator'
import { AuthResponse, CreateUserDto } from './@types'

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Get('/test')
  test(@Authorization() auth: string): string {
    return auth
  }

  @Get('/health')
  healthCheck(): { status: string } {
    return { status: 'UP' }
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/validate')
  public async validate(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<Partial<User>> {
    return this.authService.validateUser(username, password)
  }

  @Post('auth/login')
  public async login(@Body('username') username: string, @Body('password') password: string): Promise<AuthResponse> {
    return this.authService.login(username, password)
  }

  @Post('auth/register')
  public async register(@Body() data: CreateUserDto): Promise<AuthResponse> {
    return this.authService.register(data)
  }

  @Get('/profile')
  public async getProfile(@Request() req: any): Promise<Partial<User>> {
    return this.userService.get(req.user.id)
  }
}
