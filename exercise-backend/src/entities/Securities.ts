import { Entity, PrimaryKey, Property} from '@mikro-orm/core';

@Entity()
export class Securities {
  @PrimaryKey()
  ticker: string;

  @Property()
  securityName: string;

  @Property()
  sector: string;

  @Property()
  country: string;

  @Property({ type: 'numeric', precision: 10, scale: 4 })
  trend: number;
}
