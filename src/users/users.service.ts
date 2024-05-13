import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRegisterDTO } from 'src/auth/dto/user-register.dto';
import { UserResponseDTO } from './dto/user-response.sto';
import { VendorRegisterDTO } from 'src/auth/dto/vendor-register.dto';
import { BusinessCategory } from 'src/business/entities-abstraction/business-category.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(BusinessCategory)
    private businesscategoryRepository: Repository<BusinessCategory>,
  ) {}

  async createUser(userRegisterDTO: UserRegisterDTO): Promise<User>{

    const userExist = await this.usersRepository.findOneBy({ email: userRegisterDTO.email });
    if(userExist){
      throw new BadRequestException("Email is already exist")
    }

    const salt = await bcrypt.genSalt();
    userRegisterDTO.password = await bcrypt.hash(userRegisterDTO.password, salt);

    const newUser = new User();
    newUser.email = userRegisterDTO.email;
    newUser.password = userRegisterDTO.password;
    newUser.username = userRegisterDTO.username;
    newUser.phone_number = userRegisterDTO.phoneNumber;
    newUser.role = UserRole.USER;

    return await this.usersRepository.save(newUser);

  }

  async createVendor(userRegisterDTO: VendorRegisterDTO){
    const userExist = await this.usersRepository.findOneBy({ email: userRegisterDTO.email });
    if(userExist){
      throw new BadRequestException("Email is already exist")
    }

    const salt = await bcrypt.genSalt();
    userRegisterDTO.password = await bcrypt.hash(userRegisterDTO.password, salt);

    const newUser = new User();
    newUser.email = userRegisterDTO.email;
    newUser.password = userRegisterDTO.password;
    newUser.username = userRegisterDTO.username;
    newUser.phone_number = userRegisterDTO.phoneNumber;
    newUser.role = UserRole.VENDOR;

    const businessCategory = await this.businesscategoryRepository.findOneBy({id: userRegisterDTO.categoryId});
    newUser.business_category = businessCategory;

    return await this.usersRepository.save(newUser);
  }


  async findAll(){
    const users = await this.usersRepository.find();
    return users;
  }

  async findById(id: number): Promise<UserResponseDTO> {
    const user = await this.usersRepository.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  } 

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email: email });
    if (!user) {
      throw new NotFoundException('email not found');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponseDTO>
  {
    const existUser = await this.usersRepository.findOneBy({ id: id });
    existUser.username = updateUserDto.username;
    existUser.email = updateUserDto.email;
    existUser.phone_number = updateUserDto.phoneNumber;
    const updateduser = await this.usersRepository.save(existUser);
    return updateduser;
  }

  async remove(id: number): Promise<void>
  {
    await this.usersRepository.delete(id);
  }
}
