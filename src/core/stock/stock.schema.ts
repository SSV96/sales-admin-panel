import {
  Column,
  Model,
  Table,
  ForeignKey,
  PrimaryKey,
  Default,
  DataType,
} from 'sequelize-typescript';
import { Wholesaler } from '../wholesaler/wholesaler.schema';
import { Retailer } from '../retailer/retailer.schema';

@Table
export class Stock extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  id: string;

  @ForeignKey(() => Wholesaler)
  @Column({ type: DataType.UUID })
  wholesaler_id: string;

  @ForeignKey(() => Retailer)
  @Column({ type: DataType.UUID })
  retailer_id: string;

  @Column({ type: DataType.INTEGER })
  stock_amount: number;
}
