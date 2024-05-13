import { Body, Controller, Param, ParseEnumPipe, Post } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { UserRegisterDTO } from './dto/user-register.dto';
import { LoginResponseDTO } from './dto/login-response.dto';
import { User, UserRole } from 'src/users/entities/user.entity';
import { VendorRegisterDTO } from './dto/vendor-register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  async signup(@Body() userRegisterDTO: UserRegisterDTO): Promise<void> {
    await this.userService.createUser(userRegisterDTO);
  }

  @Post('signup/vendor')
  async signupVendor(@Body() userRegisterDTO: VendorRegisterDTO): Promise<void> {
    await this.userService.createVendor(userRegisterDTO);
  }

  @Post('login')
  login(@Body() loginDTO: LoginDTO): Promise<LoginResponseDTO> {
    return this.authService.login(loginDTO);
  }
}
