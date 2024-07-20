import {Securities} from "./entities/Securities";
import {Prices} from "./entities/Prices";
import {prod} from "./constants";

export default {
    entities: [Securities, Prices],
    dbName: "DBExercise",
    type: "postgresql",
    debug: !prod,
    password: "engine41",
    user: "postgres",
} as const;