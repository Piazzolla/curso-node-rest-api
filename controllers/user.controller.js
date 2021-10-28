const { response } = require("express");

const usuariosGet = (req, res) => {
    const { q, nombre = 'no name', apikey} = req.query;
  res.json({ msg: "get API controller", q, nombre, apikey });
};

const usuariosPost = (req, res) => {
  const {nombre, edad} = req.body;
  res.status(201).json({ msg: "post API controller", nombre, edad });
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
