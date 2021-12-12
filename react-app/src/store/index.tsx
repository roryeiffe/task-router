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
        starterId: 1,
        partnerPokemon: '',
        tasks:[]
    }
    

}

// reducer:
const taskReducer:any = (state = initialState, action:any) => {
    switch (action.type) {
        case 'UPDATE_USER':
            return {
                ...state,
                user: {...state.user, ...action.payload}
            }
        
        case 'UPDATE_TASK':
            return{
                ...state,
                user: {...state.user, tasks: action.payload }
            }
        }

    return state;
}

// create store:
const store = createStore(taskReducer);

// export store:
export default store;