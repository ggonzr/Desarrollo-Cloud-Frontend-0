//Importar el core de React
import React from 'react';
//Importar el core de Router
import {
    BrowserRouter as Router,    
    Route,
    Switch
} from "react-router-dom";

//Importar los componentes a renderizar
import Panel from './components/Panel';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

//Aplicación principal de tablero de control para controlar el servidor
//En este archivo dejaremos las rutas principales de la aplicación, la cual consta de 2
// #1 - Formulario de inicio de sesión; #2 - Tablero de control para encender o apagar el servidor

export default function App() {    
  return (
    <Router>
      <Switch>
      <Route exact path="/" component={SignIn}/>
      <Route path="/panel" component={Panel}/>
      <Route path="/signUp" component={SignUp}/>                
      </Switch>
    </Router>
  );
}
