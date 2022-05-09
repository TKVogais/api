const db = require('../db')

const CadastroDeUsuario = (Usuario) => {
    let {
        usuario,
        senha,
        email
    } = Usuario
    return new Promise((aceito, rejeitado) => {
        db.query("INSERT INTO USUARIOS (USUARIO, SENHA, EMAIL) VALUES (?,?,?)", [usuario, senha, email], (error, results) => {
            if (error) {
                rejeitado(error);
                return;
            }
            aceito(results)
        })
    })
}

const UsuarioExistente = (usuario) => {
    return new Promise((aceito, rejeitado) => {
        db.query("SELECT ID_USUARIO FROM USUARIOS WHERE USUARIO = ?", [usuario], (error, results) => {
            if (error) {
                rejeitado(error);
                return;
            }
            aceito(results)
        })
    })
}
const EmailExistente = (email) => {
    return new Promise((aceito, rejeitado) => {
        db.query("SELECT ID_USUARIO FROM USUARIOS WHERE EMAIL = ?", [email], (error, results) => {
            if (error) {
                rejeitado(error);
                return;
            }
            aceito(results)
        })
    })
}
const LoginUsuario = (usuario, senha) => {
    return new Promise((aceito, rejeitado) => {
        db.query("SELECT ID_USUARIO, USUARIO, EMAIL FROM USUARIOS WHERE USUARIO = ? AND SENHA = ?", [usuario, senha], (error, results) => {
            if (error) {
                rejeitado(error);
                return;
            }
            aceito(results)
        })
    })
}
const CriarSessao = (id) => {
    return new Promise((aceito, rejeitado) => {
        db.query("INSERT INTO SESSIONS (ID_USUARIO) VALUES (?)", [id], (error, results) => {
            if (error) {
                rejeitado(error);
                return;
            }
            aceito(results)
        })
    })
}

const AtualizarSessao = (id, token) => {
    return new Promise((aceito, rejeitado) => {
        db.query("UPDATE SESSIONS SET TOKEN = ? WHERE ID_USUARIO = ?", [token, id], (error, results) => {
            if (error) {
                console.log(error);
                rejeitado(error);
                return;
            }
            aceito(results)
        })
    })
}
const BuscarToken = (id) => {
    return new Promise((aceito, rejeitado) => {
        db.query("SELECT TOKEN FROM SESSIONS WHERE ID_USUARIO = ?", [id], (error, results) => {
            if (error) {
                rejeitado(error);
                return;
            }
            aceito(results)
        })
    })
}

const BuscarID = (usuario) => {
    return new Promise((aceito, rejeitado) => {
        db.query("SELECT ID_USUARIO AS id FROM USUARIOS WHERE USUARIO = ?", [usuario], (error, results) => {
            if (error) {
                rejeitado(error);
                return;
            }
            aceito(results)
        })
    })
}

const BuscarPerfil = (idUsuario) => {
    return new Promise((aceito, rejeitado) => {
        db.query("SELECT * FROM USUARIOS WHERE ID_USUARIO = ?", [idUsuario], (error, results) => {
            if (error) {
                rejeitado(error);
                return;
            }
            aceito(results)
        })
    })
}
const AtualizarPerfilComFoto = (perfil) => {
    const {
        Path,
        Nome,
        Nascimento,
        Telefone,
        Cep,
        Estado,
        Rua,
        Complemento,
        Numero,
        Cidade,
        Bairro,
        Id
    } = perfil
    return new Promise((aceito, rejeitado) => {
        db.query(`UPDATE USUARIOS SET 
                    NOME = ?,
                    NASCIMENTO = ?,
                    TELEFONE = ?,
                    CEP = ?,
                    ESTADO = ?,
                    RUA = ?,
                    COMPLEMENTO = ?,
                    NUMERO = ?,
                    CIDADE = ?,
                    BAIRRO = ?,
                    PATH = ?
                WHERE ID_USUARIO = ?`,
            [
                Nome,
                Nascimento,
                Telefone,
                Cep,
                Estado,
                Rua,
                Complemento,
                Numero,
                Cidade,
                Bairro,
                Path,
                Id
            ],
            (error, results) => {
                if (error) {
                    rejeitado(error);
                    return;
                }
                aceito(results)
            })
    })
}
const AtualizarPerfilSemFoto = (perfil) => {
    const {
        Nome,
        Nascimento,
        Telefone,
        Cep,
        Estado,
        Rua,
        Complemento,
        Numero,
        Cidade,
        Bairro,
        Id
    } = perfil
    return new Promise((aceito, rejeitado) => {
        db.query(`UPDATE USUARIOS SET 
                    NOME = ?,
                    NASCIMENTO = ?, 
                    TELEFONE = ?,
                    CEP = ?,
                    ESTADO = ?,
                    RUA = ?,
                    COMPLEMENTO = ?,
                    NUMERO = ?,
                    CIDADE = ?,
                    BAIRRO = ?
                WHERE ID_USUARIO = ?`,
            [
                Nome,
                Nascimento,
                Telefone,
                Cep,
                Estado,
                Rua,
                Complemento,
                Numero,
                Cidade,
                Bairro,
                Id
            ],
            (error, results) => {
                if (error) {
                    rejeitado(error);
                    return;
                }
                aceito(results)
            })
    })
}


module.exports = {
    CadastroDeUsuario,
    UsuarioExistente,
    EmailExistente,
    LoginUsuario,
    CriarSessao,
    AtualizarSessao,
    BuscarToken,
    BuscarPerfil,
    AtualizarPerfilComFoto,
    AtualizarPerfilSemFoto,
    BuscarID
}