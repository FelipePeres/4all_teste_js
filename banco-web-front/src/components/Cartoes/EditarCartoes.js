import React, { Component } from "react";
import { Redirect,Link } from "react-router-dom";

import AuthService from '../Clientes/AuthService';
import withAuth from '../Clientes/withAuth';
const Auth = new AuthService();

class EditarCartoes extends Component {
  constructor(props){
   
    super(props);

    this.state = {
      cartao: {
        numero: "",
        bandeira: "",
        clienteId: 1
      },
      erro: null,
      success:null,
      redirect: false
    };

  }

  handleLogout(){

    Auth.logout();
    this.props.history.replace('/login');
  }

  exibeErro(){

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
    
    fetch(`http://localhost:3001/api/cartoes/get/${id}`)
      .then(data => {
        data.json().then(data => {
          if (data.error) {
            this.setState({ erro: data.error });
          } else {
            this.setState({ cartao: data });
          }
        });
      })
      .catch(erro => this.setState({ erro: erro })); 
  }

  render() {

    console.log(this.props);

    const { redirect } = this.state;

    if (redirect) {

        return <Redirect to={{
                    pathname: '/cartoes/listar',
                    state:{
                      success: this.state.success
                    }
                       
                }}/>

    } else {
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
      <legend>Editar Cartão</legend>
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
                id="numero"
                name="numero"
                placeholder="Nº do cartão"
                minLength="2"
                maxLength="40"
                value={this.state.cartao.numero}
                onChange={this.handleInputChange}
                
              />
            </div>
          </div>  
          <div class="col-md-12">
            <div class="md-form mb-0"> 
              <input
                type="text"
                className="form-control"
                id="bandeira"
                name="bandeira"
                aria-describedby="tituloAjuda"
                placeholder="Bandeira"
                minLength="2"
                maxLength="255"
                value={this.state.cartao.bandeira}
                onChange={this.handleInputChange}
              />
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

    this.setState(prevState => ({
      cartao: { ...prevState.cartao, [name]: value }
    }));
  };

  handleSubmit = event => {
    const { id } = this.state.cartao;

    fetch(`http://localhost:3001/api/cartoes/update/${id}`, {
      method: "put",
      body: JSON.stringify(this.state.cartao),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(data => {
        if (data.ok) {
          this.setState({ success:"Cartão editado com sucesso", redirect: true });
        } else {
          data.json().then(data => {
            if (data.error) {
              this.setState({ erro: data.error });
            }
          });
        }
      })
      .catch(erro => this.setState({ erro: erro }));

    event.preventDefault();
  };
}

export default withAuth(EditarCartoes);
