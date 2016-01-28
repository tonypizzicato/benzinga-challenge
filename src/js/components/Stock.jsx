import cx from 'classnames';
import { Map } from 'immutable';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';

class Stock extends Component {

    _onClick = () => {
        this.props.search(this.refs.input.value);
    };

    _onSearch = event => {
        if (event.keyCode == 13) {
            this.props.search(this.refs.input.value);
        }
    };

    render() {
        const { stock, isFetching } = this.props;

        const title  = stock.get('name', 'Unknown');
        const symbol = stock.get('symbol', 'N/A');
        const ask    = stock.get('askPrice', '...');
        const bid    = stock.get('bidPrice', '...');

        const cls = cx('stock', { 'stock_status_loading': isFetching });

        return (
            <div className={cls}>
                <div className="stock__symbol">{symbol}</div>
                <div className="stock__title">{title}</div>
                <div className="stock__price">
                    <span className="stock__price-label">ask</span>
                    <span className="stock__price_bid">{ask}</span>
                </div>
                <div className="stock__price">
                    <span className="stock__price-label">bid</span>
                    <span className="stock__price_bid">{bid}</span>
                </div>
            </div>
        )
    }
}

function select(state) {
    return {
        stock:      state.getIn(['stock', 'value']) ? state.getIn(['stock', 'value']) : Map(),
        isFetching: state.getIn(['stock', 'isFetching'])
    }
}

function dispatch(dispatch) {
    return bindActionCreators(actions.stock, dispatch);
}

export default connect(select, dispatch)(Stock);