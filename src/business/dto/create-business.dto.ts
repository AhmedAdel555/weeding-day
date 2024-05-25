import { IsNotEmpty, IsOptional, IsString, Length, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator"


@ValidatorConstraint({ name: 'isValidBusinessNumber', async: false })
export class IsValidBusinessNumber implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    // Ensure each number is a string of length 10 and consists only of digits
    return Array.isArray(value) && value.every(num => typeof num === 'string' && /^\d{11}$/.test(num));
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be an array of 11-digit`;
  }
}

export class CreateBusinessDTO {
  @IsString()
  @IsNotEmpty()
  businessName: string

  @IsString()
  @IsNotEmpty()
  description: string 

  @IsString()
  @IsOptional()
  facebookUrl?: string

  @IsString()
  @IsOptional()
  instagramUrl?: string

  @IsNotEmpty()
  @Length(5)
  zibCode: number

  @IsString()
  @IsNotEmpty()
  city: string

  @IsString()
  @IsNotEmpty()
  street: string

  @IsString({ each: true })
  @IsNotEmpty()
  @Validate(IsValidBusinessNumber)
  businessNumbers: string[]
}