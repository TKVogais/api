const express = require('express')
const router = express.Router();
const ControllerCarrinho = require('../src/controlers/ControllerCarrinho')


//Rotas

router.post('/carrinho', ControllerCarrinho.buscarCarrinho);
router.post('/quantidade', ControllerCarrinho.alterarQuantidade)
router.post('/tamanho', ControllerCarrinho.alterarTamanho)
router.post('/limpar-carrinho', ControllerCarrinho.limparCarrinho)
router.post('/remover-produto', ControllerCarrinho.removerProduto)
router.post('/addproduto', ControllerCarrinho.adicionarProduto)
router.post('/cupom', ControllerCarrinho.resgateCupom)

//Exportação das Rotas


module.exports = router