const express = require('express')
const controller = require('../controller/contatos')
 
const router = express.Router()
 
router.get('/contatos/get/:id', controller.buscarUm)
 
router.get('/contatos/getall/:id', controller.buscarTodos)
//router.get('/contatos/getall', controller.buscarTodos)
 
router.post('/contatos/create', controller.criar)
 
router.put('/contatos/update/:id', controller.atualizar)
 
router.delete('/contatos/delete/:id', controller.excluir)
 
module.exports = router