import { Test, TestingModule } from '@nestjs/testing';
import { WomensAtelierController } from './womens_atelier.controller';

describe('WomensAtelierController', () => {
  let controller: WomensAtelierController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WomensAtelierController],
    }).compile();

    controller = module.get<WomensAtelierController>(WomensAtelierController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
