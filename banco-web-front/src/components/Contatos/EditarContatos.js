import React, { Component } from "react";
import { Redirect ,Link} from "react-router-dom";

import AuthService from '../Clientes/AuthService';
import withAuth from '../Clientes/withAuth';
const Auth = new AuthService();

class EditarContatos extends Component {
  constructor(props) {
   
    super(props);

    this.state = {

        contato: {
            nome: "",
            numero: "",
            banco: "",
            clienteContatoId: 1,
            tem_banco:"",
        },
        
        erro: null,
        success:null,
        redirect: false,
    };

  }

  handleLogout(){

    Auth.logout();
    this.props.history.replace('/login');
  }

  exibeErro() {

    const { erro } = this.state;

    if (erro) {
      return (
        <div className="alert alert-danger" role="alert">
          Erro de conexão com o servidor
        </div>
      );
    }
  }

  componentDidMount() {

    const { id } = this.props.match.params;

    fetch(`http://localhost:3001/api/contatos/get/${id}`)
      .then(data => {
        data.json().then(data => {
          if (data.error) {
            this.setState({ erro: data.error });
          } else {
            var t_b = "";
            if(data.banco === ""){
                t_b = "sim"
            }else{t_b = "nao";}

            this.setState({
                contato: {
                    id: data.id, 
                    nome: data.nome, 
                    numero: data.numero,
                    clienteContatoId: data.clienteContatoId,
                    banco: data.banco,
                    tem_banco: t_b
                } 
            });
          }
        });
      }).catch(erro => this.setState({ erro: erro }));

  }

  render() {

    const { redirect } = this.state;

    if (redirect){

        return <Redirect to={{
                    pathname: '/contatos/listar',
                    state: { 
                        success: this.state.success 
                    }    
               }}/>

    } else {

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

<section className="mb-5">
<br className="clear"/>
<div className="row card-align">

      <div className="col-lg-6 col-md-12 mb-lg-0 mb-4"> 

      <div className="card">

      <div className="card-header white-text primary-color">
      <legend>Editar Contato</legend>
      </div>
      <div className="card-body text-center px-4 mb-3">        
        <form onSubmit={this.handleSubmit}>
          {this.exibeErro()}
          <fieldset>
            
          <div className="col-md-12">
              <div className="md-form mb-0">
              <input
                type="text"
                className="form-control"
                id="nome"
                name="nome"
                minLength="2"
                maxLength="40"
                placeholder="Nome(Apelido) do contato"
                value={this.state.contato.nome}
                onChange={this.handleInputChange}
              />
             </div>
          </div>
          <div className="col-md-12">
              <div className="md-form mb-0">
              <input
                type="text"
                className="form-control"
                id="numero"
                name="numero"
                placeholder="Nº do cartão"
                minLength="2"
                maxLength="40"
                value={this.state.contato.numero}
                onChange={this.handleInputChange}
                
              />
              </div>
            </div>
            <br className="clear"/>
            <div className="col-md-12">
            <div className="custom-control custom-radio float-left">

     
              <input
                type="radio"
                className="custom-control-input"
                id="tem_banco1"
                name="tem_banco"
                value="sim"
                checked={this.state.contato.tem_banco === "sim"}
                onChange={this.handleInputChange}
              />
            
            <label className="custom-control-label" htmlFor="tem_banco1">  
              Ekki - Banco Islandês
            </label>
          </div>

            <br className="clear"/>

            <div className="custom-control custom-radio float-left">
       
              <input
                type="radio"
                className="custom-control-input"
                id="tem_banco2"
                name="tem_banco"
                value="nao"
                checked={this.state.contato.tem_banco === "nao"}
                onChange={this.handleInputChange}
              />
              <label className="custom-control-label" htmlFor="tem_banco2">  
                Outro Banco
              </label>
       
              </div>
          </div>

          <div style={{display: this.state.contato.tem_banco === 'nao' ? 'block' : 'none' }}>
          <div className="col-md-12">
              <div className="md-form mb-0">
              <input
                type="text"
                className="form-control"
                id="banco"
                name="banco"
                aria-describedby="bandeiraCartao"
                placeholder="Nome do banco do beneficiário"
                minLength="2"
                maxLength="40"
                value={this.state.contato.banco}
                onChange={this.handleInputChange}
              />
                </div>
              </div>
          </div>
            
            <button type="submit" className="btn btn-primary">
              Enviar
            </button>
          </fieldset>
        </form>
        </div>
        </div>
      </div>
    </div>   

</section>        

</div>

</div>

</div>

</div>
      );
    }
  }

  handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    //console.log(name);
    //console.log(value);

    if(name === 'tem_banco' && value === 'sim'){

      this.setState(prevState => ({
        contato: { 
          ...prevState.contato, 
          [name]: value ,
          ['banco']: "" 
        }
      }));

    }else{

       this.setState(prevState => ({
        contato: { 
          ...prevState.contato, 
          [name]: value 
        }
      }));

    }
  };

  handleSubmit = event => {
    
    const { id } = this.state.contato;

    fetch(`http://localhost:3001/api/contatos/update/${id}`, {
      method: "put",
      body: JSON.stringify(this.state.contato),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(data => {

        if (data.ok){
          this.setState({ success:"Contato editado com sucesso", redirect: true });
        } else {
          data.json().then(data => {
            if (data.error) {
              this.setState({ erro: data.error });
            }
          });
        }
      }).catch(erro => this.setState({ erro: erro }));

      event.preventDefault();
  };
}

export default withAuth(EditarContatos);
