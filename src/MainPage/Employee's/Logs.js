import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";


export default function Logs() {


    const columns = [
        {
            title: "Log Name",
            dataIndex: "log",
        },

        {
            title: "TimeStamp",
            dataIndex: "time",
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
                                total: 13,
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
