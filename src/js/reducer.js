import searchReducer from './reducers/search';
import stockReducer from './reducers/stock';
import accountReducer from './reducers/account';
import portfolioReducer from './reducers/portfolio';

/**
 * Main application reducer function.
 *
 * It handles actions and mutate app state according to handled action type if specific reducer is defined
 * Read more about reducers: {@link http://rackt.org/redux/docs/basics/Reducers.html}
 *
 * @param {Object} state Current app state
 * @param {Object} action Currently processing action
 *
 * @returns {Object} New app state
 */
const reducer = function (state, action) {
    return state.merge({
        search:    searchReducer(state.get('search'), action),
        stock:     stockReducer(state.get('stock'), action),
        balance:   accountReducer(state.get('balance'), action),
        portfolio: portfolioReducer(state.get('portfolio'), action)
    });
};

export default reducer;

