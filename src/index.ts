import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core"
import { __prod__ } from "./constants";
import microConfig from './mikro-orm.config';
import express from 'express';
import {ApolloServer} from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import {buildSchema} from 'type-graphql'
import { HelloResolver } from "./resolvers/hello";
import { UserResolver } from "./resolvers/user";

const main = async () => {
    const orm = await MikroORM.init(microConfig);
    orm.getMigrator().up();



    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, UserResolver],
            validate: false,
            
        }),
        context: () => ({em: orm.em}),
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground(),
          ],
    });

    await apolloServer.start();

    const app = express();

    apolloServer.applyMiddleware({app});

    app.listen(4000, () => {
        console.log('server started on localhost:4000')
    })

};

main().catch(err => console.log(err));
