const express = require('express')

const User = require('../../models/User')
const { authUser } = require('../../middlewares/auth')

const router = express.Router()


router.get('/', authUser, async (req, res) => {
    try {
        const userId = req.session.userId
        const users = await User.getEmail(userId)

        res.render('users/dashboard', { users })
    } catch (err) {
        console.error(err)
        req.flash('error', 'Internal Server Error')
        res.redirect('/')
    }
})

module.exports = router