import React from 'react';

import { Router, Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { createStore } from 'redux';
import reducer from './reducer';
import { Provider } from 'react-redux';
import { createBrowserHistory } from "history";

import Admin from './Layout/Admin'
import User from './Layout/User'
import Record from './views/Record'
import Login from './views/Login'

import './css/App.css';

const THEME = createMuiTheme({
  typography: {
   "fontFamily": `'Kanit', sans-serif`,
  }
});


function App() {
  const store = createStore(reducer);
  const hist = createBrowserHistory();

  return (
    <Provider store={store}>
        <ThemeProvider theme={THEME}>
            <Router history={hist}>
              <BrowserRouter>
                  <Switch>
                    {/* <Route path="/admin" component={Admin} />
                    <Route path="/user" component={User} /> */}
                    <Route path="/บันทึกเวลา" component={Record} />
                    <Route path="/login" component={Login} />
                    <Route path="/" component={User} />
                    {/* <Redirect from="/" to="/login" /> */}
                  </Switch>
              </BrowserRouter>
            </Router>
        </ThemeProvider>
      </Provider>
  );
}

export default App;
