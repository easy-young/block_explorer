import { createAction } from 'redux-actions';

const initialState = {
    //
};

const CREATE = {
    REQUEST: 'CREATE_REQUEST',
    SUCCESS: 'CREATE_SUCCESS',
    FAILURE: 'CREATE_FAILURE',
};

export const create_request = createAction(CREATE.REQUEST, (payload) => payload);
export const create_success = createAction(CREATE.SUCCESS, (payload) => payload);
export const create_failure = createAction(CREATE.FAILURE, (payload) => payload);

const create = (state = initialState, action) => {
    switch (action.type) {
        case CREATE.REQUEST:
            return {
                ...state,
            };
        case CREATE.SUCCESS:
            return {
                ...state,
            };
        case CREATE.FAILURE:
            return {
                ...state,
            };
        default:
            return {
                ...state,
            };
    }
};

export default create;
