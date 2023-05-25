const { User } = require('../models/User');
const { FriendShip } = require('../models/FriendShip');

class ListFriendController {
    async index(req, res) {
        // Show list friend
        const userId = req.session.user.user_id
        const friendObj = await FriendShip.getAll(userId)
        if (friendObj.rowCount > 0) {
            const friends = friendObj.rows
            // get info of friend
            for (let i = 0; i < friends.length; i++) {
                const friendInfoObj = await User.getOneById(friends[i].friend_id)
                if (friendInfoObj.rowCount > 0) {
                    const friendInfo = friendInfoObj.rows[0]
                    friends[i].friendInfo = friendInfo
                }
            }
            return res.render('list-friend/index', {
                title: "List Friends",
                style: "list-friend.css",
                friends
            })
        }
        return res.render('list-friend/index', {
            title: "List Friends",
            style: "list-friend.css",
            friends: []
        })
    }
}

module.exports = new ListFriendController