import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDTO, OrderDTO } from './dto/create-order.dto';
import { User } from 'src/users/entities/user.entity';
import { WeedingHall } from 'src/weeding_hall/entities/weeding-hall.entity';
import { Barber } from 'src/barber/entities/barber.entity';
import { BeautySalon } from 'src/beauty-salon/entities/beauty-salon.entity';
import { MansSuit } from 'src/mans_suit/entities/mans-suit.entity';
import { WomensAtelier } from 'src/womens_atelier/entities/womens-atelier.entity';

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(WeedingHall)
    private weedingHallRepository: Repository<WeedingHall>,
    @InjectRepository(Barber)
    private barberRepository: Repository<Barber>,
    @InjectRepository(BeautySalon)
    private beautySalonRepository: Repository<BeautySalon>,
    @InjectRepository(MansSuit)
    private manSuitRepository: Repository<MansSuit>,
    @InjectRepository(WomensAtelier)
    private womanAtelierRepository: Repository<WomensAtelier>,
  ){}

  async createOrder(createOrder:CreateOrderDTO, userId: number){

    const currentUser = await this.userRepository.findOneBy({id: userId});

    createOrder.orders.forEach(async (order) => {
      const newOrder = new Order()
      newOrder.price = order.price;
      newOrder.date = order.date;
      newOrder.service_name = order.serviceName;
      newOrder.user = currentUser;
      await this.saveBusinessOrder(newOrder, order);
      await this.orderRepository.save(newOrder);
    })

  }

  async saveBusinessOrder(order: Order, orderDTO: OrderDTO){
    if(orderDTO.weedingHallId){
       order.weeding_hall = await this.weedingHallRepository.findOneBy({id: orderDTO.weedingHallId});
    }
    else if(orderDTO.barberId){
      order.barber = await this.barberRepository.findOneBy({id: orderDTO.barberId});
    }
    else if(orderDTO.beautySalonId){
      order.beauty_salon = await this.beautySalonRepository.findOneBy({id: orderDTO.beautySalonId});
    }
    else if(orderDTO.manSuitId){
      order.man_suit = await this.manSuitRepository.findOneBy({id: orderDTO.manSuitId});
    }
    else if(orderDTO.womenAtelierId){
      order.women_atelier = await this.womanAtelierRepository.findOneBy({id: orderDTO.womenAtelierId});
    }
  }

  async findUserOrdersHistory(userId: number){
    return this.orderRepository.find({
      where: { user: { id: userId } },
      relations: ['user']
    });
  }
  
  async getOrdersByBarberId(barberId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { barber: { id: barberId } },
      relations: ['barber', 'user'],
    });
  }

  async getOrdersByBeautySalonId(beautySalonId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { beauty_salon: { id: beautySalonId } },
      relations: ['beauty_salon', 'user'],
    });
  }

  async getOrdersByWeedingHallId(weedingHallId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { weeding_hall: { id: weedingHallId } },
      relations: ['weeding_hall', 'user'],
    });
  }

  async getOrdersByMansSuitId(manSuitId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { man_suit: { id: manSuitId } },
      relations: ['man_suit', 'user'],
    });
  }

  async getOrdersByWomensAtelierId(womensAtelierId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { women_atelier: { id: womensAtelierId } },
      relations: ['women_atelier', 'user'],
    });
  }
}
