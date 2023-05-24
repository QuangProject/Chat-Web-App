class ListFriendController {
    index(req, res) {
        res.render('list-friend/index', {
            title: "List Friends",
            style: "list-friend.css"
        })
    }
}

module.exports = new ListFriendController