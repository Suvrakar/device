import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Table, Tag, Space } from 'antd';
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import axios from "axios"


export default function Testvoice(props) {

  const [count, setCount] = useState([]);

  useEffect(() => {
 
  }, []);

  const Checkrecord = async (rec) => {
    console.log(rec)
    let res = await axios.get(`http://localhost:8000/devices/${props.users}/voice/${rec.action}`)
    // let res = await axios.get(`http://localhost:8000/devices/${}/users`)
    setCount(res.data)
  }

  console.log(props.users)

  const dataSource = [
    {
      "testname": 'Thank You',
      "action": "0",
    },
    {
      "testname": 'Incorrect Password',
      "action": "1",
    },
    {
      "testname": 'Access Denied',
      "action": "2",
    },
    {
      "testname": 'Invalid ID',
      "action": "3",
    },
    {
      "testname": 'Please try again',
      "action": "4",
    },
    {
      "testname": 'Dupicate ID',
      "action": "5",
    },
    {
      "testname": 'The clock is flow',
      "action": "6",
    },
    {
      "testname": 'The clock is full',
      "action": "7",
    },
    {
      "testname": 'Duplicate finger',
      "action": "8",
    },
    {
      "testname": 'Duplicated punch',
      "action": "9",
    },
    {
      "testname": 'Beep kuko',
      "action": "10",
    },
    {
      "testname": 'Beep siren',
      "action": "11",
    },
    {
      "testname": 'Beep bell',
      "action": "13",
    },
    {
      "testname": 'Windows(R) opening sound',
      "action": "18",
    },
    {
      "testname": 'Fingerprint not emolt',
      "action": "20",
    },
    {
      "testname": 'Password not emolt',
      "action": "21",
    },
    {
      "testname": 'Badges not emolt',
      "action": "22",
    },
    {
      "testname": 'Face not emolt',
      "action": "23",
    },
    {
      "testname": 'Beep standard',
      "action": "24",
    },
    {
      "testname": 'Invalid user',
      "action": "30",
    },
    {
      "testname": 'Invalid time period',
      "action": "31",
    },
    {
      "testname": 'Invalid combination',
      "action": "32",
    },
    {
      "testname": 'Illegal Access',
      "action": "33",
    },
    {
      "testname": 'Disk space full',
      "action": "34",
    },
    {
      "testname": 'Duplicate fingerprint',
      "action": "35",
    },
    {
      "testname": 'Fingerprint not registered',
      "action": "36",
    },
    {
      "testname": 'Focus eyes on the green box',
      "action": "51",
    },
  ];

  const columns = [
    {
      title: "Test Name",
      dataIndex: "testname",
      key: "testname"
    },

    {
      title: "Test",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <i onClick={() => Checkrecord(record)} style={{fontSize:"25px", cursor: "pointer" }} className="fa fa-play" aria-hidden="true"></i>
          {/* {console.log(record.action)} */}
        </Space>
      )

    },

  ];


  return <div className="mt-1">
    {/* Page Content */}
    <div className="content container-fluid">
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive pb-3">
            <Table
              className="table-striped"
              pagination={{
                defaultPageSize: dataSource.length,
                hideOnSinglePage: true
              }}
              style={{ overflowX: "auto" }}
              columns={columns}
              // bordered
              // dataSource={data}
              dataSource={dataSource}
              rowKey={(record) => record.action}
            />

          </div>
        </div>
      </div>
      {/* /Content End */}
    </div>
    {/* /Page Content */}
  </div>
}
