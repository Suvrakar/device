/**
 * App Header
 */
import React, { Component, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import {
  headerlogo, lnEnglish, lnFrench, lnSpanish, lnGerman, Avatar_02, Avatar_03, Avatar_05,
  Avatar_06, Avatar_08, Avatar_09, Avatar_13, Avatar_17, Avatar_21
} from '../../Entryfile/imagepath'
import { useReactOidc } from '@axa-fr/react-oidc-context';
import { chcekPermission } from '../../Services/Helper';




const Header = () => {

  const { oidcUser, logout } = useReactOidc();
  const [name, setName] = useState("")
  const [photo, setPhoto] = useState("")
  const [setupPermission, setsetupPermission] = useState(false)
  const [list, setList] = useState([])
  const [count, setCount] = useState(0);



  useEffect(() => {
    if (oidcUser) {
      setName(oidcUser.profile.first_name)
      setPhoto(oidcUser.profile.photo)
      setsetupPermission(chcekPermission(oidcUser.profile.permissions, 'setup'))
    }
  }, [oidcUser])


  return (
    <div className="header" style={{ right: "0px" }}>
      {/* Logo */}
      <div className="header-left">
        <a href="/hive_hrm/app/employees/my-profile" className="logo">
          <img src={headerlogo} width={40} height={40} alt="" />
        </a>
      </div>
      {/* /Logo */}
      {/* <a id="toggle_btn" href="" style={{ display: pathname.includes('tasks') ? "none" : pathname.includes('compose') ? "none" : "" }}> */}
      <a id="toggle_btn" style={{ display: '' }}>
        <span className="bar-icon"><span />
          <span />
          <span />
        </span>
      </a>
      {/* Header Title */}
      <div className="page-title-box">
        <h3>Hive Attendance - Devices Connection</h3>
      </div>
      {/* /Header Title */}
      <a id="mobile_btn" className="mobile_btn" href="#sidebar"><i className="fa fa-bars" /></a>
      {/* Header Menu */}
      <ul className="nav user-menu">
        {/* Search */}

        {/* /Search */}
        {/* Flag */}

        {/* /Flag */}
        {/* Notifications */}
        {/* <Notificationdropdown list={list} count={count} /> */}
        {/* <NotificationPure token={oidcUser?.access_token} list={list} count={count} /> */}
        {/* /Notifications */}

        {name ?
          <li className="nav-item dropdown has-arrow main-drop">
            <a className="dropdown-toggle nav-link" data-toggle="dropdown">
              <span className="user-img"><img className="user-img" style={{ objectFit: "cover" }} src={photo || Avatar_21} alt="" />
                {/* <span className="status online" /> */}
              </span>
              <span>{name}</span>
            </a>
            <div className="dropdown-menu">
              {/* <a className="dropdown-item" href="/hive_hrm/app/employees/my-profile">My Profile</a> */}
              {/* {setupPermission ?
                <a className="dropdown-item" href="/hive_hrm/setups/shift-setup">Setup</a> : ""}
              <a className="dropdown-item" href="/hive_hrm/logout">Logout</a> */}
              <button className="dropdown-item" onClick={() => logout()} >Logout</button>

            </div>
          </li> : <li />}
      </ul>
      {/* /Header Menu */}
      {/* Mobile Menu */}
      {name && <div className="dropdown mobile-user-menu">
        <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v" /></a>
        <div className="dropdown-menu dropdown-menu-right">
          <a className="dropdown-item" href="/hive_hrm/app/employees/employee-profile">My Profile</a>
          {setupPermission ?
            <a className="dropdown-item" href="/hive_hrm/setups/shift-setup">Setup</a> : ""}
          <button className="dropdown-item" onClick={() => logout()} >Logout</button>
        </div>
      </div>}
      {/* /Mobile Menu */}
    </div>

  );
}


export default withRouter(Header);