import { Injectable, NotFoundException } from '@nestjs/common';
import { Stock } from './stock.schema';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStockDto, UpdateStockDto } from './dto/stock.create.dto';
import { Sequelize } from 'sequelize-typescript';
import { WholesalerRetailer } from '../wholesaler/wholesaler.schema';
import { RetailerService } from '../retailer/retailer.service';
import { WholesalerService } from '../wholesaler/wholesaler.service';
@Injectable()
export class StockService {
  constructor(
    @InjectModel(Stock) private model: typeof Stock,
    @InjectModel(WholesalerRetailer)
    private wholesalerRetailerModel: typeof WholesalerRetailer,
    private readonly retailerService: RetailerService,
    private readonly wholesalerService: WholesalerService,
  ) {}

  async create(data: CreateStockDto): Promise<Stock> {
    // addRelationShip
    const { retailer_id, wholesaler_id } = data;
    await this.addRelationShip({ retailer_id, wholesaler_id });
    return await this.model.create({ ...data });
  }

  async findAll(): Promise<Stock[]> {
    return await this.model.findAll();
  }

  async findOne(id: string): Promise<Stock> {
    const stock = await this.model.findByPk(id);
    if (!stock) {
      throw new NotFoundException(`Stock with ID ${id} not found`);
    }
    return stock;
  }

  async update(id: string, data: UpdateStockDto): Promise<Stock> {
    const stock = await this.findOne(id);
    return await stock.update(data);
  }

  async delete(id: string): Promise<void> {
    const stock = await this.findOne(id);
    await stock.destroy();
  }

  async addRelationShip({
    retailer_id,
    wholesaler_id,
  }: {
    retailer_id: string;
    wholesaler_id: string;
  }) {
    const wholesaler = await this.wholesalerService.findOne(wholesaler_id);
    if (!wholesaler) {
      throw new NotFoundException(
        `Wholesaler with ID ${wholesaler_id} not found`,
      );
    }
    const retailer = await this.retailerService.findOne(retailer_id);

    if (!retailer) {
      throw new NotFoundException(
        `Wholesaler with ID ${retailer_id} not found`,
      );
    }

    const relationExists = await wholesaler.$has('retailers', retailer);

    if (!relationExists) {
      await wholesaler.$add('retailers', retailer);
    }
  }

  async getMonthlyTurnover() {
    console.log('TURN OVER');
    return await this.model.findAll({
      attributes: [
        'wholesaler_id',
        [
          Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('createdAt')),
          'month',
        ],
        [Sequelize.fn('SUM', Sequelize.col('stock_amount')), 'total_turnover'],
      ],
      group: ['wholesaler_id', 'month'],
      order: [
        ['wholesaler_id', 'ASC'],
        ['month', 'ASC'],
      ],
    });
  }

  async getMaxTurnover() {
    const maxTurnover = await this.model.findAll({
      attributes: [
        'wholesaler_id',
        'retailer_id',
        [Sequelize.fn('SUM', Sequelize.col('stock_amount')), 'total_turnover'],
      ],
      group: ['wholesaler_id', 'retailer_id'],
      order: [[Sequelize.col('total_turnover'), 'DESC']],
    });

    return maxTurnover;
  }
}
