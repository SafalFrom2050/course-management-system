import './App.css';
import Login from './pages/login/Login';
import SideNavBar from './components/SideNavBar';
import Alertbox from './components/Alertbox';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useAuth } from './hooks/auth-hook';
import { AuthContext } from './contexts/AuthContext';
import { AlertBoxProvider } from './contexts/AlertBoxContext';

function App() {
  const { login, logout, token, userName } = useAuth();

  let routes = null;
  if (token) {
    routes =
      <Switch>
        <Route path='/' exact component={Content}></Route>
        <Redirect to="/" />
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

const Content = () => (

  <>
    <SideNavBar />
    <Alertbox />
  </>
);


export default App;
