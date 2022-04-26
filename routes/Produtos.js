const express = require('express')
const router = express.Router();
const ControllerProduto = require('../src/controlers/ControllerProduto')

//Rotas

router.get('/produtos',  ControllerProduto.buscarProdutos)
router.get('/destaques', ControllerProduto.destaques)
router.post('/detalhes', ControllerProduto.detalhes)

//Exportação das Rotas

module.exports = router;