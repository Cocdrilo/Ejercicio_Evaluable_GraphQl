
export const schemaDB = `#graphql
type vuelos {
    id: String!
    origen:String!
    destino:String!
    fecha_hora:String!
}

type Query{
    getFlights(origen:String,destino:String): [vuelos!]!
    getFlight(id:String!): vuelos
}

type Mutation{
    addFlight(origen:String!,destino:String!,fecha_hora:String!):vuelos!
}





`