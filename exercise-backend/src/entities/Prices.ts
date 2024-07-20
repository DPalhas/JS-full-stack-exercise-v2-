import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Securities } from "./Securities.ts";

@Entity()
export class Prices {
  @PrimaryKey()
  id: number;

  @Property()
  date: string;

  @Property({ type: 'numeric', precision: 10, scale: 4 })
  close: number;

  @Property({ type: 'numeric' })
  volume: number;

  @ManyToOne(() => Securities, securities => securities.prices)
  security: Securities;
}