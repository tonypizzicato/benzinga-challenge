import { API_CALL } from '../middlewares/fetchMiddleware';

export const SEARCH_FETCH         = 'SEARCH_FETCH';
export const SEARCH_FETCH_SUCCESS = 'SEARCH_FETCH_SUCCESS';
export const SEARCH_FETCH_FAILURE = 'SEARCH_FETCH_FAILURE';

function search(token) {
    return {
        [API_CALL]: {
            types:    [SEARCH_FETCH, SEARCH_FETCH_SUCCESS, SEARCH_FETCH_FAILURE],
            endpoint: `http://careers-data.benzinga.com/rest/richquote?symbols=${token.toUpperCase()}`,
            method:   'GET'
        }
    }
}

export default {
    search
}
