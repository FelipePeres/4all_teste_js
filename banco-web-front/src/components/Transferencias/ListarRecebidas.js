import React, {Component} from "react";
import {Link} from "react-router-dom";

import AuthService from '../Clientes/AuthService';
import withAuth from '../Clientes/withAuth';
const Auth = new AuthService();

class ListarRecebidas extends Component{

    constructor(props){

        super(props);

        this.state = {
            dados: [],
        };
    }

    handleLogout(){
        Auth.logout();
        this.props.history.replace('/login');
    }
    

    exibeSuccess(){

        console.log(this.state);
        
        if(this.props.history.location.state){

            const {success,erro}  = this.props.history.location.state;
            
            if (success){

                return (
                    <div className="alert alert-success" role="alert">
                    <p>{success}</p>
                    </div>
                );

            }else if(erro){

                return (
                    <div className="alert alert-danger" role="alert">
                    <p>{erro}</p>
                    </div>
                );

            }
        }
    }

    componentDidMount(){
        let id = Auth.getProfile();
        return fetch(`http://localhost:3001/api/transferencias/getreceived/${id}`)
            .then(resultado => resultado.json())
                .then(json => this.setState({dados:json}));
    }

    render(){
        
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

            <div className="container card">     
           
                    {this.exibeSuccess()}
                    <div className="row card-header white-text primary-color"> 
                        <div className="col-md-6">
                            <h2>Transferencias Recebidas</h2>
                        </div>
                        <div className="col-md-6">
                            <Link to="/transferencias/criar" className="btn btn-outline-info waves-effect">Nova Transação</Link>

                            <Link to="/transferencias/recebidas" className="btn btn-outline-info waves-effect">Recebidas</Link>
                        </div>   
                    </div>
                    <div className="row tab-content">
                            <div className="table-responsive">
                                        <table className="table">

                                            <thead>
                                                <tr>
                                                    <th>Valor</th>
                                                    <th>Cliente</th>
                                                    <th>Criação</th>   
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.dados.map((item,indice) => {

                                                        return (
                                                            
                                                            <tr key={indice}>
                                                                <td>R$ {item.valor}</td>
                                                                <td>{item.cliente.nome}</td>
                                                                <td>{item.createdAt}</td>
                                                            </tr>
                                                        )

                                                    })
 
                                                }
                                            </tbody>
                                         </table>                
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


export default withAuth(ListarRecebidas);