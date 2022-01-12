/**
 * Signin Firebase
 */

import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import { useForm } from "react-hook-form";
import { AddLeave } from "./modals/AddLeave";
import { useReactOidc } from "@axa-fr/react-oidc-context";
import $ from "jquery";
import messages from "../../message"

import {
  addLeaveTypeData,
  deleteLeaveTypeData,
  getLeaveData,
  updateLeaveTypeData,
} from "../../Services/setupServices";
import { useToastify } from "../../Contexts/ToastContext";

const LeaveSetup = () => {
  const { showToast, startLoading, stopLoading, successToast, errorToast } =
    useToastify();
  const { oidcUser } = useReactOidc();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const LeaveTypeEditFromSubmit = (data) => upDateLeaveTypeFunction(data);

  const [itemId, setItemId] = useState("");
  const [data, setData] = useState([]);

  const openEdit = (x) => {
    setValue("name", x.name);
    setValue("count", x.count);
    setValue("is_active", x.is_active);
    setItemId(x.id);
  };
  const closeEdit = () => {
    $("#edit_leavetype").modal("hide");
    $("#add_leavetype").modal("hide");
    setValue("name", "");
    setValue("count", "");
    setItemId("");
  };
  const openDelate = (x) => {
    setItemId(x.id);
  };
  const closeDelete = () => {
    $("#delete_leavetype").modal("hide");
    setItemId("");
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let res = await getLeaveData(oidcUser.access_token);
    if (!!!res.error) setData(res);
    else errorToast(res.error.message);
    return;
  };

  const addLeaveFunction = async (data) => {
    startLoading();
    data.is_active = true;
    let res = await addLeaveTypeData(oidcUser.access_token, data);
 
    if (!!!res.error) {
      successToast(messages.addedSuccess);
      getData();
      closeEdit();
    } else {
      errorToast(res.error.message);
    }

    stopLoading();
  };
  const upDateLeaveTypeFunction = async (data) => {
    startLoading();
    data.id = itemId;
    let res = await updateLeaveTypeData(oidcUser.access_token, data);
    if (!!!res.error) {
      successToast(messages.updateSuccess);
      getData();
      closeEdit();
    } else {
      errorToast(res.error.message);
    }
    stopLoading();
  };
  const deleteLeaveFunction = async () => {

    startLoading();

    data.id = itemId;
    let res = await deleteLeaveTypeData(oidcUser.access_token, data);

    if (!!!res.error) {
      successToast(messages.deleteSucceess);
      getData();
      closeDelete();
    } else {
      errorToast(res.error.message);
    }
    stopLoading();
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
    },
    {
      title: "Leave Type",
      dataIndex: "name",
    },

    {
      title: "Leave Days",
      dataIndex: "count",
    },
    {
      title: "Status",
      render: (text, record) => (
        <div className="action-label">
          {record.is_active ? (
            <a className="btn btn-white btn-sm btn-rounded">
              <i className="fa fa-dot-circle-o text-success" /> Active
            </a>
          ) : (
            <a className="btn btn-white btn-sm btn-rounded">
              <i className="fa fa-dot-circle-o text-danger" /> In active
            </a>
          )}
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
              onClick={() => openEdit(record)}
              data-toggle="modal"
              data-target="#edit_leavetype"
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a
              className="dropdown-item"
              data-toggle="modal"
              onClick={() => openDelate(record)}
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
        <title>Leave Type - HRMS Admin Template</title>
        <meta name="description" content="Login page" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Leave Type</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/hive_hrm/app/employees/dashboard">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">Leave Type</li>
              </ul>
            </div>
            <div className="col-auto float-right ml-auto">
              <a
                className="btn add-btn"
                data-toggle="modal"
                data-target="#add_leavetype"
              >
                <i className="fa fa-plus" /> Add Leave Type
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
      <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add Leave Type</h5>
          <button
            type="button"
            className="close"
            data_dismiss="modal"
            aria-label="Close"
            onClick={() => {closeEdit();
              window.location.reload()}}

          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
        <AddLeave submitFunction={(x) => addLeaveFunction(x)} />
        </div>
      </div>
    </div>
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
              <h5 className="modal-title">Edit Leave Type</h5>
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
              <form onSubmit={handleSubmit(LeaveTypeEditFromSubmit)}>
                <div className="form-group">
                  <label>
                    Leave Type <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    {...register("name", { required: true })}
                  />
                </div>
                <div className="form-group">
                  <label>
                    Number of days <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    {...register("count", { required: true })}
                  />
                </div>
                <div className="col-sm-4">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck5"
                      {...register("is_active")}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheck5"
                    >
                      Is Active
                    </label>
                  </div>
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
                    <a
                      className="btn btn-primary continue-btn"
                      onClick={() => deleteLeaveFunction()}
                    >
                      Delete
                    </a>
                  </div>
                  <div className="col-6">
                    <a
                      onClick={() => closeDelete()}
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

export default LeaveSetup;
