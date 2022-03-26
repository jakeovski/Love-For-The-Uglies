import React from 'react';
import {
    Alert,
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    InputAdornment,
    TextField
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";

const CustomDialog = ({
                          open,
                          handleClose,
                          dialogTitle,
                          dialogContentText,
                          passwordData,
                          setPasswordData,
                          showPassword,
                          handleShowPassword,
                          submitAction,
                          alertMessage,
                          buttonLoading
                      }) => {

    return (
        <Dialog maxWidth="xs" open={open} onClose={handleClose}>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {dialogContentText}
                </DialogContentText>
                {
                    alertMessage.type &&
                    <Alert severity={alertMessage.type}>{alertMessage.message}</Alert>
                }
                {passwordData &&
                    <>
                    <TextField
                        autoFocus
                        name="oldPassword"
                        value={passwordData.oldPassword}
                        type={showPassword ? "text" : "password"}
                        required
                        size="small"
                        margin="dense"
                        onChange={(e) => {
                            setPasswordData({...passwordData,[e.target.name]:e.target.value})
                        }}
                        InputProps={{
                            endAdornment:(
                                <InputAdornment position="end">
                                    <IconButton onClick={handleShowPassword}>
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        fullWidth
                        label="Old Password"
                    />
                        <TextField
                            name="newPassword"
                            value={passwordData.newPassword}
                            type={showPassword ? "text" : "password"}
                            required
                            size="small"
                            margin="dense"
                            onChange={(e) => {
                                setPasswordData({...passwordData,[e.target.name]:e.target.value})
                            }}
                            InputProps={{
                                endAdornment:(
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleShowPassword}>
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            fullWidth
                            label="New Password"
                        />
                        <TextField
                            name="newPasswordConfirm"
                            value={passwordData.newPasswordConfirm}
                            type={showPassword ? "text" : "password"}
                            required
                            size="small"
                            margin="dense"
                            onChange={(e) => {
                                setPasswordData({...passwordData,[e.target.name]:e.target.value})
                            }}
                            InputProps={{
                                endAdornment:(
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleShowPassword}>
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            fullWidth
                            label="Confirm Password"
                        />
                    </>
                }
            </DialogContent>
            <DialogActions>
                <Button disabled={buttonLoading} onClick={handleClose}>Cancel</Button>
                <LoadingButton loading={buttonLoading} onClick={submitAction}>Confirm</LoadingButton>
            </DialogActions>
        </Dialog>
    )
}

export default CustomDialog;