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


export default function SettingPage() {

    let { id } = useParams();

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

            <ul className="nav nav-tabs px-5">
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

            {/* /Page Content */}
        </div>



    </div>

}
