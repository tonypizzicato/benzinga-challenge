import cx from 'classnames';
import { Map } from 'immutable';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';

class StockActions extends Component {
    render() {
        const cls = cx('stock-actions', { 'stock-actions_status_disabled': this.props.disabled });

        return (
            <div className={cls}>
                <button className="stock-actions__button stock-actions__button_type_buy" disabled={this.props.disabled}>Buy</button>
                <button className="stock-actions__button stock-actions__button_type_sell" disabled={this.props.disabled}>Sell</button>
            </div>
        )
    }
}

function select(state) {
    return {
        disabled: !state.getIn(['stock', 'value', 'askPrice']),
    }
}

function dispatch(dispatch) {
    return bindActionCreators(actions.stock, dispatch);
}

export default connect(select, dispatch)(StockActions);