/**
 * Signin Firebase
 */

import React, { useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Applogo } from '../Entryfile/imagepath.jsx'
import { useReactOidc } from '@axa-fr/react-oidc-context';
import { useHistory, Redirect } from 'react-router-dom';


const LogoutPage = () => {

  const { oidcUser, logout } = useReactOidc();
  let history = useHistory();

  //  const loginclick = async () => {
  //    login();
  //  }

  useEffect(() => {
          logout()
  }, [])



  return (


    <div className="main-wrapper">
      <Helmet>
        <title>Logout - Hive Attendance</title>
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
              <h3 className="account-title">Logout</h3>
              <div className="form-group text-center">
                <button className="btn btn-primary account-btn" >
                  Login again</button>
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

export default LogoutPage;
