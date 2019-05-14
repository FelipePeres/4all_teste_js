const Transferencia = require("../model/transferencia");
const Cliente = require("../model/cliente");
const Contato = require("../model/contato");
const Cartao = require("../model/cartao");
const status = require("http-status");
var moment = require("moment");

exports.buscarUm = (request, response, next) => {

const id = request.params.id;

  //console.log(id);
Transferencia.findByPk(id)
  
    .then(transferencia => {

      if (transferencia) {
        response.status(status.OK).send(transferencia);
      } else {
        response.status(status.NOT_FOUND).send();
      }
    })
    .catch(error => next(error));
};

exports.buscarTodos = (request, response, next) => {
  
  const id = request.params.id;

  Transferencia.findAll({
    where:{clienteEnvId:id},
    include:[Cliente,Contato,Cartao],
    
  })
    .then(transferencias => {
      response.send(transferencias);
    })
    .catch(error => next(error));
};

exports.buscarRecebidas = (request, response, next) => {
  
  const id = request.params.id;

     Cliente.findByPk(id)
        .then(cliente => {
          if (cliente) {

            //seu numero de cliente
            let cliente_numero = cliente.numero; 
            
            console.log(cliente_numero);

            //pegar seus cadastros como contato de outros clientes
             Contato.findAll({ where: {numero: cliente_numero,banco:''}})

                    .then(contatos => {

                      var ids_contatos = new Array();

                      contatos.forEach(function(data, index) {
                          ids_contatos.push(data.id);
                      });

                      console.log(ids_contatos);
                       Transferencia.findAll({
                          where:{contatoRecId:ids_contatos},
                          include:[Cliente]
                       })
                       .then(transferencias => {

                         // console.log(transferencias);

                          response.send(transferencias);
                       })
                       .catch(error => next(error));


             }) 

              
          } 
        })

        /*Transferencia.findAll({
          where:{contatoRecId:id}

        })
        .then(transferencias => {
          response.send(transferencias);
        })
        .catch(error => next(error));*/
};

exports.criar = (request, response, next) => {

  const valor        = formataValorFinal(request.body.valor);
  const valor_devido = formataValorFinal(request.body.valor_devido);

  const clienteEnvId = request.body.clienteEnvId;
  const contatoRecId = request.body.contatoRecId;
  const tem_cartao   = request.body.tem_cartao;

  Transferencia.findAll({
    limit: 1,
    where: {
      clienteEnvId: clienteEnvId, contatoRecId:contatoRecId,valor:valor
    },
    order: [ [ 'createdAt', 'DESC' ]]

  }).then(function(tranferencia){
    
    //console.log(tranferencia);

    if(typeof tranferencia !== 'undefined' && tranferencia.length > 0){
        
      //console.log('entrou aqui');
      var dateTime = new Date();
      var a = moment(dateTime);
      var b = moment(tranferencia[0].createdAt);

      var diferenca = a.diff(b,'minutes');

      if(parseInt(diferenca) <= 2){

        //devoluções
         Cliente.findByPk(clienteEnvId)
        .then(cliente => {
          if (cliente) {

              var novo_saldo = parseFloat(cliente.saldo) + parseFloat(valor);

              Cliente.update(
              {
                saldo : novo_saldo,
              },
                { where: { id: clienteEnvId } }
              ) 
          } 
        })

        Contato.findByPk(contatoRecId)

          .then(contato => {   
            //console.log(contato);
            if(contato.banco == ''){

              Cliente.findOne({ where: {numero: contato.numero} })

              .then(cliente => { 

                 console.log(cliente);

                 var novo_saldo_contato = parseFloat(cliente.saldo) - parseFloat(valor);

                  Cliente.update(
                  {
                    saldo : novo_saldo_contato,
                  },
                    { where: { id: cliente.id } }
                  )
              })       
            }
        });


        //cancelamento de transação

        Transferencia.destroy({
          where: { id: tranferencia[0].id }

        })//.then(() => {
            //response.status(status.OK).send();
        //})
          //.catch(error => next(error));
      }
    }
     
    Transferencia.create({

       valor: valor,
       valor_devido: valor_devido,
       clienteEnvId: clienteEnvId,
       contatoRecId: contatoRecId,
       tem_cartao: tem_cartao

    }).then(() => { //atualizar saldos

      Cliente.findByPk(clienteEnvId)
        .then(cliente => {
          if (cliente) {

             // console.log(cliente.saldo);

              var novo_saldo = parseFloat(cliente.saldo) - parseFloat(valor);

              Cliente.update(
              {
                saldo : novo_saldo,
              },
                { where: { id: clienteEnvId } }
              )

            //response.status(status.OK).send(contato);
          } //else {
            //response.status(status.NOT_FOUND).send();
          //}
        })//.catch(error => next(error));

      Contato.findByPk(contatoRecId)

        .then(contato => {   
          //console.log(contato);
          if(contato.banco == ''){

            Cliente.findOne({ where: {numero: contato.numero} })

            .then(cliente => { 

               console.log(cliente);

               var novo_saldo_contato = parseFloat(cliente.saldo) + parseFloat(valor);

                Cliente.update(
                {
                  saldo : novo_saldo_contato,
                },
                  { where: { id: cliente.id } }
                )
            })       
          }
      });

      response.status(status.CREATED).send();

    }).catch(error => next(error));


  });   
};

function formataValorFinal(valor){

    const valor_corrente       = valor;
    const remocoes             = valor_corrente.replace("R$","").replace(",",".");
    const valor_tratado        = parseFloat(remocoes).toFixed(2);

    return valor_tratado;

}




