const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [{ type: Schema.Types.ObjectId, ref: 'posts' }]
})

const User = mongoose.model('users', UserSchema);
module.exports = User;