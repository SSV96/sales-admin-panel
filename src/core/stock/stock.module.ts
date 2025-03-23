import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Stock } from './stock.schema';
import { WholesalerRetailer } from '../wholesaler/wholesaler.schema';
import { RetailerModule } from '../retailer/retailer.module';
import { WholesalerModule } from '../wholesaler/wholesaler.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Stock, WholesalerRetailer]),
    RetailerModule,
    WholesalerModule,
  ],
  controllers: [StockController],
  providers: [StockService],
  exports: [StockService],
})
export class StockModule {}
