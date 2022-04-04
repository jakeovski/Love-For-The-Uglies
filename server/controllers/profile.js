import User from "../models/user.js";
import generateTokens from "../config/tokenHelper.js";
import bcrypt from "bcrypt";
import Token from "../models/token.js";

/**
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export const editProfile = async (req, res) => {
    const {oldUsername, newUserData} = req.body;
    try {
        //Check whether the username is to be edited, if yes, check if it is not taken
        if (oldUsername !== newUserData.username) {
            const user = await User.findOne({
                usernameUpper: newUserData.username.toUpperCase()
            });
            if (user) return res.status(403).json({
                data: undefined,
                type: 'warning',
                message: 'Username already exists'
            });
        }

        //Check the firstName and lastName contain only alphabetical characters
        if ((newUserData.firstName.match(/[^a-zA-Z]/g) || []).length > 0 || (newUserData.lastName.match(/[^a-zA-Z]/g) || []).length > 0) {
            return res.status(400).json({
                data: undefined,
                type: 'warning',
                message: 'First Name and Last Name contain unexpected characters'
            });
        }

        //Update the user details
        const updatedUser = await User.findOneAndUpdate({
            _id: req.id
        }, {
            firstName: newUserData.firstName,
            lastName: newUserData.lastName,
            username: newUserData.username,
            usernameUpper: newUserData.username.toUpperCase(),
            avatar: newUserData.avatar
        }, {new: true}).select('-usernameUpper -password');

        return res.status(200).json({
            data: {
                user: updatedUser,
                tokens: await generateTokens(req.key, updatedUser)
            },
            type: 'success',
            message: 'Successfully edited the profile'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: undefined,
            type: 'error',
            message: 'Error while editing the profile'
        })
    }
}

/**
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export const changePassword = async (req, res) => {
    const {oldPassword, newPassword, newPasswordConfirm} = req.body;
    try {
        //Check if all data is present
        if (!oldPassword || !newPassword || !newPasswordConfirm) return res.status(403).json({
            data: undefined,
            type: 'warning',
            message: 'All fields must be entered'
        });

        //Check new password length
        if (newPassword.length < 8) return res.status(403).json({
            data: undefined,
            type: 'warning',
            message: 'Password must be at least 8 characters'
        });

        //Check if the passwords match
        if (newPassword !== newPasswordConfirm) return res.status(403).json({
            data: undefined,
            type: 'warning',
            message: 'Passwords are not equal'
        });

        //Check if the old password is correct
        const user = await User.findOne({
            _id: req.id
        });
        const correctPassword = await bcrypt.compare(oldPassword, user.password);
        if (!correctPassword) {
            return res.status(403).json({data: undefined, type: 'error', message: 'Incorrect Password'})
        }

        //And finally update the password
        await User.updateOne({
            _id: req.id
        }, {
            password: await bcrypt.hash(newPassword, 12),
        })

        return res.status(200).json({
            data: undefined,
            type: 'success',
            message: 'Successfully changed the password'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: undefined,
            type: 'error',
            message: 'Error while changing password'
        })
    }
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export const deleteAccount = async (req, res) => {
    try {
        //Delete the user profile and all the related data
        await User.deleteOne({
            _id: req.id
        });
        await Token.deleteOne({
            userId: req.id
        });

        return res.status(200).json({data: undefined, type: 'success', message: 'Successfully deleted the user'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: undefined,
            type: 'error',
            message: 'Error while deleting a profile'
        })
    }
}