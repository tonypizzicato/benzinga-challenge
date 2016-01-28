import React, { Component, PropTypes } from 'react';

import Search from './Search.jsx';
import Stock from './Stock.jsx';
import StockActions from './StockActions.jsx';

/**
 * Page content container component
 */
class App extends Component {
    render() {
        return (
            <div className="page__content-container">
                <h1 className="title">Benzinga Exchange</h1>
                <main>
                </main>
                <aside>
                    <Search/>
                    <Stock/>
                    <StockActions/>
                </aside>
            </div>
        )
    }
}

export default App;