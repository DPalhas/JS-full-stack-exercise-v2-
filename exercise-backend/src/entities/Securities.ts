import {Collection, Entity, OneToMany, PrimaryKey, Property} from '@mikro-orm/core';
import {Prices} from "./Prices";

@Entity()
export class Securities {
  @PrimaryKey()
  ticker!: string;

  @Property()
  securityName!: string;

  @Property()
  sector!: string;

  @Property()
  country!: string;

  @Property({ type: 'numeric', precision: 10, scale: 4 })
  trend!: number;
}

