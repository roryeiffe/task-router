// pages:
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import FriendPage from './pages/FriendPage';
import TaskPage from './pages/Task';
import ProfilePage from './pages/Profile';
import './App.css';
import { Route, Routes } from 'react-router-dom';

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
      </Routes>
    </div>
  );
}

export default App;
