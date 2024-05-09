import { Test, TestingModule } from '@nestjs/testing';
import { WomensAtelierService } from './womens_atelier.service';

describe('WomensAtelierService', () => {
  let service: WomensAtelierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WomensAtelierService],
    }).compile();

    service = module.get<WomensAtelierService>(WomensAtelierService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
