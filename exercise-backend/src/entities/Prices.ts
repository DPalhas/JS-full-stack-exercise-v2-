import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Securities } from "./Securities";
import {Field, Int, ObjectType} from "type-graphql";

@ObjectType()
@Entity()
export class Prices {

  @Field()
  @PrimaryKey()
  id!: number;

  @Field()
  @Property()
  ticker!: string;

  @Field()
  @Property()
  date!: string;

  @Field()
  @Property({ type: 'numeric', precision: 10, scale: 4 })
  close!: number;

  @Field()
  @Property({ type: 'numeric', precision: 10, scale: 4 })
  volume!: number;
}