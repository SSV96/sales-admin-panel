import { Injectable } from '@nestjs/common';
import { RetailerService } from './core/retailer/retailer.service';
import { WholesalerService } from './core/wholesaler/wholesaler.service';
import { StockService } from './core/stock/stock.service';

@Injectable()
export class AppService {
  constructor(
    private readonly retailerService: RetailerService,
    private readonly wholeSalerService: WholesalerService,
    private readonly stockService: StockService,
  ) {}
  getWholesalerWithRetailers(wholesaler_id: string) {
    return this.wholeSalerService.getWholesalerWithRetailers(wholesaler_id);
  }
  getRetailersWithSingleWholesaler() {
    return this.retailerService.getRetailersWithSingleWholesaler();
  }

  getMonthlyTurnover() {
    return this.stockService.getMonthlyTurnover();
  }

  getMaxTurnover() {
    return this.stockService.getMaxTurnover();
  }
}
