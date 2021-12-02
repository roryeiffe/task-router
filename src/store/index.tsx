import {createStore} from 'redux';

// initial state:
const initialState = {
    
    
}

// reducer:
const taskReducer:any = (state = initialState, action:any) => {
    return state;
}

// create store:
const store = createStore(taskReducer);

// export store:
export default store;