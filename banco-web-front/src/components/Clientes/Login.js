import React from 'react';
import AuthService from './AuthService';

  class Login extends React.Component{

        constructor(){

          super();
        
          this.handleChange = this.handleChange.bind(this);
          this.handleFormSubmit = this.handleFormSubmit.bind(this);
          this.Auth = new AuthService();
        }

        componentWillMount(){

            if(this.Auth.loggedIn())
              this.props.history.replace('/');
            
        }
  
        render(){

          console.log(this.state);
              return (
        <div>

          <br className="clear"/>
          <br className="clear"/>

              <div className="row card-align">

              <div className="col-lg-5 col-md-6s">
              
              
              <div className="card">
                <form onSubmit={this.handleFormSubmit}>
                  <div className="card-block">

                      <div className="text-center">
                          <h3><i className="fa fa-lock"></i> Login:</h3>
                          <hr className="mt-2 mb-2"/>
                      </div>
                      <div className="md-form">
                          <i className="fa fa-envelope prefix"></i>
                          <input type="text" id="form2" name="email" className="form-control" placeholder="Email" onChange={this.handleChange}/>
                          
                      </div>

                      <div className="md-form">
                          <i className="fa fa-lock prefix"></i>
                          <input type="password" id="form4" name="senha" className="form-control" placeholder="Senha" onChange={this.handleChange} />
                         
                      </div>

                      <div className="text-center">
                          <button type="submit" className="btn btn-deep-purple" onClick={this.autenticaCliente}>Login</button>
                      </div>

                  </div>
                </form>
              </div>

              </div>
              
              </div>
          </div>     
          
          )
        }

        handleChange(e) {

          //console.log(e.target.name);

          this.setState({
              
              [e.target.name]: e.target.value 
              
          });

        }

        handleFormSubmit(e){

          e.preventDefault();
          this.Auth.login(this.state.email,this.state.senha)
            .then(res =>{
             // console.log(res);
                this.props.history.replace('/')
            }).catch(err => alert(err))

        }
        
        

  }

export default Login;