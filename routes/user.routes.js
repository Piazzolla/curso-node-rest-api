const { Router } = require("express");
const { check } = require("express-validator");
const { usuariosGet, usuariosPost, usuariosDelete, usuariosPut } = require("../controllers/user.controller");
const { validarCampos } = require('../middlewares/validar-campos');
const Role = require('../models/role');
const router = Router();

router.get("/", usuariosGet);
router.put("/:id", usuariosPut);
router.post("/",[
    check('correo', 'El correo no es válido').isEmail(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'Debe tener un password de al menos 6 letras').isLength({min: 6}),
  //  check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('rol').custom( async( rol = '') => {
      const existeRol = await Role.findOne({ rol });
      if(!existeRol) {
          throw new Error(`El rol ${rol} no está registrado en la BD` )
      }
   }),  
  validarCampos
], usuariosPost);
router.delete("/", usuariosDelete);

module.exports = router;
