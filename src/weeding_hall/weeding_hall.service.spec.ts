import { Test, TestingModule } from '@nestjs/testing';
import { WeedingHallService } from './weeding_hall.service';

describe('WeedingHallService', () => {
  let service: WeedingHallService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeedingHallService],
    }).compile();

    service = module.get<WeedingHallService>(WeedingHallService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
