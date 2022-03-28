import React from 'react';
import {Avatar, Chip, Divider, Grid, Typography, useTheme} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import OutletIcon from "@mui/icons-material/Outlet";

const Comment = ({comment}) => {
    const theme = useTheme();

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
                        <Grid item xs={12} mb={1}>
                            <Divider variant="fullWidth"/>
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
            </Grid>
        </Grid>
    )
}

export default Comment;