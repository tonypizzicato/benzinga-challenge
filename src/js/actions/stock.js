import { API_CALL } from '../middlewares/fetchMiddleware';

export const STOCK_FETCH         = 'STOCK_FETCH';
export const STOCK_FETCH_SUCCESS = 'STOCK_FETCH_SUCCESS';
export const STOCK_FETCH_FAILURE = 'STOCK_FETCH_FAILURE';

function fetch(token) {
    return {
        [API_CALL]: {
            types:    [STOCK_FETCH, STOCK_FETCH_SUCCESS, STOCK_FETCH_FAILURE],
            endpoint: `http://careers-data.benzinga.com/rest/richquote?symbols=${token.toUpperCase()}`,
            method:   'GET'
        }
    }
}

export default {
    fetch
}
