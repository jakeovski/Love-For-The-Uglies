import React, {useState} from 'react';
import {Avatar, Box, Divider, Grid, IconButton, InputAdornment, TextField, Typography, useTheme} from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import {MAX_COMMENT_LENGTH} from "../../Constants/general";
import SendIcon from "@mui/icons-material/Send";


const SubReply = ({subReply,index,reply,handleSubReplySubmit}) => {

    const theme = useTheme();
    const [toggleReply,setToggleReply] = useState(false);
    const [newSubReply,setNewSubReply] = useState('');

    const handleToggleReply = () => {
        setToggleReply((prev) => !prev);
    }

    const subReplySubmit = () => {
        if(newSubReply) {
            handleSubReplySubmit(reply.reply._id,index + 1,newSubReply,subReply.username);
            setNewSubReply('');
            handleToggleReply();
        }
    }

    return (
        <>
            <Grid item container xs={12} ml={7} sx={{borderLeft:`1px dotted ${theme.palette.primary.dark}`}}>
                <Grid item xs={12}>
                    <Typography variant="subtitle2">{subReply.username}</Typography>
                </Grid>
                <Grid item xs="auto" >
                    <Typography variant="subtitle2" sx={{
                        padding:0.5,
                        color:'white',
                        borderRadius:2,
                        backgroundColor:theme.palette.primary.light
                    }}>{`@${subReply.replyTo} ${subReply.comment}`}</Typography>
                </Grid>
                <Grid item xs="auto">
                    <IconButton size="small" onClick={handleToggleReply}>
                        <ReplyIcon/>
                    </IconButton>
                </Grid>
                {
                    toggleReply &&
                    <Grid item container xs={12} spacing={1} mt={0.5}>
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
            </Grid>
        </>
    );
}

export default SubReply;