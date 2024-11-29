import {vuelos, vuelosModel} from "./types.ts";

export const  fromModelToUser = (vuelosModel:vuelosModel):vuelos => {

    return{
        destino: vuelosModel.destino,
        fecha_hora: vuelosModel.fecha_hora,
        id: vuelosModel._id?.toString()!,
        origen: vuelosModel.origen
    }
}

