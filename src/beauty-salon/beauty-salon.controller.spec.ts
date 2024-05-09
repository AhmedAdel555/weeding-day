import { Test, TestingModule } from '@nestjs/testing';
import { BeautySalonController } from './beauty-salon.controller';

describe('BeautySalonController', () => {
  let controller: BeautySalonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeautySalonController],
    }).compile();

    controller = module.get<BeautySalonController>(BeautySalonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
