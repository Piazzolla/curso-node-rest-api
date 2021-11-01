const { response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = (req, res) => {
    const { q, nombre = 'no name', apikey} = req.query;
  res.json({ msg: "get API controller", q, nombre, apikey });
};

const usuariosPost = async (req, res) => {

  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });
  
  //verificar si existe el correo
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    return res.status(400).json("ese correo ya está registrado");
  }

  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);
  await usuario.save();
  res.status(201).json(usuario);
};

const usuariosDelete = (req, res) => {
  res.json({ msg: "delete API" });
};

const usuariosPut = (req, res) => {
    const id = req.params.id;
  res.json({ msg: "put API", id });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosDelete,
  usuariosPut,
};
