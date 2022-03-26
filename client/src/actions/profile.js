import * as api from '../api';



export const editProfile = (oldUsername,
                            newUserData,
                            navigate,
                            setAlertMessage,
                            setProfileAlertMessage,
                            setBottomLoading,
                            setUser,
                            setUserForm,
                            setToggleEdit) => async() => {
    try{
        const {data} = await api.editProfile(oldUsername,newUserData);
        setUser(data.data.user);
        setUserForm(data.data.user);
        localStorage.setItem("token",JSON.stringify(data.data.tokens.token));
        setBottomLoading(false);
        setToggleEdit(false);
    }catch (error) {
        console.log(error.response);
        setBottomLoading(false);
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            setAlertMessage({
                type:error.response.data.type,
                message:error.response.data.message
            })
            navigate('/');
        }else {
            setProfileAlertMessage({
                type:error.response.data.type,
                message:error.response.data.message
            })
        }
    }
}

export const changePassword = (passwordData,setDialogButtonLoading,
                               setAlertMessage,navigate,
                               setDialogAlertMessage,
                               setPasswordDialogOpen) => async() => {
    try{
        await api.changePassword(passwordData);
        setDialogButtonLoading(false);
        setPasswordDialogOpen(false);
    }catch (error) {
        console.log(error.response);
        setDialogButtonLoading(false);
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            setAlertMessage({
                type:error.response.data.type,
                message:error.response.data.message
            })
            navigate('/');
        }else {
            setDialogAlertMessage({
                type:error.response.data.type,
                message:error.response.data.message
            })
        }
    }
}


export const deleteAccount = (setDialogButtonLoading,
                              setAlertMessage,navigate,setDialogAlertMessage,setDeleteDialogOpen) => async() => {
    try{
        await api.deleteAccount();
        localStorage.removeItem("token");
        navigate('/');
    }catch (error){
        console.log(error.response);
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            setAlertMessage({
                type:error.response.data.type,
                message:error.response.data.message
            })
            navigate('/');
        }else {
            setDialogAlertMessage({
                type:error.response.data.type,
                message:error.response.data.message
            })
        }
    }
}