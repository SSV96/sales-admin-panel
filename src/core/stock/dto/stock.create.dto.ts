import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateStockDto {
  @ApiProperty({
    required: true,

    description: 'Stock name',
  })
  name: string;

  @ApiProperty({
    required: true,

    description: 'Id of the Wholesaler',
  })
  wholesaler_id: string;

  @ApiProperty({
    required: true,

    description: 'Id of the Retailer',
  })
  retailer_id: string;

  @ApiProperty({
    required: true,

    description: 'Stock Quantity',
  })
  stock_amount: number;
}

export class UpdateStockDto extends PartialType(CreateStockDto) {}
