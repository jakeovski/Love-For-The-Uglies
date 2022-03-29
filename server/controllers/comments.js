import Comment from "../models/comment.js";
import User from "../models/user.js";
import {DateTime} from "luxon";


export const addComment = async (req,res) => {
    try{
        const {comment,image} = req.body;
        //Create comment
        const createdComment = await Comment.create({
            userId:req.id,
            commentPosition:0,
            comment:comment,
            image:image,
            createdAt:DateTime.now()
        });

        //Get other necessary info
        const user = await User.findOne({
            _id:req.id
        },).select('-usernameUpper -password -firstName -lastName -created -role');

        return res.status(201).json({
            data:{
                comment: createdComment,
                user: user,
                replies: []
            },
            type:'Success',
            message:'Successfully created new comment'
        });

    }catch (error){
        console.log(error);
        return res.status(500).json({
            data:undefined,
            type:'error',
            message:'Error occurred while creating new comment'
        })
    }
}


export const getAllComments = async (req,res) => {
    try{
        const comments = await Comment.find({
            parent:''
        }).sort({createdAt:"desc"});

        let dataTemplate = [];

        for(let commentData of comments) {
            let user = await User.findOne({
                _id: commentData.userId
            }).select('-usernameUpper -password -firstName -lastName -created -role');

            let replyObject = [];
            let replies = await Comment.find({
                parent:commentData._id
            });

            for (let reply of replies){
                let user = await User.findOne({
                    _id: reply.userId
                }).select('-usernameUpper -password -firstName -lastName -created -role');
                replyObject.push({
                    reply,
                    user
                })
            }

            dataTemplate.push({
                comment: commentData,
                user:user,
                replies: replyObject
            });
        }

        return res.status(200).json({
            data:dataTemplate,
            type:'Success',
            message:'Successfully fetched the comments'
        })
    }catch (error){
        console.log(error);
        return res.status(500).json({
            data:undefined,
            type:'error',
            message:'Error occurred while getting all the comments'
        })

    }
}


export const addReply = async (req,res) => {
    try{
        const {parentComment,comment} = req.body;
        const newReply = await Comment.create({
            userId:req.id,
            parent:parentComment,
            comment:comment,
            createdAt:DateTime.now()
        });

        await Comment.updateOne({
            _id:parentComment
        },{
            $inc:{'numberOfComments':1}
        });

        const user = await User.findOne({
            _id:req.id
        }).select('-usernameUpper -password -firstName -lastName -created -role');

        const temp = {
            parent:parentComment,
            comment:{
                reply:newReply,
                user:user
            },
        };
        console.log(temp);
        return res.status(200).json({
            data:temp,
            type:'Success',
            message:'Successfully added a reply'
        })
    }catch (error) {
        console.log(error);
        return res.status(500).json({
            data:undefined,
            type:'error',
            message:'Error occurred while adding reply'
        })
    }
}

export const addSubReply = async (req,res) => {
    try{
        const {commentId,subReplyPosition,comment,replyTo} = req.body;
        const reply = await Comment.findOne({
            _id:commentId
        });
        console.log(reply);

        if(!reply) return res.status(404).json({
            data:undefined,
            type:'error',
            message:'Comment not found'
        });

        await Comment.updateOne({
            _id:reply.parent
        },{
            $inc:{'numberOfComments':1}
        })

        const user = await User.findOne({
            _id:req.id
        }).select('-usernameUpper -password -firstName -lastName -created -role -avatar')

        reply.subReplies.splice(subReplyPosition,0,{
            userId:req.id,
            username:user.username,
            comment:comment,
            replyTo:replyTo
        });

        console.log(reply);

        const updatedComment = await Comment.findOneAndUpdate({
            _id:commentId
        },{
            subReplies: reply.subReplies
        },{new:true});

        return res.status(200).json({
            data: updatedComment,
            type:'Success',
            message:'Successfully added a new sub reply'
        });

    }catch (error) {
        console.log(error);
        return res.status(500).json({
            data:undefined,
            type:'error',
            message:'Error occurred while adding a subreply'
        })
    }
}
