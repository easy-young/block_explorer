import { all } from 'redux-saga/effects';
import createSaga from './createSaga';
import latestSaga from './latestSaga';
import blockSaga from './blockSaga';
import txSaga from './txSaga';
import allSaga from './allSaga';

export default function* rootSaga() {
    yield all([createSaga(), latestSaga(), blockSaga(), txSaga(), allSaga()]);
}
