import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// We will create these two pages in a moment
//Authendication
import LoginPage from './loginpage'


//Main App
import DefaultLayout from './Sidebar/DefaultLayout';
import Settinglayout from './Sidebar/Settinglayout';
import $ from 'jquery';
import LogoutPage from './logout';
import { withOidcSecure, OidcSecure } from '@axa-fr/react-oidc-context';


const App = (props) => {
    const { location, match, user } = props;

    useEffect(() => {
        if (location.pathname.includes("login") || location.pathname.includes("register") || location.pathname.includes("forgotpassword")
            || location.pathname.includes("otp") || location.pathname.includes("lockscreen")) {
            $('body').addClass('account-page');
        } else if (location.pathname.includes("error-404") || location.pathname.includes("error-500")) {
            $('body').addClass('error-page');
        }
    }, [])


    if (location.pathname === '/') {
        return (<Redirect to={'/login'} />);
    }
    return (
        <Switch>
            <Route path="/logout" component={LogoutPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/app" component={DefaultLayout} />
            {/* <Route path="/setups" component={withOidcSecure(Settinglayout)} /> */}
        </Switch>
    )
}

export default App
