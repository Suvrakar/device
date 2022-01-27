import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Sidebar extends Component {
  render() {

    const { location } = this.props
    let pathname = location.pathname
    return (
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menue">
                <a className="active subdrop"><i className="la la-user" /> <span> Avaiable Devices</span> <span className="menu-arrow" /></a>
                <ul style={{ display: 'block' }}>
                  <li><a className={pathname.includes('deviceprofile') ? "active" : ""} href="/app/deviceprofile"> Devices </a></li>
                </ul>
              </li>



            </ul>
          </div>
        </div>
      </div>

    );
  }
}

export default withRouter(Sidebar);
