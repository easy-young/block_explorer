import { all } from 'redux-saga/effects';
import latestSaga from './latestSaga';
import blockSaga from './blockSaga';
import txSaga from './txSaga';

export default function* rootSaga() {
    yield all([latestSaga(), blockSaga(), txSaga()]);
}
