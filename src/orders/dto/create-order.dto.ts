import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateOrderDTO{
  @IsNotEmpty()
  orders: OrderDTO[]
}

export class OrderDTO {
  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsNumber()
  price: number

  @IsString()
  @IsNotEmpty()
  serviceName: string

  @IsNumber()
  @IsOptional()
  weedingHallId?: number;

  @IsNumber()
  @IsOptional()
  barberId?: number;

  @IsNumber()
  @IsOptional()
  beautySalonId?: number;

  @IsNumber()
  @IsOptional()
  manSuitId?: number;

  @IsNumber()
  @IsOptional()
  womenAtelierId?: number;

  @IsString()
  @IsNotEmpty()
  cardNumber: string;  
  
  @Type(() => Date)
  @IsDate()
  cardDate: string;  
  
  @IsString()
  @IsNotEmpty()  
  cardCVV: string;  
  
  @IsString()
  @IsNotEmpty()
  cardName: string;
}