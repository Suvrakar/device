/**
 * Signin Firebase
 */

import React, { Component, useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Avatar_01, Avatar_16, Avatar_08, Avatar_13, Avatar_05 } from "../../Entryfile/imagepath"
import { getNotification } from '../../Services/graphqlServices';
import { notification_Mapper } from '../../Services/Helper';
import { useReactOidc } from '@axa-fr/react-oidc-context';



const Activities = () => {
  const { oidcUser, logout } = useReactOidc();


  const [data, setData] = useState([]);
  useEffect(() => {
    getNoti()
  }, [])

  const getNoti = async () => {
    let body = {
      query: `query {
        notifications{
          id
          type
          isRead
          created
        }
      }
                
              `
    }
    let p = await getNotification(oidcUser.access_token, body);
    if (!p.error) {
      let pp = p.data.notifications
      let c = [...pp]
      setData(c)
    }
    else {
      console.log(p);
    }
  }


  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Activities - HRMS Admin Template</title>
        <meta name="description" content="Login page" />
      </Helmet>
      {/* Page Content */}
      <div className="content">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Activities</h3>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-md-12">
            <div className="activity">
              <div className="activity-box">
                <ul className="activity-list">

                  {
                    data.map((x, idx) => {
                      let data = notification_Mapper(x);
                      return (
                        <li className="notification-message" key={idx}>
                          <div className="activity-user">
                            <a className="avatar">
                              <img src={Avatar_01} alt="" />
                            </a>
                          </div>
                          <div className="activity-content">
                            <div className="timeline-content">
                              <a href={data.link} className="name">
                                <div className="media">
                                  <div className="media-body">
                                    <p className="noti-details"><span className="noti-title">{data.msg}</span></p>
                                    <p className="noti-time"><span className="notification-time">{data.time}</span></p>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>

                        </li>)

                    })
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </div>

  );

}


export default Activities;
