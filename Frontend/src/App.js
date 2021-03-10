import './App.css';
import Login from './pages/Shared/Login/Login';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useAuth } from './hooks/auth-hook';
import { AuthContext } from './contexts/AuthContext';
import { AlertBoxProvider } from './contexts/AlertBoxContext';
import Dashboard from './pages/Shared/Dashboard/Dashboard';

function App() {

  const { token, userName, login, logout, userType } = useAuth();
  const user = JSON.parse(localStorage.getItem("userData"))

  let routes = null;

  if (token || (user && user.token)) {
    routes =
      <Switch>
        <Route path='/' >
          <Dashboard userType={userType} />
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
      userType: userType,
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
