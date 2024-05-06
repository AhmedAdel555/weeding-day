import { Body, Controller, Param, Post } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { LoginResponseDTO } from './dto/login-response.dto';
import { UserRole } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup/:role')
  async signup(@Body() userRegisterDTO: UserRegisterDto , @Param('role') role: UserRole): Promise<void> {
    await this.userService.createUser(userRegisterDTO, role);
  }

  @Post('login')
  login(@Body() loginDTO: LoginDTO): Promise<LoginResponseDTO> {
    return this.authService.login(loginDTO);
  }
}
