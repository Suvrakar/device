import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import { useForm, Controller } from "react-hook-form";
import { AddHoliday } from "./modals/AddHoliday";
import { useReactOidc } from "@axa-fr/react-oidc-context";
import $ from "jquery";
import dateFormat from "dateformat";
import { useToastify } from "../../Contexts/ToastContext";
import messages from "../../message"


import { getHolidayData, addHolidayData, updateHolidayData, deleteHolidayData } from "../../Services/setupServices";
import { holidayDataShaper, holidayCsvToJSON } from "../../Services/Helper";


const Holidays = () => {
  const { oidcUser } = useReactOidc()
  const { showToast, startLoading, stopLoading, successToast, errorToast } = useToastify()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const holidayEditFromSubmit = (data) => upDateHolidayFunction(data);

  const [year, setYear] = useState("2021");
  const [csvFlie, setCsvFlie] = useState();
  const [data, setData] = useState([]);
  const [itemId, setItemId] = useState("");
  const fileRef = useRef();


  const openEdit = (x) => {
    setValue("name", x.name);
    let r = x.date.split('-')
    let dateStr = `${r[2]}/${r[1]}/${r[0]}`
    // console.log(dateStr);
    setValue("date", dateStr);
    setValue("day", x.day);
    setValue("is_active", x.is_active);
    setItemId(x.id);
  };
  const closeEdit = () => {
    $("#edit_holiday").modal("hide");
    $("#add_holiday").modal("hide");
    setValue("name", '');
    setValue("date", '');
    setValue("day", '');
    setItemId("");
  };
  const openDelate = (x) => {
    setItemId(x.id);
  };
  const closeDelete = () => {
    $("#delete_holiday").modal("hide");
    setItemId("");
  };
  const closeImport = () => {
    $("#import_holiday").modal('hide');
    setCsvFlie();
  };


  const submitCsvFile = () => {
    const file = csvFlie;
    const reader = new FileReader();
    reader.onload = function (e) {
      const text = e.target.result;
      processCSV(text) // plugged in here
    }
    reader.readAsText(file);
  }


  const processCSV = (str) => {
    let uuu = holidayCsvToJSON(str)
    addHolidayFunctionfromCsv(uuu)
  }

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {

    let res = await getHolidayData(oidcUser.access_token)
    if (res.length) {
      let data = await holidayDataShaper(res)
      setData(data)
    }

    return
  }

  const addHolidayFunction = async (data) => {

    let r = data.date.split('/')
    let dateStr = `${r[2]}-${r[1]}-${r[0]}`
    data.date = dateStr
    data.is_active = true
    let res = await addHolidayData(oidcUser.access_token, [data])
    if (!!!res.error) {
      successToast(messages.addedSuccess)
      getData();
      closeEdit();
    } else {
      showToast('error', res.error.message)
    }
    return

  }
  const addHolidayFunctionfromCsv = async (data) => {
    startLoading()
    let res = await addHolidayData(oidcUser.access_token, data)
    if (!!!res.error) {
      successToast(messages.addedSuccess)
      getData();
      closeImport();
    } else {
      errorToast(res.error.message)
    }
    stopLoading()
    return

  }


  const upDateHolidayFunction = async (data) => {
    startLoading()
    let r = data.date.split('/')
    let dateStr = `${r[2]}-${r[1]}-${r[0]}`
    data.date = dateStr
    data.id = itemId
    let res = await updateHolidayData(oidcUser.access_token, data)
    if (!!!res.error) {
      successToast(messages.updateSuccess)
      getData();
      closeEdit()
    } else {
      errorToast(res.error.message)
    }
    stopLoading()

    return

  }
  const deleteHolidayFunction = async () => {
    startLoading()
    data.id = itemId
    let res = await deleteHolidayData(oidcUser.access_token, data)

    if (!!!res.error) {
      successToast(messages.deleteSucceess)
      getData();
      closeDelete();
    } else {
      showToast('error', res.error.message)
    }
    stopLoading()
    return

  }



  const columns = [
    {
      title: "#",
      dataIndex: "id",
    },
    {
      title: "Title",
      dataIndex: "name",
    },
    {
      title: "Date",
      render: (text, record) => (
        <div className='dant-table-cell'>

          {dateFormat(record.date, 'mmmm dd')}
        </div>
      ),
    },

    {
      title: "Day",
      dataIndex: "day",
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
              data-target="#edit_holiday"
              onClick={() => openEdit(record)}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a
              className="dropdown-item"
              data-toggle="modal"
              data-target="#delete_holiday"
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
        <title>Holidays - Hive HRMS</title>
        <meta name="description" content="Login page" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Holidays {year}</h3>
            </div>
            <div className="col-auto float-right ml-auto">
              <a
                className="btn add-btn"
                data-toggle="modal"
                data-target="#add_holiday"
              >
                <i className="fa fa-plus" /> Add Holiday
              </a>
            </div>
            <div className="col-auto float-right ml-auto">
              <a
                className="btn add-btn"
                onClick={() => fileRef.current.click()}
              >
                <i className="fa fa-file" /> Import Holiday
              </a>
              <input
                className="btn add-btn"
                ref={fileRef}
                type='file'
                accept='.csv'
                style={{ display: 'none' }}
                onChange={(e) => {
                  setCsvFlie(e.target.files[0])
                  $("#import_holiday").modal('show');
                }}

              >
              </input>
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
      {/* Add Holiday Modal */}
      <div className="modal custom-modal fade" id="add_holiday" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Holiday</h5>
              <button
                type="button"
                className="close"
                data_dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <AddHoliday submitFunc={addHolidayFunction} />
            </div>
          </div>
        </div>
      </div>
      {/* /Add Holiday Modal */}
      {/* Edit Holiday Modal */}
      <div className="modal custom-modal fade" id="edit_holiday" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Holiday</h5>
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

              <form onSubmit={handleSubmit(holidayEditFromSubmit)}>
                <div className="form-group">
                  <label>
                    Holiday Name <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    {...register("name", { required: true })}
                  />
                </div>
                <div className="form-group">
                  <label>
                    Holiday Date <span className="text-danger">*</span>
                  </label>
                  <div className="cal-icon">
                    <input
                      className="form-control datetimepicker"
                      type="text"
                      {...register("date", { required: true })}
                    />
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck5" {...register('is_active')} />
                    <label className="custom-control-label" htmlFor="customCheck5">Is Active</label>
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
      {/* /Edit Holiday Modal */}
      {/* Delete Holiday Modal */}
      <div
        className="modal custom-modal fade"
        id="delete_holiday"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Delete Holiday</h3>
                <p>Are you sure want to delete?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <a onClick={() => deleteHolidayFunction()} className="btn btn-primary continue-btn">
                      Delete
                    </a>
                  </div>
                  <div className="col-6">
                    <a
                      data_dismiss="modal"
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
      {/* /Delete Holiday Modal */}
      {/* Import Holiday Modal */}
      <div
        className="modal custom-modal fade"
        id="import_holiday"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Import Holiday</h3>
                <p>Are you sure want to Import?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <a onClick={() => submitCsvFile()} className="btn btn-primary continue-btn">
                      Yes
                    </a>
                  </div>
                  <div className="col-6">
                    <a
                      data_dismiss="modal"
                      href="#"
                      className="btn btn-primary cancel-btn"
                      onClick={() => closeImport()}
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
      {/* Import Holiday Modal */}
    </div>
  );
};

export default Holidays;
