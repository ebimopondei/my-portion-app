import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ParsedToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.parsedToken;
  },
);