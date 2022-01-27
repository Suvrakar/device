/**
 * Signin Firebase
 */

import React, { useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Applogo } from '../Entryfile/imagepath.jsx'
import { useReactOidc } from '@axa-fr/react-oidc-context';
import { useHistory,Redirect } from 'react-router-dom';


const LoginPage = () => {

  const { oidcUser, login } = useReactOidc();
  let history = useHistory();

  const loginclick = async () => {
    login();
  }

  useEffect(() => {
    if (oidcUser) {
      history.push('/app/deviceprofile')
    }
  }, [oidcUser])



  return (


    <div className="main-wrapper">
      <Helmet>
        <title>Login - Hive Attendance</title>
        <meta name="description" content="Login page" />
      </Helmet>
      <div className="account-content">
        {/* <a href="/hive_hrm/applyjob/joblist" className="btn btn-primary apply-btn">Apply Job</a> */}
        <div className="container">
          {/* Account Logo */}
          <div className="account-logo">
            <img src={Applogo} alt="Dreamguy's Technologies" />
          </div>
          {/* /Account Logo */}
          <div className="account-box">
            <div className="account-wrapper">
              <h3 className="account-title">Login</h3>
              <p className="account-subtitle">Access to our dashboard</p>
              {/* Account Form */}
              {/* <form action="/hive_hrm/app/employees/dashboard">
                <div className="form-group">
                  <label>Email Address</label>
                  <input className="form-control" type="text" />
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col">
                      <label>Password</label>
                    </div>
                    <div className="col-auto">
                      <a className="text-muted" href="/hive_hrm/forgotpassword">
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <input className="form-control" type="password" />
                </div>
              </form>
                */}
              <div className="form-group text-center">
                <button className="btn btn-primary account-btn" onClick={()=>loginclick()}>
                  Login</button>
              </div>
              <div className="account-footer">
                <p>Don't have an account yet? Contact to you HR</p>
              </div>
              {/* /Account Form */}
            </div>
          </div>
        </div>
      </div>
    </div>

  );

}

export default LoginPage;
