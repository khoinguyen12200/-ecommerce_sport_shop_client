import React, { useEffect } from 'react';
import AppContainer from './pages';
import './_library.scss';
import './default.scss';
import axios from 'axios';
import { useAppSelector } from './redux/store';


function App() {
  const account = useAppSelector(state => state.account);
  const [done, setDone] = React.useState(false);
  useEffect(() => {
    if(!account) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('accessToken')}`;
    } else {
      axios.defaults.headers.common["Authorization"] = `Bearer ${account.accessToken}`;
    }
    setDone(true);
  }, [account]);

  return (
    <div className="App">
      {done && <AppContainer />}
    </div>
  );
}

export default App;
