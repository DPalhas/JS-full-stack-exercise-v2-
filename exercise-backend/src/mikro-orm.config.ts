import {Securities} from "./entities/Securities";
import {Prices} from "./entities/Prices";
import {__prod} from "./constants";
import {MikroORM} from "@mikro-orm/core";
import path from 'path';
import {PostgreSqlDriver} from "@mikro-orm/postgresql";

export default {
    migrations: {
        path: path.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [Securities, Prices],
    dbName: "DBExercise",
    driver: PostgreSqlDriver,
    debug: !__prod,
    password: "engine41",
    user: "postgres",
} as Parameters<typeof MikroORM.init>[0];