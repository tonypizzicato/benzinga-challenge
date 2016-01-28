import cx from 'classnames';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';

class Table extends Component {

    render() {
        const cls = cx('portfolio');

        return (
            <table className={cls}>
                <thead>
                <tr>
                    <th width="60%">Company</th>
                    <th width="20%">Quantity</th>
                    <th width="20%">Price Paid</th>
                </tr>
                </thead>
                <tbody>
                {this.props.portfolio.map(item => {
                    return (
                        <tr key={item["symbol"]}>
                            <td>{item["name"]}</td>
                            <td>{item["quantity"]}</td>
                            <td>{item["price"]}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        )
    }
}

function select(state) {
    return {
        portfolio: state.get('portfolio').toJS(),
    }
}

function dispatch(dispatch) {
    return bindActionCreators(actions.stock, dispatch);
}

export default connect(select, dispatch)(Table);