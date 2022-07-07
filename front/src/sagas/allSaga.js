import axios from 'axios';
import { takeLatest, call, put } from 'redux-saga/effects';
import {
    all_blocks_request,
    all_blocks_success,
    all_blocks_failure,
    all_txs_request,
    all_txs_success,
    all_txs_failure,
} from '../reducers/all';

const back_address = 'http://localhost:4000';

async function allBlocksAPI(action) {
    const result = await axios.post(back_address + '/all/block', action);
    return result;
}

async function allTxsAPI(action) {
    const result = await axios.post(back_address + '/all/tx', action);
    return result;
}

function* allBlocks(action) {
    try {
        const result = yield call(allBlocksAPI, action);
        yield put({
            type: all_blocks_success.toString(),
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: all_blocks_failure.toString(),
            payload: e.response.data,
        });
    }
}

function* allTxs(action) {
    try {
        const result = yield call(allTxsAPI, action);
        yield put({
            type: all_txs_success.toString(),
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: all_txs_failure.toString(),
            payload: e.response.data,
        });
    }
}

export default function* allSaga() {
    yield takeLatest(all_blocks_request.toString(), allBlocks);
    yield takeLatest(all_txs_request.toString(), allTxs);
}
