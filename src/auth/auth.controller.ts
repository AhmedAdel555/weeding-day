import { Body, Controller, Param, ParseEnumPipe, Post } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { LoginResponseDTO } from './dto/login-response.dto';
import { User, UserRole } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  async signup(@Body() userRegisterDTO: UserRegisterDto): Promise<void> {
    await this.userService.createUser(userRegisterDTO, UserRole.USER);
  }

  @Post('signup/vendor')
  async signupVendor(@Body() userRegisterDTO: UserRegisterDto): Promise<void> {
    await this.userService.createUser(userRegisterDTO, UserRole.VENDOR);
  }

  @Post('login')
  login(@Body() loginDTO: LoginDTO): Promise<LoginResponseDTO> {
    return this.authService.login(loginDTO);
  }
}
