import React, { Component } from "react";

class ConfirmarRemoverContato extends Component {

  constructor(props) {

    super(props);

    this.state = {
      contato: {},
      erro: null,
      success:null,
      redirect: false
    };
  }

  updateState(){
    this.setState({ redirect: false });
  }

  toggle(){    
    this.setState({
      modal: !this.state.modal,
    });
  }

  exibeSuccess(){

    const {success}  = this.state;
        
      if (success){

          return (
              <div className="alert alert-success" role="alert">
                <p>{success}</p>
              </div>
          );

      }
  }

  exibeErro(){

    const { erro } = this.state;

    if (erro) {
      return (
        <div className="alert alert-danger" role="alert">
         {erro}
        </div>
      );
    }
  }

  componentDidMount(){

    //const { id } = this.props.match.params;
    const { id } = this.props;
    //console.log(id);

    fetch(`http://localhost:3001/api/contatos/get/${id}`)
      .then(data => {
        data.json().then(data => {
          if (data.error) {
            this.setState({ erro: data.error });
          } else {
            this.setState({ contato: data });
          }
        });
      }).catch(erro => this.setState({ erro: erro }));
  }

  render(){

      console.log(this.state);

      return (

        <div className="card">
          <h5 className="card-header">Remover Contato</h5>
          <div className="card-body">
            {this.exibeErro()}
            {this.exibeSuccess()}
            <p>
              Tem certeza que deseja remover esse Contato?
            </p>
            <blockquote className="blockquote text-center">
              <p className="mb-0">{this.state.contato.nome}</p>
              <footer className="blockquote-footer">
                {this.state.contato.numero}
                <cite title={this.state.contato.banco}>
                  {this.state.contato.banco}
                </cite>
              </footer>
            </blockquote>
            <button
              className="btn btn-danger btn-block"
              role="button"
              onClick={this.handleClick}
            >
              Remover
            </button>
          </div>
        </div>
      );
    
  }

  handleClick = event => {
    //const { id } = this.props.match.params;

    const { id } = this.props;

    fetch(`http://localhost:3001/api/contatos/delete/${id}`, {
      method: "delete"
    })
      .then(data => {
        if (data.ok){

          this.setState({ success: "Contato Removido com sucesso", redirect: true });
          setTimeout(
            function() {
              window.location.reload();
            }
            .bind(this),
            2000
          );

        } else {
          data.json().then(data => {
            console.log(data);
            if (data.error) {
              this.setState({ erro: data.error });
            }
          });
        }
      }).catch(erro => this.setState({ erro: erro }));

    event.preventDefault();
  };
}

export default ConfirmarRemoverContato;
