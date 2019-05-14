const Cartao = require("../model/cartao");
const Cliente = require("../model/cliente");
const status = require("http-status");
const Transferencia = require("../model/transferencia");

exports.buscarUm = (request, response, next) => {

  const id = request.params.id;

  //console.log(id);

  Cartao.findByPk(id).then(cartao => {

      if (cartao){
        response.status(status.OK).send(cartao);
      } else {
        response.status(status.NOT_FOUND).send();
      }
  })
    .catch(error => next(error));
};

exports.buscarTodos = (request, response, next) => {
  
  const id   = request.params.id;

  let limite = parseInt(request.query.limite || 0);
  let pagina = parseInt(request.query.pagina || 0);

  if (!Number.isInteger(limite) || !Number.isInteger(pagina)) {
    response.status(status.BAD_REQUEST).send();
  }

  const ITENS_POR_PAGINA = 10;

  limite = limite > ITENS_POR_PAGINA || limite <= 0 ? ITENS_POR_PAGINA : limite;
  pagina = pagina <= 0 ? 0 : pagina * limite;


  Cartao.findAll({
    where:{clienteId:id}, 
    limit: limite, 
    offset: pagina,
    include: [ Cliente ] })

    .then(cartoes => {
      response.send(cartoes);
    })
    .catch(error => next(error));
};

exports.criar = (request, response, next) => {

  const numero = request.body.numero;
  const bandeira = request.body.bandeira;
  const clienteId = request.body.clienteId;

    Cartao.create({
      numero: numero,
      bandeira: bandeira,
      clienteId: clienteId
    }).then((x) => {

        //console.log(x.id);
      response.status(status.CREATED).send({cartao:{id: x.id,bandeira: x.bandeira}});
    })
    .catch(error => next(error));
};

exports.atualizar = (request, response, next) => {

  const id        = request.params.id;

  const numero    = request.body.numero;
  const bandeira  = request.body.bandeira;
  const clienteId = request.body.clienteId;
  
  Cartao.findByPk(id)
    .then(cartao => {
      if (cartao) {
        Cartao.update(
          {
            numero: numero,
            bandeira: bandeira,
            clienteId:clienteId
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


   Transferencia.findAll({ where: {tem_cartao: id} })

          .then(transferencias => {

           

             if(transferencias){

               //console.log('cheguei aqui');

               response.status(status.NOT_FOUND).send({error:'Esse cartão não pode ser excluido, pois possui transferencias associadas'});
                
            }else{

                Cartao.findByPk(id)
                  .then(cartao => {
                    if (cartao) {
                      Cartao.destroy({
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
