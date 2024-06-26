import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import * as Sentry from "@sentry/react";
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux/store/store.tsx';
import { Provider } from 'react-redux';
import { Sha256 } from "@aws-crypto/sha256-browser"



ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
)
