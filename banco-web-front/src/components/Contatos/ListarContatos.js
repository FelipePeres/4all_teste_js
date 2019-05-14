import React, {Component} from "react";
import {Link} from "react-router-dom";
import ConfirmarRemoverContato from "./ConfirmarRemoverContato";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import AuthService from '../Clientes/AuthService';
import withAuth from '../Clientes/withAuth';
const Auth = new AuthService();

class ListarContatos extends Component{

    constructor(props){

        super(props);

        this.state = {
            dados: [],
            modal:false,
            itemDelete:null
        };

        this.toggle = this.toggle.bind(this);
    }

    handleLogout(){

        Auth.logout();
        this.props.history.replace('/login');
    
      }
    

    toggle(){    
        this.setState({
          modal: !this.state.modal,
        });
    }

    deleteitem(id){
        this.setState({
            itemDelete:id,
        });
    }

    exibeSuccess(){

       // console.log(this.props);
        
        if(this.props.history.location.state){

            const {success}  = this.props.history.location.state;
            
            if (success){

                return (
                    <div className="alert alert-success" role="alert">
                    <p>{success}</p>
                    </div>
                );

            }
        }
    }

    componentDidMount(){

        let id = Auth.getProfile();
        return fetch(`http://localhost:3001/api/contatos/getall/${id}`)
            .then(resultado => resultado.json())
                .then(json => this.setState({dados:json}));
    }

    render(){

        console.log(this.state);

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
                            <h2>Contatos/Beneficiários</h2>
                        </div>
                        <div className="col-md-6">
                        <Link to="/contatos/criar" className="btn btn-outline-info waves-effect" onClick={this.props.updateParent}>Cadastrar</Link>
                        </div>   
                </div>

                <div className="row tab-content">

                        <div className="table-responsive">

                                <table className="table">

                                        <thead>
                                            <tr>
                                                <th>Beneficiário</th>
                                                <th>Número</th>
                                                <th>Banco</th>
                                                <th>Titular</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.dados.map((item,indice) => {

                                                    return (

                                                        <tr key={indice}>
                                                            <td>{item.nome}</td>
                                                            <td>{item.numero}</td>
                                                            <td>{item.banco == ''?'Banco islandês':item.banco}</td>
                                                            <td>{item.cliente.nome}</td>
                                                            <td>
                                                            <Link 
                                                                        to={`/contatos/editar/${item.id}`}
                                                                        className="btn btn-info"
                                                                        role="button"
                                                                    >
                                                                    Editar
                                                            </Link>
                                                            <Button 
                                                                        onClick={()=>{this.toggle();this.deleteitem(item.id)}}
                                                                        className="btn btn-danger mr-3"
                                                                        role="button">
                                                                        Excluir
                                                            </Button>
                  
                                                            </td>

                                                        </tr>
                                                    )

                                                })
                                            }

                                        </tbody>
                                    
                                </table>                
                        </div>
                        <div>
                                <Modal isOpen={this.state.modal}>
                                <ModalHeader>
                                        <Button color="danger" onClick={this.toggle}>Cancel</Button>          
                                </ModalHeader>
                                <ModalBody>
                                        <ConfirmarRemoverContato id={this.state.itemDelete}/>
                                </ModalBody>                
                                </Modal>
                            
                        </div>
                
                </div>
               

            </div>

            

            </div>

        </div>

        </div>

        </div>
        )
    }

}

export default withAuth(ListarContatos);