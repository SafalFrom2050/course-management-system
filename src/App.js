import './App.css';
import Login from './pages/login/Login';
import SideNavBar from './components/SideNavBar';
import Alertbox from './components/Alertbox';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { AlertBoxProvider } from './contexts/AlertBoxContext';

function App() {

  return (
    <AuthProvider>
      <AlertBoxProvider>
        <Router>
          <Switch>
            <Route path='/login' exact component={Login}></Route>
            <Route path='/' exact component={Content}></Route>
          </Switch>
        </Router>
      </AlertBoxProvider>
    </AuthProvider>
  );
}

const Content = () => (
  <>
    <SideNavBar />

    <Alertbox />
  </>
);


export default App;
