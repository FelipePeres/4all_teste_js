const Contato = require("../model/contato");
const Cliente = require("../model/cliente");
const Transferencia = require("../model/transferencia");
const status = require("http-status");

exports.buscarUm = (request, response, next) => {

  const id = request.params.id;

  //console.log(id);

  Contato.findByPk(id)
    .then(contato => {
      if (contato) {
        response.status(status.OK).send(contato);
      } else {
        response.status(status.NOT_FOUND).send();
      }
    })
    .catch(error => next(error));
};


exports.buscarTodos = (request, response, next) => {
  
    const id = request.params.id;
    
    //console.log(id);

      Contato.findAll({
        where:{clienteContatoId:id},
        include:[Cliente]
      }).then(contatos => {
        response.send(contatos);
      })
      .catch(error => next(error));
};
  
//pesquisar se existe o numero na tabela contato
//se o banco estiver em branco é porque ele esta vinculado ao banco do gerenciador e entao...
//se nao existir o numero na tabela contato, pesquisar se o numero possui vinculaçao com cliente,
//se possuir vinculaçao com um cliente, entao criar o contato tipo Ekki
exports.criar = (request, response, next) => {

      const nome = request.body.nome;
      const numero = request.body.numero;
      const banco = request.body.banco;
      const clienteContatoId   = request.body.clienteContatoId;

      var banco_final = '';

      if(!banco){

        banco_final = '';
          
      }else{

        banco_final = banco;
      }


      Contato.findOne({ where: {numero: numero,banco: banco_final,clienteContatoId:clienteContatoId} })

          .then(contato => {
              
            if(contato){

              response.status(status.NOT_FOUND).send({error:'Contato já existente'});

              //console.log(JSON.stringify('contato existente'));

            }else{


              if(!banco){

                  Cliente.findOne({ where: {numero: numero }})

                    .then(cliente => {

                      //console.log(JSON.stringify(cliente));
                      if(cliente){

                          Contato.create({
                            nome : nome,
                            numero : numero,
                            banco : banco,
                            clienteContatoId : clienteContatoId
                          }).then(() => {
                            response.status(status.CREATED).send({success:'Ok. Contato vinculado a Cliente e cadastrado!'})})
                            .catch(error => next(error));

                      }else{

                          response.status(status.NOT_FOUND).send({error:'Erro. Contato não vinculado a cliente!'});
                          //response.status(500).JSON({error:'Erro. Contato não vinculado a cliente!'});
                      }     
                       
                   }) 

                    //console.log(JSON.stringify('contato nao existente'));
              }else{

                      Contato.create({
                            nome : nome,
                            numero : numero,
                            banco : banco,
                            clienteContatoId : clienteContatoId
                          }).then(() => {
                      response.status(status.CREATED).send({success:'Ok. Contato de outro banco cadastrado!'})})
                      .catch(error => next(error));
              }
               
            }
      })  
};

exports.atualizar = (request, response, next) => {

  const id = request.params.id;

  const nome = request.body.nome;
  const numero = request.body.numero;
  const banco = request.body.banco;
  const clienteContatoId = request.body.clienteContatoId;

  
  Contato.findByPk(id)
    .then(contato => {
      if (contato) {
        Contato.update(
          {
            nome : nome,
            numero : numero,
            banco : banco,
            clienteContatoId : clienteContatoId,
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

      Transferencia.findAll({ where: {contatoRecId: id} })

          .then(transferencias => {

             if(transferencias){

               response.status(status.NOT_FOUND).send({error:'Esse contato não pode ser excluido, pois possui transferencias associadas'});
                
            }else{

               Contato.findByPk(id)
                .then(contato => {
                  if (contato) {
                    Contato.destroy({
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

            }

      }).catch(error => next(error));  

};
