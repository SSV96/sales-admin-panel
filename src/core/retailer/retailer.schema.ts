import {
  Column,
  Model,
  Table,
  BelongsToMany,
  Default,
  PrimaryKey,
  DataType,
} from 'sequelize-typescript';
import {
  Wholesaler,
  WholesalerRetailer,
} from '../wholesaler/wholesaler.schema';

@Table
export class Retailer extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  id: string;

  @Column
  name: string;

  @Column
  mobile_number: string;

  @BelongsToMany(() => Wholesaler, () => WholesalerRetailer)
  wholesalers: Wholesaler[];
}
