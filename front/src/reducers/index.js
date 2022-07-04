import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import create from './create';
import latest from './latest';
import block from './block';
import tx from './tx';

const persist = {
    key: 'jenny',
    storage,
};

const rootReducer = combineReducers({
    create,
    latest,
    block,
    tx,
});

export default persistReducer(persist, rootReducer);
