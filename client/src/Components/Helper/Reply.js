import React, {useState} from 'react';
import {Avatar, Grid, IconButton, InputAdornment, TextField, Typography, useTheme} from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import {MAX_COMMENT_LENGTH} from "../../Constants/general";
import SendIcon from "@mui/icons-material/Send";
import SubReply from "./SubReply";

const Reply = ({reply,handleSubReplySubmit}) => {
    const theme = useTheme();

    const [newSubReply,setNewSubReply] = useState('');
    const [toggleReply,setToggleReply] = useState(false);

    const handleToggleReply = () =>{
        setToggleReply((prev) => !prev);
    }

    const subReplySubmit = () => {
        if (newSubReply){
            handleSubReplySubmit(reply.reply._id,reply.reply.subReplies.length,newSubReply,reply.user.username);
            setNewSubReply('');
            handleToggleReply();
        }
    }

    return(
        <Grid item container xs={12} spacing={1}>
            <Grid item xs="auto">
                <Avatar alt={reply.user.username} src={reply.user.avatar} sx={{
                    backgroundColor: theme.palette.primary.main
                }}>
                    {reply.user.username.charAt(0)}
                </Avatar>
            </Grid>
            <Grid item container xs="auto">
                <Grid item xs={12}>
                    <Typography variant="subtitle2">{reply.user.username}</Typography>
                </Grid>
                <Grid item xs="auto">
                    <Typography sx={{
                        color:'white',
                        borderRadius:2,
                        backgroundColor:theme.palette.primary.light,
                        padding:0.8
                    }}>{reply.reply.comment}</Typography>
                </Grid>
                <Grid item xs="auto">
                    <IconButton size="small" onClick={handleToggleReply}>
                        <ReplyIcon/>
                    </IconButton>
                </Grid>
            </Grid>
            {
                toggleReply &&
                <Grid item container xs={12} spacing={1}>
                    <Grid item xs="auto" ml={2}>
                        <Avatar alt={reply.user.username} src={reply.user.avatar} sx={{
                            backgroundColor: theme.palette.primary.main,
                            height:24,
                            width:24
                        }}>
                            {reply.user.username.charAt(0)}
                        </Avatar>
                    </Grid>
                    <Grid item xs={7}>
                        <TextField
                            fullWidth
                            size="small"
                            multiline
                            value={newSubReply}
                            placeholder="Reply"
                            onChange={(e) => {
                                setNewSubReply(e.target.value);
                            }}
                            InputProps={{
                                sx:{
                                    backgroundColor:'white'
                                },
                                endAdornment:<InputAdornment position="end">{`${newSubReply.length}/${MAX_COMMENT_LENGTH}`}</InputAdornment>
                            }}
                            inputProps={{
                                maxLength: MAX_COMMENT_LENGTH
                            }}
                        />
                    </Grid>
                    <Grid item xs="auto">
                        <IconButton onClick={subReplySubmit}>
                            <SendIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            }
            {
                reply.reply.subReplies.length > 0 &&
                reply.reply.subReplies.map((subReply,index) => (
                    <SubReply key={subReply._id} subReply={subReply} index={index} reply={reply}
                        handleSubReplySubmit={handleSubReplySubmit}
                    />
                ))
            }
        </Grid>
    )
}

export default Reply;