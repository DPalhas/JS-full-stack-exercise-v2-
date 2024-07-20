import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Securities } from "./Securities";

@Entity()
export class Prices {
  @PrimaryKey()
  id!: number;

  @Property()
  date!: string;

  @Property()
  close!: string;

  @Property()
  volume!: string;
}