import {
    firestore,
    convertTasksSnapshotToMap
} from '../../firebase/firebase.utils';

export const fetchTasksStart = () => ({
    type: "FETCH_TASKS_START"
});

export const fetchTasksSuccess = collectionsMap => ({
    type: "FETCH_TASKS_SUCCESS",
    payload: collectionsMap
});

export const fetchTasksFailure = errorMessage => ({
    type: "FETCH_TASKS_FAILURE",
    payload: errorMessage
});

export const fetchTasksStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('projects');
        dispatch(fetchTasksStart());

        collectionRef
            .get()
            .then(snapshot => {
                const collectionsMap = convertTasksSnapshotToMap(snapshot);
                dispatch(fetchTasksSuccess(collectionsMap));
            })
            .catch(error => dispatch(fetchTasksFailure(error.message)));
    };
};