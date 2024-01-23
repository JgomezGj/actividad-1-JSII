async function obtenerDatosPokemon(nombrePokemon) {
try {
    let apiUrl = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon.toLowerCase()}`;

    let respuesta = await fetch(apiUrl);

    if (!respuesta.ok) {
        throw new Error("Error al obtener datos del pokemon");
    }

    const dato = await respuesta.json();

    return (dato);
    
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

async function obtenerNombreYTipo(nombrePokemon){
    try {
        let datosPokemon = await obtenerDatosPokemon(nombrePokemon);

        if (datosPokemon.types && datosPokemon.types.length > 0) {
            const tipos = datosPokemon.types.map((tipo) => tipo.type.name);
            console.log(`Nombre pokemon: ${nombrePokemon} Tipo: ${tipos}`);
        } else {
            console.log(`El Pokémon ${nombrePokemon} no tiene información de tipo.`);
            return {nombre: datosPokemon.name, tipos: [] };
        }
    } catch (error) {
        console.error("Error al obtener el nombre y tipo del Pokemon", error);
        return null;
    }
}

async function obtenerListaPokemones() {
    try {
        const listaPokemonPro = Array.from({length: 50}, async (_, index) => {
            let numPokemon = index + 1;
            let nombrePokemon = numPokemon.toString();
            let datosPokemon = await obtenerDatosPokemon(nombrePokemon);
            return datosPokemon.name;
        });

        const listaPokemon = await Promise.all(listaPokemonPro);
        console.log("Lista de los primeros 50 Pokémon: ", listaPokemon);
    }catch (error) {
        console.error("Error al obtener la lista de pokemones", error)
    }
}

async function obtenerDatosPorNombre() {
    let nombrePokemon = "ivysaur";

    try {
        let datosPokemon = await obtenerDatosPokemon(nombrePokemon);
        console.log("Datos del pokemon: ", datosPokemon);

        await obtenerHabilidades(nombrePokemon);
        await obtenerDatosPorTipo(nombrePokemon);
        await obtenerListaPokemones();
        await obtenerNombreYTipo(nombrePokemon);
        
    

    } catch (error) {
        console.error("Error al obtener datos del pokemon");
    }
}

obtenerDatosPorNombre();
