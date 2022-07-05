import { createAction } from 'redux-actions';

const initialState = {
    current: 1,
    move: 1,
    point: 1,
    flag: false,
};

const PAGES = {
    PLUS: 'PAGES_PLUS',
    MINUS: 'PAGES_MINUS',
    CHANGE: 'PAGES_CHANGE',
};

export const pages_plus = createAction(PAGES.PLUS, (payload) => payload);
export const pages_minus = createAction(PAGES.MINUS, (payload) => payload);
export const pages_change = createAction(PAGES.CHANGE, (payload) => payload);

const pages = (state = initialState, action) => {
    switch (action.type) {
        case PAGES.PLUS:
            return {
                ...state,
                current: action.payload,
                move: (action.payload - 1) * 10 + 1,
                flag: true,
            };
        case PAGES.MINUS:
            if (action.payload < 0)
                return {
                    ...state,
                };
            return {
                ...state,
                current: action.payload,
                move: (action.payload - 1) * 10 + 1,
                flag: true,
            };
        case PAGES.CHANGE:
            return {
                ...state,
                point: action.payload,
                flag: false,
            };
        default:
            return {
                ...state,
            };
    }
};

export default pages;
