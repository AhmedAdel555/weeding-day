import { IsString, IsEmail, MinLength, IsNotEmpty, Validate } from 'class-validator';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'IsPasswordEqualTo', async: false })
export class IsPasswordEqualTo implements ValidatorConstraintInterface {
  validate(confirmPassword: string, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const password = (args.object as any)[relatedPropertyName];
    return password === confirmPassword; // Password matches confirmPassword
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    return `${relatedPropertyName} and confirmPassword should match`;
  }
}

export class UserRegisterDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()  
  password: string;

  @IsString()
  @IsNotEmpty()
  @Validate(IsPasswordEqualTo, ['password'])
  confirmPassword: string

  @IsString()
  @IsNotEmpty()
  @MinLength(11)
  phoneNumber: string;

}


