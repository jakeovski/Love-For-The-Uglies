import Comment from "../models/comment.js";
import User from "../models/user.js";
import {DateTime} from "luxon";


export const addComment = async (req, res) => {
    try {
        const {comment, image, id} = req.body;
        console.log(id);
        let createdComment;
        let user;
        if (id) {
            createdComment = await Comment.findOneAndUpdate({
                _id: id
            }, {
                comment: comment,
                image: image
            }, {new: true});
        } else {
            console.log('I am creating comments');
            //Create comment
            createdComment = await Comment.create({
                userId: req.id,
                comment: comment,
                image: image,
                createdAt: DateTime.now()
            });

            //Get other necessary info
            user = await User.findOne({
                _id: req.id
            }).select('-usernameUpper -password -firstName -lastName -created -role');
        }

        return res.status(201).json({
            data: {
                comment: createdComment,
                user: user,
                replies: [],
                liked: ''
            },
            type: 'Success',
            message: 'Successfully created new comment'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: undefined,
            type: 'error',
            message: 'Error occurred while creating new comment'
        })
    }
}


export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find({
            parent: ''
        }).sort({createdAt: "desc"});

        let dataTemplate = [];

        for (let commentData of comments) {
            let user = await User.findOne({
                _id: commentData.userId
            }).select('-usernameUpper -password -firstName -lastName -created -role');

            let replyObject = [];
            let replies = await Comment.find({
                parent: commentData._id
            });

            for (let reply of replies) {
                let user = await User.findOne({
                    _id: reply.userId
                }).select('-usernameUpper -password -firstName -lastName -created -role');
                replyObject.push({
                    reply,
                    user
                })
            }

            let liked = '';
            if (commentData.thumbsUp.includes(req.id)) {
                liked = 'thumbsUp';
            } else if (commentData.thumbsDown.includes(req.id)) {
                liked = 'thumbsDown';
            } else if (commentData.fireLike.includes(req.id)) {
                liked = 'fireLike';
            } else if (commentData.surprisedLike.includes(req.id)) {
                liked = 'surprisedLike';
            }

            dataTemplate.push({
                comment: commentData,
                user: user,
                replies: replyObject,
                liked: liked
            });
        }

        return res.status(200).json({
            data: dataTemplate,
            type: 'Success',
            message: 'Successfully fetched the comments'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: undefined,
            type: 'error',
            message: 'Error occurred while getting all the comments'
        })

    }
}


export const addReply = async (req, res) => {
    try {
        const {parentComment, comment} = req.body;
        let newReply;
        let user;
        if (comment.id) {
            newReply = await Comment.findOneAndUpdate({
                _id: comment.id
            }, {
                comment: comment.message
            }, {new: true})
        } else {
            newReply = await Comment.create({
                userId: req.id,
                parent: parentComment,
                comment: comment.message,
                createdAt: DateTime.now()
            });

            await Comment.updateOne({
                _id: parentComment
            }, {
                $inc: {'numberOfComments': 1}
            });

            user = await User.findOne({
                _id: req.id
            }).select('-usernameUpper -password -firstName -lastName -created -role');

        }
        const temp = {
            parent: parentComment,
            comment: {
                reply: newReply,
                user: user
            },
        };
        console.log(temp);
        return res.status(200).json({
            data: temp,
            type: 'Success',
            message: 'Successfully added a reply'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: undefined,
            type: 'error',
            message: 'Error occurred while adding reply'
        })
    }
}

export const addSubReply = async (req, res) => {
    try {
        const {commentId, subReplyPosition, comment, replyTo} = req.body;
        const reply = await Comment.findOne({
            _id: commentId
        });
        console.log(reply);

        if (!reply) return res.status(404).json({
            data: undefined,
            type: 'error',
            message: 'Comment not found'
        });

        const user = await User.findOne({
            _id: req.id
        }).select('-usernameUpper -password -firstName -lastName -created -role -avatar')

        if (comment.id) {
            for (let subReply of reply.subReplies) {
                if (subReply._id.equals(comment.id)) {
                    subReply.comment = comment.message
                    break;
                }
            }
        } else {
            reply.subReplies.splice(subReplyPosition, 0, {
                userId: req.id,
                username: user.username,
                comment: comment.message,
                replyTo: replyTo
            });
            await Comment.updateOne({
                _id: reply.parent
            }, {
                $inc: {'numberOfComments': 1}
            })
        }

        const updatedComment = await Comment.findOneAndUpdate({
            _id: commentId
        }, {
            subReplies: reply.subReplies
        }, {new: true});

        return res.status(200).json({
            data: updatedComment,
            type: 'Success',
            message: 'Successfully added a new sub reply'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: undefined,
            type: 'error',
            message: 'Error occurred while adding a subreply'
        })
    }
}

