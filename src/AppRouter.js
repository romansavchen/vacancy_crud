import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import qhistory from 'qhistory';
import qs from 'qs';

class AppRouter extends React.Component {

    static propTypes = {
        basename: PropTypes.string,
        forceRefresh: PropTypes.bool,
        getUserConfirmation: PropTypes.func,
        keyLength: PropTypes.number,
        children: PropTypes.node,
        stringify: PropTypes.func,
        parse: PropTypes.func
    }

    static defaultProps = {
        stringify: (search) => qs.stringify(search, { encodeValuesOnly: true, arrayFormat: 'repeat', allowDots: true }),
        parse: (search) => qs.parse(search, { allowDots: true, ignoreQueryPrefix: true })
    }

    history = qhistory(
        createBrowserHistory({...this.props}),
        this.props.stringify,
        this.props.parse
    )
    

    render() {
        return <Router history={this.history} children={this.props.children} />
    }
}

export default AppRouter;