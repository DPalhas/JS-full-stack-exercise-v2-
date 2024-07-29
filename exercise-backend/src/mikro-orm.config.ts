import {Securities} from "./entities/Securities";
import {Prices} from "./entities/Prices";
import {MikroORM} from "@mikro-orm/core";
import {PostgreSqlDriver} from "@mikro-orm/postgresql";

const __prod = process.env.NODE_ENV === 'production';

export default {
    entities: [Securities, Prices],
    dbName: "DBExercise",
    driver: PostgreSqlDriver,
    debug: !__prod,
    password: "engine41",
    user: "postgres",
} as Parameters<typeof MikroORM.init>[0];