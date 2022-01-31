import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";


export default function Logs() {

    const [log, setlog] = useState([]);
    const [count, setcount] = useState([]);

    const evt = new EventSource("http://localhost:8000/devices/17208cf9-b3df-4da4-908e-df6a8ffc0c29/stream")


    useEffect(() => {
        evt.onmessage = (e) => {
            setlog(count => [...count, JSON.parse(e.data)])
            // log.push(a)
        }
    }, []);


    const columns = [
        {
            title: "User Id",
            dataIndex: "user_id",
            key: "user_id"
        },
        {
            title: "Uid",
            dataIndex: "uid",
            key: "uid"
        },
        {
            title: "Timestamp",
            dataIndex: "timestamp",
            key: "timestamp"
        },
        {
            title: "Punch",
            dataIndex: "punch",
            key: "punch"
        },

        {
            title: "Status",
            dataIndex: "status",
            key: "status"
        },

   
     

    ];

    return <div className="mt-5">
        {/* Page Content */}
        <div className="content container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className="table-responsive">
                        <Table
                            className="table-striped"
                            pagination={{
                                total: log.length,
                                showTotal: (total, range) =>
                                    `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                showSizeChanger: true,
                                onShowSizeChange: onShowSizeChange,
                                itemRender: itemRender,
                            }}
                            style={{ overflowX: "auto" }}
                            columns={columns}
                            // bordered
                            dataSource={log}
                            rowKey={(record) => record.timestamp}
                        // onChange={this.handleTableChange}
                        />
                        {console.log(log.map(x => x))}

                    </div>
                </div>
            </div>
            {/* /Content End */}
        </div>
        {/* /Page Content */}
    </div>
}
