import React, { useEffect } from 'react';
import AppContainer from './pages';
import './_library.scss';
import './default.scss';
import axios from 'axios';
import { useAppSelector } from './redux/store';


function App() {
  const account = useAppSelector(state => state.account);
  useEffect(() => {
    console.log(account);
    axios.defaults.headers.common["Authorization"] = `Bearer ${account.accessToken}`;
  }, [account]);

  return (
    <div className="App">
     <AppContainer/>
    </div>
  );
}

export default App;
