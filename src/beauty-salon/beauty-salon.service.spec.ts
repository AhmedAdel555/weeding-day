import { Test, TestingModule } from '@nestjs/testing';
import { BeautySalonService } from './beauty-salon.service';

describe('BeautySalonService', () => {
  let service: BeautySalonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BeautySalonService],
    }).compile();

    service = module.get<BeautySalonService>(BeautySalonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
