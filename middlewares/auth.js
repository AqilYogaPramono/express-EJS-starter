const authUser = async (req, res, next) => {
    try {
        const role = req.session.role
        if(role == "User") {
            return next()
        } else {
            req.flash('error', 'You do not have access to this page')
            res.redirect('/login')
        }
    } catch(err) {
        console.error(err)
        req.flash('error', 'Internal Server Error')
        res.redirect('/login')
    }
}

const authAdmin = async (req, res, next) => {
    try {
        const role = req.session.role
        if(role == "Admin") {
            return next()
        } else {
            req.flash('error', 'You do not have access to this page')
            res.redirect('/login')
        }
    } catch(err) {
        console.error(err)
        req.flash('error', 'Internal Server Error')
        res.redirect('/login')
    }
}

module.exports = {authUser, authAdmin}