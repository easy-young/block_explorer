import { createAction } from 'redux-actions';

const initialState = {
    difficulty: null,
    extraData: null,
    gasLimit: null,
    gasUsed: null,
    hash: null,
    miner: null,
    mixHash: null,
    nonce: null,
    number: null,
    parentHash: null,
    receiptsRoot: null,
    sha3Uncles: null,
    size: null,
    stateRoot: null,
    timestamp: null,
    totalDifficulty: null,
    transactionsRoot: null,
};

const BLOCK = {
    REQUEST: 'BLOCK_REQUEST',
    SUCCESS: 'BLOCK_SUCCESS',
    FAILURE: 'BLOCK_FAILURE',
};

export const block_request = createAction(BLOCK.REQUEST, (payload) => payload);
export const block_success = createAction(BLOCK.SUCCESS, (payload) => payload);
export const block_failure = createAction(BLOCK.FAILURE, (payload) => payload);

const block = (state = initialState, action) => {
    switch (action.type) {
        case BLOCK.REQUEST:
            return {
                ...state,
            };
        case BLOCK.SUCCESS:
            const {
                difficulty,
                extraData,
                gasLimit,
                gasUsed,
                hash,
                miner,
                mixHash,
                nonce,
                number,
                parentHash,
                receiptsRoot,
                sha3Uncles,
                size,
                stateRoot,
                timestamp,
                totalDifficulty,
                transactionsRoot,
            } = action.payload;
            return {
                ...state,
                difficulty,
                extraData,
                gasLimit,
                gasUsed,
                hash,
                miner,
                mixHash,
                nonce,
                number,
                parentHash,
                receiptsRoot,
                sha3Uncles,
                size,
                stateRoot,
                timestamp,
                totalDifficulty,
                transactionsRoot,
            };
        case BLOCK.FAILURE:
            return {
                ...state,
            };
        default:
            return {
                ...state,
            };
    }
};

export default block;
