import React, {useState} from 'react';
import {Avatar, Grid, IconButton, InputAdornment, TextField, Typography, useTheme} from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import {MAX_COMMENT_LENGTH} from "../../../../Constants/general";
import SendIcon from '@mui/icons-material/Telegram';
import SubReply from "./SubReply";
import {Delete, Edit} from "@mui/icons-material";

const Reply = ({
                   reply,
                   handleSubReplySubmit,
    user,
                   setNewReply,
                   newReply,
                   handleReplyDelete,
                   handleSubReplyDeleteSubmit
               }) => {
    //Hooks
    const theme = useTheme();

    //States
    const [newSubReply, setNewSubReply] = useState({
        id: '',
        message: ''
    });
    const [toggleReply, setToggleReply] = useState(false);

    //Handlers
    const handleToggleReply = () => {
        setToggleReply((prev) => !prev);
    }

    const subReplySubmit = () => {
        if (newSubReply.message) {
            handleSubReplySubmit(reply.reply._id, reply.reply.subReplies.length, newSubReply, reply.user.username);
            setNewSubReply({
                id: '',
                message: ''
            });
            handleToggleReply();
        }
    }
    const handleReplyEdit = () => {
        if (newReply.id) {
            setNewReply({
                id: '',
                message: ''
            })
        } else {
            setNewReply({
                id: reply.reply._id,
                message: reply.reply.comment
            })
        }
    }

    const handleSubReplyDelete = (subReplyId) => {
        handleSubReplyDeleteSubmit(subReplyId, reply.reply._id, reply.reply.parent);
    }

    return (
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
                        color: 'white',
                        borderRadius: 2,
                        backgroundColor: theme.palette.primary.light,
                        padding: 0.8
                    }}>{reply.reply.comment}</Typography>
                </Grid>
                <Grid item xs="auto">
                    <IconButton size="small" onClick={handleToggleReply}>
                        <ReplyIcon/>
                    </IconButton>
                </Grid>
                {
                    (user.role === 'admin' || user.id === reply.user._id) &&
                    <>
                        <Grid item xs="auto">
                            <IconButton size="small" onClick={handleReplyEdit}>
                                <Edit/>
                            </IconButton>
                        </Grid>
                        <Grid item xs="auto">
                            <IconButton size="small"
                                        onClick={() => handleReplyDelete(reply.reply._id, reply.reply.parent)}>
                                <Delete/>
                            </IconButton>
                        </Grid>
                    </>
                }
            </Grid>
            {
                toggleReply &&
                <Grid item container xs={12} spacing={1}>
                    <Grid item xs="auto" ml={2}>
                        <Avatar alt={reply.user.username} src={user.avatar} sx={{
                            backgroundColor: theme.palette.primary.main,
                            height: 24,
                            width: 24
                        }}>
                            {reply.user.username.charAt(0)}
                        </Avatar>
                    </Grid>
                    <Grid item xs={7}>
                        <TextField
                            fullWidth
                            size="small"
                            multiline
                            value={newSubReply.message}
                            placeholder="Reply"
                            onChange={(e) => {
                                setNewSubReply({
                                    ...newSubReply, message: e.target.value
                                });
                            }}
                            InputProps={{
                                sx: {
                                    backgroundColor: 'white'
                                },
                                endAdornment: <InputAdornment
                                    position="end">{`${newSubReply.message.length}/${MAX_COMMENT_LENGTH}`}</InputAdornment>
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
                reply.reply.subReplies.map((subReply, index) => (
                    <SubReply key={subReply._id} subReply={subReply} index={index} reply={reply}
                              handleSubReplySubmit={handleSubReplySubmit}
                              user={user}
                              handleSubReplyDelete={handleSubReplyDelete}
                    />
                ))
            }
        </Grid>
    )
}

export default Reply;