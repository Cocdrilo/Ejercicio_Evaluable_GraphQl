import { OptionalId } from "mongodb";

export type vuelosModel = OptionalId<{
    origen : string,
    destino: string,
    fecha_hora : string
}>

export type vuelos = {
    id : string,
    origen : string,
    destino: string,
    fecha_hora : string
}

