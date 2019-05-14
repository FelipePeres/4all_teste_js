import React, { Component } from "react";
import Home from './components/Clientes/Home';

import ListarCartoes from './components/Cartoes/ListarCartoes';
import CriarCartoes from './components/Cartoes/CriarCartoes';
import ConfirmarRemoverCartao from './components/Cartoes/ConfirmarRemoverCartao';
import EditarCartoes from './components/Cartoes/EditarCartoes';

import ListarContatos from './components/Contatos/ListarContatos';
import CriarContatos from "./components/Contatos/CriarContatos";
import ConfirmarRemoverContato from './components/Contatos/ConfirmarRemoverContato';
import EditarContatos from "./components/Contatos/EditarContatos";

import ListarTransferencias from "./components/Transferencias/ListarTransferencias";
import ListarRecebidas from "./components/Transferencias/ListarRecebidas";
import CriarTransferencias from "./components/Transferencias/CriarTransferencias";

import Login from "./components/Clientes/Login";

import {Route,Switch} from "react-router-dom";

import "./App.css";


class App extends Component {

  render(){
  
    return (
   
          <Switch>
              
              <Route path="/" exact component={Home} />
              <Route path="/home" component={Home} />
              <Route path="/login" component={Login} />

              <Route path="/cartoes/listar" component={ListarCartoes} />
              <Route path="/cartoes/criar" component={CriarCartoes} />
              <Route path="/cartoes/remover/:id" component={ConfirmarRemoverCartao} />
              <Route path="/cartoes/editar/:id" component={EditarCartoes} />

              <Route path="/contatos/listar" component={ListarContatos} />
              <Route path="/contatos/criar" component={CriarContatos} />
              <Route path="/contatos/remover/:id" component={ConfirmarRemoverContato} />
              <Route path="/contatos/editar/:id" component={EditarContatos} />

              <Route path="/transferencias/listar" component={ListarTransferencias} />
              <Route path="/transferencias/recebidas" component={ListarRecebidas} />
              <Route path="/transferencias/criar" component={CriarTransferencias} />

             
          </Switch>
 
   
    )
  
  }

}

export default App;
