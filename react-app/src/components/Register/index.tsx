import axios from "axios";
import React, { useState, useEffect } from "react";
import PokemonSelection from "./PokemonSelection";
import Alert from "../Alert";
import {PokemonClient} from 'pokenode-ts';
import {IPokemon} from '../../interfaces/Pokemon';
import { useDispatch } from "react-redux";
import styles from './style.module.css';

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    points: 0,
    level: 5,
    starterId: 1,
  });
  // represents which region we want to display:
  const [region, setRegion] = useState("kanto");
  // each region will only display 3 pokemon:
  const [pokemon1, setPokemon1] = useState<IPokemon>()
  const [pokemon2, setPokemon2] = useState<IPokemon>()
  const [pokemon3, setPokemon3] = useState<IPokemon>()
  // show alert upon success/failure
  const [alert, setAlert] = useState(<div></div>);

  const dispatch = useDispatch();

  // set the state when we click a new region:
  const regionChange = (e: any) => {
    e.preventDefault();
    setRegion(e.target.value);
  };

  useEffect(() => {
    // mapping of region to starterId's:
    const generations: any= {
      'kanto': [1, 4, 7],
      'johto': [152, 155, 158],
      'hoenn': [252, 255, 258],
      'sinnoh': [387, 390, 393],
      'unova': [495, 498, 501],
      'kalos': [650, 653, 656],
      'alola': [722, 725, 728],
      'galar': [810, 813, 816],
    };
    // initialize selected pokemon to first pokemon of the given region
    setUser({...user, starterId: generations[region][0]});
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

    axios.get("http://localhost:9001/users/getAll").then(response => console.log(response));
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
    // update the redux store:
    dispatch({type: 'UPDATE_USER', payload: user});

    axios.post('http://localhost:9001/users/register', user)
    .then((response) => {
      // set alert to empty div to "reset" the alert show property:
      setAlert(<div></div>)
      setAlert(<Alert message = "Registration successful!" type = "success"/>);
    })
    .catch( (error) => {
      // set alert to empty div to "reset" the alert show property:
      setAlert(<div></div>)
      setAlert(<Alert message = "Registration failed (email already exists)" type = "danger"/>);
      
    });
    event.preventDefault();
  }

  return (
    <div className="container">
      {alert}
      <form onSubmit={onSubmitHandler} className = {styles.form}>
      <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="">Full Name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            value={user.name}
            onChange={onChangeHandler}
            placeholder = 'Ash Ketchum'
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
            placeholder = 'poke@mon.com'
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
            placeholder = 'pikachu123'
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Mobile</label>
          <input
            className="form-control"
            type="phone"
            name="phone"
            value={user.phone}
            onChange={onChangeHandler}
            required
          />
        </div>

        <h1>Choose your starter pokemon:</h1>
        <label htmlFor='region'>Region: </label>
        <br />
        <select className = {`form-control select ${styles.select}`} id = 'region' value = {region} onChange = {regionChange}>
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
            {/* make sure the pokemon are loaded before we display the cards:*/}
            {pokemon1 && <PokemonSelection pokemon={pokemon1} setUser = {setUser} user = {user}/>}
            {pokemon2 && <PokemonSelection pokemon={pokemon2} setUser = {setUser} user = {user}/>}
            {pokemon3 && <PokemonSelection pokemon={pokemon3} setUser = {setUser} user = {user}/>}
        </div>

        <input type="submit" value="Register" className={`btn btn-primary btn-submit ${styles.btnSubmit}`} />
      </form>
    </div>
  );
};

export default Register;
