import { Module } from '@nestjs/common';
import { WholesalerService } from './wholesaler.service';
import { WholesalerController } from './wholesaler.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Wholesaler, WholesalerRetailer } from './wholesaler.schema';

@Module({
  imports: [SequelizeModule.forFeature([Wholesaler, WholesalerRetailer])],
  controllers: [WholesalerController],
  providers: [WholesalerService],
  exports: [WholesalerService],
})
export class WholesalerModule {}
