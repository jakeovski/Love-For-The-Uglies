import React, {useState} from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Chip,
    Divider,
    Grid, IconButton, InputAdornment, TextField,
    Typography,
    useTheme
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import OutletIcon from "@mui/icons-material/Outlet";
import {ExpandMore} from "@mui/icons-material";
import {MAX_COMMENT_LENGTH} from "../../Constants/general";
import SendIcon from "@mui/icons-material/Send";
import ReplyIcon from '@mui/icons-material/Reply';
import Reply from "./Reply";

const Comment = ({comment,handleReplySubmit,handleSubReplySubmit}) => {
    const theme = useTheme();
    const [newReply,setNewReply] = useState('');


    const handleReplyCheck = () => {
        if(newReply.length > 0){
            handleReplySubmit(comment.comment._id,newReply);
        }
        setNewReply('');
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
                <Grid item xs={12}>
                    <Typography fontWeight="bold">{comment.user.username}</Typography>
                </Grid>
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
                        <Chip size="small" icon={<ThumbUpIcon/>} label={comment.comment.thumbsUp}/>
                    </Grid>
                    <Grid item xs="auto">
                        <Chip size="small" icon={<ThumbDownIcon/>} label={comment.comment.thumbsDown}/>
                    </Grid>
                    <Grid item xs="auto">
                        <Chip size="small" icon={<LocalFireDepartmentIcon/>} label={comment.comment.fireLike}/>
                    </Grid>
                    <Grid item xs="auto">
                        <Chip size="small" icon={<OutletIcon/>} label={comment.comment.surprisedLike}/>
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
                                            value={newReply}
                                            placeholder="Comment"
                                            onChange={(e) => {
                                                setNewReply(e.target.value);
                                            }}
                                            InputProps={{
                                                sx:{
                                                    backgroundColor:'white'
                                                },
                                                endAdornment:<InputAdornment position="end">{`${newReply.length}/${MAX_COMMENT_LENGTH}`}</InputAdornment>
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
                                            <Reply key={reply.reply._id} reply={reply} handleSubReplySubmit={handleSubReplySubmit}/>
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