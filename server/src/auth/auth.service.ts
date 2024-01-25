import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
    ) {}

  async validateUser(name: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByName(name)
    const isValidPass = await bcrypt.compareSync(pass, user.password)
    if (isValidPass) {
      const { password, ...result } = user;
      return result
    }
    return null
  }

  async login(user: any) {
    const payload = { name: user.name, sub: user.id };
    return {
      name: user.name,
      token: this.jwtService.sign(payload),
    };
  }
}
