import axios from 'axios';
import { takeLatest, call, put } from 'redux-saga/effects';
import { tx_request, tx_success, tx_failure } from '../reducers/tx';

const back_address = 'http://localhost:4000';

async function txAPI(action) {
    const result = await axios.post(back_address + '/tx/:idx', action);
    return result;
}

function* tx(action) {
    try {
        const result = yield call(txAPI, action);
        yield put({
            type: tx_success.toString(),
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: tx_failure.toString(),
            payload: e.response.data,
        });
    }
}

export default function* txSaga() {
    yield takeLatest(tx_request.toString(), tx);
}
