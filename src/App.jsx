import 'bootstrap/dist/css/bootstrap.min.css';
import { AppRouter } from './routers/AppRouter';
import { store, persistor } from './redux/store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


function App() {
  return (
    <div >
      <Provider store={store}>

        <PersistGate loading={null} persistor={persistor}>

          <AppRouter />

        </PersistGate>

      </Provider>
    </div>
  );
}

export default App;
