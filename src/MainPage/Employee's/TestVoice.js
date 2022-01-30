import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Table, Tag, Space } from 'antd';
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import axios from "axios"


export default function Testvoice() {

  const [count, setCount] = useState([]);

  useEffect(() => {
    // Checkrecord();
  }, []);

  const Checkrecord = async (rec) => {
    console.log(rec)
    let res = await axios.get(`http://localhost:8000/devices/17208cf9-b3df-4da4-908e-df6a8ffc0c29/voice/${rec.action}`)
    // let res = await axios.get(`http://localhost:8000/devices/${}/users`)
    setCount(res.data)
  }


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
    // {
    //   "testname": 'Face not emolt',
    //   "action": "Test",
    // },
    // {
    //   "testname": 'Beep standard',
    //   "action": "Test",
    // },
    // {
    //   "testname": 'Invalid user',
    //   "action": "Test",
    // },
    // {
    //   "testname": 'Invalid time period',
    //   "action": "Test",
    // },
    // {
    //   "testname": ' Invalid combination',
    //   "action": "Test",
    // },
    // {
    //   "testname": 'Illegal Access',
    //   "action": "Test",
    // },
    // {
    //   "testname": 'Disk space full',
    //   "action": "Test",
    // },
    // {
    //   "testname": 'Invalid user',
    //   "action": "Test",
    // },
    // {
    //   "testname": 'Invalid user',
    //   "action": "Test",
    // },
    // {
    //   "testname": 'Invalid user',
    //   "action": "Test",
    // },
    // {
    //   "testname": 'Invalid user',
    //   "action": "Test",
    // },
    // {
    //   "testname": 'Invalid user',
    //   "action": "Test",
    // },
    // {
    //   "testname": 'Invalid user',
    //   "action": "Test",
    // },
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
          <i className="fa fa-play" aria-hidden="true"></i>
          <a onClick={() => Checkrecord(record)}>Invite</a>
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

            // onChange={this.handleTableChange}
            />
          
          </div>
        </div>
      </div>
      {/* /Content End */}
    </div>
    {/* /Page Content */}
  </div>
}
