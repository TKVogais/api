const ProdutoService = require('../services/ServiceProduto')

const StringToArray = (str) => {
    let sizes = ["M", "G"];
    return sizes;
}
const BitToBoolean = (bit) => {
    switch (bit) {
        case 0: return false
        case 1: return true
    }
}
const buscarProdutos = async (req, res) => {
    let json = { error: '', results: [] }
    let produtos = await ProdutoService.BuscarTodosProdutos();
    for (let i in produtos) {
        json.results.push({
            Id: produtos[i].ID_PRODUTO,
            Path: produtos[i].PATH,
            Preco: produtos[i].PRECO,
            Nome: produtos[i].NOME,
            IsSize: BitToBoolean(produtos[i].ISSIZE),
            DefaultSize: produtos[i].DEFAULTSIZE
        })
    }
    res.json(json)
}
const destaques = async (req, res) => {
    console.log("[API]: Requisição recebida.")
    let json = { results: [] }
    let produtos = await ProdutoService.Destaques();
    for (let i in produtos) {
        json.results.push({
            Id: produtos[i].ID,
            Path: produtos[i].PATH,
            Preco: produtos[i].PRECO,
            Nome: produtos[i].NOME,
            IsSize: BitToBoolean(produtos[i].ISSIZE),
            DefaultSize: produtos[i].DEFAULTSIZE
        })
    }
    res.json(json)
}

const detalhes = async (req, res) => {
    let json = {}
    let produtos = await ProdutoService.Detalhes(req.body.id);
    let response = await ProdutoService.Semelhantes(req.body.id)
    let semelhantes = []
    for (let i in produtos) {
        json = {
            Id: produtos[i].ID_PRODUTO,
            Nome: produtos[i].NOME,
            Path: produtos[i].PATH,
            Preco: produtos[i].PRECO,
            Classe: produtos[i].CLASSE,
            Desc1: produtos[i].DESC1,
            Desc2: produtos[i].DESC2,
            Desc3: produtos[i].DESC3,
            IsSize: BitToBoolean(produtos[i].ISSIZE),
            Sizes: StringToArray(produtos[i].SIZES),
        }
    }
    for (let i in response) {
        semelhantes.push({
            Id: response[i].ID,
            Path: response[i].PATH,
            Preco: response[i].PRECO,
            Nome: response[i].NOME,
            IsSize: BitToBoolean(response[i].ISSIZE),
            DefaultSize: response[i].DEFAULTSIZE,
            Classe: response[i].CLASSE,
            Anime: response[i].ANIME
        })
    }
    
    json.semelhantes = semelhantes
    res.json(json)
}
module.exports = { buscarProdutos, destaques, detalhes }
