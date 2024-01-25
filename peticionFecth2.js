//Solución punto 2.

async function obtenerDatosPokemon(id) {
    try {
        let apiUrl = `https://pokeapi.co/api/v2/evolution-chain/${id}`;
    
        let respuesta = await fetch(apiUrl);
    
        if (!respuesta.ok) {
            throw new Error("Error al obtener datos del pokemon");
        }
    
        const dato = await respuesta.json();
    
        return dato;
        
    } catch (error) {
        console.error(error);
    }
}

async function obtenerNombreYTiposEvolucion(idPokemon) {
    try {
        let datosPokemon = await obtenerDatosPokemon(idPokemon);
        

        const cadenaEvolucion = datosPokemon.chain;

        
        const { nombrePrimeraEvolucion, tipoPrimeraEvolucion } = await obtenerNombreYTipoPrimeraEvolucion(cadenaEvolucion);
        const { nombreUltimaEvolucion, tipoUltimaEvolucion } = await obtenerNombreYTipoUltimaEvolucion(cadenaEvolucion);

        console.log(`Nombre del Pokémon ${idPokemon}: ${nombrePrimeraEvolucion}`);
        console.log(`Tipo del Pokémon ${idPokemon}: ${tipoPrimeraEvolucion}`);
        console.log(`Nombre evolución del Pokémon ${idPokemon}: ${nombreUltimaEvolucion}`);
        console.log(`Tipo evolución del Pokémon ${idPokemon}: ${tipoUltimaEvolucion}`);
    
    } catch (error) {
        console.error("Error al obtener datos del Pokémon");
    }
}

async function obtenerNombreYTipoPrimeraEvolucion(cadenaEvolucion) {
    
    const nombrePrimeraEvolucion = cadenaEvolucion.species.name;
    const tipoPrimeraEvolucion = await obtenerTipoPokemon(nombrePrimeraEvolucion);

    return { nombrePrimeraEvolucion, tipoPrimeraEvolucion };
}

async function obtenerNombreYTipoUltimaEvolucion(cadenaEvolucion) {
    let ultimoPokemon = cadenaEvolucion;

    while (ultimoPokemon.evolves_to.length > 0) {
        ultimoPokemon = ultimoPokemon.evolves_to[0];
    }

    const nombreUltimaEvolucion = ultimoPokemon.species.name;
    const tipoUltimaEvolucion = await obtenerTipoPokemon(nombreUltimaEvolucion);

    return { nombreUltimaEvolucion, tipoUltimaEvolucion };
}

async function obtenerTipoPokemon(nombrePokemon) {
    try {
        let apiUrl = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon.toLowerCase()}`;
        let respuesta = await fetch(apiUrl);

        if (!respuesta.ok) {
            throw new Error("Error al obtener datos del pokemon");
        }

        const dato = await respuesta.json();

        const tipos = dato.types.map((tipo) => tipo.type.name);
        return tipos.join(', ');

    } catch (error) {
        console.error(error);
    }
}

async function obtenerDatosPorNombre() {
    let idPokemon = 10;
    
    try {
        await obtenerNombreYTiposEvolucion(idPokemon);
    
    } catch (error) {
        console.error("Error al obtener datos del Pokémon");
    }
}

obtenerDatosPorNombre();
