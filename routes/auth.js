const express = require('express')
const bcrypt = require('bcryptjs')

const Admin = require('../models/Admin')

const router = express.Router()

router.get('/register', async (req, res) => {
    try {
        res.render('auths/register', { data: req.flash('data')[0] })
    } catch (err) {
        console.error(err)
        req.flash('error', 'Internal server error')
        res.redirect('/')
    }
})

router.post('/reg', async (req, res) => {
    try {
        const { email, password, confirmation_password } = req.body
        const data = { email, password, confirmation_password }

        if (!email) {
            req.flash('error', 'Email is required')
            req.flash('data', data)
            return res.redirect('/register')
        }

        if (!password) {
            req.flash('error', 'Password is required')
            req.flash('data', data)
            return res.redirect('/register')
        }

        if (!confirmation_password) {
            req.flash('error', 'Comfirmation password is required')
            req.flash('data', data)
            return res.redirect('/register')
        }

        if (password.length < 6) {
            req.flash('error', 'Password must be at least 6 characters long')
            req.flash('data', data)
            return res.redirect('/register')
        }

        if (!/[A-Z]/.test(password)) {
            req.flash('error', 'Password must contain at least 1 uppercase letter')
            req.flash('data', data)
            return res.redirect('/register')
        }

        if (!/[a-z]/.test(password)) {
            req.flash('error', 'Password must contain at least 1 lowercase letter')
            req.flash('data', data)
            return res.redirect('/register')
        }

        if (!/\d/.test(password)) {
            req.flash('error', 'Password must contain at least 1 digit')
            req.flash('data', data)
            return res.redirect('/register')
        }

        if (password != confirmation_password) {
            req.flash('error', 'Password and confirmation password do not match')
            req.flash('data', data)
            return res.redirect('/register')
        }

        req.flash('success', 'Registration successful')
        res.redirect('/login')
    } catch (err) {
        console.error(err)
        req.flash('error', 'Internal server error')
        res.redirect('/')
    }
})

router.get('/login', async (req, res) => {
    try {
        res.render('auths/login', { data: req.flash('data')[0] })
    } catch (err) {
        console.error(err)
        req.flash('error', 'Internal server error')
        res.redirect('/')
    }
})

router.post('/log', async (req, res) => {
    try {
        const { email, password } = req.body
        const data = { email, password }

        if (!email) {
            req.flash('error', 'Email is required')
            req.flash('data', data)
            return res.redirect('/login')
        }

        if (!password) {
            req.flash('error', 'Password is required')
            req.flash('data', data)
            return res.redirect('/login')
        }

        if (!await bcrypt.compare(password, users.password)) {
            req.flash('error', 'Password incorrect')
            req.flash('data', data)
            return res.redirect('/login')
        }

        req.flash('success', 'Login successful')
    } catch (err) {
        console.error(err)
        req.flash('error', 'Internal server error')
        res.redirect('/')
    }
})

router.get('/logout', async(req, res) => {
    try {
        req.session.destroy()
        req.flash('success', 'Logout successful')
        res.redirect('/')
    } catch (err) {
        console.error(err)
        req.flash('error', 'Internal server error')
        if (req.session.role == "Admin") return res.redirect('/admin/dashboard')
    }
})

module.exports = router