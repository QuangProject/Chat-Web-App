class FriendRequestController {
    index(req, res) {
        res.render('friend-request/index', {
            title: "Friend Request",
            style: "friend-request.css"
        })
    }
}

module.exports = new FriendRequestController