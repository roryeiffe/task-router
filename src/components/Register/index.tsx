import axios from "axios";
import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";

interface IPokemon {
  id: number;
  name: string;
  sprites: Sprites;
}

interface Sprites {
  front_default: string;
  back_default: string;
}

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    starterId: 1,
  });

  // list of all start pokemon:
  const [pokemon, setPokemon] = useState<any>([]);

  useEffect(() => {
    console.log("useEffect");
    // mapping of region to starterId's:
    const generations: any = {
      kanto: [1, 4, 7],
      johto: [152, 155, 158],
      hoenn: [252, 255, 258],
      sinnoh: [387, 390, 393],
      unova: [495, 498, 501],
      kalos: [650, 653, 656],
      alola: [722, 725, 728],
      galar: [810, 813, 816],
    };

    var pokemonTemp: any = [];
    // iterate through each region and get the pokemon:
    for (const region in generations) {
      // get the pokemon for each region:
      for (let i = 0; i < generations[region].length; i++) {
        var pokemonId: number = generations[region][i];
        axios
          .get("https://pokeapi.co/api/v2/pokemon/" + pokemonId + "/")
          .then((res) => {
            // add the pokemon to the list:
            pokemonTemp.push(res.data);
          });
      }
    }
    setPokemon(pokemonTemp);
  
  },[]);

  // update the state when input changes
  function onChangeHandler(event: any) {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  }

  // submit the form:
  function onSubmitHandler(event: any) {
    event.preventDefault();
  }

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label htmlFor="">First Name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            value={user.name}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Email</label>
          <input
            className="form-control"
            type="email"
            name="email"
            value={user.email}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            value={user.password}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Mobile</label>
          <input
            className="form-control"
            type="phone"
            name="mobile"
            value={user.mobile}
            onChange={onChangeHandler}
            required
          />
        </div>

        {console.log(pokemon.length)}
        {console.log(pokemon)}

        <div className="row">
          <h1>Choose your starter pokemon:</h1>
          {pokemon.map((pokemon:IPokemon) => (
            // <div>
            //   <h1>pokemon</h1>
            //   <PokemonCard pokemon={pokemon} />
            // </div>
            <h1>{pokemon.name}</h1>
          ))}
          <h1>End</h1>
        </div>

        <input type="submit" value="Register" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default Register;
