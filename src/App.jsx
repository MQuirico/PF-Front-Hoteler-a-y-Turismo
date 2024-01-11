import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from "./componentes/NavBar/navBar";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Provider store={store}>
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

export default App
