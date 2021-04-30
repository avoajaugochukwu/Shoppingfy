import { React } from "react";
import { Redirect, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'



function AppErrorHandler({ component: Component, ...rest }) {
    const error = useSelector((state) => state.error)
    const { dbError } = error
    console.log(dbError)
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

AppErrorHandler.propTypes = {
    component: PropTypes.func.isRequired,
    location: PropTypes.object,
};

export default AppErrorHandler