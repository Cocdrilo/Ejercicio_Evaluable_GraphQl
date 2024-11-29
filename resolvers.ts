import { vuelosCollection } from "./main.ts";
import {vuelos, vuelosModel} from "./types.ts";
import { Collection, ObjectId } from "mongodb";
import {fromModelToUser} from "./utils.ts";
export const resolvers = {
    Query:{
        getFlights: async (_:unknown,args:{destino?:string,origen?:string},context:{vuelosCollection: Collection<vuelosModel>},):Promise<vuelos[]> =>{
            const vuelosModel = await vuelosCollection.find(args).toArray()
            return vuelosModel.map(fromModelToUser)
        },
        getFlight: async(_:unknown,args:{id:string},context:{vuelosCollection: Collection<vuelosModel>},):Promise<vuelos|null> => {
            const vueloModel = await vuelosCollection.findOne({_id:new ObjectId(args.id)})
            if(!vueloModel){
                return null
            }
            else{
                return fromModelToUser(vueloModel);
            }
        }
    },
    Mutation:{
        addFlight: async(_:unknown,args:{origen:string,destino:string,fecha_hora:string},context:{vuelosCollection: Collection<vuelosModel>},):Promise<vuelos> =>{
            const vuelo:vuelosModel = {
                origen: args.origen,
                destino: args.destino,
                fecha_hora:args.fecha_hora
            }

            const vueloAñadir = await vuelosCollection.insertOne(vuelo)

            return {
                id : vuelo._id?.toString()!,
                origen:vuelo.origen,
                destino:vuelo.destino,
                fecha_hora:vuelo.fecha_hora
            }
        }
    }
}