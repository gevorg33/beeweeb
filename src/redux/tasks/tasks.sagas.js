import { takeLatest, call, put } from 'redux-saga/effects';

import {
    firestore,
    convertTasksSnapshotToMap
} from '../../firebase/firebase.utils';

import {
    fetchTasksSuccess,
    fetchTasksFailure
} from './tasks.actions';


export function* fetchTasks() {
    try {
        const collectionRef = firestore.collection('projects');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(
            convertTasksSnapshotToMap,
            snapshot
        );
        yield put(fetchTasksSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchTasksFailure(error.message));
    }
}

export function* onFetchTasksStart() {
    yield takeLatest("FETCH_TASKS_START", fetchTasks);
}