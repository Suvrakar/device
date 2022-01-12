
import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { getCurrentMonthtats, getMothSpecificUserTimeSheet } from '../../Services/dashBoardServices';
import Punchcard from './components/Punchcard';
import { useReactOidc } from '@axa-fr/react-oidc-context';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import Select from 'react-select';
import AttendancestatCard from './components/attendancestatCard';
import { makeMonthStats, makeMonthStatsDataFormater } from '../../Services/Helper';
import { useToastify } from '../../Contexts/ToastContext';
import ReactExport from '@ibrahimrahmani/react-export-excel';
import { useHistory, useParams } from 'react-router';
// import { Avatar_02, Avatar_04, Avatar_05, Avatar_07, Avatar_08, Avatar_09 } from '../../Entryfile/imagepath.jsx'





const Attendance = () => {
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  const { id } = useParams()

  const { startLoading, stopLoading, successToast, errorToast } = useToastify();
  const monthOptions = [
    { value: 1, label: 'Jan' },
    { value: 2, label: 'Feb' },
    { value: 3, label: 'Mar' },
    { value: 4, label: 'Apr' },
    { value: 5, label: 'May' },
    { value: 6, label: 'Jun' },
    { value: 7, label: 'Jul' },
    { value: 8, label: 'Aug' },
    { value: 9, label: 'Sep' },
    { value: 10, label: 'Oct' },
    { value: 11, label: 'Nov' },
    { value: 12, label: 'Dec' }
  ]
  const yearlength = new Date().getFullYear() - 2020 + 1
  const yearOptions = new Array(yearlength).fill(null).map((x, idx) => {
    let year = new Date().getFullYear() - idx
    return { value: year, label: year }
  })
  const { oidcUser } = useReactOidc();
  const toDay = new Date();
  const [selectedMonth, setMonth] = useState(toDay.getMonth() + 1);
  const [selectedMonthoption, setMonthoption] = useState(monthOptions[toDay.getMonth()]);
  const [selectedYearoption, setYearoption] = useState({ value: toDay.getFullYear(), label: toDay.getFullYear() });
  const [selectedYear, setYear] = useState(toDay.getFullYear());
  const [dataSource, setData] = useState([]);
  const [statData, setStatData] = useState('')
  const [Latecount, setLateCount] = useState(0)

  const customStyles = {
    control: base => ({
      ...base,
      height: 50,
      minHeight: 50
    })
  };

  const columns = [
    {
      title: 'SL',
      dataIndex: 'sl',
      key: 'sl',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Remark',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: 'Punch In',
      dataIndex: 'punch_in',
      key: 'punch_in',
    },
    {
      title: 'Punch Out',
      dataIndex: 'punch_out',
      key: 'punch_out',
    },
    {
      title: 'Production',
      dataIndex: 'production',
      key: 'production',
    }
  ];

  useEffect(() => {
    // onSearch();
    onFirstSearch();
    getStatData();

  }, [])


  const getStatData = async () => {
    let res = await getCurrentMonthtats(oidcUser.access_token)
    let o = await makeMonthStatsDataFormater(res)
    setStatData(o)

  }

  function handleChangeMonth(event) {
    setMonth(event.value)
    setMonthoption(event)
  }
  function handleChangeYear(event) {
    setYear(event.value)
    setYearoption(event)
  }

  const onSearch = async () => {
    if (!(selectedMonth && selectedYear)) return
    startLoading();
    let month = selectedMonth;
    let year = selectedYear;
    let response = id ? await getMothSpecificUserTimeSheet(month, year, oidcUser.access_token, id) : await getMothSpecificUserTimeSheet(month, year, oidcUser.access_token, "")
    if (!!!response.error) {
      setData([])
      setData(response)
    } else {
      errorToast(response.error.message)
    }
    stopLoading();
  }
  const onFirstSearch = async () => {
    if (!(selectedMonth && selectedYear)) return

    let month = selectedMonth;
    let year = selectedYear;
    let response = await getMothSpecificUserTimeSheet(month, year, oidcUser.access_token)
    if (!!!response.error) {
      setData(response)
      let count = response.reduce((total, x) => {
        if (x.remark === 'Late')
          return total + 1;
        return total
      }, 0);
      setLateCount(count)
    }
    else {
      errorToast(response.error.message)
    }

  }



  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Attendance - Hive HRMS</title>
        <meta name="description" content="Login page" />
      </Helmet>
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Attendance</h3>
            </div>
          </div>
        </div>
        {/* /Page Header */}

        <div className="row">
          {id ? <></>: <div className="col-md-6">
            <Punchcard />
          </div>}
          <div className="col-md-6">
            <div className="dash-sidebar">
              <section>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Late Entry</h5>
                    <div className="time-list">
                      <div className="dash-stats-list">
                        <h4>{Latecount}</h4>
                        <p>Late</p>
                      </div>
                      <div className="dash-stats-list">
                        <h4>4</h4>
                        <p>Allowed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section>
                <AttendancestatCard data={statData} />
              </section>
            </div>
          </div>
        </div>
        {/* Search Filter */}
        <div className="row filter-row">
          <div className="col-sm-3" >
            <div className="form-group form-focus select-focus">
              <Select
                classNamePrefix="select"
                styles={customStyles}
                value={selectedMonthoption}
                onChange={handleChangeMonth}
                options={monthOptions}
                placeholder='Month'
              />
            </div>
          </div>

          <div className="col-sm-3">
            <div className="form-group form-focus select-focus">
              <Select
                classNamePrefix="select"
                styles={customStyles}
                value={selectedYearoption}
                onChange={handleChangeYear}
                options={yearOptions}
                placeholder='Year'
              />
            </div>
          </div>
          <div className="col-sm-3">
            <button className="btn btn-success btn-block" onClick={() => onSearch()}> Search </button>
          </div>
          <div className="col-sm-3">
            <ExcelFile element={
              <button className="btn btn-success btn-block" disabled={dataSource.length ? false : true}> Download </button>
            } filename={"Employee's attendance "}>
              <ExcelSheet data={dataSource} name="Employee's attendance ">
                <ExcelColumn label="Date" value="date" />
                <ExcelColumn label="Remark" value="remark" />
                <ExcelColumn label="Punch in" value="punch_in" />
                <ExcelColumn label="Punch out" value="punch_out" />
                <ExcelColumn label="Production" value="production" />

              </ExcelSheet>

            </ExcelFile>
          </div>
        </div>
        {/* /Search Filter */}
        <div className="row">
          <div className="col-lg-12">
            <div className="table-responsive">
              <Table className="table table-striped custom-table mb-0"
                style={{ overflowX: 'auto' }}
                columns={columns}
                dataSource={dataSource}
                rowKey={record => record.sl}
              />
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </div>
  );
}

export default Attendance

