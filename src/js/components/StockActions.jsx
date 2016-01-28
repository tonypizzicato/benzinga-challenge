import cx from 'classnames';
import { Map } from 'immutable';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';

function isNumeric(input) {
    return (input - 0) == input && ('' + input).trim().length > 0;
}

class StockActions extends Component {

    state = {
        quantity: null,
        error:    false
    };

    _onButtonClick = (action) => {
        const quantity = this.refs.input.value;

        if (!isNumeric(quantity) || quantity <= 0) {
            return this.setState({ error: true });
        } else {
            const stockAction = action == 'buy' ? 'ask' : 'bid';

            this.props[action]({
                symbol:   this.props.stock.get('symbol'),
                name:     this.props.stock.get('name'),
                price:    this.props.stock.get(`${stockAction}Price`),
                quantity: parseFloat(quantity)
            });

            return this.setState({ quantity: null, error: false });
        }
    };

    _onAmountChange = event => {
        const quantity = event.target.value;

        this.setState({ quantity: quantity });
    };

    render() {
        const { stock, portfolio, balance, disabled } = this.props;

        const cls      = cx('stock-actions', { 'stock-actions_status_disabled': this.props.disabled });
        const clsInput = cx('stock-actions__amount', { 'stock-actions__amount_status_error': this.state.error });

        const stockInPortfolio = portfolio.find(item => item.get('symbol') == stock.get('symbol'));

        const disabledBuy  = disabled || this.state.quantity * stock.get('askPrice') > balance;
        const disabledSell = disabled || !stockInPortfolio || this.state.quantity > stockInPortfolio.get('quantity');

        const priceBuy  = this.state.quantity * stock.get('askPrice');
        const priceSell = this.state.quantity * stock.get('bidPrice');

        const clsButton     = cx('stock-actions__button', { 'stock-actions__button_with-price': priceBuy });
        const clsButtonBuy  = cx(clsButton, 'stock-actions__button_type_buy');
        const clsButtonSell = cx(clsButton, 'stock-actions__button_type_sell');

        return (
            <div className={cls}>
                <div className={clsInput}>
                    <input className="stock-actions__input"
                           value={this.state.quantity}
                           type="number"
                           placeholder="Input quantity"
                           onChange={this._onAmountChange}
                           disabled={this.props.disabled}
                           ref="input"/>
                </div>

                <button className={clsButtonBuy}
                        onClick={this._onButtonClick.bind(this, 'buy')}
                        disabled={disabledBuy}>
                    <span className="stock-actions__button_label">Buy</span>
                    <span className="stock-actions__button_price">{priceBuy ? ` $${priceBuy.toLocaleString()}` : null}</span>
                </button>

                <button className={clsButtonSell}
                        onClick={this._onButtonClick.bind(this, 'sell')}
                        disabled={disabledSell}>
                    <span className="stock-actions__button_label">Sell</span>
                    <span className="stock-actions__button_price">{priceSell ? ` $${priceSell.toLocaleString()}` : null}</span>
                </button>
            </div>
        )
    }
}

function select(state) {
    return {
        stock:     state.getIn(['stock', 'value']) ? state.getIn(['stock', 'value']) : Map(),
        portfolio: state.get('portfolio'),
        balance:   state.get('balance'),
        disabled:  !state.getIn(['stock', 'value', 'askPrice']),
    }
}

function dispatch(dispatch) {
    return bindActionCreators(actions.stock, dispatch);
}

export default connect(select, dispatch)(StockActions);