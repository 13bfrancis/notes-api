import { Body, Controller, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/new')
  async createUser(@Body() body: Prisma.UserCreateInput): Promise<{
    username: string;
  }> {
    const user = await this.authService.createUser(
      body.username,
      body.password,
    );

    return {
      username: user.username,
    };
  }
}
