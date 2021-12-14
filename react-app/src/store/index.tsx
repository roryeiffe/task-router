import {createStore} from 'redux';

// initial state:
export const initialState = {
    user : {
        id: null,
        email: null,
        name: 'User 1',
        password: 'password123',
        phone: 555555,
        level: 5,
        points: 0,
        starterId: 191,
        tasks:[],
        pokemon: []
    }
}

// reducer:
const taskReducer:any = (state = initialState, action:any) => {
    switch (action.type) {
        // update user with payload:
        case 'UPDATE_USER':
            return {
                ...state,
                user: {...state.user, ...action.payload}
            }
        // reset user to initial state:
        case 'LOGOUT':
            return {
                ...state,
                user: initialState.user
            }
        // update tasks with payload:
        case 'UPDATE_TASK':
            return{
                ...state,
                user: {...state.user, tasks: action.payload }
            }
        // add pokemon to redux store:
        case 'ADD_POKEMON':
            return {
                ...state,
                user:{...state.user, pokemon: [...state.user.pokemon, action.payload]}
            }
        }

    return state;
}

// create store:
const store = createStore(taskReducer);

// export store:
export default store;