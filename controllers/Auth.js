const db = require('../db/db')
const bcrypt = require('bcrypt')

async function signup(req, res, next) {
    try {
        const { email, password } = req.body
        const hash = await bcrypt.hashSync(password, 10)
        const [user] = await db('users').insert({ email, password: hash })
        req.session.user = user
        res.json(user)
    } catch (err) {
        console.log(err);
        if (err) {
            res.status(401).send('User already exists')
        } else {
            next(err)
        }
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body
        const user = await db('users').first('*').where({ email })
        if (!user) {
            console.log('No such user found:', req.body.email)
            res.status(401).send('Wrong username and/or password')
        } else {
            const validPass = await bcrypt.compare(password, user.password)
            if (validPass) {
                req.session.user = user
                res.json(user)
            } else {
                console.log('Incorrect password for user:', email)
                res.status(401).send('Wrong username and/or password')
            }
        }
    } catch (err) {
        next(err)
    }
}

module.exports = { signup, login }