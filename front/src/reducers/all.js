import { createAction } from 'redux-actions';

const initialState = {
    blocks: [],
    txs: [],
};

const ALL_BLOCKS = {
    REQUEST: 'ALL/BLOCKS_REQUEST',
    SUCCESS: 'ALL/BLOCKS_SUCCESS',
    FAILURE: 'ALL/BLOCKS_FAILURE',
};

const ALL_TXS = {
    REQUEST: 'ALL/TXS_REQUEST',
    SUCCESS: 'ALL/TXS_SUCCESS',
    FAILURE: 'ALL/TXS_FAILURE',
};

export const all_blocks_request = createAction(ALL_BLOCKS.REQUEST, (payload) => payload);
export const all_blocks_success = createAction(ALL_BLOCKS.SUCCESS, (payload) => payload);
export const all_blocks_failure = createAction(ALL_BLOCKS.FAILURE, (payload) => payload);

export const all_txs_request = createAction(ALL_TXS.REQUEST, (payload) => payload);
export const all_txs_success = createAction(ALL_TXS.SUCCESS, (payload) => payload);
export const all_txs_failure = createAction(ALL_TXS.FAILURE, (payload) => payload);

const all = (state = initialState, action) => {
    switch (action.type) {
        case ALL_BLOCKS.REQUEST:
            return {
                ...state,
            };
        case ALL_BLOCKS.SUCCESS:
            return {
                ...state,
                blocks: [...action.payload],
            };
        case ALL_BLOCKS.FAILURE:
            return {
                ...state,
            };
        case ALL_TXS.REQUEST:
            return {
                ...state,
            };
        case ALL_TXS.SUCCESS:
            return {
                ...state,
                txs: [...action.payload],
            };
        case ALL_TXS.FAILURE:
            return {
                ...state,
            };
        default:
            return {
                ...state,
            };
    }
};

export default all;
