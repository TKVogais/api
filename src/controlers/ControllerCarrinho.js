const CarrinhoService = require('../services/ServiceCarrinho')
const {
    Conversao,
    StringToArray
} = require('../services/ServiceAux')

const buscarCarrinho = async (req, res) => {
    let json = {
        vazio: true,
        results: [],
        total: 0
    }
    let carrinho = await CarrinhoService.BuscarCarrinho(req.body.id);
    console.log(carrinho)
    if (carrinho.length >= 1) {
        for (let i in carrinho) {
            json.results.push({
                Quant: carrinho[i].QUANT,
                Produto: carrinho[i].PRODUTO,
                Id: i,
                IdProduto: carrinho[i].ID_PRODUTO,
                Size: carrinho[i].SIZE,
                Preco: Conversao(carrinho[i].PRECO),
                Total: Conversao(carrinho[i].TOTAL),
                Sizes: StringToArray(carrinho[i].SIZES),
                Path: carrinho[i].PATH,
                IsSize: carrinho[i].ISSIZE,
                Estoque: carrinho[i].ESTOQUE
            })
            json.total += parseFloat(carrinho[i].TOTAL)
            console.log("Total: " + json.total)
        }
        json.vazio = false;
        json.total = Conversao(json.total)
    }
    res.json(json)
}

const alterarQuantidade = async (req, res) => {
    let data = req.body
    let quant = await CarrinhoService.BuscarQuantidade(data.idUsuario, data.idProduto);
    let soma = parseInt(quant[0].QUANT, 10) + parseInt(data.quant, 10)
    let response = await CarrinhoService.AlterarQuantidade(data.idUsuario, data.idProduto, soma)
    res.status(200).json({
        state: 200,
        response
    })
}

const alterarTamanho = async (req, res) => {
    let data = req.body
    let response = await CarrinhoService.AlterarTamanho(data.idUsuario, data.idProduto, data.size)
    res.json({
        state: 200,
        response
    })
}

const removerProduto = async (req, res) => {
    let data = req.body
    let response = await CarrinhoService.RemoverProduto(data.idUsuario, data.idProduto)
    res.json({
        state: 200,
        response
    })
}

const limparCarrinho = async (req, res) => {
    console.log(req.body)
    let response = await CarrinhoService.LimparCarrinho(req.body.idUsuario)
    res.json({
        state: 200,
        response
    })
}

const adicionarProduto = async (req, res) => {
    console.log(req.body)
    let {
        IdUsuario,
        IdProduto,
        Quant,
        Size
    } = req.body
    let QauntCarrinho = await CarrinhoService.VerificarCarrinho(IdProduto, IdUsuario)
    if (QauntCarrinho.length >= 1) {
        let quant = await CarrinhoService.BuscarQuantidade(IdUsuario, IdProduto);
        let soma = parseInt(quant[0].QUANT, 10) + parseInt(Quant, 10)
        let response = await CarrinhoService.AlterarQuantidade(IdUsuario, IdProduto, soma)
        res.json(response)
    } else {
        if (Size == 'null') {
            try {
                let [{
                    DEFAULTSIZE
                }] = await CarrinhoService.TamanhoPadrao(IdProduto)
                if (DEFAULTSIZE == null) {
                    DEFAULTSIZE = ''
                }
                Size = DEFAULTSIZE
            } catch (error) {
                Size = ''
            }

        }
        let response = await CarrinhoService.AdicionarProduto(IdUsuario, IdProduto, Quant, Size)
        res.json(response)
    }
}

const resgateCupom = async (req, res) => {
    let [response] = await CarrinhoService.ResgateCupom(req.body.cupom)
    let json = {
        State: 404
    }
    if (response) {
        json = {
            Cupom: response.CUPOM,
            Categoria: response.CATEGORIA,
            Tipo: response.TIPO_CUPOM,
            Status: response.STATUS,
            State: 200,
            Valor: response.VALOR,
            Message: "Cupom resgatado com sucesso!"
        }
    } else {
        json.Message = "Cupom inválido"
    }
    res.json(json)
}

module.exports = {
    buscarCarrinho,
    alterarQuantidade,
    alterarTamanho,
    removerProduto,
    limparCarrinho,
    adicionarProduto,
    resgateCupom
}