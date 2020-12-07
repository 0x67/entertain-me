import { Switch, Route } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
// import logo from './logo.svg';
// import './App.css';
import { Home, Favorite } from './pages';

function App() {
  return (
    <Switch>
      <Route exact path='/'>
          <Home/>
      </Route>
      <Route exact path='/favorite'>
          <Favorite/>
      </Route>
    </Switch>   
  );
}

export default App;
