import React from 'react'

const AttendancestatCard = ({data}) => {



    return (
        <div className="card att-statistics">
        <div className="card-body">
          <h5 className="card-title">Statistics</h5>
          <div className="stats-list">
            <div className="stats-info">
              <p>Today <strong>{data.today_work_hrs?data.today_work_hrs:0} <small>{`/${data.todayTarget?data.todayTarget:0}  hrs`}</small></strong></p>
              <div className="progress">
                <div className="progress-bar bg-primary" role="progressbar" style={{ width: data.todayParcentage?data.todayParcentage:0 }} aria-valuenow={31} aria-valuemin={0} aria-valuemax={100} />
              </div>
            </div>
            <div className="stats-info">
              <p>This Week <strong>{data.week_work_hrs?data.week_work_hrs:0} <small>{`/${data.weekTarget?data.weekTarget:0}  hrs`}</small></strong></p>
              <div className="progress">
                <div className="progress-bar bg-warning" role="progressbar" style={{ width: data.weekParcentage?data.weekParcentage:0 }} aria-valuenow={31} aria-valuemin={0} aria-valuemax={100} />
              </div>
            </div>
            <div className="stats-info">
              <p>This Month <strong>{data.month_work_hrs?data.month_work_hrs:0} <small>{`/${data.monthTarget?data.monthTarget:0}  hrs`}</small></strong></p>
              <div className="progress">
                <div className="progress-bar bg-success" role="progressbar" style={{ width: data.monthParcentage?data.monthParcentage:0 }} aria-valuenow={62} aria-valuemin={0} aria-valuemax={100} />
              </div>
            </div>
            <div className="stats-info">
              <p>Overtime <strong>4</strong></p>
              <div className="progress">
                <div className="progress-bar bg-info" role="progressbar" style={{ width: data.monthParcentage?data.monthParcentage:0 }} aria-valuenow={22} aria-valuemin={0} aria-valuemax={100} />
              </div>
            </div>
         
          </div>
        </div>
      </div>
   
    )
}

export default AttendancestatCard
