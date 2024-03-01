import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import useReducer from './reducer/userReducer';

const initialState = {}

const middleware = [thunk];
const reducers = combineReducers({
    user:useReducer,
})


const store = createStore(
    reducers,
    initialState,
        
    compose(applyMiddleware(...middleware))
);


export default store;






