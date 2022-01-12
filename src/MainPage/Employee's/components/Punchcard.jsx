
import React, { useState, useEffect } from 'react';
import dateFormat from "dateformat";
import { useReactOidc } from '@axa-fr/react-oidc-context';
import { getPunchcardInfo, punchTimeLog } from '../../../Services/dashBoardServices.js';
import { useToastify } from '../../../Contexts/ToastContext.js';

const Punchcard = () => {
  const { startLoading, stopLoading, successToast, errorToast } = useToastify();
  const { oidcUser } = useReactOidc();
  const [punchStatus, setPunchStatus] = useState('Punch in')
  const [firstIn, setFirstIn] = useState('')
  const [lastactivity, setLastActivity] = useState('')
  const [lastactivityTime, setLastActivityTime] = useState("")

  useEffect(() => {
    getinfo()
  }, [])

  const getinfo = async () => {
    let response = await getPunchcardInfo(oidcUser.access_token)
    let w = response.last_activity.activity ? response.last_activity.activity == 'punch_in' ? 'Punch out' : 'Punch in' : 'Punch in'
    let lastActivityTime = response.last_activity.activity ? `${response.date}T${response.last_activity.time}` : ''
    let fistcheckin = response.last_activity.activity ? `${response.date}T${response.first_punch_in}` : ''
    if (response.last_activity.activity) {
      let r = response.last_activity.activity == 'punch_in' ? 'Punch in' : 'Punch out'
      setLastActivity(r)
      setFirstIn(new Date(fistcheckin));
      let p = new Date(lastActivityTime)
      setLastActivityTime(p);
      setPunchStatus(w)
      return
    }
    setFirstIn('You have not punched in yet');
    setLastActivityTime("");
    setPunchStatus(w);

  }
  const punch = async () => {
    startLoading();
    let type = punchStatus === 'Punch in' ? 'in' : 'out'
    let token = oidcUser.access_token;
    let response = await punchTimeLog(type, token)
    if (!!!response.error) {

      await getinfo()
      successToast(`Punch ${type} Sucessfull`)
    } else {
      errorToast(response.error.message)
    }

    stopLoading()

  }

  const timeDuration = () => {
    if (typeof (firstIn) === 'object' && typeof (lastactivityTime) === 'object' && lastactivity == 'Punch out') {
      const hours = parseInt(Math.abs(lastactivityTime - firstIn) / (1000 * 60 * 60) % 24);
      const minutes = parseInt(Math.abs(lastactivityTime.getTime() - firstIn.getTime()) / (1000 * 60) % 60);
      let duration = `${hours}:${minutes} hrs`
      return duration

    }
    if (typeof (firstIn) === 'object' && typeof (lastactivityTime) === 'object' && lastactivity == 'Punch in') {
      const newday = new Date()
      const hours = parseInt(Math.abs(newday - firstIn) / (1000 * 60 * 60) % 24);
      const minutes = parseInt(Math.abs(newday.getTime() - firstIn.getTime()) / (1000 * 60) % 60);
      let duration = `${hours}:${minutes} hrs`
      return duration

    }
    return '0:0 hrs'

  }
  const overtime = () => {
    let overtimeHr = 0
    let overtimemin = 0
    if (typeof (firstIn) === 'object' && typeof (lastactivityTime) === 'object' && lastactivity == 'Punch out') {
      const hours = parseInt(Math.abs(lastactivityTime - firstIn) / (1000 * 60 * 60) % 24);
      const minutes = parseInt(Math.abs(lastactivityTime.getTime() - firstIn.getTime()) / (1000 * 60) % 60);

      if (hours >= 7) {
        overtimeHr = hours - 7
        overtimemin = minutes
      }
      return `${overtimeHr}:${overtimemin} hrs`

    }
    if (typeof (firstIn) === 'object' && lastactivity == 'Punch in') {
      const newday = new Date()
      const hours = parseInt(Math.abs(newday - firstIn) / (1000 * 60 * 60) % 24);
      const minutes = parseInt(Math.abs(newday.getTime() - firstIn.getTime()) / (1000 * 60) % 60);
      if (hours >= 7) {
        overtimeHr = hours - 7
        overtimemin = minutes
      }
      return `${overtimeHr}:${overtimemin} hrs`

    }
    return '0:0 hrs'

  }

  return (
    <div className="card punch-status">
      <div className="card-body">
        <h5 className="card-title">Timesheet <small className="text-muted"></small></h5>
        <div className="punch-det">
          <h6>{`First Punch in at:`}</h6>
          <p>{typeof (firstIn) === 'string' ? firstIn : dateFormat(firstIn, "h:MM TT")}  </p>
        </div>
        <div className="punch-det" >
          <h6>{lastactivity ? ` Last activity: ${lastactivity} at ` : "Last activity:"}</h6>
          <p>{typeof (lastactivityTime) === 'string' ? lastactivityTime : dateFormat(lastactivityTime, "h:MM TT")}  </p>
        </div>

        <div className="punch-info-dash">
          <div className="punch-hours">
            <span>{timeDuration()}</span>
          </div>
        </div>
        <div className="punch-btn-section-dash">
          <button type="button" className="btn btn-primary punch-btn" onClick={() => punch()} >{punchStatus == 'Punch in' ? 'Punch in' : 'Punch out'}</button>
        </div>
        <div className="statistics">
          <div className="row">
            {/* <div className="col-md-6 col-6 text-center">
                <div className="stats-box">
                  <p>Break</p>
                  <h6>1.21 hrs</h6>
                </div>
              </div> */}
            <div className="col-md-12 col-12 text-center">
              <div className="stats-box">
                <p>Overtime</p>
                <h6>{overtime()}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Punchcard
