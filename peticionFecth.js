async function obtenerDatosPokemon(nombrePokemon) {
try {
    let apiUrl = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon.toLowerCase()}`;

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

async function obtenerHabilidades(nombrePokemon) {
    try {
        let datosPokemon = await obtenerDatosPokemon(nombrePokemon);

        const habilidades = datosPokemon.abilities.map((ability) => ability.ability.name);
        console.log(`Habilidades de ${nombrePokemon}: `, habilidades);
    } catch (error) {
        console.error("Error al obtener habilidades del pokemon" ,error);
    }
}

async function obtenerDatosPorTipo(nombrePokemon) {
    try {
    let datosPokemon = await obtenerDatosPokemon(nombrePokemon);

    if (datosPokemon.types && datosPokemon.types.length > 0) {
    const tipos = datosPokemon.types.map((tipo) => tipo.type.name);
    console.log(`Tipos de ${nombrePokemon}: `, tipos);
    } else {
        console.log(`El Pokémon ${nombrePokemon} no tiene información de tipo.`);
    }
    } catch (error) {
        console.error("Error al obtener el tipo del pokemon", error);
    }
}

async function obtenerDatosPorNombre() {
    let nombrePokemon = "pikachu";

    try {
        let datosPokemon = await obtenerDatosPokemon(nombrePokemon);
        console.log("Datos del pokemon: ", datosPokemon);

        await obtenerHabilidades(nombrePokemon);
        await obtenerDatosPorTipo(nombrePokemon);

    } catch (error) {
        console.error("Error al obtener datos del pokemon");
    }
}

obtenerDatosPorNombre();
