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
import { WholesalerService } from './wholesaler.service';
import {
  CreateWholesalerDto,
  UpdateWholesalerDto,
} from './dto/wholesaler.create.dto';

@Controller('wholesaler')
export class WholesalerController {
  constructor(private readonly wholesalerService: WholesalerService) {}
  @Post()
  async create(@Body() dto: CreateWholesalerDto) {
    return await this.wholesalerService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.wholesalerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.wholesalerService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateWholesalerDto,
  ) {
    return await this.wholesalerService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.wholesalerService.delete(id);
    return { message: `Wholesaler with ID ${id} deleted successfully` };
  }
}
