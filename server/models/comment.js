import mongoose from "mongoose";

const comment = mongoose.Schema({
    id: {
        type: String
    },
    userId: {
        type: String,
        required: true
    },
    parent: {
        type: String,
        default: ''
    },
    comment: {
        type: String,
    },
    subReplies: {
        type: [
            {
                id: {
                    type: String
                },
                userId: {
                    type: String,
                },
                username: {
                    type: String,
                },
                comment: {
                    type: String,
                },
                replyTo: {
                    type: String,
                }
            }
        ],
        default: []
    },
    image: {
        type: String,
    },
    thumbsUp: {
        type: [],
        default: []
    },
    thumbsDown: {
        type: [],
        default: []
    },
    fireLike: {
        type: [],
        default: []
    },
    surprisedLike: {
        type: [],
        default: []
    },
    createdAt: {
        type: Date,
    },
    numberOfComments: {
        type: Number,
        default: 0
    }
})


export default mongoose.models.comment || mongoose.model("comments", comment);