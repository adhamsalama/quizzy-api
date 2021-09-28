const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const SALT_FACOTR = 10

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    type: {type: String, enum: ['teacher', 'student']},
    password: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    quizzes: [
        {
            name: {type: String, required: true},
            questions: [
                {
                    title: {type: String, required: true, unique: true},
                    answers: [{type: String, required: true}],
                    correctAnswer: {type: Number, required: true}
                }
            ]
        }
    ]
})

userSchema.pre('save', async function(done) {
    if (!this.isModified('password')) return done()
    this.password = await bcrypt.hash(this.password, SALT_FACOTR)
})

userSchema.methods.checkPassword = function(guess, done) {
    bcrypt.compare(guess, this.password, function(err, isMatch) {
        done(err, isMatch)
    })
}

const User = mongoose.model('user', userSchema)

module.exports = {
    User
}

