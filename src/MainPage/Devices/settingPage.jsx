import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import "antd/dist/antd.css";
import "../antdstyle.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams, Link
} from "react-router-dom";
import Users from "./Users";
import Logs from "./Logs";
import Testvoice from "./TestVoice";


export default function SettingPage({ match }) {

    let { id } = useParams();

    // let {match} = props;


    return <div className="page-wrapper">
        <Helmet>
            <title>Settings - Hive HRMS</title>
            <meta name="description" content="Login page" />
        </Helmet>



        <div className="content container-fluid">
            <div className="page-header">
                <div className="row">
                    <div className="col">
                        <h3 className="page-title">Settings</h3>
                    </div>

                </div>
            </div>
            {/* Page Content */}

{console.log(id, "fsjdnfj")}

            <ul className="nav nav-tabs pr-5" props={id}>
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={`/app/device/${id}/users`}> Users </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={`/app/device/${id}/logs`}> Live Logs </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={`/app/device/${id}/test`}> Test Voice </Link>
                </li>

            </ul>
        </div>

        <Switch>
            <Route exact path={`${match.url}/device/:id/`} >
                <div>
                  
                </div>
            </Route>
            <Route exact path={`${match.url}/device/:id/users`} >
                <Users users={id} />
            </Route>
            <Route exact path={`${match.url}/device/:id/logs`} >
                <div>
                    <Logs users={id} />
                </div>
            </Route>
            <Route exact path={`${match.url}/device/:id/test`} >
                <div>
                    <Testvoice users={id} />
                </div>
            </Route>
        </Switch>



    </div>

}
