import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Sales Apis')
@Controller('sales')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/wholesaler/:wholesaler_id')
  @ApiOperation({ summary: 'Get a wholesaler with their associated retailers' })
  @ApiParam({
    name: 'wholesaler_id',
    required: true,
    description: 'UUID of the wholesaler',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns wholesaler details along with retailers',
  })
  @ApiResponse({ status: 404, description: 'Wholesaler not found' })
  getWholesalerWithRetailers(@Param('wholesaler_id') wholesaler_id: string) {
    return this.appService.getWholesalerWithRetailers(wholesaler_id);
  }

  @Get('retailer/single-wholesaler')
  @ApiOperation({
    summary: 'Get retailers associated with only one wholesaler',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns retailers having exactly one wholesaler',
  })
  getRetailersWithSingleWholesaler() {
    return this.appService.getRetailersWithSingleWholesaler();
  }

  @Get('turnover')
  @ApiOperation({
    summary: 'Get total monthly turnover of each wholesaler for a year',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of monthly turnovers per wholesaler',
  })
  getMonthlyTurnover() {
    return this.appService.getMonthlyTurnover();
  }

  @Get('max-turnover')
  @ApiOperation({
    summary: 'Get maximum turnover of each wholesaler from a single retailer',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the highest turnover per wholesaler-retailer pair',
  })
  getMaxTurnover() {
    return this.appService.getMaxTurnover();
  }
}
