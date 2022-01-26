import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { useReactOidc } from '@axa-fr/react-oidc-context';
import { useHistory, useParams } from 'react-router';
import axios from "axios";
import Skeleton from 'react-loading-skeleton';
import AddDevice from './modals/addDevice';
import { useToastify } from '../../Contexts/ToastContext';
import { useForm, Controller } from "react-hook-form";
import $ from "jquery";



const EmployeeProfile = () => {

  const { startLoading, stopLoading, successToast, errorToast } =
    useToastify();
  const [userInfo, setUserInfo] = useState({})

  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues
  } = useForm();

  useEffect(() => {
    ff()
    return () => { }
  }, [])

  const onSubmit=()=>{}
  

  const ff = async () => {
    setValue("ip");
    setValue("port");
    setValue("name");
    setValue("description");
    let data = await getData()
    setUserInfo(data)
  }


 

  //pinging the specific ip
  const pingIP = async (x) => {
    console.log(x.ip, x.port)
    let data = {
      "ip": x.ip,
      "port": x.port
    }
    let p = (x.name).toUpperCase();
    try {
      startLoading()
      let res = await axios.post(`http://localhost:8000/devices/ping`, data
      )
      console.log(res)
      stopLoading()
      successToast(`${(p)} - Ping Successfully `)
      return res

    } catch (error) {
      startLoading()
      errorToast(`${(p)} - Could not Connect`)
      stopLoading()
      return error;
    }

  }

  //removing device
  const removeDevice = async (x) => {
    console.log(x.id)
    let data = {
      "id": x.id
    }
    try {
      startLoading()
      let res = await axios.delete(`http://localhost:8000/devices/${x.id}`, data
      )
      console.log(res)
      ff()
      stopLoading()

      successToast("Deleted Successfully")
      return res

    } catch (error) {
      startLoading()
      errorToast("Could not Delete")
      stopLoading()
      return error;
    }
  }

  const getData = async () => {
    try {
      let res = await axios.get(`http://localhost:8000/devices`,
      )
      return res.data

    } catch (error) {
      return error;
    }

  }

  try {
    // console.log(userInfo[0].name)
  }
  catch (err) {
    // console.log("err")
  }



  const editOpen = (x) => {
    setValue("ip", x.ip);
    setValue("port", x.port);
    setValue("name", x.name);
    setValue("description", x.description);
  };
  const closeEdit = () => {
    console.log("jjjjjjjjjjjjjjj");
    $("#add_employee").modal("hide");

    // setstate("")
  };

  const addFunction = async(data) => {
    try {
      let res = await axios.post(`http://localhost:8000/devices`, data, {
      });
      successToast("Device Added")
      ff()
      closeEdit()
    } catch (error) {
      errorToast("Error")
      return { error }
    }
  }

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>{`Devices Profile - Hive HRMS`}</title>
        <meta name="description" content="Reactify Blank Page" />
      </Helmet>
      {/* {console.log(employeeProfile)} */}
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">{`Available Devices`}</h3>
            </div>
            <div className="col-auto float-right ml-auto">
              <a href="#" className="btn add-btn" data-toggle="modal" data-target="#add_employee"><i className="fa fa-plus" /> Add Device</a>
              <div id="add_employee" className="modal custom-modal fade" role="dialog">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Add Device</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" onClick={()=>closeEdit}>×</span>
                      </button>
                    </div>
                    <div className="modal-body" id="modal11">
                      <AddDevice submitFunc={(data) => addFunction(data)} />
                    </div>
                  </div>

                </div>
              </div>


            </div>
          </div>
        </div>

        <div className="tab-content">
          <div id="emp_profile" className="pro-overview tab-pane fade show active">
            {userInfo.length ? (
              <div className="row">
                {userInfo.map((x) =>
                  <div className="col-md-4 d-flex" key={x.id}>
                    <div className="card profile-box flex-fill">
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <h3 className="card-title">{(x.name).toUpperCase()}</h3>
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
                                data-target=""
                                onClick={() => pingIP(x)}
                              >
                                <i className="fa fa-pencil m-r-5" /> Test Device
                              </a>
                              <a
                                className="dropdown-item"
                                data-toggle="modal"
                                data-target="#delete_shift"
                                onClick={() => openDelate(record)}
                              >
                                <i className="fa fa-trash-o m-r-5" /> Sync Device
                              </a>
                              <a
                                className="dropdown-item"
                                data-toggle="modal"
                                data-target="#delete_shift"
                                onClick={() => openDelate(record)}
                              >
                                <i className="fa fa-trash-o m-r-5" /> Clear Logs
                              </a>
                              <a
                                className="dropdown-item"
                                data-toggle="modal"
                                data-target="#delete_shift"
                                onClick={() => removeDevice(x)}
                              >
                                <i className="fa fa-trash-o m-r-5" /> Remove Device
                              </a>
                              <a
                                className="dropdown-item"
                                data-toggle="modal"
                                data-target="#edit_shift"
                                onClick={() => editOpen(x)}
                              >
                                <i className="fa fa-pencil m-r-5" /> Edit Device
                              </a>
                            </div>
                          </div>
                        </div>


                        <ul className="personal-info">
                          <li>
                            <div className="title">Device Name:</div>
                            <div className="text">{x.name || <Skeleton width={250} />}</div>
                          </li>
                          <li>
                            <div className="title">Device IP:</div>
                            <div className="text"><a href="">{x.ip || <Skeleton width={250} />}</a></div>
                          </li>
                          <li>
                            <div className="title">Port:</div>
                            <div className="text">{x.port || <Skeleton width={250} />}</div>
                          </li>
                          <li>
                            <div className="title">Description:</div>
                            <div className="text">{x.description || <Skeleton width={250} />}</div>
                          </li>

                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) :
              <div></div>
            }
          </div>
        </div>
      </div>
      <div id="edit_shift" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Device</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row" id="modal">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-form-label">Device IP <span className="text-danger">*</span></label>
                      <input
                        className="form-control"
                        type="text"
                        {...register("ip", {
                          required: true,
                          disabled: true,
                          onChange: (e) => {
                            e.persist();
                            // setStart(e.target.value);
                            if (e) setValue("ip", e.target.value);
                            else setValue("ip", null);
                          },
                        })}
                      />
                      {errors.ip && <span style={{ color: "red", fontSize: "small" }}>is required</span>}

                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-form-label">Port <span className="text-danger">*</span></label>
                      <input
                        className="form-control"
                        type="number"
                        {...register("port", {
                          required: true,
                          disabled: true,
                          onChange: (e) => {
                            e.persist();
                            // setStart(e.target.value);
                            if (e) setValue("port", e.target.value);
                            else setValue("port", null);
                          },
                        })}
                      />
                      {errors.ip && <span style={{ color: "red", fontSize: "small" }}>is required</span>}

                    </div>
                  </div>

                  <div className="col-sm-12">
                    <div className="form-group">
                      <label className="col-form-label">Device Name <span className="text-danger">*</span></label>
                      {/* <input className="form-control" type="text" /> */}
                      <input
                        className="form-control"
                        type="text"
                        {...register("name", {
                          required: true,
                          onChange: (e) => {
                            e.persist();
                            // setStart(e.target.value);
                            if (e) setValue("name", e.target.value);
                            else setValue("name", null);
                          },
                        })}
                      />
                      {errors.name && <span style={{ color: "red", fontSize: "small" }}>is required</span>}

                    </div>
                  </div>


                  <div className="col-sm-12">
                    <div className="form-group">
                      <label className="col-form-label">Device Description <span className="text-danger">*</span></label>
                      {/* <input className="form-control" type="text" /> */}
                      <input
                        className="form-control"
                        type="text"
                        {...register("description", {
                          required: true,
                          onChange: (e) => {
                            e.persist();
                            // setStart(e.target.value);
                            if (e) setValue("description", e.target.value);
                            else setValue("description", null);
                          },
                        })}
                      />
                      {errors.description && <span style={{ color: "red", fontSize: "small" }}>is required</span>}

                    </div>
                  </div>
                </div>

                <div className="submit-section">
                  <button className="btn btn-primary submit-btn" type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>


    </div>



  );

}

export default EmployeeProfile