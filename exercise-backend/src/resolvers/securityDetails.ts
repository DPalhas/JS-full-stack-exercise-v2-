import {Resolver, Query, Ctx} from "type-graphql"
import {Prices} from "../entities/Prices";
import {MyContext} from "../types";

@Resolver()
export class SDResolver {
    @Query(() => [Prices])
    prices(@Ctx() ctx: MyContext): Promise<Prices[]> {
        return ctx.em.find(Prices, {})
    }
}