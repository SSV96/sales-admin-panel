import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateWholesalerDto {
  @ApiProperty({
    required: true,

    description: 'Wholesaler name',
  })
  name: string;

  @ApiProperty({
    required: true,

    description: 'Mobile number',
  })
  mobile_number: string;
}

export class UpdateWholesalerDto extends PartialType(CreateWholesalerDto) {}
