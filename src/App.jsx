
import "./App.css";
import NavBar from "./componentes/NavBar/navBar";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Landing from "./views/Landing/landing";
import Home from "./views/Home/home";
import Detail from "./views/Detail/detail";
import SearchPage from "./views/CardsDisplay/Display";
import LogIn from "./componentes/LoginForm/loginForm";
import About from './componentes/About/about';
import Registro from "./componentes/Register/register";
import DashboardUsuario from "./componentes/prefilDeUsuario/dashBoard"



import { AuthProvider } from "./componentes/AuthProvider/authProvider";


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={SearchPage} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/about" component={About} />
            <Route exact path="/register" component={Registro} />
            <Route exact path="/detail/:id" component={Detail} />
            <Route exact path="/configUser" component={DashboardUsuario} />
          </Switch> 
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;