import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./views/Home/Home";
import Detail from "./views/Detail/Detail";
import Create from "./componentes/Create/Create";
import Landing from "./views/Landing/landing";
import LogIn from "./componentes/LogIn Form/LogIn";
import Registro from "./componentes/Register/Register";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/home/:id" component={Detail} />
            <Route exact path="/create" component={Create} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path='/register' component={Registro} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
