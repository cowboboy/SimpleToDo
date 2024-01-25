import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { App } from './App';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App/>
    <ToastContainer autoClose={3000} position="bottom-left"/>
  </Provider>
)
