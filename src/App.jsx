
import "./App.css";
import NavBar from "./componentes/NavBar/navBar";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Landing from "./views/Landing/landing";
import Home from "./views/Home/home";
import Detail from "./views/Detail/detail";
import SearchPage from "./views/CardsDisplay/Display";
import Create from "./componentes/Create/create";
import LogIn from "./componentes/LoginForm/loginForm";
import About from './componentes/About/about'
import Registro from "./componentes/Register/register";
import Perfil from "./componentes/PerfilDeUsuario/perfilDeUsuario"


// import ProtectedRoute from './GeneralLogin';

import { AuthProvider } from "./componentes/AuthProvider/authProvider";


function App() {
  return (
    <AuthProvider>
    <Router>
      <div className="App">
        <Route
          render={(props) => {
            if (props.location.pathname !== "/") {
              return <NavBar />;
            }
            return null;
          }}
        />
  <Switch>

 <Route exact path="/" component={Landing} />
 <Route exact path="/home" component={Home} />
 <Route exact path="/search" component={SearchPage} />
 <Route exact path="/login" component={LogIn} />
 <Route exact path="/about" component={About} />
 <Route exact path="/register" component={Registro} />
 <Route exact path="/detail/:id" component={Detail} />
 <Route exact path="/perfil" component= {Perfil} />
 <Route exact path="/create" component= {Create} />

</Switch> 
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;