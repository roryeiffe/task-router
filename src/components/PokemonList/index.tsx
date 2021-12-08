import axios from "axios";
import React, { useState, useEffect } from "react";
import { PokemonClient } from "pokenode-ts";
import { IPokemon } from "../../interfaces/Pokemon";

// this file is more of a reference than a real component. Just trying
// to see if we can render all of the pokemon from the api on a single page
const PokemonList = () => {
    // store list of all pokemon:
  const [pokemon, setPokemon] = useState<IPokemon[]>([]);

  useEffect(() => {
      // how many pokemon are we getting from the database?
    const pokemonLimit = 151;

    // get the api from the pokemon client:
    const api = new PokemonClient();
    // loop through all ids up to the limit that we defined:
    for (var i = 1; i < pokemonLimit; i++) {
      api.getPokemonById(i).then((pokemon_: any) => {
        // use the spread operator to continually add pokemon to the list
        setPokemon(pokemon => [...pokemon, pokemon_])
      });
    }
  }, []);

  return (
    <div>
        Test Pokemon
        {/* map all pokemon to display on the page: */}
      {pokemon.map((pokemon_: IPokemon) => (
        <div>{pokemon_.name}</div>
      ))}
    </div>
  );
};

export default PokemonList;
