import PokeCorner from './Pokecorner';
// pages:
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import FriendPage from './pages/FriendPage';
import TaskPage from './pages/Task';
import ProfilePage from './pages/Profile';
import './App.css';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
    let [temp1, setTemp1] = useState(null);
    // setTemp1(PokeCorner.getPokemonSprite.front(38));
    let [temp2, setTemp2] = useState("MissingNo.");
    PokeCorner.getPkmnNameById(38).then(pkmnString => {
        // console.log(pkmnString);
        setTemp2(pkmnString);
    });
    console.log(temp2);
    
    return (
        <div className="App">
            {temp1}
            {temp2}
            <Routes>
                <Route path = '/' element = {<HomePage/>}/>
                <Route path = '/login' element = {<LoginPage/>}/>
                <Route path = '/register' element = {<RegisterPage/>}/>
                <Route path = '/task' element = {<TaskPage/>}/>
                <Route path = '/friend' element = {<FriendPage/>}/>
                <Route path = '/profile' element = {<ProfilePage/>}/>
            </Routes>
        </div>
    );
}

export default App;
