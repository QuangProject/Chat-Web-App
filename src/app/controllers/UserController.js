const formidable = require('formidable');
const mv = require('mv');
const { User } = require('../models/User')

class UserController {
    async profile(req, res) {
        const username = req.session.user.username
        var user = await User.getOne(username)
        res.render('user/profile', {
            user: user.rows[0],
            title: "Profile",
            style: "profile.css"
        })
    }

    editProfile(req, res) {
        const form = formidable({ multiples: true });

        form.parse(req, (err, fields, files) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error parsing form data.' });
            }
            // Get User
            const username = req.session.user.username
            User.getOne(username)
                .then(data => {
                    // Get infomation from form
                    const { firstName, lastName, gender, birthday, telephone, address } = fields;
                    var user = data.rows[0]
                    // Check if the user uploaded a new avatar
                    if (files.img_profile.originalFilename == '') {
                        User.editProfile(username, firstName, lastName, gender, birthday, telephone, address, user.avatar)
                            .then(data => {
                                return res.status(200).json({ message: 'Profile updated successfully.' });
                            })
                            .catch(err => {
                                return res.status(500).json({ error: 'Error updating the profile.' });
                            });
                    } else {
                        // Get the uploaded file
                        const file = files.img_profile;
                        const filePath = file.filepath;
                        const fileName = file.originalFilename;

                        // Move the file to the desired location
                        const newFilePath = `src/public/avatars/${Date.now()}${fileName}`;
                        mv(filePath, newFilePath, (err) => {
                            if (err) {
                                console.error(err);
                                return res.status(500).json({ error: 'Error moving the file.' });
                            }

                            const avt = newFilePath.slice(10);
                            User.editProfile(username, firstName, lastName, gender, birthday, telephone, address, avt)
                                .then(data => {
                                    return res.status(200).json({ message: 'Profile updated successfully.' });
                                })
                                .catch(err => {
                                    return res.status(500).json({ error: 'Error updating the profile.' });
                                });
                        });
                    }
                })
                .catch(err => {
                    return res.status(500).json({ error: 'Error updating the profile.' });
                });
        });
    }
}

module.exports = new UserController