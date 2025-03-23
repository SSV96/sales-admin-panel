import { Test, TestingModule } from '@nestjs/testing';
import { WholesalerController } from './wholesaler.controller';
import { WholesalerService } from './wholesaler.service';

describe('WholesalerController', () => {
  let controller: WholesalerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WholesalerController],
      providers: [WholesalerService],
    }).compile();

    controller = module.get<WholesalerController>(WholesalerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
