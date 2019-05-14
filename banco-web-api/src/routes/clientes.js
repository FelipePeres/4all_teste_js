const express = require('express')
const controller = require('../controller/clientes')
 
const router = express.Router()
 
router.get('/clientes/get/:id', controller.buscarUm)
  
router.post('/clientes/create', controller.criar)
 
router.post('/clientes/logar', controller.logar)

router.put('/clientes/update/:id', controller.atualizar)
 
router.delete('/clientes/delete/:id', controller.excluir)
 
module.exports = router