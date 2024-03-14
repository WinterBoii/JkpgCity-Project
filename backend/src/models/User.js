const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    }
});

//fire a function beforfe saving user to database
userSchema.pre('save', async function (next) {
    const salt = await bcryptjs.genSalt()
    this.password = await bcryptjs.hash(this.password, salt)
    next()
})

// static method to login user
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({email})  // 'this' refers to the usermodel instance
    if (user) {
        const isMatch = await bcryptjs.compare(password, user.password)
        if (isMatch) {
            return user
        } throw  Error ('Invalid password')
    } throw  Error('Invalid email')
}

const User = mongoose.model('User', userSchema);

module.exports = User;



