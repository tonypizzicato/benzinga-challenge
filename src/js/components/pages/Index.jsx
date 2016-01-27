import React, { Component, PropTypes } from 'react';

import Search from '../Search.jsx';

/**
 * Page content container component
 */
class Index extends Component {
    render() {
        return (
            <div className="page__content-container">
                <h1 className="title">Benzinga Exchange</h1>
                <main>
                </main>
                <aside>
                    <Search/>
                </aside>
            </div>
        )
    }
}

export default Index;