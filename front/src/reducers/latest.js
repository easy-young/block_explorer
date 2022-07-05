import { createAction } from 'redux-actions';

const initialState = {
    blocks: [],
    txs: [],
};

const LATEST = {
    REQUEST: 'LATEST_REQUEST',
    SUCCESS: 'LATEST_SUCCESS',
    FAILURE: 'LATEST_FAILURE',
};

export const latest_request = createAction(LATEST.REQUEST, (payload) => payload);
export const latest_success = createAction(LATEST.SUCCESS, (payload) => payload);
export const latest_failure = createAction(LATEST.FAILURE, (payload) => payload);

const latest = (state = initialState, action) => {
    switch (action.type) {
        case LATEST.REQUEST:
            return {
                ...state,
            };
        case LATEST.SUCCESS:
            return {
                ...state,
                blocks: [...action.payload.block],
                txs: [...action.payload.tx],
            };
        case LATEST.FAILURE:
            return {
                ...state,
            };
        default:
            return {
                ...state,
            };
    }
};

export default latest;
