import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';

class Search extends Component {

    _onClick = () => {
        const needle = this.refs.input.value;
        if (!!needle.length) {
            this.props.search(needle);
        }
    };

    _onSearch = event => {
        const needle = this.refs.input.value;
        if (event.keyCode == 13 && !!needle.length) {
            this.props.search(needle);
        }
    };

    render() {
        return (
            <div className="search">
                <input className="search__input" onKeyDown={this._onSearch} placeholder="Input symbol" ref="input"/>
                <button className="search__button" onClick={this._onClick}><i className="material-icons">search</i></button>
            </div>
        )
    }
}

function select(state) {
    return {
        search: state.get('search')
    }
}

function dispatch(dispatch) {
    return bindActionCreators(actions.search, dispatch);
}

export default connect(select, dispatch)(Search);