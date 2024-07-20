import {Resolver, Query, Ctx} from "type-graphql"
import {Securities} from "../entities/Securities";
import {MyContext} from "../types";

@Resolver()
export class SLResolver {
    @Query(() => [Securities])
    securities(@Ctx() ctx: MyContext): Promise<Securities[]> {
        return ctx.em.find(Securities, {})
    }
}