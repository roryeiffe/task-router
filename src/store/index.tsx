import {createStore} from 'redux';

// initial state:
const initialState = {
    user : {
        id: 1,
        email: 'email@gmail.com',
        name: 'User 1',
        password: 'password123',
        phone: 555555,
        level: 5,
        points: 0,
        starterId: 1,
    } 
}

// reducer:
const taskReducer:any = (state = initialState, action:any) => {
    switch (action.type) {
        case 'UPDATE_USER':
            return {
                ...state,
                user: action.payload
            }
        }

    return state;
}

// create store:
const store = createStore(taskReducer);

// export store:
export default store;