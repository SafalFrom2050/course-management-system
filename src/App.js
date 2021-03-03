import './App.css';
import Login from './pages/login/Login';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useAuth } from './hooks/auth-hook';
import { AuthContext } from './contexts/AuthContext';
import { AlertBoxProvider } from './contexts/AlertBoxContext';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {

  const { token, userName, login, logout, } = useAuth();

  let routes = null;
  if (token) {
    routes =
      <Switch>
        <Route path='/' >
          <Dashboard />
        </Route>
      </Switch>
  } else {
    routes =
      <Switch>
        <Route path='/login' exact component={Login}></Route>
        <Redirect to="/login" />
      </Switch>
  }

  return (
    <AuthContext.Provider value={{
      isLoggedIn: !!token,
      login: login,
      logout: logout,
      token: token,
      userName: userName
    }}>

      <AlertBoxProvider>
        <Router>
          {routes}
        </Router>
      </AlertBoxProvider>
    </AuthContext.Provider>
  );
}




export default App;
