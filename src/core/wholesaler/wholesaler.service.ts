import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Wholesaler } from './wholesaler.schema';
import {
  CreateWholesalerDto,
  UpdateWholesalerDto,
} from './dto/wholesaler.create.dto';
import { Sequelize } from 'sequelize-typescript';
import { Retailer } from '../retailer/retailer.schema';
@Injectable()
export class WholesalerService {
  constructor(
    @InjectModel(Wholesaler) private model: typeof Wholesaler,
    private sequelize: Sequelize,
  ) {}

  async create(data: CreateWholesalerDto): Promise<Wholesaler> {
    const existingWholesaler = await this.model.findOne({
      where: { name: data.name },
    });
    if (existingWholesaler) {
      throw new Error('Wholesaler with this name already exists');
    }
    return await this.model.create({ ...data });
  }

  async findAll(): Promise<Wholesaler[]> {
    return await this.model.findAll();
  }

  async findOne(id: string): Promise<Wholesaler> {
    const wholesaler = await this.model.findByPk(id);
    if (!wholesaler) {
      throw new NotFoundException(`Wholesaler with ID ${id} not found`);
    }
    return wholesaler;
  }

  async update(id: string, data: UpdateWholesalerDto): Promise<Wholesaler> {
    const wholesaler = await this.findOne(id);
    return await wholesaler.update(data);
  }

  async delete(id: string): Promise<void> {
    const wholesaler = await this.findOne(id);
    await wholesaler.destroy();
  }

  async getWholesalerWithRetailers(id: string) {
    return this.model.findOne({
      where: { id },
      include: [
        {
          model: Retailer,
          through: { attributes: [] },
        },
      ],
    });
  }
}
