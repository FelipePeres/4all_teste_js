import React, {Component} from "react";
import {Link} from "react-router-dom";

import AuthService from './AuthService';
import withAuth from './withAuth';
const Auth = new AuthService();

class Home extends Component{

    constructor(props){

        super(props);

        this.state = {
            dados: {}
        };

    }

    componentDidMount(){

        let id = Auth.getProfile();
        return fetch(`http://localhost:3001/api/clientes/get/${id}`)
            .then(resultado => resultado.json())
                .then(json => this.setState({dados:json}));
    }

    handleLogout(){

        Auth.logout();
        this.props.history.replace('/login');
    
    }

    render(){
        
      //  console.log(this.state.dados)
        return (
          
        <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          
            <Link to="/" className="navbar-brand">Ekki​ </Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-expanded="false" aria-controls="navbarNav">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">

                        <li className="nav-item">
                            <Link to="/home" className="nav-link">Home</Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/cartoes/listar" className="nav-link">Cartões</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contatos/listar" className="nav-link">Contatos</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/transferencias/listar" className="nav-link">Transferencias</Link>
                        </li>

                        <li className="nav-item">
                            <button type="button" className="btn btn-dark" onClick={this.handleLogout.bind(this)}>Logout</button>
                        </li>
                </ul>
            </div>
        
        </nav>
          <div className="container-fluid">

          <div className="row">
  
            <div className="col">
            <br className="clear"/>
            <br className="clear"/>
            <br className="clear"/>
                      

                <div className="card-align">
                    <div className="col-md-4 mb-md-0 mb-5">

                        <div className="card profile-card">

                            <div className="avatar z-depth-1-half mb-4">
                                <img src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg" className="rounded-circle" alt="First sample avatar image"/>
                            </div>

                            <div className="card-body pt-0 mt-0">
                            
                                <div className="text-center">
                                <h3 className="mb-3 font-weight-bold"><strong>{this.state.dados.nome}</strong></h3>
                                <h6 className="font-weight-bold blue-text mb-4">Cliente Conta-Corrente</h6>
                                </div>

                                <ul className="striped list-unstyled">
                                <li><strong>E-mail: </strong>{this.state.dados.email}</li>

                                <li><strong>Numero da Conta:</strong> {this.state.dados.numero}</li>

                                <li><strong>Saldo: </strong>R$ {this.state.dados.saldo} </li>

                                </ul>

                            </div>

                        </div>
                            
                    </div>
                </div>                    
                    
                </div>

</div>

</div>

</div>
            
        );        
    }

}


export default withAuth(Home);