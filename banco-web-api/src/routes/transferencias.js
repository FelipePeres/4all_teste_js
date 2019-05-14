const express = require('express')
const controller = require('../controller/transferencias')
 
const router = express.Router()
 
router.get('/transferencias/get/:id', controller.buscarUm)
 
router.get('/transferencias/getall/:id', controller.buscarTodos)

router.get('/transferencias/getreceived/:id', controller.buscarRecebidas)
 
router.post('/transferencias/create', controller.criar)
 
module.exports = router