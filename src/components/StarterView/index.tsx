import { useSelector } from "react-redux";
import {PokemonClient} from 'pokenode-ts';
import {useEffect, useState} from 'react';
import PokemonCard from '../PokemonCard';

const StarterView = () => {
    // first, get starter id from redux store:
    const user = useSelector((state:any) => state.user);

    // set pokemon state:
    const [pokemon, setPokemon] = useState<any>({});

    // then, get the pokemon data from the api:
    useEffect(() => {
        const api = new PokemonClient();
        api.getPokemonById(user.starterId).then((pokemon:any) => {
            setPokemon(pokemon);
        });
    }, [user.starterId]);

  if (pokemon.sprites) return (
    <div className = "wrapper">
        <PokemonCard pokemon={pokemon} showLevel />
    </div>
  );
  else return (
      <div>
          <h1>Loading...</h1>
      </div>
  )
};

export default StarterView;
