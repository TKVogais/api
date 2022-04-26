const db = require('../db')

const BuscarTodosProdutos = () => {
    return new Promise((aceito, rejeitado) => {
        db.query("SELECT ID_PRODUTO, PATH, P.NOME, PRECO, AN.NOME AS CLASSE, DESC1, DESC2, DESC3, ISSIZE, ESTOQUE, DEFAULTSIZE, SIZES, AN.NOME AS ANIME FROM PRODUTOS AS P INNER JOIN ANIMES AS AN ON P.ID_ANIME = AN.ID_ANIME"
            , (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results)
            })
    })
}
const Destaques = () => {
    return new Promise((aceito, rejeitado) => {
        db.query(`SELECT P.ID_PRODUTO AS ID, P.NOME AS NOME, P.PRECO, P.PATH, P.DEFAULTSIZE, P.ISSIZE
                    FROM DESTAQUES AS D 
                    INNER JOIN PRODUTOS AS P ON D.ID_PRODUTO = P.ID_PRODUTO
                    INNER JOIN ANIMES   AS A ON A.ID_ANIME   = P.ID_ANIME
                    INNER JOIN CLASSES  AS C ON C.ID_CLASSE  = P.ID_CLASSE`
            , (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results)
            })
    })
}
const Detalhes = (id) => {
    return new Promise((aceito, rejeitado) => {
        db.query(`SELECT ID_PRODUTO, PATH, P.NOME, PRECO, C.NOME AS CLASSE, DESC1, DESC2, DESC3, ISSIZE, ESTOQUE, DEFAULTSIZE, SIZES, A.NOME AS ANIME 
                    FROM PRODUTOS AS P 
                        INNER JOIN ANIMES AS A ON P.ID_ANIME = A.ID_ANIME
                        INNER JOIN CLASSES AS C ON C.ID_CLASSE = P.ID_CLASSE
                    WHERE ID_PRODUTO = ?`
            , [id], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results)
            })
    })
}

const Semelhantes = (id) => {
    return new Promise((aceito, rejeitado) => {
        db.query(`SELECT P.NOME, P.PRECO, P.ID_PRODUTO AS ID, P.DEFAULTSIZE, P.ISSIZE, P.PATH FROM PRODUTOS AS P 
                    INNER JOIN ANIMES AS A ON A.ID_ANIME = P.ID_ANIME
                    INNER JOIN CLASSES AS C ON C.ID_CLASSE = P.ID_CLASSE
                     WHERE (A.NOME = (SELECT A.NOME FROM PRODUTOS AS P INNER JOIN ANIMES AS A ON A.ID_ANIME = P.ID_ANIME WHERE P.ID_PRODUTO = ?) 
                        OR 
                    C.NOME = (SELECT C.NOME FROM PRODUTOS AS P INNER JOIN CLASSES AS C ON C.ID_CLASSE = P.ID_CLASSE WHERE P.ID_PRODUTO = ?)
                      ) 
                     AND 
                        P.NOME <> (SELECT P.NOME FROM PRODUTOS AS P WHERE P.ID_PRODUTO = ?)
                    ORDER BY RAND() LIMIT 0,4;`
            , [id, id, id], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results)
            })
    })
}

module.exports = { BuscarTodosProdutos, Destaques, Detalhes, Semelhantes }