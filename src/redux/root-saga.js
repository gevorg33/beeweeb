import { all, call } from 'redux-saga/effects';

import { onFetchTasksStart } from './tasks/tasks.sagas';
import { userSagas } from "./user/user.sagas";

export default function* rootSaga() {
    yield all([call(onFetchTasksStart), call(userSagas)]);
}