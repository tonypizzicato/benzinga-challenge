import cx from 'classnames';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Account extends Component {
    static propTypes = {
        balance: PropTypes.number.isRequired
    };

    render() {
        const cls = cx('account');

        return (
            <div className={cls}>
                <span>Cash: </span>
                <span>$ {this.props.balance.toLocaleString()}</span>
            </div>
        )
    }
}

function select(state) {
    return {
        balance: state.get('balance'),
    }
}

export default connect(select)(Account);