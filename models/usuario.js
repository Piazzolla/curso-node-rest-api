const { Schema, model} = require('mongoose');
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true,'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
       // enum: ['ADMIN_ROLE', 'USER_ROLE']
    },   
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});

/*sobreescribo el toJSON para sacar el password
y la versión que agrega mongo __v a la hora de devolver
el objeto creado 
*/
UsuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario } = this.toObject(); //el ...usuario desestructura EL RESTO de los campos (que no son __v ni password)
    return usuario;
}

module.exports = model('Usuarios', UsuarioSchema);