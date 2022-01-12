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
              {/* <li className={pathname.includes('Leave') ?"active" :""}> 
                 <a href="/hive_hrm/setups/leave-setup"><i className="la la-cogs" /> <span>Leave</span></a>
               </li> */}
              {/* <li className={pathname.includes('branch') ?"active" :""}> 
                 <a href="/hive_hrm/setups/branch-setup"><i className="la la-cogs" /> <span>Branch</span></a>
               </li> */}
              {/* <li className={pathname.includes('department') ?"active" :""}> 
                 <a href="/hive_hrm/setups/department-setup"><i className="la la-cogs" /> <span>Department</span></a>
               </li> */}
              {/* <li className={pathname.includes('designations') ?"active" :""}> 
                 <a href="/hive_hrm/setups/designations-setup"><i className="la la-cogs" /> <span>Designations</span></a>
               </li> */}
              {/* <li className={pathname.includes('holiday') ?"active" :""}> 
                 <a href="/hive_hrm/setups/holiday-setup"><i className="la la-cogs" /> <span>Holidays</span></a>
               </li> */}
              {/* <li className={pathname.includes('toxbox-') ?"active" :""}> 
                 <a href="/hive_hrm/settings/toxbox-setting"><i className="la la-comment" /> <span>ToxBox Settings</span></a>
               </li> */}
              {/* <li className={pathname.includes('cron') ?"active" :""}> 
                 <a href="/hive_hrm/settings/cron-setting"><i className="la la-rocket" /> <span>Cron Settings</span></a>
               </li> */}
            </ul>
          </div>
        </div>
      </div>

    );
  }
}

export default withRouter(Sidebar);
