const ServiceUsuario = require('../services/ServiceUsuario')
const {
    uploadFile
} = require('../middlewares/s3')
const jwt = require('jsonwebtoken');
require('dotenv').config()

const cadastroUsuario = async (req, res) => {
    if (await duplicidadeDeDados(ServiceUsuario.UsuarioExistente(req.body.usuario))) {
        if (await duplicidadeDeDados(ServiceUsuario.EmailExistente(req.body.email))) {
            let {
                affectedRows,
                insertId
            } = await ServiceUsuario.CadastroDeUsuario(req.body)
            if (affectedRows == 1) {
                await ServiceUsuario.CriarSessao(insertId)
                res.json({
                    state: 201
                })
            } else {
                res.json({
                    state: 407
                })
            }
        } else {
            res.json({
                state: 406
            })
        }
    } else {
        res.json({
            state: 405
        })
    }
}

const duplicidadeDeDados = async (funcao) => {
    let state = false
    const response = await funcao
    if (response.length === 0) {
        state = true
    }
    return state
}
const logoutUsuario = async (req, res) => {
    const {
        affectedRows
    } = await ServiceUsuario.AtualizarSessao(req.body.id, "")
    if (affectedRows == 1) {
        res.json({
            state: 200,
            message: "Logout concluído!"
        })
    } else {
        res.json({
            state: 402,
            message: "Falha ao realizar logout!"
        })
    }
}
const loginUsuario = async (req, res) => {
    const [response] = await ServiceUsuario.LoginUsuario(req.body.usuario, req.body.senha)
    if (response) {
        let token = gerarToken(response.ID_USUARIO, response.EMAIL)
        await ServiceUsuario.AtualizarSessao(response.ID_USUARIO, token)
        res.json({
            state: 200,
            id_usuario: response.ID_USUARIO,
            usuario: response.USUARIO
        })
    } else {
        res.json({
            state: 404
        })
    }
}
const gerarToken = (usuario, email) => {
    let token = jwt.sign({
        usuario: usuario,
        email: email
    },
        process.env.NODE_JWT_KEY, {
        expiresIn: "1h"
    }
    )
    return token
}
const verificarToken = async (req, res) => {
    const [response] = await ServiceUsuario.BuscarToken(req.body.id)
    try {
        if (response.TOKEN == "") {
            res.json({
                state: false
            })
        } else {
            try {
                let decode = jwt.verify(response.TOKEN, process.env.NODE_JWT_KEY)
                res.json({
                    state: true
                })
            } catch (error) {
                res.json({
                    state: false
                })
            }
        }
    } catch (error) {
        res.json({
            state: false
        })
    }
}

const NotNull = (data) => {
    if (data == 'null') {
        return ''
    } else {
        return data
    }
}

const buscarPerfil = async (req, res) => {
    let json = {}
    const [response] = await ServiceUsuario.BuscarPerfil(req.body.id)
    json = {
        Email: response.EMAIL,
        Nome: response.NOME,
        Usuario: response.USUARIO,
        Nascimento: response.NASCIMENTO,
        Telefone: response.TELEFONE,
        Cep: response.CEP,
        Estado: response.ESTADO,
        Rua: response.RUA,
        Numero: response.NUMERO,
        Cidade: response.CIDADE,
        Complemento: response.COMPLEMENTO,
        Bairro: response.BAIRRO,
        Path: response.PATH
    }
    res.json(json)
}



const atualizarPerfil = async (req, res) => {
    console.log("[API]: Executei")
    if (req.body.Path == "") {
        const response = await ServiceUsuario.AtualizarPerfilSemFoto(req.body)
        console.log(response)
    } else {
        const response = await ServiceUsuario.AtualizarPerfilComFoto(req.body)
        console.log(response)
    }

    res.json({
        state: 200,
        message: "Perfil Atualizado com sucesso!"
    })
}

module.exports = {
    cadastroUsuario,
    loginUsuario,
    logoutUsuario,
    verificarToken,
    buscarPerfil,
    atualizarPerfil
}