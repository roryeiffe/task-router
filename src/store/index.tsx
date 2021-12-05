import {createStore} from 'redux';

// initial state:
const initialState = {
    user : {
        id: 1,
        email: 'email@gmail.com',
        name: 'User 1',
        password: 'password123',
        phone: 555555,
        level: 0,
        partnerPokemon: '',
        // points: 0
    }
    
}

// reducer:
const taskReducer:any = (state = initialState, action:any) => {
    return state;
}

// create store:
const store = createStore(taskReducer);

// export store:
export default store;