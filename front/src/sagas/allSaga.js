import axios from 'axios';
import { takeLatest, call, put } from 'redux-saga/effects';
import { all_blocks_request, all_blocks_success, all_blocks_failure } from '../reducers/all';

const back_address = 'http://localhost:4000';

async function allBlocksAPI(action) {
    const result = await axios.post(back_address + '/all/block', action);
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

export default function* allSaga() {
    yield takeLatest(all_blocks_request.toString(), allBlocks);
}
