import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { photoReducer } from '../reducers/photoReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

//
const persistConfig = {
    key: 'root',
    storage,
};

//
const persistedReducer = persistReducer(persistConfig, photoReducer);

const reducers = combineReducers({
    photo: persistedReducer
});

const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

//
const persistor = persistStore(store);

export { store, persistor };
