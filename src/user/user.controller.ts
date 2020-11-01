import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Response,
  UseInterceptors,
} from '@nestjs/common'
import { CreateUserDto, User } from '../@types'
import { LoggingInterceptor } from '../utils/interceptors/LoggingInterceptor'
import { UserService } from './user.service'

@Controller('users')
@UseInterceptors(LoggingInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('')
  public async find(@Query() params: { [key: string]: string }): Promise<User[]> {
    return this.userService.find(params)
  }

  @Get(':id')
  public async get(@Param('id', ParseIntPipe) id: number): Promise<User> {
    console.log('1')
    const user = await this.userService.get(id)

    if (!user) {
      throw new NotFoundException()
    }

    return user
  }

  @Post()
  public async create(@Body() data: CreateUserDto, @Response() res: Response): Promise<User> {
    return this.userService.create(data)
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.delete(id)
  }
}
