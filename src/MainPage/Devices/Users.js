import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import axios from "axios";


export default function Users(props) {

    const [count, setCount] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);


    const columns = [
        {
            title: "Id",
            dataIndex: "uid",
            key: "1"
        },

        {
            title: "Name",
            dataIndex: "name",
            key: "2"
        },
        {
            title: "Privilege",
            dataIndex: "privilege",
            key: "3"
        },

    ];


    const fetchUsers = async () => {
        let res = await axios.get(`http://localhost:8000/devices/${props.users}/users`)
        setCount(res.data)
    }

    console.log(props, "fjsdfjibnsdfjinsdfj")

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
