import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { RetailerService } from './retailer.service';
import {
  CreateRetailerDto,
  UpdateRetailerDto,
} from './dto/retailer.create.dto';

@Controller('retailer')
export class RetailerController {
  constructor(private readonly retailerService: RetailerService) {}

  @Post()
  async create(@Body() dto: CreateRetailerDto) {
    return await this.retailerService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.retailerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.retailerService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateRetailerDto,
  ) {
    return await this.retailerService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.retailerService.delete(id);
    return { message: `Retailer with ID ${id} deleted successfully` };
  }
}
