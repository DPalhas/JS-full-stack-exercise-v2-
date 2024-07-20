import { MikroORM } from "@mikro-orm/core";
import { prod } from "./constants.ts";
import {Securities} from "./entities/Securities";
import {Prices} from "./entities/Prices";
import microConfig from "./mikro-orm.config";

const main = async () => {
    const orm = await MikroORM.init(microConfig);
    const post = orm.em.create(Securities,{ title:'securities'});
};

main().catch((err) => {
    console.error(err);
});
