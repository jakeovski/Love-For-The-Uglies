import * as api from '../api';


/**
 * @param oldUsername
 * @param newUserData
 * @param navigate
 * @param setAlertMessage
 * @param setProfileAlertMessage
 * @param setBottomLoading
 * @param setUser
 * @param setUserForm
 * @param setToggleEdit
 * @returns {(function(): Promise<void>)|*}
 */
export const editProfile = (oldUsername,
                            newUserData,
                            navigate,
                            setAlertMessage,
                            setProfileAlertMessage,
                            setBottomLoading,
                            setUser,
                            setUserForm,
                            setToggleEdit) => async () => {
    try {
        const {data} = await api.editProfile(oldUsername, newUserData);
        setUser(data.data.user);
        setUser({
            id: data.data.user._id,
            firstName: data.data.user.firstName,
            lastName: data.data.user.lastName,
            username: data.data.user.username,
            role: data.data.user.role,
            avatar: data.data.user.avatar,
            created: data.data.user.created
        });
        setUserForm(data.data.user);
        localStorage.setItem("token", JSON.stringify(data.data.tokens.token));
        setBottomLoading(false);
        setToggleEdit(false);
    } catch (error) {
        console.log(error.response);
        setBottomLoading(false);
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            setAlertMessage({
                type: error.response.data.type,
                message: error.response.data.message
            })
            navigate('/');
        } else {
            setProfileAlertMessage({
                type: error.response.data.type,
                message: error.response.data.message
            })
        }
    }
}

/**
 * @param passwordData
 * @param setDialogButtonLoading
 * @param setAlertMessage
 * @param navigate
 * @param setDialogAlertMessage
 * @param setPasswordDialogOpen
 * @returns {(function(): Promise<void>)|*}
 */
export const changePassword = (passwordData, setDialogButtonLoading,
                               setAlertMessage, navigate,
                               setDialogAlertMessage,
                               setPasswordDialogOpen) => async () => {
    try {
        await api.changePassword(passwordData);
        setDialogButtonLoading(false);
        setPasswordDialogOpen(false);
    } catch (error) {
        console.log(error.response);
        setDialogButtonLoading(false);
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            setAlertMessage({
                type: error.response.data.type,
                message: error.response.data.message
            })
            navigate('/');
        } else {
            setDialogAlertMessage({
                type: error.response.data.type,
                message: error.response.data.message
            })
        }
    }
}

/**
 * @param setDialogButtonLoading
 * @param setAlertMessage
 * @param navigate
 * @param setDialogAlertMessage
 * @param setDeleteDialogOpen
 * @returns {(function(): Promise<void>)|*}
 */
export const deleteAccount = (setDialogButtonLoading,
                              setAlertMessage, navigate, setDialogAlertMessage, setDeleteDialogOpen) => async () => {
    try {
        await api.deleteAccount();
        localStorage.removeItem("token");
        navigate('/');
    } catch (error) {
        console.log(error.response);
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            setAlertMessage({
                type: error.response.data.type,
                message: error.response.data.message
            })
            navigate('/');
        } else {
            setDialogAlertMessage({
                type: error.response.data.type,
                message: error.response.data.message
            })
        }
    }
}