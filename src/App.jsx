import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./views/Home/home";
import Detail from "./views/Detail/detail";
import Create from "./componentes/Create/create";
import Landing from "./views/Landing/landing";
import LogIn from "./componentes/LogIn Form/LogIn";
import Abaut from "./componentes/Abaut/abaut";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/detail/:id" component={Detail} />
            <Route exact path="/create" component={Create} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/abaut" component={Abaut} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
