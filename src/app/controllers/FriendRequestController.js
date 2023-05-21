class FriendRequestController {
    async index(req, res) {
        res.render('friend-request/index')
    }
}

module.exports = new FriendRequestController