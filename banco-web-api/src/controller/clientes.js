const Cliente = require("../model/cliente");
const status = require("http-status");

exports.buscarUm = (request, response, next) => {

  const id = request.params.id;

  //console.log(id);

  Cliente.findByPk(id)

    .then(cliente => {

      if (cliente){
        response.status(status.OK).send(cliente);
      } else {
        response.status(status.NOT_FOUND).send();
      }
    }).catch(error => next(error));

};


exports.logar = (request, response, next) => {

      const email    = request.body.email;
      const senha  = request.body.senha;

      Cliente.findOne({ where: {email: email,senha: senha} })

          .then(cliente => {

             if(cliente){

               response.status(status.OK).send(cliente);
                
            }else{

               response.status(status.NOT_FOUND).send({error:'Contato já existente'});
            }

      }).catch(error => next(error));  

};

exports.criar = (request, response, next) => {

  const nome = request.body.nome;
  const numero = request.body.numero;
  const email = request.body.email;
  const senha = request.body.senha;
  const saldo = request.body.saldo;

    Cliente.create({
      nome : nome,
    numero : numero,
     email : email,
     senha : senha,
     saldo : saldo
    })
    .then(() => {
      response.status(status.CREATED).send();
    })
    .catch(error => next(error));
};

exports.atualizar = (request, response, next) => {
  const id = request.params.id;

  const nome = request.body.nome;
  const numero = request.body.numero;
  const email = request.body.email;
  const senha = request.body.senha;
  const saldo = request.body.saldo;
  
  Cliente.findByPk(id)
    .then(cliente => {
      if (cliente) {
        Cliente.update(
          {
            nome : nome,
            numero: numero,
            email : email,
            senha : senha,
            saldo : saldo
          },
          { where: { id: id } }
        )
          .then(() => {
            response.status(status.OK).send();
          })
          .catch(error => next(error));
      } else {
        response.status(status.NOT_FOUND).send();
      }
    })
    .catch(error => next(error));
};

exports.excluir = (request, response, next) => {
  const id = request.params.id;

  Cliente.findByPk(id)
    .then(cliente => {
      if (cliente) {
        Cliente.destroy({
          where: { id: id }
        })
          .then(() => {
            response.status(status.OK).send();
          })
          .catch(error => next(error));
      } else {
        response.status(status.NOT_FOUND).send();
      }
    })
    .catch(error => next(error));
};
