  const express = require('express')
  const controller = require('../controller/cartoes')
   
  const router = express.Router()
   
  router.get('/cartoes/get/:id', controller.buscarUm)
   
  router.get('/cartoes/getall/:id', controller.buscarTodos)
   
  router.post('/cartoes/create', controller.criar)
   
  router.put('/cartoes/update/:id', controller.atualizar)
   
  router.delete('/cartoes/delete/:id', controller.excluir)
   
  module.exports = router