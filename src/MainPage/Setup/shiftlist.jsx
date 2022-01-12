import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { AddShift } from "./modals/AddShift";
import { useReactOidc } from "@axa-fr/react-oidc-context";
import $ from "jquery";
import messages from "../../message"
import { useToastify } from "../../Contexts/ToastContext";

import {
  addShiftData,
  deleteShiftData,
  getShiftData,
  updateShiftData,
} from "../../Services/setupServices";

// class ShiftList extends Component {
const ShiftList = () => {
  const { showToast, startLoading, stopLoading, successToast, errorToast } =
    useToastify();
  const [itemId, setItemId] = useState("");
  const { oidcUser } = useReactOidc();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue
  } = useForm();

  const shiftEditfromSubmit = (data) => upDateShiftFunction(data);

  const openEdit = (x) => {
    setValue("name", x.name);
    setValue("from_time", x.from_time);
    setValue("to_time", x.to_time);
    setValue("buffer_time", x.buffer_time);
    setValue("work_days", x.work_days);
    setValue("day_of_the_week", x.day_of_the_week);
    setValue("is_active", x.is_active);
    setValue("is_default", x.is_default);
    setItemId(x.id);
  };
  const closeEdit = () => {
    $("#edit_shift").modal("hide");
    $("#add_shift").modal("hide");
    setValue("name", "");
    setValue("from_time", "");
    setValue("to_time", "");
    setValue("buffer_time", "");
    setValue("work_days", "");
    setValue("day_of_the_week", "");
    setValue("is_active", false);
    setValue("is_default", false);
    setItemId("");
  };
  const openDelate = (x) => {
    setItemId(x.id);
  };
  const closeDelete = () => {
    $("#delete_shift").modal("hide");
    setItemId("");
  };

  const weekoptions = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
    { value: 6, label: 6 },
  ];
  const weekstartoption = [
    { value: 0, label: "sun" },
    { value: 1, label: "mon" },
    { value: 2, label: "tue" },
    { value: 3, label: "wed" },
    { value: 4, label: "thu" },
    { value: 5, label: "fri" },
  ];
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let res = await getShiftData(oidcUser.access_token);
    if (!!!res.error) setData(res);
    else errorToast(res.error.message)
  };

  const addShiftFunction = async (data) => {
    startLoading();
    data.is_active = true, data.is_default = false;
    let res = await addShiftData(oidcUser.access_token, data);
    if (!!!res.error) {
      successToast(messages.addedSuccess)
      closeEdit()
      getData();
    } else {
      errorToast(res.error.message);
    }
    stopLoading();
    return;
  };
  const upDateShiftFunction = async (data) => {
    data.id = itemId;
    let res = await updateShiftData(oidcUser.access_token, data);
    if (!!!res.error) {
      successToast(messages.updateSuccess);
      getData();
      closeEdit();
    } else {
      errorToast(res.error.message);
    }
    return;
  };
  const deleteShiftFunction = async () => {
    startLoading();
    data.id = itemId;
    let res = await deleteShiftData(oidcUser.access_token, data);

    if (!!!res.error) {
      successToast(messages.deleteSucceess);
      getData();
      closeDelete();
    } else {
      showToast('error', res.error.message)
    }
    stopLoading();
    return;
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
    },
    {
      title: "Shift Name",
      dataIndex: "name",
    },

    {
      title: "Start Time",
      dataIndex: "from_time",
    },
    {
      title: "End Time",
      dataIndex: "to_time",
    },
    {
      title: "Buffer Time",
      dataIndex: "buffer_time",
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
        <div className="dropdown dropdown-action">
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
              data-target="#edit_shift"
              onClick={() => openEdit(record)}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a
              className="dropdown-item"
              data-toggle="modal"
              data-target="#delete_shift"
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
    <>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <Helmet>
          <title>Shift List - Hive Attendance</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col">
                <h3 className="page-title">Shift List</h3>
              </div>
              <div className="col-auto float-right ml-auto">
                <a
                  className="btn add-btn m-r-5"
                  data-toggle="modal"
                  data-target="#add_shift"
                >
                  Add Shifts
                </a>
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
                    total: data.length,
                    showTotal: (total, range) =>
                      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger: true,
                    onShowSizeChange: onShowSizeChange,
                    itemRender: itemRender,
                  }}
                  style={{ overflowX: "auto" }}
                  columns={columns}
                  // bordered
                  dataSource={data}
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
      {/* /Page Wrapper */}
      {/* Add Shift Modal */}
      <div id="add_shift" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Shift</h5>
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
              {/* form  */}

              <AddShift submitFunc={(data) => addShiftFunction(data)} />
            </div>
          </div>
        </div>
      </div>
      {/* /Add Shift Modal */}
      {/* Edit Shift Modal */}
      <div id="edit_shift" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Shift</h5>
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
              <form onSubmit={handleSubmit(shiftEditfromSubmit)}>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label className="col-form-label">
                        Shift Name <span className="text-danger">*</span>
                      </label>
                      <div className="input-group time timepicker">
                        {/* <input className="form-control" /> */}
                        <input
                          className="form-control"
                          type="text"
                          {...register("name", { required: true })}
                        />
                        <span className="input-group-append input-group-addon"></span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>
                        Start Time <span className="text-danger">*</span>
                      </label>
                      <div className="input-group time timepicker">
                        <input
                          className="form-control"
                          type="time"
                          {...register("from_time", { required: true })}
                        />
                        {/* <input className="form-control" /><span className="input-group-append input-group-addon"><span className="input-group-text"><i className="fa fa-clock-o" /></span></span> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>
                        End Time <span className="text-danger">*</span>
                      </label>
                      <div className="input-group time timepicker">
                        <input
                          className="form-control"
                          type="time"
                          {...register("to_time", { required: true })}
                        />
                        {/* <input className="form-control" /><span className="input-group-append input-group-addon"><span className="input-group-text"><i className="fa fa-clock-o" /></span></span> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Buffer (In Minutes) </label>
                      <input
                        className="form-control"
                        type="text"
                        {...register("buffer_time", { required: true })}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        No of working days/week
                      </label>
                      {/* <Select
                        classNamePrefix="select"
                        styles={customStyles}
                        value={noWeekWorkingdays}
                        onChange={handleChangeWorkingweek}
                        options={weekoptions}
                      /> */}
                      <Controller
                        control={control}
                        name="work_days"
                        rules={{ required: true }}
                        render={({ field: { onChange, value, name, ref } }) => {
                          return (
                            <Select
                              inputRef={ref}
                              classNamePrefix="select"
                              options={weekoptions}
                              value={weekoptions.find((c) => c.value === value)}
                              onChange={(val) => onChange(val.value)}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-form-label">Week starts from</label>
                      {/* <Select
                        classNamePrefix="select"
                        styles={customStyles}
                        value={weekStartDay}
                        onChange={handleChangeWeekstart}
                        options={weekstartoption}
                      /> */}
                      <Controller
                        control={control}
                        name="day_of_the_week"
                        rules={{ required: true }}
                        render={({ field: { onChange, value, name, ref } }) => {
                          return (
                            <Select
                              inputRef={ref}
                              classNamePrefix="select"
                              options={weekstartoption}
                              value={weekstartoption.find(
                                (c) => c.value === value
                              )}
                              onChange={(val) => onChange(val.value)}
                            />
                          );
                        }}
                      />
                      {/* <Select
                        inputRef={ref}
                        classNamePrefix="select"
                        options={emplist}
                        value={emplist.find((c) => c.value === value)}
                        onChange={(val) => onChange(val.value)}
                      /> */}
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck4"
                        {...register("is_default")}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheck4"
                      >
                        Is Default
                      </label>
                    </div>
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
      {/* /Edit Shift Modal */}
      {/* Add Schedule Modal */}
      {/* /Add Schedule Modal */}
      {/* Delete Shift Modal */}
      <div className="modal custom-modal fade" id="delete_shift" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Delete Shift</h3>
                <p>Are you sure want to delete?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <a
                      className="btn btn-primary continue-btn"
                      onClick={() => deleteShiftFunction()}
                    >
                      Delete
                    </a>
                  </div>
                  <div className="col-6">
                    <a
                      // data_dismiss="modal"
                      // data_dismiss='modal'
                      className="btn btn-primary cancel-btn"
                      onClick={() => closeDelete()}
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
      {/* /Delete Employee Modal */}
    </>
  );
};
// }

export default ShiftList;
