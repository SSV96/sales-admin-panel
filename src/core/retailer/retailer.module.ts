import { Module } from '@nestjs/common';
import { RetailerService } from './retailer.service';
import { RetailerController } from './retailer.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Retailer } from './retailer.schema';
import { WholesalerRetailer } from '../wholesaler/wholesaler.schema';

@Module({
  imports: [SequelizeModule.forFeature([Retailer, WholesalerRetailer])],
  controllers: [RetailerController],
  providers: [RetailerService],
  exports: [RetailerService],
})
export class RetailerModule {}
