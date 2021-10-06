import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import UserList from './components/userList';
import AddUser from './components/addUser';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact  path="/">
            <UserList />
          </Route>
          <Route path="/add">
            <AddUser />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
