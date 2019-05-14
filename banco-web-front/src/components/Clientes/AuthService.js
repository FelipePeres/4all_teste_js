
export default class AuthService{

    constructor(domain){

        this.domain = domain || `http://localhost:3001/api/clientes`;
        this.fetch  = this.fetch.bind(this) // React binding stuff
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
    }

    login(email,senha){

        return this.fetch(`${this.domain}/logar`,{

            method:'POST',
            body:JSON.stringify({
                email,
                senha
            })

        }).then(res => {

            //console.log(res.id);
            this.setToken(res.id);
            return Promise.resolve(res);
        })
    }

    fetch(url , options){

        const headers = {
            'Accept':'application/json',
            'Content-Type':'application/json'

        }

        if(this.loggedIn())
            headers['Authorization'] = `Bearer ${this.getToken()}`
            return fetch(url ,{
                headers,
                ...options

            })
            .then(this._checkStatus)
            .then(response => response.json())
    } 

    getToken(){

        return localStorage.getItem('id_token');
    }

    setToken(idToken){
        return localStorage.setItem('id_token',idToken);

    }

    loggedIn(){
         
        const token = this.getToken();

        return !!token;
    }

    logout(){

        localStorage.removeItem('id_token')
    }

    getProfile(){

        return this.getToken();
    }


    _checkStatus(response) {
        
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw "Usuário incorreto";
        }
    }


}