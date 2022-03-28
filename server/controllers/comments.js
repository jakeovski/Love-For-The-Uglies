import Comment from "../models/comment.js";
import User from "../models/user.js";


export const addComment = async (req,res) => {
    try{
        const {comment,image} = req.body;
        //Create comment
        const createdComment = await Comment.create({
            userId:req.id,
            commentPosition:0,
            comment:comment,
            image:image,
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
        });

        let dataTemplate = [];

        for(let commentData of comments) {
            let user = await User.findOne({
                _id: commentData.userId
            }).select('-usernameUpper -password -firstName -lastName -created -role');

            dataTemplate.push({
                comment: commentData,
                user:user,
                replies: []
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
