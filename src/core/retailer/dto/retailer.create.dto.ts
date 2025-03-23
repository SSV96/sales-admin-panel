import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateRetailerDto {
  @ApiProperty({
    required: true,

    description: 'Retailer name',
  })
  name: string;

  @ApiProperty({
    required: true,

    description: 'Mobile number',
  })
  mobile_number: string;
}

export class UpdateRetailerDto extends PartialType(CreateRetailerDto) {}
