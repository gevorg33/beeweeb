import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAtMH2lIvkzaJfG7CGhrsdNyM7dkhlxRps",
    authDomain: "crown-db-a79f3.firebaseapp.com",
    projectId: "crown-db-a79f3",
    storageBucket: "crown-db-a79f3.appspot.com",
    messagingSenderId: "339192165779",
    appId: "1:339192165779:web:7528cac6e71a048d7c6466",
    measurementId: "G-NF386Y4YJ4"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};



//notUsable Yet
export const convertTasksSnapshotToMap = tasks => {

    const transformedTasks = tasks.docs.map(doc => {
        const { name, userId } = doc.data();

        return {
            id: doc.id,
            name,
            userId
        };
    });

    return transformedTasks;
};



export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
