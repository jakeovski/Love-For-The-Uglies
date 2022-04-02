import React, {useEffect, useState} from 'react';
import {
    Alert,
    Avatar,
    Button,
    CircularProgress,
    Divider,
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import {MAX_COMMENT_LENGTH} from "../../../../Constants/general";
import ClearIcon from '@mui/icons-material/Clear';
import SendIcon from '@mui/icons-material/Telegram';
import Dropzone from "react-dropzone";
import {styled} from "@mui/material/styles";
import {useDispatch, useSelector} from "react-redux";
import {
    addComment,
    addReply,
    addSubReply,
    deleteComment,
    deleteSubReply,
    getAllComments,
    likeComment
} from "../../../../actions/comments";
import {useNavigate} from "react-router-dom";
import Comment from "./Comment";


export const DropzoneContainer = styled('div')(({theme}) => ({
    alignItems: 'center',
    padding: '5px',
    border: '1px dotted',
    borderRadius: 4,
    borderColor: theme.palette.primary.light,
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    '&:hover': {
        border: '2px solid',
        borderColor: theme.palette.primary.light
    }
}));

const Comments = ({user, setAlertMessage}) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const comments = useSelector((state) => state.comments);
    const [newComment, setNewComment] = useState({
        id: '',
        comment: '',
        image: ''
    });
    const [imageAlertMessage, setImageAlertMessage] = useState({
        type: '',
        message: ''
    });

    const [commentAlertMessage, setCommentAlertMessage] = useState({
        type: '',
        message: ''
    })

    const [chatAlertMessage, setChatAlertMessage] = useState({
        type: '',
        message: ''
    })

    const [commentsLoading, setCommentsLoading] = useState(false);

    const handleImageUpload = (base64) => {
        if (!base64[0].type.includes('image')) {
            setImageAlertMessage({
                type: 'error',
                message: 'The file must be an image!'
            })
            setNewComment({...newComment, image: ''});
        } else {
            setImageAlertMessage({type: '', message: ''});
        }

        const size = parseInt(base64[0].size);
        if (size > 1000000) {
            setImageAlertMessage({
                type: 'error',
                message: 'Image must be less than 1 MB'
            })
            setNewComment({...newComment, image: ''});
        } else {
            const reader = new FileReader();
            reader.readAsDataURL(base64[0]);
            reader.onload = () => {
                setNewComment({...newComment, image: reader.result});
            }
            reader.onerror = (error) => {
                setImageAlertMessage({
                    type: 'error',
                    message: error
                })
            }
        }
    }

    const handleClearButton = () => {
        setNewComment({
            id: '',
            comment: '',
            image: ''
        });
    }

    const handleNewCommentSubmit = () => {
        dispatch(addComment(newComment, setCommentAlertMessage, setAlertMessage, navigate));
        handleClearButton();
    }

    useEffect(() => {
        if (!comments.length > 0) {
            setCommentsLoading(true);
            dispatch(getAllComments(setAlertMessage, setChatAlertMessage, navigate, setCommentsLoading));
        }
    }, []);

    const handleReplySubmit = (parentComponent, comment) => {
        dispatch(addReply(setAlertMessage, navigate, setCommentsLoading, setChatAlertMessage,
            parentComponent, comment));
    }

    const handleSubReplySubmit = (commentId, subReplyPosition, comment, replyTo) => {
        dispatch(addSubReply(setAlertMessage, navigate, setCommentsLoading, setChatAlertMessage,
            commentId, subReplyPosition, comment, replyTo));
    }

    const handleLikeSubmit = (likeType, commentId, remove) => {
        dispatch(likeComment(setAlertMessage, navigate, setChatAlertMessage, likeType, commentId, remove));
    }

    const handleImageRemove = () => {
        setNewComment({
            ...newComment, image: ''
        })
    }

    const handleCommentDeleteSubmit = (commentId) => {
        dispatch(deleteComment(setAlertMessage, navigate, setChatAlertMessage, commentId, false));
    }

    const handleReplyDelete = (replyId, parent) => {
        dispatch(deleteComment(setAlertMessage, navigate, setChatAlertMessage, replyId, true, parent));
    }

    const handleSubReplyDeleteSubmit = (subReplyId, replyId, parentId) => {
        dispatch(deleteSubReply(setAlertMessage, navigate, setChatAlertMessage, subReplyId, replyId, parentId));
    }

    return (
        <Paper elevation={3} sx={{
            mt: 1,
            mb: 1,
            borderRadius: 4
        }}>
            <Grid container padding={2} mb={2}>
                <Grid item xs={12}>
                    <Typography variant="h5" sx={{opacity: 0.7}}>Create Discussion</Typography>
                </Grid>
                {
                    newComment.id &&
                    <Grid item xs={12} textAlign="center">
                        <Typography fontWeight="bold">{`Editing comment`}</Typography>
                    </Grid>
                }
                <Grid item container xs={12} spacing={1} mt={1}>
                    <Grid item xs="auto" justifyContent="flex-end">
                        <Avatar alt={user.username} src={user.avatar} sx={{
                            backgroundColor: theme.palette.primary.main
                        }}>
                            {user.username.charAt(0)}
                        </Avatar>
                    </Grid>
                    <Grid item container xs={12} lg={7} alignContent="flex-start">
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Comment"
                                value={newComment.comment}
                                onChange={(e) => {
                                    setNewComment({
                                        ...newComment, comment: e.target.value
                                    })
                                }}
                                placeholder="Start typing"
                                multiline
                                inputProps={{
                                    maxLength: MAX_COMMENT_LENGTH
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment
                                        position="end">{`${newComment.comment.length}/${MAX_COMMENT_LENGTH}`}</InputAdornment>
                                }}
                            />
                        </Grid>
                        <Grid item container xs={12} alignItems="center" justifyContent="space-between" mt={1}>
                            <Grid item xs={7}>
                                <Dropzone onDrop={handleImageUpload}>
                                    {({getRootProps, getInputProps}) => (
                                        <section>
                                            <DropzoneContainer theme={theme} {...getRootProps()}>
                                                <input {...getInputProps()}/>
                                                <p>Drag 'n' drop an image here, or click to select an image</p>
                                            </DropzoneContainer>
                                        </section>
                                    )}
                                </Dropzone>
                            </Grid>
                            <Grid item container xs="auto" spacing={2}>
                                {(newComment.comment || newComment.image) &&
                                    <>
                                        <Grid item xs="auto">
                                            <IconButton onClick={handleClearButton}>
                                                <ClearIcon/>
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs="auto">
                                            <IconButton sx={{
                                                color: 'white',
                                                backgroundColor: theme.palette.primary.light,
                                                '&:hover': {
                                                    color: 'black'
                                                }
                                            }} onClick={handleNewCommentSubmit}>
                                                <SendIcon/>
                                            </IconButton>
                                        </Grid>
                                    </>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} lg={4}>
                        {
                            newComment.image &&
                            <>
                                <Grid item xs="auto">
                                    <img style={{border: `4px solid ${theme.palette.primary.dark}`, borderRadius: 10}}
                                         src={newComment.image} alt="commentImage" width="100%" height={200}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button size="small" onClick={handleImageRemove}>Remove image</Button>
                                </Grid>
                            </>
                        }
                        {
                            imageAlertMessage.type &&
                            <Grid item xs={12}>
                                <Alert severity={imageAlertMessage.type}>{imageAlertMessage.message}</Alert>
                            </Grid>
                        }
                    </Grid>
                </Grid>
            </Grid>
            {
                commentAlertMessage.type &&
                <Alert severity={commentAlertMessage.type}>{commentAlertMessage.message}</Alert>
            }
            <Divider><Typography variant="h5" fontFamily="Indie Flower">Chat</Typography></Divider>
            {
                commentsLoading ?
                    <Grid item xs={12} textAlign="center">
                        <CircularProgress/>
                    </Grid>
                    :
                    comments.length > 0 ?
                        comments.map((comment) => (
                            <Comment comment={comment} key={comment.comment._id}
                                     handleReplySubmit={handleReplySubmit}
                                     handleSubReplySubmit={handleSubReplySubmit}
                                     handleLikeSubmit={handleLikeSubmit}
                                     user={user}
                                     setNewComment={setNewComment}
                                     handleCommentDeleteSubmit={handleCommentDeleteSubmit}
                                     handleReplyDelete={handleReplyDelete}
                                     handleSubReplyDeleteSubmit={handleSubReplyDeleteSubmit}
                            />
                        ))
                        :
                        <Alert severity={chatAlertMessage.type ? chatAlertMessage.type : 'info'}>
                            {chatAlertMessage.message ? chatAlertMessage.message : 'No chat messages'}
                        </Alert>
            }
        </Paper>
    )
}

export default Comments;