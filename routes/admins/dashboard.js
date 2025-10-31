const express = require('express')

const admin = require('../../models/Admin')
const { authAdmin } = require('../../middleware/auth')

const router = express.Router()

router.get('/', authAdmin, async (req, res) => {
    try {
        const userId = req.session.userId
        const users = await admin.getEmail(userId)

        res.render('admins/dashboard', { users })
    } catch (err) {
        console.error(err)
        req.flash('error', 'Internal Server Error')
        res.redirect('/')
    }
})

module.exports = router