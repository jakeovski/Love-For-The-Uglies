import React, {useState} from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Chip,
    Divider,
    Grid, IconButton, InputAdornment, TextField, ToggleButton, ToggleButtonGroup,
    Typography,
    useTheme
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import OutletIcon from "@mui/icons-material/Outlet";
import {Delete, Edit, ExpandMore} from "@mui/icons-material";
import {MAX_COMMENT_LENGTH} from "../../Constants/general";
import SendIcon from "@mui/icons-material/Send";
import ReplyIcon from '@mui/icons-material/Reply';
import Reply from "./Reply";

const Comment = ({comment,handleReplySubmit,handleSubReplySubmit,handleLikeSubmit,userId,role,setNewComment,handleCommentDeleteSubmit,handleReplyDelete,handleSubReplyDeleteSubmit}) => {
    const theme = useTheme();
    const [newReply,setNewReply] = useState({
        id:'',
        message:''
    });


    const handleReplyCheck = () => {
        if(newReply.message.length > 0){
            handleReplySubmit(comment.comment._id,newReply);
        }
        setNewReply({
            id:'',
            message: ''
        });
    }

    const handleLikeClick = (likeType) => {
        handleLikeSubmit(likeType,comment.comment._id,likeType === comment.liked);
    }

    const handleEditComment = () => {
        setNewComment({
            id:comment.comment._id,
            comment:comment.comment.comment,
            image:comment.comment.image
        })
    }

    const handleCommentDelete = () => {
        console.log(comment.comment._id);
        handleCommentDeleteSubmit(comment.comment._id);
    }


    return (
        <Grid container padding={2} mb={2} spacing={1} alignItems="flex-start">
            <Grid item xs="auto">
                <Avatar alt={comment.user.username} src={comment.user.avatar} sx={{
                    backgroundColor: theme.palette.primary.main
                }}>
                    {comment.user.username.charAt(0)}
                </Avatar>
            </Grid>
            <Grid item container xs={11} sx={{
                borderRadius:3,
                ml:1,
                padding:1,
                backgroundColor:`${theme.palette.primary.main}30`
            }}>
                <Grid item xs={11}>
                    <Typography fontWeight="bold">{comment.user.username}</Typography>
                </Grid>
                {
                    (role === 'admin' || userId === comment.user._id) &&
                    <Grid item container xs={1} justifyContent="flex-end">
                        <Grid item xs="auto">
                            <IconButton size="small" onClick={handleEditComment}>
                                <Edit/>
                            </IconButton>
                        </Grid>
                        <Grid item xs="auto">
                            <IconButton size="small" onClick={handleCommentDelete}>
                                <Delete/>
                            </IconButton>
                        </Grid>
                    </Grid>
                }
                <Grid item xs={12}>
                    <Typography>{comment.comment.comment}</Typography>
                </Grid>
                <Grid item xs={12} mb={1}>
                    <Divider variant="fullWidth"/>
                </Grid>
                {
                    comment.comment.image &&
                    <>
                        <Grid item xs="auto">
                            <img style={{border:`4px solid ${theme.palette.primary.dark}`,borderRadius:10}} src={comment.comment.image} alt="commentImage" width="100%" height={200}/>
                        </Grid>
                    </>
                }

                <Grid item container xs={12} spacing={1}>
                    <Grid item xs="auto">
                        <Chip size="small" icon={<ThumbUpIcon sx={{
                            color:comment.liked === 'thumbsUp' && 'white !important'
                        }}/>} label={comment.comment.thumbsUp.length}
                        onClick={() => handleLikeClick('thumbsUp')} sx={{
                            backgroundColor:comment.liked === 'thumbsUp' && '#15a700',
                            color: comment.liked === 'thumbsUp' && 'white',
                        }} disabled={comment.liked ? comment.liked !== 'thumbsUp': false}/>
                    </Grid>
                    <Grid item xs="auto">
                        <Chip size="small" icon={<ThumbDownIcon sx={{
                            color:comment.liked === 'thumbsDown' && 'white !important'
                        }}/>} label={comment.comment.thumbsDown.length}
                        onClick={() => handleLikeClick('thumbsDown')} sx={{
                            backgroundColor:comment.liked === 'thumbsDown' && theme.palette.primary.main,
                            color: comment.liked === 'thumbsDown' && 'white',
                        }} disabled={comment.liked ? comment.liked !== 'thumbsDown': false}/>
                    </Grid>
                    <Grid item xs="auto">
                        <Chip size="small" icon={<LocalFireDepartmentIcon sx={{
                            color:comment.liked === 'fireLike' && 'white !important'
                        }}/>} label={comment.comment.fireLike.length}
                        onClick={() => handleLikeClick('fireLike')} sx={{
                            backgroundColor:comment.liked === 'fireLike' && '#ff5900',
                            color: comment.liked === 'fireLike' && 'white',
                        }} disabled={comment.liked ? comment.liked !== 'fireLike': false}/>
                    </Grid>
                    <Grid item xs="auto">
                        <Chip size="small" icon={<OutletIcon sx={{
                            color:comment.liked === 'surprisedLike' && 'white !important'
                        }}/>} label={comment.comment.surprisedLike.length}
                        onClick={() => handleLikeClick('surprisedLike')} sx={{
                            backgroundColor:comment.liked === 'surprisedLike' && '#586c8e',
                            color: comment.liked === 'surprisedLike' && 'white',
                        }} disabled={comment.liked ? comment.liked !== 'surprisedLike': false}/>
                    </Grid>
                </Grid>
                <Grid item xs={12} mt={1}>
                    <Divider/>
                </Grid>
                <Grid item xs={12}>
                        <Accordion
                            TransitionProps={{unmountOnExit:true}}
                            disableGutters
                            elevation={0}
                            sx={{
                            backgroundColor:`${theme.palette.primary.main}00`,
                                border:"none",
                        }}>
                            <AccordionSummary
                                expandIcon={<ExpandMore/>}
                                sx={{paddingLeft:"10px !important"}}
                            >
                                <Typography sx={{color:'#0095ff'}}>{comment.comment.numberOfComments > 0 ? `${comment.comment.numberOfComments} Comments` : 'Leave a Comment'}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={1}>
                                    {
                                        newReply.id &&
                                        <Grid item xs={12}>
                                            <Typography variant="subtitle2">Editing comment</Typography>
                                        </Grid>
                                    }
                                    <Grid item xs="auto">
                                        <Avatar alt={comment.user.username} src={comment.user.avatar} sx={{
                                            backgroundColor: theme.palette.primary.main
                                        }}>
                                            {comment.user.username.charAt(0)}
                                        </Avatar>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            multiline
                                            value={newReply.message}
                                            placeholder="Comment"
                                            onChange={(e) => {
                                                setNewReply({
                                                    ...newReply,message:e.target.value
                                                });
                                            }}
                                            InputProps={{
                                                sx:{
                                                    backgroundColor:'white'
                                                },
                                                endAdornment:<InputAdornment position="end">{`${newReply.message.length}/${MAX_COMMENT_LENGTH}`}</InputAdornment>
                                            }}
                                            inputProps={{
                                                maxLength: MAX_COMMENT_LENGTH
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs="auto">
                                        <IconButton onClick={handleReplyCheck}>
                                            <SendIcon/>
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider/>
                                    </Grid>
                                    {
                                        comment.replies.length > 0 &&
                                        comment.replies.map((reply) => (
                                            <Reply key={reply.reply._id} reply={reply} handleSubReplySubmit={handleSubReplySubmit}
                                            userId={userId} role={role} newReply={newReply} setNewReply={setNewReply}
                                                   handleReplyDelete={handleReplyDelete}
                                                   handleSubReplyDeleteSubmit={handleSubReplyDeleteSubmit}/>
                                        ))
                                    }
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Comment;