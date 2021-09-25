import { createStore, combineReducers } from 'redux';
import { photoReducer } from '../reducers/photoReducer';

const reducers = combineReducers({
    photo: photoReducer
})

export const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
