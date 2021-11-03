const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");

const usuariosGet = async (req, res) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).limit(Number(limite)).skip(Number(desde)),
  ]);

  res.json({ total, usuarios });
};

const usuariosPost = async (req, res) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);
  await usuario.save();
  res.status(201).json(usuario);
};

const usuariosDelete = async(req, res) => {

  const { id } = req.params;

  //borrar físicamente
  //const usuario = await Usuario.findByIdAndDelete(id);

  //delete por estado
  const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
  res.json({ usuario });
};

const usuariosPut = async (req, res) => {
  const id = req.params.id;
  const { _id, password, google, correo, ...resto } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }
  //todo validar id contra db
  const usuario = await Usuario.findByIdAndUpdate(id, resto);
  res.json({ msg: "put API", usuario });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosDelete,
  usuariosPut,
};
