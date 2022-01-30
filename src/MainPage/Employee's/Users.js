import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import axios from "axios";

export default function Users() {

    const [count, setCount] = useState([]);

    useEffect(() => {
        fetchUsers();

    }, []);


    const columns = [
        {
            title: "Id",
            dataIndex: "uid",
        },

        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Privilege",
            dataIndex: "privilege",
        },

    ];


    const fetchUsers = async () => {
        let res = await axios.get(`http://localhost:8000/devices/17208cf9-b3df-4da4-908e-df6a8ffc0c29/users`)
        // let res = await axios.get(`http://localhost:8000/devices/${}/users`)
        setCount(res.data)
    }



    return <div className="mt-1">
        {/* Page Content */}

        <div className="content container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className="table-responsive">
                        <Table
                            className="table-striped"
                            pagination={{
                                total: count.length,
                                showTotal: (total, range) =>
                                    `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                showSizeChanger: true,
                                onShowSizeChange: onShowSizeChange,
                                itemRender: itemRender,
                            }}
                            style={{ overflowX: "auto" }}
                            columns={columns}
                            // bordered
                            // dataSource={data}
                            dataSource={count}
                            rowKey={(record) => record.id}
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