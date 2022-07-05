import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import create from './create';
import latest from './latest';
import block from './block';
import tx from './tx';
import all from './all';
import pages from './pages';

const persist = {
    key: 'jenny',
    storage,
};

const rootReducer = combineReducers({
    create,
    latest,
    block,
    tx,
    all,
    pages,
});

export default persistReducer(persist, rootReducer);
