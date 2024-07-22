import {Collection, Entity, OneToMany, PrimaryKey, Property} from '@mikro-orm/core';
import {Prices} from "./Prices";
import {Field, ObjectType} from "type-graphql";

@ObjectType()
@Entity()
export class Securities {
  @Field()
  @PrimaryKey()
  ticker!: string;

  @Field()
  @Property()
  securityname!: string;

  @Field()
  @Property()
  sector!: string;

  @Field()
  @Property()
  country!: string;

  @Field()
  @Property({ type: 'numeric', precision: 10, scale: 4 })
  trend!: number;
}

