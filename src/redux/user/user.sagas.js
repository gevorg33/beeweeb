import {takeLatest, put, all, call} from 'redux-saga/effects';
import {googleSignInSuccess,googleSignInFailure} from "./user.actions";
import {auth, provider, createUserProfileDocument} from "../../firebase/firebase.utils";

export function* signInWithGoogle(){
    try{
        const {user} = yield auth.signInWithPopup(provider);
        const userRef = yield call(createUserProfileDocument,user)
        const userSnapshot = yield userRef.get()
        yield put(googleSignInSuccess({id: userSnapshot.id, ...userSnapshot.data()})
        );
    } catch (error){
        yield put(googleSignInFailure(error));
    }
}


export function* onGoogleSignInStart() {
    yield takeLatest("EMAIL_SIGN_IN_START", signInWithGoogle);
}

export function* userSagas() {
    yield all([call(onGoogleSignInStart)])
}