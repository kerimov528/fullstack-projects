import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 100
    },
    email: {
        type: String,
        required: true,
        max: 100,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 5,
    },
    city: String,
    country: String,
    state: String,
    occupation: String,
    phoneNumber: String,
    transaction: Array,
    role: {
        type: String,
        enum: ['user', 'admin', 'superadmin'],
        default: 'admin'
    },
},
    {
        timestamps: true
    }
)

const User = mongoose.model("User", UserSchema)
export default User