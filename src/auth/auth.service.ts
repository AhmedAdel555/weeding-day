import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { LoginResponseDTO } from './dto/login-response.dto';


@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDTO: LoginDTO): Promise<LoginResponseDTO> {

    const user = await this.userService.findByEmail(loginDTO.email);

    const passwordMatched = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );

    if (passwordMatched) {
      const payload = { email: user.email, sub: user.id , role: user.role};
      return {
        user: user,
        accessToken: this.jwtService.sign(payload),
      }
    } else {
      throw new BadRequestException('Incorrect Password');
    }
  }
}
