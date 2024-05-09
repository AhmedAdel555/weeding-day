import { Test, TestingModule } from '@nestjs/testing';
import { MansSuitController } from './mans_suit.controller';

describe('MansSuitController', () => {
  let controller: MansSuitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MansSuitController],
    }).compile();

    controller = module.get<MansSuitController>(MansSuitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
