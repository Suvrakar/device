/**
 * Signin Firebase
 */

import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import AddDesignationModal from "./modals/AddDesignationModal";

const Designation = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const onSubmit = (data) => alert(JSON.stringify(data));
  const [itemId, setItemId] = useState("");

  const openEdit = (x) => {
    setValue("designation_name", x.designation_name);
    setValue("department", x.department);
    setItemId(x.id);
  };
  const closeEdit = () => {
    setValue("designation_name", "");
    setValue("department", "");
    setItemId("");
  };
  const openDelate = (x) => {
    setItemId(x.id);
  };
  const closeDelete = () => {
    setItemId("");
  };

  const [data, setData] = useState([
    {
      id: 1,
      designation_name: "Trainee Software Engineer",
      department: "IT",
    },
    {
      id: 2,
      designation_name: "Senior Software Engineer",
      department: "IT",
    },
    {
      id: 3,
      designation_name: "Software Engineer",
      department: "IT",
    },
  ]);

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

  const columns = [
    {
      title: "#",
      dataIndex: "id",
    },
    {
      title: "Designation",
      dataIndex: "designation_name",
    },
    {
      title: "Department",
      dataIndex: "department",
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
        <title>Designations - Hive HRMS</title>
        <meta name="description" content="Login page" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Designations</h3>
            </div>
            <div className="col-auto float-right ml-auto">
              <a
                href="#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#add_leavetype"
              >
                <i className="fa fa-plus" /> Add Designation
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
        <AddDesignationModal SubmitFunc={(x) => console.log(x)} />
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
              <h5 className="modal-title">Edit Designation</h5>
              <button
                type="button"
                className="close"
                data_dismiss="modal"
                aria-label="Close"
                onClick={() => closeEdit()}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label>
                    Designation <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    {...register("designation_name", { required: true })}
                  />
                </div>

                <div className="form-group">
                  <label>
                    Department <span className="text-danger">*</span>
                  </label>
                  <Controller
                    control={control}
                    name="department"
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
                <p>Are you sure want to delete?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <a className="btn btn-primary continue-btn">Delete</a>
                  </div>
                  <div className="col-6">
                    <a
                      onClick={() => closeDelete()}
                      data_dismiss="modal"
                      className="btn btn-primary cancel-btn"
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

export default Designation;
