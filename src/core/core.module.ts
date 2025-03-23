import { Module } from '@nestjs/common';
import { RetailerModule } from './retailer/retailer.module';
import { WholesalerModule } from './wholesaler/wholesaler.module';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [RetailerModule, WholesalerModule, StockModule],
  exports: [RetailerModule, WholesalerModule, StockModule],
})
export class CoreModule {}
