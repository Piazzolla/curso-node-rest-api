const { Router } = require("express");
const { check } = require("express-validator");
const { usuariosGet, usuariosPost, usuariosDelete, usuariosPut } = require("../controllers/user.controller");
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, esMailExistente, esUsuarioExistente } = require('../helpers/db-validators');
const router = Router();

router.get("/", usuariosGet);
router.put("/:id",[
  check('id', 'No es un Id válido').isMongoId(),
  check('id').custom(esUsuarioExistente),
  check('rol').custom( esRoleValido ), 
  validarCampos
] ,usuariosPut);
router.post("/",[
    check('correo', 'El correo no es válido').isEmail(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'Debe tener un password de al menos 6 letras').isLength({min: 6}),
  //  check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('rol').custom( esRoleValido ),  
  check('correo').custom( esMailExistente ),
  validarCampos
], usuariosPost);
router.delete("/", usuariosDelete);

module.exports = router;
