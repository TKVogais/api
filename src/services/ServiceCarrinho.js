const db = require('../db')

const BuscarCarrinho = (id) => {
    return new Promise((aceito, rejeitado) => {
        db.query(`SELECT CAR.ID_PRODUTO, P.ESTOQUE, P.ISSIZE, P.PATH, P.SIZES, P.PRECO, P.NOME AS PRODUTO, CAR.QUANT, CAR.SIZE, US.NOME AS USUARIO, P.PRECO, CAST(CAR.QUANT*P.PRECO AS DECIMAL(15,2)) AS TOTAL FROM CARRINHO AS CAR 
                    INNER JOIN USUARIOS AS US ON US.ID_USUARIO = CAR.ID_USUARIO
                    INNER JOIN PRODUTOS AS P  ON P.ID_PRODUTO =  CAR.ID_PRODUTO
                  WHERE US.ID_USUARIO = ?   ;`
            , [id], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results)
            })
    })
}
const BuscarQuantidade = (idUsuario, idProduto) => {
    return new Promise((aceito, rejeitado) => {
        db.query(`SELECT CAST(QUANT AS DECIMAL(15,0)) AS QUANT FROM CARRINHO WHERE ID_PRODUTO = ? AND ID_USUARIO = ?`
            , [idProduto, idUsuario], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results)
            })
    })
}
const AlterarQuantidade = (idUsuario, idProduto, quant) => {
    return new Promise((aceito, rejeitado) => {
        db.query(`UPDATE CARRINHO SET QUANT = ? WHERE ID_PRODUTO = ? AND ID_USUARIO = ?`
            , [quant, idProduto, idUsuario], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results)
            })
    })
}
const AlterarTamanho = (idUsuario, idProduto, size) => {
    return new Promise((aceito, rejeitado) => {
        db.query(`UPDATE CARRINHO SET SIZE = ? WHERE ID_PRODUTO = ? AND ID_USUARIO = ?`
            , [size, idProduto, idUsuario], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results)
            })
    })
}
const TamanhoPadrao = (idProduto) => {
    return new Promise((aceito, rejeitado) => {
        db.query(`SELECT DEFAULTSIZE FROM PRODUTOS WHERE ID_PRODUTO = ?`
            , [idProduto], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results)
            })
    })
}
const RemoverProduto = (idUsuario, idProduto) => {
    return new Promise((aceito, rejeitado) => {
        db.query(`DELETE FROM CARRINHO WHERE ID_PRODUTO = ? AND ID_USUARIO = ?;`
            , [idProduto, idUsuario], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results)
            })
    })
}
const LimparCarrinho = (idUsuario) => {
    return new Promise((aceito, rejeitado) => {
        db.query(`DELETE FROM CARRINHO WHERE ID_USUARIO = ?;`
            , [idUsuario], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results)
            })
    })
}
const AdicionarProduto = (idUsuario, idProduto, Quant, DefaultSize) => {
    return new Promise((aceito, rejeitado) => {
        db.query(`INSERT INTO CARRINHO (ID_PRODUTO, ID_USUARIO, QUANT, SIZE) VALUES (?,?,?, ?);`
            , [idProduto, idUsuario, Quant, DefaultSize], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results)
            })
    })
}

const VerificarCarrinho = (idProduto, idUsuario) => {
    return new Promise((aceito, rejeitado) => {
        db.query(`SELECT ID_PRODUTO FROM CARRINHO WHERE ID_PRODUTO = ? AND ID_USUARIO = ? `
            , [idProduto, idUsuario], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results)
            })
    })
}
const ResgateCupom = (cupom) => {
    return new Promise((aceito, rejeitado) => {
        db.query(`SELECT SC.STATUS, CP.CUPOM, CC.CATEGORIA, TC.TIPO_CUPOM, CP.VALOR
                  FROM CUPONS AS CP
                    INNER JOIN STATUS_CUPOM    AS SC ON SC.ID_STATUS    = CP.ID_STATUS
                    INNER JOIN CATEGORIA_CUPOM AS CC ON CC.ID_CATEGORIA = CP.ID_CATEGORIA
                    INNER JOIN TIPO_CUPOM      AS TC ON TC.ID_TIPO      = CP.ID_TIPO
                  WHERE CP.CUPOM = ?`
            , [cupom], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results)
            })
    })
}

module.exports = {
    BuscarCarrinho,
    AlterarQuantidade,
    BuscarQuantidade,
    AlterarTamanho,
    RemoverProduto,
    LimparCarrinho,
    TamanhoPadrao,
    AdicionarProduto,
    VerificarCarrinho,
    ResgateCupom
}