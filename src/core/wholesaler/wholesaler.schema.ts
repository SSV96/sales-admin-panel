import {
  Column,
  Model,
  Table,
  BelongsToMany,
  PrimaryKey,
  Default,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Retailer } from '../retailer/retailer.schema';

@Table
export class Wholesaler extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  id: string;

  @Column
  name: string;

  @Column
  mobile_number: string;

  @BelongsToMany(() => Retailer, () => WholesalerRetailer)
  retailers: Retailer[];
}

@Table
export class WholesalerRetailer extends Model {
  @PrimaryKey
  @ForeignKey(() => Wholesaler)
  @Column({ type: DataType.UUID })
  wholesaler_id: string;

  @PrimaryKey
  @ForeignKey(() => Retailer)
  @Column({ type: DataType.UUID })
  retailer_id: string;
}
