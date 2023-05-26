const { User } = require('../models/User');
const { FriendRequest } = require('../models/FriendRequest');
const { FriendShip } = require('../models/FriendShip');

class FriendRequestController {
    async index(req, res) {
        // get all friend request of user
        const userId = req.session.user.user_id
        const friendRequestObj = await FriendRequest.getAll(userId)
        if (friendRequestObj.rowCount > 0) {
            const friendRequests = friendRequestObj.rows
            // get info of sender
            for (let i = 0; i < friendRequests.length; i++) {
                const senderObj = await User.getOneById(friendRequests[i].sender_id)
                if (senderObj.rowCount > 0) {
                    const sender = senderObj.rows[0]
                    friendRequests[i].sender = sender
                }
            }

            return res.render('list-request/index', {
                title: "Friend Request",
                style: "friend-request.css",
                script: "listRequest.js",
                friendRequests
            })
        }
        return res.render('list-request/index', {
            title: "Friend Request",
            style: "friend-request.css",
            script: "listRequest.js",
            friendRequests: []
        })
    }

    // accept friend request
    async acceptRequest(req, res) {
        // get request id from body
        const { requestId } = req.body
        const userId = req.session.user.user_id
        
        // check if request is exist
        const friendRequestObj = await FriendRequest.getOne(requestId)
        if (friendRequestObj.rowCount == 0) {
            return res.status(400).json({ error: "Friend request not found" })
        }
        
        const friendId = friendRequestObj.rows[0].sender_id
        // add friend to friend list
        const addFriendObj = await FriendShip.create(userId, friendId)
        if (addFriendObj.rowCount == 0) {
            return res.status(400).json({ error: "Accept friend request failed" })
        }
        // add user to friend's friend list
        const addFriendObj2 = await FriendShip.create(friendId, userId)
        if (addFriendObj2.rowCount == 0) {
            return res.status(400).json({ error: "Accept friend request failed" })
        }
        
        // delete friend request
        const deleteObj = await FriendRequest.delete(requestId)
        if (deleteObj.rowCount > 0) {
            // get number of request
            const friendRequestObj = await FriendRequest.getAll(userId)
            return res.status(200).json({ message: "Accept friend request successfully", numberOfRequest: friendRequestObj.rowCount })
        } else {
            return res.status(400).json({ error: "Accept friend request failed" })
        }
    }

    // reject friend request
    async rejectRequest(req, res) {
        // get request id from body
        const { requestId } = req.body
        const userId = req.session.user.user_id

        // check if request is exist
        const friendRequestObj = await FriendRequest.getOne(requestId)
        if (friendRequestObj.rowCount == 0) {
            return res.status(400).json({ error: "Friend request not found" })
        }
        
        // delete friend request
        const deleteObj = await FriendRequest.delete(requestId)
        if (deleteObj.rowCount > 0) {
            // get number of request
            const friendRequestObj = await FriendRequest.getAll(userId)
            return res.status(200).json({ message: "Reject friend request successfully", numberOfRequest: friendRequestObj.rowCount })
        } else {
            return res.status(400).json({ error: "Reject friend request failed" })
        }
    }
}

module.exports = new FriendRequestController