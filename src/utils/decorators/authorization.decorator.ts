import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const Authorization = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest()

  // req.params
  // req.query
  const token = req.headers.authorization || null
  return token
})
