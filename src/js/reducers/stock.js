import { handleActions } from 'redux-actions';

import { STOCK_FETCH, STOCK_FETCH_SUCCESS, STOCK_FETCH_FAILURE } from '../actions/stock';

export default handleActions({
    [STOCK_FETCH]:         (state, action) => state.merge({isFetching: true}),
    [STOCK_FETCH_SUCCESS]: (state, action) => state.merge({isFetching: false, value: action.payload, error: null}),
    [STOCK_FETCH_FAILURE]: (state, action) => state.merge({isFetching: false, value: null, error: action.payload})
});