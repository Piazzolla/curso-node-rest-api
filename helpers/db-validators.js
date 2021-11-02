const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la BD`);
  }
};

//verificar si existe el correo
const esMailExistente = async (correo) => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error("ese correo ya está registrado");
  }
};


//verificar si existe el usuario
const esUsuarioExistente = async (id) => {
    const existeUsuario = await Usuario.findOne({id});
    if (!existeUsuario) {
      throw new Error(`Usuario con id: ${id} no existe`);
    }
  };
  
module.exports = {
  esRoleValido,
  esMailExistente,
  esUsuarioExistente
};
