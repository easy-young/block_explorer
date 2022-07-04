import axios from 'axios';
import { takeLatest, call, put } from 'redux-saga/effects';
import { create_request, create_success, create_failure } from '../reducers/create';

const back_address = 'http://localhost:4000';

async function createAPI(action) {
    const result = await axios.post(back_address + '/block/create', action);
    return result;
}

function* create(action) {
    try {
        const result = yield call(createAPI, action);
        yield put({
            type: create_success.toString(),
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: create_failure.toString(),
            payload: e.response.data,
        });
    }
}

export default function* createSaga() {
    yield takeLatest(create_request.toString(), create);
}
