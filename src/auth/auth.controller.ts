import { Body, Controller, Param, ParseEnumPipe, Post } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { UserRegisterDTO } from './dto/user-register.dto';
import { User, UserRole } from 'src/users/entities/user.entity';
import { VendorRegisterDTO } from './dto/vendor-register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  async signup(@Body() userRegisterDTO: UserRegisterDTO) {
    await this.userService.createUser(userRegisterDTO);
  }

  @Post('signup/vendor')
  async signupVendor(@Body() userRegisterDTO: VendorRegisterDTO){
    await this.userService.createVendor(userRegisterDTO);
  }

  @Post('login')
  login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }
}
