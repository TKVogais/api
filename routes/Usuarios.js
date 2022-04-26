const express = require('express');
const multer = require('multer');
const router = express.Router();
const upload = multer({
    dest: "./images/"
})

const ControllerUsuario = require('../src/controlers/ControllerUsuario')

//Rotas

router.post('/cadastro', ControllerUsuario.cadastroUsuario)
router.post('/login', ControllerUsuario.loginUsuario)
router.post('/logout', ControllerUsuario.logoutUsuario)
router.post('/token', ControllerUsuario.verificarToken)
router.post('/perfil', ControllerUsuario.buscarPerfil)
router.put('/perfil', upload.single('image'), ControllerUsuario.atualizarPerfil)
router.post('/foto', ControllerUsuario.atualizarFotoPerfil)
//Exportação das Rotas

module.exports = router;