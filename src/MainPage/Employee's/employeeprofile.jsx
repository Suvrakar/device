import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Avatar_02, Avatar_05, Avatar_09, Avatar_10, Avatar_16 } from '../../Entryfile/imagepath'
import { useReactOidc } from '@axa-fr/react-oidc-context';
import { useHistory, useParams } from 'react-router';
import axios from "axios";
import Skeleton from 'react-loading-skeleton';
import AddEmployeemodal from './modals/addDevice';
import AddDevice from './modals/addDevice';
import { useToastify } from '../../Contexts/ToastContext';



const EmployeeProfile = () => {

  const { startLoading, stopLoading, successToast, errorToast } =
    useToastify();
  const { id } = useParams()
  const { oidcUser } = useReactOidc();
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    ff()
    return () => { }
  }, [])

  const ff = async () => {
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
    try {
      startLoading()
      let res = await axios.post(`http://localhost:8000/devices/ping`, data
      )
      console.log(res)
      stopLoading()
      successToast("Ping Successfully")
      return res

    } catch (error) {
      startLoading()
      errorToast("Could not Connect")
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
    console.log(userInfo[0].name)
  }
  catch (ree) {
    console.log("err")
  }



  const closeEdit = () => {
    $("#edit_leave").modal("hide");
    $("#add_leave").modal("hide");
    setValue("no_of_days", 0);
    setValue("leave_type", "");
    setValue("date_from", "");
    setValue("date_to", "");
    setStart(null);
    setEnd(null);
    setValue("reason", "");
    setItemId("");
  };


  return (
    <div className="page-wrapper">
      <Helmet>
        <title>{`Employee Profile - Hive HRMS`}</title>
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
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <AddDevice />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* {userInfo.map((x)=>  */}
        <div className="tab-content">
          {/* Profile Info Tab */}
          <div id="emp_profile" className="pro-overview tab-pane fade show active">
            {/* {rendemplist.length ? ( */}
            {userInfo.length ? (
              <div className="row">
                {userInfo.map((x) =>

                  <div className="col-md-4 d-flex">
                    <div className="card profile-box flex-fill">
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <h3 className="card-title">[Device {x.id}] - {x.name}</h3>
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
                                data-target="#delete_shift"
                                onClick={() => removeDeviddce(x)}
                              >
                                <i className="fa fa-pencil m-r-5" /> Edit Device
                              </a>
                            </div>
                          </div>
                          {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                   <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                 </svg> */}
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
                            <div className="title">Network Connection:</div>
                            <div className="text">{x.port || <Skeleton width={250} />}</div>
                          </li>
                          <li>
                            <div className="title">Backend Connection:</div>
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

        {/* } */}




      </div>


      {/* /Page Content */}
      {/* Profile Modal */}
      <div id="profile_info" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Profile Information</h5>
              <button type="button" className="close" data_dismiss="modal" aria-label="Close">
                <span aria-hidden="true">x</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="col-md-12">
                    <div className="profile-img-wrap edit-img">
                      <img className="inline-block" src={Avatar_02} alt="user" />
                      <div className="fileupload btn">
                        <span className="btn-text">edit</span>
                        <input className="upload" type="file" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>First Name</label>
                          <input type="text" className="form-control" defaultValue="John" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Last Name</label>
                          <input type="text" className="form-control" defaultValue="Doe" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Birth Date</label>
                          <div className="cal-icon">
                            <input className="form-control datetimepicker" type="text" defaultValue="05/06/1985" />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Gender</label>
                          <select className="select form-control">
                            <option value="male selected">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Address</label>
                      <input type="text" className="form-control" defaultValue="4487 Snowbird Lane" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>State</label>
                      <input type="text" className="form-control" defaultValue="New York" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Country</label>
                      <input type="text" className="form-control" defaultValue="United States" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Pin Code</label>
                      <input type="text" className="form-control" defaultValue={10523} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input type="text" className="form-control" defaultValue="631-889-3206" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Department <span className="text-danger">*</span></label>
                      <select className="select">
                        <option>Select Department</option>
                        <option>Web Development</option>
                        <option>IT Management</option>
                        <option>Marketing</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Designation <span className="text-danger">*</span></label>
                      <select className="select">
                        <option>Select Designation</option>
                        <option>Web Designer</option>
                        <option>Web Developer</option>
                        <option>Android Developer</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Reports To <span className="text-danger">*</span></label>
                      <select className="select">
                        <option>-</option>
                        <option>Wilmer Deluna</option>
                        <option>Lesley Grauer</option>
                        <option>Jeffery Lalor</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Profile Modal */}
      {/* Personal Info Modal */}



      {/* /Emergency Contact Modal */}
      {/* Education Modal */}
      <div id="education_info" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title"> Education Informations</h5>
              <button type="button" className="close" data_dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-scroll">
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">Education Informations <a href="" className="delete-icon"><i className="fa fa-trash-o" /></a></h3>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <input type="text" defaultValue="Oxford University" className="form-control floating" />
                            <label className="focus-label">Institution</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <input type="text" defaultValue="Computer Science" className="form-control floating" />
                            <label className="focus-label">Subject</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <div className="cal-icon">
                              <input type="text" defaultValue="01/06/2002" className="form-control floating datetimepicker" />
                            </div>
                            <label className="focus-label">Starting Date</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <div className="cal-icon">
                              <input type="text" defaultValue="31/05/2006" className="form-control floating datetimepicker" />
                            </div>
                            <label className="focus-label">Complete Date</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <input type="text" defaultValue="BE Computer Science" className="form-control floating" />
                            <label className="focus-label">Degree</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <input type="text" defaultValue="Grade A" className="form-control floating" />
                            <label className="focus-label">Grade</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">Education Informations <a href="" className="delete-icon"><i className="fa fa-trash-o" /></a></h3>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <input type="text" defaultValue="Oxford University" className="form-control floating" />
                            <label className="focus-label">Institution</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <input type="text" defaultValue="Computer Science" className="form-control floating" />
                            <label className="focus-label">Subject</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <div className="cal-icon">
                              <input type="text" defaultValue="01/06/2002" className="form-control floating datetimepicker" />
                            </div>
                            <label className="focus-label">Starting Date</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <div className="cal-icon">
                              <input type="text" defaultValue="31/05/2006" className="form-control floating datetimepicker" />
                            </div>
                            <label className="focus-label">Complete Date</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <input type="text" defaultValue="BE Computer Science" className="form-control floating" />
                            <label className="focus-label">Degree</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <input type="text" defaultValue="Grade A" className="form-control floating" />
                            <label className="focus-label">Grade</label>
                          </div>
                        </div>
                      </div>
                      <div className="add-more">
                        <a href=""><i className="fa fa-plus-circle" /> Add More</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Submit</button>
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