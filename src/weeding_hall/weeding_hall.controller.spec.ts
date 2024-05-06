import { Test, TestingModule } from '@nestjs/testing';
import { WeedingHallController } from './weeding_hall.controller';

describe('WeedingHallController', () => {
  let controller: WeedingHallController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeedingHallController],
    }).compile();

    controller = module.get<WeedingHallController>(WeedingHallController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
