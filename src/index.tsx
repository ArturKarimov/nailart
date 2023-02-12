import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './fonts/gilroy.ttf';
import App from './components/app';
import {Provider} from "react-redux";
import {setupStore} from "./services/store/store";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = setupStore();

root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);