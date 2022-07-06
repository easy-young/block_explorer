import { createAction } from 'redux-actions';

const initialState = {
    current: 1,
    move: 1,
    point: 1,
    color: 0,
    flag: false,
};

const PAGES = {
    PLUS: 'PAGES_PLUS',
    MINUS: 'PAGES_MINUS',
    CHANGE: 'PAGES_CHANGE',
    COLOR: 'PAGES_COLOR',
};

export const pages_plus = createAction(PAGES.PLUS, (payload) => payload);
export const pages_minus = createAction(PAGES.MINUS, (payload) => payload);
export const pages_change = createAction(PAGES.CHANGE, (payload) => payload);
export const pages_color = createAction(PAGES.COLOR, (payload) => payload);

const pages = (state = initialState, action) => {
    switch (action.type) {
        case PAGES.PLUS:
        case PAGES.MINUS:
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
        case PAGES.COLOR:
            return {
                ...state,
                color: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
};

export default pages;
