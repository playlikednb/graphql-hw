import { HttpException, HttpStatus } from '@nestjs/common'

export class FieldRequiredException extends HttpException {
  constructor(field: string) {
    super(`Field ${field} is required`, HttpStatus.BAD_REQUEST)
  }
}
