import 'bootstrap/dist/css/bootstrap.min.css';
import { AppRouter } from './routers/AppRouter';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';


function App() {
  return (
    <div >
      <Provider store={store}>

        <AppRouter />

      </Provider>
    </div>
  );
}

export default App;
