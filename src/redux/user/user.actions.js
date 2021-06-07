export const setCurrentUser = user =>({
    type: "SET_CURRENT_USER",
    payload: user
});



export const googleSignInStart = () => ({
    type: "GOOGLE_SIGN_IN_START"
});

export const googleSignInSuccess = user => ({
    type: "GOOGLE_SIGN_IN_SUCCESS",
    payload:user
});

export const googleSignInFailure = error => ({
    type: "GOOGLE_SIGN_IN_FAILURE",
    payload: error
});

export const emailSignInStart = (emailAndPassword) => ({
    type: "EMAIL_SIGN_IN_START",
    payload: emailAndPassword
});

export const emailSignInSuccess = user => ({
    type: "EMAIL_SIGN_IN_SUCCESS",
    payload: user
});

export const emailSignInFailure = error => ({
    type: "EMAIL_SIGN_IN_FAILURE",
    payload: error
});