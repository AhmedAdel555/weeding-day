import { Test, TestingModule } from '@nestjs/testing';
import { MansSuitService } from './mans_suit.service';

describe('MansSuitService', () => {
  let service: MansSuitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MansSuitService],
    }).compile();

    service = module.get<MansSuitService>(MansSuitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
