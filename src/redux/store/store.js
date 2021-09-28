import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
// para poder trabajar con acciones asincronas
import thunk from 'redux-thunk';
import { photoReducer } from '../reducers/photoReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    photo: photoReducer
})

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
