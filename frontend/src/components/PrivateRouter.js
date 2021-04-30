import { React } from "react";
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'



function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props => (localStorage.userInfo) ? <Component {...props} /> : (
                <Redirect
                    to={{
                        pathname: '/signin',
                        state: { from: props.location },
                    }}
                />
            )
            }
        />
    );
}

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
    location: PropTypes.object,
};

export default PrivateRoute