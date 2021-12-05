import PokeCorner from './Pokecorner';
// pages:
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import FriendPage from './pages/FriendPage';
import TaskPage from './pages/Task';
import ProfilePage from './pages/Profile';
import PokedexPage from './pages/Pokedex';
import './App.css';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import PokemonCard from './components/PokemonCard';

function App() {

    
    return (
        <div className="App">

            <Routes>
                <Route path = '/' element = {<HomePage/>}/>
                <Route path = '/login' element = {<LoginPage/>}/>
                <Route path = '/register' element = {<RegisterPage/>}/>
                <Route path = '/task' element = {<TaskPage/>}/>
                <Route path = '/friend' element = {<FriendPage/>}/>
                <Route path = '/profile' element = {<ProfilePage/>}/>
                <Route path = '/pokedex' element = {<PokedexPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
