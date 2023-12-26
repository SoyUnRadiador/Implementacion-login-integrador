const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Carts' //Verificar como manejar los carritos
    },
    role: {
        type: String,
        default: 'user'
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;


