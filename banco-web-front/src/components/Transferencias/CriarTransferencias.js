import React, { Component } from "react";
import { Redirect,Link } from "react-router-dom";
import { TextInputMask } from 'react-web-masked-text';
import { Col,Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Form, FormGroup } from 'reactstrap';

import AuthService from '../Clientes/AuthService';
import withAuth from '../Clientes/withAuth';
const Auth = new AuthService();

class CriarTransferencias extends Component {

  constructor(props){
    
    super(props);

    this.state = {

      cartoes: [],
      contatos: [],

      libera_cartao:false,
      saldo_cliente:"",
      login_verificado:false,
      modal:false,
      modal_cartao:false,

      transferencia:{
        valor: "",
        valor_devido:"",
        clienteEnvId: Auth.getProfile(),
        contatoRecId:"",
        tem_cartao:null,
      },

      cartao:{
        numero: "",
        bandeira: "",
        clienteId: 1
      },

      login:{

        email: "",
        senha:"",

      },

      erro: null,
      success:null,
      redirect: false,

      successLogin:null,
      erroLogin:null

    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggle            = this.toggle.bind(this);
    this.toggle_cartao     = this.toggle_cartao.bind(this);
   
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

  toggle_cartao(){    
    this.setState({
      modal_cartao: !this.state.modal_cartao,
    });
  }

  exibeMensagemLogin(){
    
        const {successLogin,erroLogin}  = this.state;
        
        if (successLogin){

          return (
            <div className="alert alert-success" role="alert">
                      <p>{successLogin}</p>
            </div>
          );

        }else if(erroLogin){

          return (
            <div className="alert alert-danger" role="alert">
                <p>{erroLogin}</p>
            </div>
          );
          
        }
  }

  exibeErro(){
    
    const { erro } = this.state;
    
    if (erro){
      
      return (
        <div className="alert alert-danger" role="alert">
          {erro}
        </div>
      );
    }
  }

  componentDidMount() {
  
   let id = Auth.getProfile();

   fetch(`http://localhost:3001/api/contatos/getall/${id}`)
    .then(resultado => resultado.json())
        .then(json => this.setState({contatos:json}));

     fetch(`http://localhost:3001/api/cartoes/getall/${id}`)
      .then(resultado => resultado.json())
          .then(json => this.setState({cartoes:json}));

          fetch(`http://localhost:3001/api/clientes/get/${id}`)
          .then(resultado => resultado.json())
              .then(json => this.setState({saldo_cliente:json.saldo}));
  }


  render(){

    let contatos_opt = this.state.contatos;
    let optionItemsContato = contatos_opt.map((contato) => 
          <option value={contato.id}>{contato.nome}</option>
    );

    let cartoes_opt = this.state.cartoes;
    let optionItemsCartao = cartoes_opt.map((cartao) =>
            <option value={cartao.id}>{cartao.bandeira}</option>
    );

    const { redirect } = this.state;

    if (redirect){

      return <Redirect to={{

                pathname: '/transferencias/listar',
                state: { 
                  success: this.state.success,
                  erro: this.state.erro
                }
      
             }}/>

    } else {
      
      return(
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
      <legend>Fazer Transferencia</legend>
      </div>
      <div className="card-body text-center px-4 mb-3">
        <form id="submit-cartoes" onSubmit={this.handleSubmit}>
          {this.exibeErro()}
          <fieldset>
         
          <div className="col-md-12">
              <div className="md-form mb-0">
              <label className="label-select" htmlFor="valor">Valor</label>
                <TextInputMask type="text" className="form-control" id="valor" name="valor" kind={'money'}
                
                  options={{

                      precision: 2,
                      separator: ',',
                      delimiter: '.',
                      unit: 'R$',
                      suffixUnit: ''
                  }}

                  value={this.state.transferencia.valor}
                  onChange={this.handleInputChange}
                  required="required"                
                  />
              </div>
            </div>
              
            <div className="col-md-12">
              <div className="md-form mb-0">
                <label className="label-select" htmlFor="contatoRecId">Beneficiário</label>
                <select className="custom-select custom-select-sm" onChange={this.handleInputChange} id="contatoRecId" name="contatoRecId" required="required">
                    <option value={null}></option>
                    {optionItemsContato}
                </select>
              </div>   
            </div>
            
            <div style={{display: this.state.libera_cartao? 'block' : 'none' }}>

            <div className="col-md-12">
              <div className="md-form mb-0">
              <label className="label-select" htmlFor="valor_devido">Valor Devido no Cartão</label>
                <input type="text" className="form-control" id="valor_devido" name="valor_devido"
                  value={this.state.transferencia.valor_devido} 
                />
              </div>
            </div>

            <div style={{display: this.state.cartoes.length == 0 ? 'block' : 'none' }}>
             
            <div className="col-md-12">

              <div className="md-form mb-0">
              
              <button type="button" className="btn btn-primary button-tc" onClick={()=>{this.toggle_cartao()}}>
                + 
              </button>
              <small id="bandeiraCartao" className="form-text text-muted messeng">
                Para completar a operação, você precisa ter ao menos um cartão de crédito válido cadastrado...
              </small>
              
              </div>
            </div> 
            <br className="clear"/> 
            </div>
            <div className="col-md-12">
              <div className="md-form mb-0">
                <label className="label-select" htmlFor="tem_cartao">Usar Cartão?</label>
                  <select className="custom-select custom-select-sm" onChange={this.handleInputChange} id="tem_cartao" name="tem_cartao" className="browser-default custom-select">
                      <option value={null}></option>
                      {optionItemsCartao}
                  </select>
              </div>
            </div>

            </div>

            <div className="col-md-12">
              <div className="md-form mb-0">
                <label className="label-select" htmlFor="valor_devido">Saldo Atual</label>
                <input type="text" className="form-control" id="saldo_cliente" name="saldo_cliente" disabled
                  value={this.state.saldo_cliente}/>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Enviar
            </button>

          </fieldset>

          <Modal isOpen={this.state.modal}>
         
            <button type="button" className="close fechar" data-dismiss="modal" aria-label="Close" onClick={this.toggle}>
                  <span aria-hidden="true">×</span>
            </button>
            <ModalHeader>
                   Logar 
            </ModalHeader>
            <ModalBody>
            <Form>
            {this.exibeMensagemLogin()}
              <FormGroup row>
                
                <Col sm={12}>
                  <div className="md-form form-lg mb-4">
                  <i class="fas fa-envelope prefix grey-text"></i>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"   
                    placeholder="Email"
                    value={this.state.login.email}
                    onChange={this.handleChange}
                    
                  />
                 
                  </div>
                </Col>
              </FormGroup>
              <FormGroup row>
               
                <Col sm={12}>
                <div className="md-form form-lg mb-4">
                <i class="fas fa-lock prefix grey-text"></i>
                  <input
                    type="password"
                    className="form-control"
                    id="senha"
                    name="senha"   
                    placeholder="Senha"    
                    value={this.state.login.senha}
                    onChange={this.handleChange}
                  />
                  </div>

                </Col>
              </FormGroup>
            </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.handleClick}>Confirmar</Button>{' '}
             
            </ModalFooter>                
            </Modal>


            <Modal isOpen={this.state.modal_cartao}>
            <button type="button" className="close fechar" data-dismiss="modal" aria-label="Close" onClick={this.toggle_cartao}>
                  <span aria-hidden="true">×</span>
            </button>

            <ModalHeader>
                Cadastrar Cartão
            </ModalHeader>
            <ModalBody>
            <Form>
            {this.exibeMensagemLogin()}
              <FormGroup row>
             
                <Col sm={12}>
                <div className="md-form form-lg mb-4">
                <i class="fas fa-credit-card prefix grey-text"></i>
                  <input
                    type="text"
                    className="form-control"
                    id="numero"
                    name="numero"
                    placeholder="Nº do cartão"
                    value={this.state.cartao.numero}
                    onChange={this.handleCardChange}
                    required
                  />
                </div>
                </Col>
              </FormGroup>
              <FormGroup row>
               
                <Col sm={12}>
                <div className="md-form form-lg mb-4">
                <i class="fas fa-flag prefix grey-text"></i>
                  <input
                    type="text"
                    className="form-control"
                    id="bandeira"
                    name="bandeira"
                    placeholder="Bandeira"
                    value={this.state.cartao.bandeira}
                    onChange={this.handleCardChange}
                    required
                  />
                </div>  
                </Col>
              </FormGroup>
            </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.handleCardClick}>Salvar</Button>{' '}
            </ModalFooter>                
            </Modal>
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

  tratarValor(){

    const valor_corrente       = this.state.transferencia.valor;
    const remocoes             = valor_corrente.replace("R$","").replace(".","").replace(",",".");
    const valor_tratado        = parseFloat(remocoes).toFixed(2);

    return valor_tratado;

  }

  verificaSaldo(){
    
    const valor_tratado        = this.tratarValor();
    const valor_verificado     = parseFloat(this.state.saldo_cliente).toFixed(2);
    var   valor_devido         = '';

    if(parseFloat(valor_tratado) > parseFloat(valor_verificado)){

        if((parseFloat(valor_tratado) > 1000) && (this.state.login_verificado == false)){this.toggle();}
        valor_devido       =  parseFloat(valor_verificado) - parseFloat(valor_tratado);  
        valor_devido       = ((Math.round(valor_devido*100))/100);
        const valor_final  =  this.float2moeda(valor_devido).replace(".",",").trim();
        
       // console.log(valor_final);

        this.setState({libera_cartao:true});
        return valor_final;
    }else{
        this.setState({libera_cartao:false});
        return '';
    }
  }

  float2moeda(num){

    var x = 0;
    
    if(num<0) {
       num = Math.abs(num);
       x = 1;
    }
    if(isNaN(num)) num = "0";
       var cents = Math.floor((num*100+0.5)%100);

    num = Math.floor((num*100+0.5)/100).toString();

    if(cents < 10) cents = "0" + cents;
       for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
          num = num.substring(0,num.length-(4*i+3))+''//milhar
                +num.substring(num.length-(4*i+3));
                            var ret = num + '.' + cents; //centavos
                              if (x == 1) ret = '-'+ret;return ret;
  }

  handleInputChange = event => {

        //console.log(event.event.target);
        const target = event.event ? event.event.target: event.target;
        const name = event.event ? 'valor' : target.name;
        const value = target.value;

        this.setState(prevState => ({
            transferencia: { 
                ...prevState.transferencia, 
            [name]: value 
            }
        }));

        if(name === 'valor'){

            const valor = this.verificaSaldo();

            this.setState(prevState => ({
              transferencia: { 
                  ...prevState.transferencia, 
              ['valor_devido']: valor 
              }
           }));

        }
  };

  handleChange = event => {

    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState(prevState => ({
        login: { 
            ...prevState.login, 
        [name]: value 
        }
    }));

  };  

  handleCardChange = event => {

    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState(prevState => ({
        cartao: { 
            ...prevState.cartao, 
        [name]: value 
        }
    }));

  };  

  handleClick = event => {
    //const { id } = this.props.match.params;

    //const { id } = this.props;

    fetch("http://localhost:3001/api/clientes/logar", {

      method: "post",
      body: JSON.stringify(this.state.login),
      headers: {
        "Content-Type": "application/json"
      }

    })
      .then(data => {
        if (data.ok){
          //console.log('sucesso');
          this.setState({successLogin: "Cliente logado", login_verificado:true});
          setTimeout(function() {
              this.toggle();
          }.bind(this),
            2000
          );
        } else {
          data.json().then(data => {
            if (data.error){
              this.setState({ erroLogin: "Email ou senha inválidos" });
              setTimeout(function(){
                window.location.reload();
            }.bind(this),
              2000
            );
            }
          });
        }
      }).catch(erro => this.setState({ erroLogin: erro }));

    event.preventDefault();
  };

  handleCardClick = event => {

    //const { id } = this.props.match.params;
    //const { id } = this.props;

    fetch("http://localhost:3001/api/cartoes/create", {

      method: "post",
      body: JSON.stringify(this.state.cartao),
      headers: {
        "Content-Type": "application/json"
      }

    })
      .then(data => {

        if (data.ok){
          
         // console.log(this.state);
          
          data.json().then(data => {
            //console.log(data.cartao);
              this.setState({ 
                cartoes:[
                  {
                    id:data.cartao.id,
                    bandeira:data.cartao.bandeira
                  },
                ]
              });

          });
          
          this.setState({successLogin: "Cartão cadastrado"});
          setTimeout(function(){
              this.toggle_cartao();
          }.bind(this),
            2000
          );
        } else {
          data.json().then(data => {
            if (data.error){
            this.setState({ erroLogin: "Email ou senha inválidos" });
              setTimeout(function() {
                window.location.reload();
            }.bind(this),
              2000
            );
            }
          });
        }
      }).catch(erro => this.setState({ erroLogin: erro }));

    event.preventDefault();
  };


  handleSubmit = event => {

    const valor_tratado = this.tratarValor();

    if((parseFloat(valor_tratado) > 1000)){

      if(this.state.login_verificado == true){

        fetch("http://localhost:3001/api/transferencias/create", {
          
          method: "post",
          body: JSON.stringify(this.state.transferencia),
          headers: {
            "Content-Type": "application/json"
          }

        }).then(data => {
            if(data.ok){
              this.setState({success: "Transferencia feita com sucesso", redirect: true });
            } else {

              data.json().then(data => {

                if (data.error) {
                  this.setState({ erro: data.error });
                }

              });
            }

        }).catch(erro => this.setState({ erro: erro }));

    }else{

      this.setState({ erro:"Cliente precisa logar novamente para prosseguir com a operação", redirect: true });
    } 

  }else{

    fetch("http://localhost:3001/api/transferencias/create", {
          
      method: "post",
      body: JSON.stringify(this.state.transferencia),
      headers: {
        "Content-Type": "application/json"
      }

    }).then(data => {

        if(data.ok){
          this.setState({success: "Transferencia feita com sucesso", redirect: true });
        } else {
          data.json().then(data => {
            console.log('entrou no erro');
            if (data.error) {
              this.setState({ erro: data.error });
            }
          });
        }

    }).catch(erro => this.setState({ erro: erro }));
  }
    event.preventDefault();
  };
}

export default withAuth(CriarTransferencias);