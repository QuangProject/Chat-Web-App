class ListFriendController {
    async index(req, res) {
        res.render('list-friend/index')
    }
}

module.exports = new ListFriendController