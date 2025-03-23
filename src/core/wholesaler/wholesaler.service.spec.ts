import { Test, TestingModule } from '@nestjs/testing';
import { WholesalerService } from './wholesaler.service';

describe('WholesalerService', () => {
  let service: WholesalerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WholesalerService],
    }).compile();

    service = module.get<WholesalerService>(WholesalerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
