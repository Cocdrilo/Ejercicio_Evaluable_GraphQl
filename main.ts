import {ApolloServer} from "@apollo/server"
import {startStandaloneServer} from "@apollo/server/standalone";
import {MongoClient, ObjectId} from "mongodb"
import { schemaDB } from "./schema.ts";
import { resolvers } from "./resolvers.ts";
import {vuelosModel} from "./types.ts";

const mongoUrl = Deno.env.get('mongoDB')
if(!mongoUrl){
    console.error('no url in env')
    Deno.exit(-1)
}

const client = new MongoClient (mongoUrl)
await client.connect()
const dataBase = client.db('Flight_DB')

export const vuelosCollection =  dataBase.collection<vuelosModel>('vuelos')

const server = new ApolloServer({
    typeDefs : schemaDB,
    resolvers
});

const { url } = await startStandaloneServer(server, {
    context: async () => ({ vuelosCollection }),
    listen: { port: 8000 },
});


console.log(`Server running on: ${url}`);