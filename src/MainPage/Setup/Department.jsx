/**
 * Signin Firebase
 */

import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import AddDepartmentModal from "./modals/AddDepartmentModal";
import {punchTimeLog} from '../../Services/dashBoardServices'

const Department = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (data) => alert(JSON.stringify(data));

  const [itemId, setItemId] = useState("");
  const [data, setData] = useState([
    {
      id: 1,
      department_name: "HR",
      departmenthead: "Mr y",
      reportingdepartment: "Admin",
    },
    {
      id: 2,
      department_name: "IT",
      departmenthead: "Mr z",
      reportingdepartment: "Admin",
    },
    {
      id: 3,
      department_name: "Admin",
      departmenthead: "Mr p",
      reportingdepartment: "",
    },
  ]);

  const emplist = [
    { value: "Mr x", label: "Mr x" },
    { value: "Mr z", label: "Mr z" },
    { value: "Mr y", label: "Mr y" },
    { value: "Mr p", label: "Mr p" },
  ];
  const departments = [
    { value: "HR", label: "HR" },
    { value: "IT", label: "IT" },
    { value: "Admin", label: "Admin" },
  ];
  const customStyles = {
    control: (base) => ({
      ...base,
      height: 50,
      minHeight: 50,
    }),
  };

  const openEdit = (x) => {
    setValue("department_name", x.department_name);
    setValue("departmenthead", x.departmenthead);
    setValue("reportingdepartment", x.reportingdepartment);
    setItemId(x.id);
  };
  const closeEdit = () => {
    setValue("department_name",'');
    setValue("departmenthead", '');
    setValue("reportingdepartment", '');
    setItemId("");
  };
  const openDelate = (x) => {
    setItemId(x.id);
  };
  const closeDelete = () => {
    setItemId("");
  };


  const columns = [
    {
      title: "#",
      dataIndex: "id",
    },
    {
      title: "Department Name",
      dataIndex: "department_name",
    },
    {
      title: "Department Head",
      dataIndex: "departmenthead",
    },
    {
      title: "Reporting Department",
      dataIndex: "reportingdepartment",
    },
    {
      title: "Status",
      render: (text, record) => (
        <div className="dropdown action-label">
          <a
            className="btn btn-white btn-sm btn-rounded dropdown-toggle"
          
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-dot-circle-o text-success" /> Active
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a className="dropdown-item">
              <i className="fa fa-dot-circle-o text-success" /> Active
            </a>
            <a className="dropdown-item">
              <i className="fa fa-dot-circle-o text-danger" /> Inactive
            </a>
          </div>
        </div>
      ),
    },
    {
      title: "Action",
      render: (text, record) => (
        <div className="dropdown dropdown-action text-right">
          <a
            className="action-icon dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="material-icons">more_vert</i>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a
              className="dropdown-item"
              data-toggle="modal"
              data-target="#edit_leavetype"
              onClick={() => openEdit(record)}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a
              className="dropdown-item"
              data-toggle="modal"
              data-target="#delete_leavetype"
              onClick={() => openDelate(record)}
            >
              <i className="fa fa-trash-o m-r-5" /> Delete
            </a>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Departments - Hive HRMS</title>
        <meta name="description" content="Login page" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Departmenmts</h3>
            </div>
            <div className="col-auto float-right ml-auto">
              <a
                className="btn add-btn"
                data-toggle="modal"
                data-target="#add_leavetype"                
              >
                <i className="fa fa-plus" /> Add Department
              </a>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <Table
                pagination={{
                  total: data.length,
                  showTotal: (total, range) =>
                    `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                  showSizeChanger: true,
                  onShowSizeChange: onShowSizeChange,
                  itemRender: itemRender,
                }}
                style={{ overflowX: "auto" }}
                columns={columns}
                bordered
                dataSource={data}
                rowKey={(record) => record.id}
              />
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
      {/* Add Leavetype Modal */}
      <div id="add_leavetype" className="modal custom-modal fade" role="dialog">
        <AddDepartmentModal submitFunction={(x)=>console.log(x,"ghgh")}/>
      </div>
      {/* /Add Leavetype Modal */}
      {/* Edit Leavetype Modal */}
      <div
        id="edit_leavetype"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Department</h5>
              <button
                type="button"
                className="close"
                data_dismiss="modal"
                aria-label="Close"
                onClick={()=>closeEdit()}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label>
                    Department Name <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    {...register("department_name", { required: true })}
                  />
                  {errors.departmnet_name?.type === "required" &&
                    "departmnet name is required"}
                </div>
                <div className="form-group">
                  <label>
                    Head of Department <span className="text-danger">*</span>
                  </label>
                  <Controller
                    control={control}
                    name="departmenthead"
                    rules={{ required: true }}
                    render={({ field: { onChange, value, name, ref } }) => {
                      return (
                        <Select
                          inputRef={ref}
                          classNamePrefix="select"
                          options={emplist}
                          value={emplist.find((c) => c.value === value)}
                          onChange={(val) => onChange(val.value)}
                        />
                      );
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>
                    Reporting Department <span className="text-danger">*</span>
                  </label>

                  <Controller
                    control={control}
                    name="reportingdepartment"
                    rules={{ required: true }}
                    render={({ field: { onChange, value, name, ref } }) => {
                      return (
                        <Select
                          inputRef={ref}
                          classNamePrefix="select"
                          options={departments}
                          value={departments.find((c) => c.value === value)}
                          onChange={(val) => onChange(val.value)}
                        />
                      );
                    }}
                  />

                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Edit Leavetype Modal */}
      {/* Delete Leavetype Modal */}
      <div
        className="modal custom-modal fade"
        id="delete_leavetype"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Delete Leave Type</h3>
                <p>{`Are you sure want to delete?`}</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <a  className="btn btn-primary continue-btn">
                      Delete
                    </a>
                  </div>
                  <div className="col-6">
                    <a
                      data_dismiss="modal"
                      className="btn btn-primary cancel-btn"
                      onClick={()=>closeDelete()}
                    >
                      Cancel
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Delete Leavetype Modal */}
    </div>
  );
};

export default Department;
