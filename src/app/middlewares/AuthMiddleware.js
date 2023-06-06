const { Receipt } = require('../models/Receipt')

class AuthMiddleware {
    // User login to access
    async isAuth(req, res, next) {
        if (req.session.user) {
            // get all receipts of user
            const receipts = await Receipt.getReceiptOfUser(req.session.user.user_id)
            const receiptsObj = receipts.rows
            const numberReceipts = receipts.rowCount
            for (let i = 0; i < receiptsObj.length; i++) {
                const date1 = new Date();
                const date2 = new Date(receipts.rows[i].created_at);

                const differenceInMilliseconds = date1.getTime() - date2.getTime();
                const differenceInSeconds = differenceInMilliseconds / 1000;
                const differenceInMinutes = differenceInSeconds / 60;
                const differenceInHours = differenceInMinutes / 60;
                const differenceInDays = differenceInHours / 24;

                var time_receipt = ''
                if (Math.floor(differenceInDays) > 0) {
                    time_receipt = `${Math.floor(differenceInDays)} days ago`
                } else if (Math.floor(differenceInHours) > 0) {
                    time_receipt = `${Math.floor(differenceInHours)} hours ago`
                } else if (Math.floor(differenceInMinutes) > 0) {
                    time_receipt = `${Math.floor(differenceInMinutes)} minutes ago`
                } else if (Math.floor(differenceInSeconds) > 0) {
                    time_receipt = `${Math.floor(differenceInSeconds)} seconds ago`
                } else {
                    time_receipt = `Just now`
                }

                receiptsObj[i].time_receipt = time_receipt
            }
            res.locals.notifications = receiptsObj
            res.locals.numberReceipts = numberReceipts

            res.locals.user = req.session.user
            next()
        } else {
            res.redirect('/login')
        }
    }

    // User or admin can access
    async freedom(req, res, next) {
        if (req.session.user) {
            // get all receipts of user
            const receipts = await Receipt.getReceiptOfUser(req.session.user.user_id)
            const receiptsObj = receipts.rows
            const numberReceipts = receipts.rowCount
            for (let i = 0; i < receiptsObj.length; i++) {
                const date1 = new Date();
                const date2 = new Date(receipts.rows[i].created_at);

                const differenceInMilliseconds = date1.getTime() - date2.getTime();
                const differenceInSeconds = differenceInMilliseconds / 1000;
                const differenceInMinutes = differenceInSeconds / 60;
                const differenceInHours = differenceInMinutes / 60;
                const differenceInDays = differenceInHours / 24;

                var time_receipt = ''
                if (Math.floor(differenceInDays) > 0) {
                    time_receipt = `${Math.floor(differenceInDays)} days ago`
                } else if (Math.floor(differenceInHours) > 0) {
                    time_receipt = `${Math.floor(differenceInHours)} hours ago`
                } else if (Math.floor(differenceInMinutes) > 0) {
                    time_receipt = `${Math.floor(differenceInMinutes)} minutes ago`
                } else if (Math.floor(differenceInSeconds) > 0) {
                    time_receipt = `${Math.floor(differenceInSeconds)} seconds ago`
                } else {
                    time_receipt = `Just now`
                }

                receiptsObj[i].time_receipt = time_receipt
            }
            res.locals.notifications = receiptsObj
            res.locals.numberReceipts = numberReceipts

            res.locals.user = req.session.user
            next()
        } else {
            next()
        }
    }

    // Only admin can access
    isAdmin(req, res, next) {
        if (req.session.user && req.session.user.isAdmin) {
            res.locals.user = req.session.user
            next()
        } else if (req.session.user && !req.session.user.role) {
            res.locals.user = req.session.user
            res.redirect('/')
        } else {
            res.redirect('/login')
        }
    }
}
module.exports = new AuthMiddleware