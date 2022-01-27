import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";


export default function SettingPage() {


    const columns = [
        {
            title: "Users",
            dataIndex: "name",
        },

        {
            title: "Test Voice",
            dataIndex: "from_time",
        },
        {
            title: "Live Logs",
            dataIndex: "to_time",
        },
    
    ];
    return <div className="page-wrapper">
        <Helmet>
            <title>Settings - Hive HRMS</title>
            <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
                <div className="row">
                    <div className="col">
                        <h3 className="page-title">Settings</h3>
                    </div>

                </div>
            </div>
            {/* /Page Header */}
            {/* Content Starts */}
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
