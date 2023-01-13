import mongoose from 'mongoose'
import crypto from 'crypto'
import modelOptions from './model_options.js'

const userShcema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    displayName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    salt: {
        type: String,
        required: true,
        select: false
    }
}, modelOptions)

userShcema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex')

    this.password = crypto.pbkdf2Sync(
        password,
        this.salt,
        1000,
        64,
        'sha512'
    ).toString('hex')
}

userShcema.methods.validPassword = function (password) {
    const hash = crypto.pbkdf2Sync(
        password,
        this.salt,
        1000,
        64,
        'sha512'
    ).toString('hex')

    return this.password === hash
}

const userModel = mongoose.model("User", userShcema)

export default userModel
