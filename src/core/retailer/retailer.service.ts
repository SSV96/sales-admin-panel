import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Retailer } from './retailer.schema';
import {
  CreateRetailerDto,
  UpdateRetailerDto,
} from './dto/retailer.create.dto';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';

@Injectable()
export class RetailerService {
  constructor(
    @InjectModel(Retailer) private model: typeof Retailer,
    private sequelize: Sequelize,
  ) {}

  async create(data: CreateRetailerDto): Promise<Retailer> {
    const existingRetailer = await this.model.findOne({
      where: { name: data.name },
    });
    if (existingRetailer) {
      throw new Error('Retailer with this name already exists');
    }
    return await this.model.create({ ...data });
  }

  async findAll(): Promise<Retailer[]> {
    return await this.model.findAll();
  }

  async findOne(id: string): Promise<Retailer> {
    const retailer = await this.model.findByPk(id);
    if (!retailer) {
      throw new NotFoundException(`Retailer with ID ${id} not found`);
    }
    return retailer;
  }

  async update(id: string, data: UpdateRetailerDto): Promise<Retailer> {
    const retailer = await this.findOne(id);
    return await retailer.update(data);
  }

  async delete(id: string): Promise<void> {
    const retailer = await this.findOne(id);
    await retailer.destroy();
  }
  //
  async getRetailersWithSingleWholesaler() {
    return this.sequelize.query(
      `SELECT r.* 
       FROM "Retailers" r
       JOIN "WholesalerRetailers" wr ON r.id = wr.retailer_id
       GROUP BY r.id
       HAVING COUNT(wr.wholesaler_id) = 1;`,
      { type: QueryTypes.SELECT },
    );
  }
}
