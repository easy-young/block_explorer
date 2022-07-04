import axios from 'axios';
import { takeLatest, call, put } from 'redux-saga/effects';
import { latest_request, latest_success, latest_failure } from '../reducers/latest';

const back_address = 'http://localhost:4000';

async function latestAPI(action) {
    const result = await axios.post(back_address, action);
    return result;
}

function* latest(action) {
    try {
        const result = yield call(latestAPI, action);
        yield put({
            type: latest_success.toString(),
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: latest_failure.toString(),
            payload: e.response.data,
        });
    }
}

export default function* latestSaga() {
    yield takeLatest(latest_request.toString(), latest);
}
