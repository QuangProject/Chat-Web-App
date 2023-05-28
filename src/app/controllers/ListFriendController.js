const { User } = require('../models/User');
const { FriendShip } = require('../models/FriendShip');
const { Conversation } = require('../models/Conversation')

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
                script: "listFriend.js",
                friends
            })
        }
        return res.render('list-friend/index', {
            title: "List Friends",
            style: "list-friend.css",
            script: "listFriend.js",
            friends: []
        })
    }

    async unfriend(req, res) {
        // Unfriend
        const userId = req.session.user.user_id
        const friendId = req.body.friendId

        // unfriend user
        const unfriend = await FriendShip.unfriend(userId, friendId)
        if (unfriend.rowCount == 0) {
            return res.status(500).json({ error: 'Error unfriending.' });
        }

        // check if conversation exist?
        const isExist = await Conversation.isExist(friendId, userId)
        if (isExist.rowCount == 1) {
            const conversationId = isExist.rows[0].conversation_id
            // delete conversation
            const deleteConversation = await Conversation.delete(conversationId)
            if (deleteConversation.rowCount == 0) {
                return res.status(500).json({ error: 'Error unfriending.' });
            }
        }

        // unfriend friend
        const unfriendFriend = await FriendShip.unfriend(friendId, userId)
        if (unfriendFriend.rowCount == 0) {
            return res.status(500).json({ error: 'Error unfriending.' });
        }

        // get row count of friendship table
        FriendShip.getAll(userId)
            .then((data) => {
                return res.status(200).json({ message: 'Unfriend successfully.', numberOfFriend: data.rowCount });
            })
            .catch(() => {
                return res.status(500).json({ error: 'Error unfriending.' });
            });

    }
}

module.exports = new ListFriendController