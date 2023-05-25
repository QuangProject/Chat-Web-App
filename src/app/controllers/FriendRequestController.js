const { User } = require('../models/User');
const { FriendRequest } = require('../models/FriendRequest');
const { FriendShip } = require('../models/FriendShip');

class FriendRequestController {
    async index(req, res) {
        // get all friend request of user
        const userId = req.session.user.user_id
        const friendRequestObj = await FriendRequest.getAllPending(userId)
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

            // return res.json(friendRequests)

            return res.render('list-request/index', {
                title: "Friend Request",
                style: "friend-request.css",
                friendRequests
            })
        }
        return res.render('list-request/index', {
            title: "Friend Request",
            style: "friend-request.css",
            friendRequests: []
        })
    }

    // accept friend request
    async acceptRequest(req, res) {
        // get friend request
        const { friendId } = req.body
        const userId = req.session.user.user_id
        const friendRequestObj = await FriendRequest.getOne(friendId, userId)
        // check if friend request exists
        if (friendRequestObj.rowCount == 0) {
            return res.status(400).json({ error: "Friend request not found" })
        }
        // update friend request status
        const friendRequest = friendRequestObj.rows[0]
        const friendRequestId = friendRequest.request_id
        const status = "accepted"
        const updateObj = await FriendRequest.update(friendId, userId, status)
        if (updateObj.rowCount == 0) {
            return res.status(400).json({ error: "Accept friend request failed" })
        }
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
        return res.status(200).json({ message: "Accept friend request successfully" })
        // delete friend request
        // const deleteObj = await FriendRequest.delete(friendRequestId)
        // if (deleteObj.rowCount > 0) {
        //     return res.status(200).json({ message: "Accept friend request successfully" })
        // } else {
        //     return res.status(400).json({ error: "Accept friend request failed" })
        // }
    }

    // reject friend request
    async rejectRequest(req, res) {
        // get friend request
        const { friendId } = req.body
        const userId = req.session.user.user_id
        const friendRequestObj = await FriendRequest.getOne(friendId, userId)
        // check if friend request exists
        if (friendRequestObj.rowCount == 0) {
            return res.status(400).json({ error: "Friend request not found" })
        }
        // update friend request status
        const friendRequest = friendRequestObj.rows[0]
        const friendRequestId = friendRequest.request_id
        const status = "rejected"
        const updateObj = await FriendRequest.update(friendId, userId, status)
        if (updateObj.rowCount == 0) {
            return res.status(400).json({ error: "Reject friend request failed" })
        }
        return res.status(200).json({ message: "Reject friend request successfully" })
        // delete friend request
        // const deleteObj = await FriendRequest.delete(friendRequestId)
        // if (deleteObj.rowCount > 0) {
        //     return res.status(200).json({ message: "Reject friend request successfully" })
        // } else {
        //     return res.status(400).json({ error: "Reject friend request failed" })
        // }
    }
}

module.exports = new FriendRequestController