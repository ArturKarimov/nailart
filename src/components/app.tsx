import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import styles from './app.module.scss';
import Header from "./header/header";
import Routes from "./routes/routes";
import {useAuth} from "../hooks/useAuth";

function App() {
  // useAuth()

  return (
    <Router>
        <div className={styles.appWrapper}>
            <Header />
            <Routes />
        </div>
    </Router>
  );
}

export default App;
