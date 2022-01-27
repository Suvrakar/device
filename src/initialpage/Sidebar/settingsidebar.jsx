/**
 * App Header
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Sidebar extends Component {
  render() {

    const { location } = this.props
    let pathname = location.pathname

    return (
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div className="sidebar-menu">
            <ul>
              <li>
                <a href="/hive_hrm/app/employees/my-profile"><i className="la la-home" /> <span>Back to Home</span></a>
              </li>
              <li className="menu-title">Setup</li>

              <li className={pathname.includes('shift') ? "active" : ""}>
                <a href="/hive_hrm/setups/shift-setup"><i className="la la-clock-o" /> <span>Shifts</span></a>
              </li>
            </ul>
          </div>
        </div>
      </div>

    );
  }
}

export default withRouter(Sidebar);
