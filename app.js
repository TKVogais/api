//Carregando Módulos

const express = require("express");
const app = express();
const cors = require('cors');


//Configurações
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 3000;

//Carregando Rotas

const RouteProduto = require('./routes/Produtos')
const RouteUsuario = require('./routes/Usuarios')
const RouteCarrinho = require('./routes/Carrinho')

//Configurando Rotas

app.use('/api', RouteProduto)
app.use('/api', RouteUsuario)
app.use('/api', RouteCarrinho)

//Iniciando o Servidor

app.listen(PORT, () => {
    console.log("Rodando o API na porta " + PORT);
})