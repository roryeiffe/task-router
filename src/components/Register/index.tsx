import axios from "axios";
import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import {PokemonClient} from 'pokenode-ts';

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

  const defaultPokemon = {
    name: ''
  }

  // represents which region we want to display:
  const [region, setRegion] = useState("kanto");
  // each region will only display 3 pokemon:
  const [pokemon1, setPokemon1] = useState<any>(defaultPokemon)
  const [pokemon2, setPokemon2] = useState<any>(defaultPokemon)
  const [pokemon3, setPokemon3] = useState<any>(defaultPokemon)

  // set the state when we click a new region:
  const regionChange = (e: any) => {
    e.preventDefault();
    setRegion(e.target.value);
  };

  useEffect(() => {
    console.log("useEffect");
    // mapping of region to starterId's:
    const generations: any = {
      'kanto': [1, 4, 7],
      'johto': [152, 155, 158],
      'hoenn': [252, 255, 258],
      'sinnoh': [387, 390, 393],
      'unova': [495, 498, 501],
      'kalos': [650, 653, 656],
      'alola': [722, 725, 728],
      'galar': [810, 813, 816],
    };
    // get the pokemon from the api:
    const api = new PokemonClient();
    // First pokemon:
    var pokemonId: number = generations[region][0];
    api.getPokemonById(pokemonId)
    .then((pokemon: any) => {setPokemon1(pokemon);})
    // second pokemon:
    pokemonId = generations[region][1];
    axios.get("https://pokeapi.co/api/v2/pokemon/" + pokemonId + "/")
    .then((response) => {setPokemon2(response.data);})
    // third pokemon:
    pokemonId = generations[region][2];
    axios.get("https://pokeapi.co/api/v2/pokemon/" + pokemonId + "/")
    .then((response) => {setPokemon3(response.data);})
  }, [region]);

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

        <h1>Choose your starter pokemon:</h1>
        <select value = {region} onChange = {regionChange}>
          <option value="kanto">Kanto</option>
          <option value="johto">Johto</option>
          <option value="hoenn">Hoenn</option>
          <option value="sinnoh">Sinnoh</option>
          <option value="unova">Unova</option>
          <option value="kalos">Kalos</option>
          <option value="alola">Alola</option>
          <option value="galar">Galar</option>
        </select>
        <div className="row">
          <br />
            <PokemonCard pokemon={pokemon1} />
            <PokemonCard pokemon={pokemon2} />
            <PokemonCard pokemon={pokemon3} />
        </div>

        <input type="submit" value="Register" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default Register;
