import { MikroORM } from "@mikro-orm/core";
import {Securities} from "./entities/Securities";
import {Prices} from "./entities/Prices";
import microConfig from "./mikro-orm.config";
import express,{Application} from "express";
import {ApolloServer} from "apollo-server-express";
import {buildSchema} from "type-graphql";
import {validate} from "graphql/validation";
import {HelloResolver} from "./resolvers/hello";
import "reflect-metadata";

const main = async () => {
    const orm = await MikroORM.init(microConfig);
    const em = orm.em.fork();
    //const secur = await em.find(Securities, {});
    //const prices = await em.find(Prices, {});
    //console.log(secur);
    //console.log(prices);
    const app: Application = express();
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver],
            validate: false
        })
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log("Server is running on port 4000.");
    });

};

main().catch((err) => {
    console.error(err);
});