export const likeComment = async (req, res) => {
    try {
        const {likeType, commentId, remove} = req.body;

        let updateDoc;
        if (remove) {
            updateDoc = {
                $pull: {thumbsDown: req.id, fireLike: req.id, surprisedLike: req.id, thumbsUp: req.id},
            }
        } else if (likeType === 'thumbsUp') {
            updateDoc = {
                $pull: {thumbsDown: req.id, fireLike: req.id, surprisedLike: req.id},
                $addToSet: {thumbsUp: req.id}
            }
        } else if (likeType === 'thumbsDown') {
            updateDoc = {
                $pull: {thumbsUp: req.id, fireLike: req.id, surprisedLike: req.id},
                $addToSet: {thumbsDown: req.id}
            }
        } else if (likeType === 'fireLike') {
            updateDoc = {
                $pull: {thumbsDown: req.id, thumbsUp: req.id, surprisedLike: req.id},
                $addToSet: {fireLike: req.id},
            }
        } else if (likeType === 'surprisedLike') {
            updateDoc = {
                $pull: {thumbsDown: req.id, fireLike: req.id, thumbsUp: req.id},
                $addToSet: {surprisedLike: req.id},
            }
        } else {
            return res.status(500).json({
                data: undefined,
                type: 'error',
                message: 'Like type does not exist'
            })
        }

        const newComment = await Comment.findOneAndUpdate({
            _id: commentId
        }, updateDoc, {new: true});

        return res.status(200).json({
            data: {
                newComment: newComment,
                liked: remove ? '' : likeType
            },
            type: 'success',
            message: 'Successfully liked the comment'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: undefined,
            type: 'error',
            message: 'Error occurred while liking the comment'
        })
    }
}

export const deleteComment = async (req, res) => {
    try {
        const {commentId} = req.params;

        await Comment.deleteMany({
            parent: commentId
        });

        await Comment.deleteOne({
            _id: commentId
        })

        return res.status(200).json({
            data: commentId,
            type: 'success',
            message: 'Successfully deleted the comment'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: undefined,
            type: 'error',
            message: 'Error occurred while liking the comment'
        })
    }
}

export const deleteReply = async (req, res) => {
    try {
        console.log(req.params);
        const {replyId, parent} = req.params;
        console.log(replyId);

        await Comment.deleteOne({
            _id: replyId
        })

        await Comment.updateOne({
            _id: parent
        }, {
            $inc: {'numberOfComments': -1}
        })

        return res.status(200).json({
            data: replyId,
            type: 'success',
            message: 'Successfully deleted the comment'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: undefined,
            type: 'error',
            message: 'Error occurred while liking the comment'
        })
    }
}

export const deleteSubReply = async (req, res) => {
    try {
        const {subReplyId, replyId, parentId} = req.params;

        console.log(parentId);
        const reply = await Comment.findOne({
            _id: replyId
        });

        if (!reply) return res.status(404).json({
            data: undefined,
            type: 'error',
            message: 'Comment not found'
        });

        const updatedComment = await Comment.findOneAndUpdate({
            _id: replyId
        }, {
            subReplies: reply.subReplies.filter((subReply) => !subReply._id.equals(subReplyId))
        }, {new: true});

        await Comment.updateOne({
            _id: parentId
        }, {
            $inc: {'numberOfComments': -1}
        })
        return res.status(201).json({
            data: updatedComment,
            type: 'Success',
            message: 'Successfully deleted a sub reply'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: undefined,
            type: 'error',
            message: 'Error occurred while liking the comment'
        })
    }
}
