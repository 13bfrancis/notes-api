import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { hash, compare } from 'bcrypt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private prisma: PrismaService,
  ) {}

  async createUser(username: string, password: string): Promise<User> {
    const userExists = !!(await this.prisma.user.count({
      where: { username },
    }));

    if (userExists) throw new Error('User Already Exists');

    const hashedPass = await hash(password, 12);

    return await this.userService.createUser({
      username,
      password: hashedPass,
    });
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getUser({ username });

    if (!user) throw new Error('User not found');

    if (user) {
      const validPassword = await compare(password, user.password);

      if (!validPassword) throw new Error('Invalid Password');

      return {
        username: user.username,
      };
    }
  }
}
