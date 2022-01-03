import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getDoc } from "firebase/firestore";
import { takeLatest, put, all, call } from "redux-saga/effects";
import { auth, googleProvider, createUserProfileDocument } from "../../firebase/firebase.utils";
import { signInSuccess, signInFailure } from "./user.actions";


import UserActionTypes from "./user.types";

export function* signInWithGoogle() {
    try {
        const { user } = yield signInWithPopup(auth, googleProvider);
        const userRef = yield call(createUserProfileDocument,user);
        const userSnapshot = yield call(getDoc, userRef);
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot }));
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield signInWithEmailAndPassword(auth, email, password);
        const userRef = yield call(createUserProfileDocument,user);
        const userSnapshot = yield call(getDoc, userRef);
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot }));
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart)
    ])
}