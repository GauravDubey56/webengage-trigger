async function checkCurrentUser(req, res, next) {
    if (req.session.user) {
        res.json(req.session.user)
    } else {
        res.status(401).send('No user logged in')
    }
}
module.exports = { checkCurrentUser }