import { useReactOidc } from "@axa-fr/react-oidc-context";
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Select from "react-select";
import {
  Avatar_01,
  Avatar_02,
  Avatar_03,
  Avatar_04,
  Avatar_05,
  Avatar_11,
  Avatar_12,
  Avatar_09,
  Avatar_10,
  Avatar_08,
  Avatar_13,
  Avatar_16,
} from "../../Entryfile/imagepath";
import { useHistory } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import {
  getAllDesignations,
  getEmployeeList,
  searchEmployee,
} from "../../Services/dashBoardServices";
import AddEmployeemodal from "./modals/addEmployeemodal";
import { useToastify } from "../../Contexts/ToastContext";
import { chcekPermission } from "../../Services/Helper";

const Employee = () => {


  const closeEdit = () => {
    $("#add_employee").modal("hide");
    $("#add_employee").modal("hide");
    // setValue("name", "");
    // setValue("from_time", "");
    // setValue("to_time", "");
    // setValue("buffer_time", "");
    // setValue("work_days", "");
    // setValue("day_of_the_week", "");
    // setValue("is_active", false);
    // setValue("is_default", false);
    // setItemId("");
  };

  const { showToast, startLoading, stopLoading, successToast, errorToast } =
    useToastify();

  let history = useHistory();
  const { oidcUser } = useReactOidc();
  const [rendemplist, setrendempList] = useState(new Array(8).fill({}));
  const [Desigs, setDesigs] = useState([]);
  const [adminPermission, setAdminPermission] = useState(chcekPermission(oidcUser.profile.permissions, 'setup'));
  const [DesigOption, SetDesigoption] = useState({
    value: "",
    label: "Select Designation",
  });
  const [searchFilter, setSearch] = useState({
    id: "",
    name: "",
    designation: "",
  });
  const customStyles = {
    control: (base) => ({
      ...base,
      height: 50,
      minHeight: 50,
    }),
  };

  useEffect(() => {
    getEmpList(oidcUser.access_token);
    getDesignations();
  }, []);

  const getDesignations = async () => {
    let res = await getAllDesignations(oidcUser.access_token);
    if (!res.length) return;
    let arr = new Array(res.length + 1).fill(null).map((x, idx) => {
      if (idx === 0) return { value: "", label: "Select Designation" };
      let designation = res[idx - 1].name;
      return { value: designation, label: designation };
    });
    setDesigs(arr);
  };

  const getEmpList = async () => {
    let res = await getEmployeeList(oidcUser.access_token);
    setrendempList(res);
  };

  const navigateToProfile = (id) => {
    if (!id) return;
    history.push(`/app/employees/employee-profile/${id}`);
  };

  function handleChangeDesig(event) {
    let o = searchFilter;
    o.designation = event.value;
    setSearch(o);
    SetDesigoption(event);
  }
  function handleChangeName(event) {
    event.persist();
    let o = searchFilter;
    o.name = event.target.value;
    setSearch(o);
  }
  function handleChangeId(event) {
    event.persist();
    let o = searchFilter;
    o.id = event.target.value;
    setSearch(o);
  }

  const SearchFunc = async () => {
    startLoading();
    let obj = Object.fromEntries(
      Object.entries(searchFilter).filter(([_, v]) => v != "")
    );
    let res = await searchEmployee(obj, oidcUser.access_token);
    if (!!!res.error) {
      setrendempList(res);
    } else {
      showToast("error", res.error.message);
    }
    stopLoading();
  };

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Employee - Hive Hrms</title>
        <meta name="description" content="Login page" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Employees</h3>
            </div>
            {adminPermission ? <div className="col-auto float-right ml-auto">
              <a className="btn add-btn" data-toggle="modal" data-target="#add_employee"><i className="fa fa-plus" /> Add Employee</a>
              <div className="view-icons">
                <a href="/hive_hrm/app/employee/allemployees" className="grid-view btn btn-link active"><i className="fa fa-th" /></a>
                <a href="/hive_hrm/app/employee/employees-list" className="list-view btn btn-link"><i className="fa fa-bars" /></a>
              </div>
            </div> : <></>}
          </div>
        </div>
        {/* /Page Header */}
        {/* Search Filter */}
        <div className="row filter-row">
          <div className="col-sm-6 col-md-3">
            <div className="form-group form-focus">
              <input
                type="text"
                className="form-control floating"
                onChange={handleChangeId}
              />
              <label className="focus-label">Employee ID</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="form-group form-focus">
              <input
                type="text"
                className="form-control floating"
                name="empName"
                onChange={handleChangeName}
              />
              <label className="focus-label">Employee Name</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="form-group form-focus select-focus">
              <Select
                classNamePrefix="select"
                styles={customStyles}
                value={DesigOption}
                onChange={handleChangeDesig}
                options={Desigs.length ? Desigs : [DesigOption]}
                placeholder="Designation"
              />
            </div>
          </div>

          <div className="col-sm-6 col-md-3">
            <button
              className="btn btn-success btn-block"
              onClick={() => SearchFunc()}
            >
              {" "}
              Search{" "}
            </button>
          </div>
        </div>
        {/* Search Filter */}
        {rendemplist.length ? (
          <div className="row staff-grid-row">
            {rendemplist.map((x, _idx) => (
              <div
                className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3"
                key={x.id || _idx}
                onClick={() => navigateToProfile(x.id)}
              >
                {/* <Link to={`/app/employees/employee-profile/${x.id}`} > */}
                <div className="profile-widget">
                  <div className="profile-img">
                    <img
                      className="avatar"
                      style={{ objectFit: "cover" }}
                      src={x.photo || Avatar_02}
                      alt=""
                    />
                  </div>
                  {/* <div className="dropdown profile-action">
                    <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                    <div className="dropdown-menu dropdown-menu-right">
                      <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_employee"><i className="fa fa-pencil m-r-5" /> Edit</a>
                      <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_employee"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                    </div>
                  </div> */}
                  <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                    {x.full_name || <Skeleton width={250} />}
                  </h4>
                  <div className="small text-muted">
                    {x.designation || <Skeleton width={150} />}
                  </div>
                </div>
                {/* </Link> */}
              </div>
            ))}
          </div>
        ) : (
          <div></div>
        )}
      </div>
      {/* /Page Content */}
      {/* Add Employee Modal */}
      <div id="add_employee" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Employee</h5>
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
              <AddEmployeemodal />
            </div>
          </div>
        </div>
        
      </div>
      {/* /Add Employee Modal */}
      {/* Edit Employee Modal */}
      <div id="edit_employee" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Employee</h5>
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
              <form>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        First Name <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        defaultValue="John"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-form-label">Last Name</label>
                      <input
                        className="form-control"
                        defaultValue="Doe"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        Username <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        defaultValue="johndoe"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        Email <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        defaultValue="johndoe@example.com"
                        type="email"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-form-label">Password</label>
                      <input
                        className="form-control"
                        defaultValue="johndoe"
                        type="password"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-form-label">Confirm Password</label>
                      <input
                        className="form-control"
                        defaultValue="johndoe"
                        type="password"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        Employee ID <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        defaultValue="FT-0001"
                        readOnly
                        className="form-control floating"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        Joining Date <span className="text-danger">*</span>
                      </label>
                      <div className="cal-icon">
                        <input
                          className="form-control datetimepicker"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-form-label">Phone </label>
                      <input
                        className="form-control"
                        defaultValue={9876543210}
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-form-label">Company</label>
                      <select className="select">
                        <option>Global Technologies</option>
                        <option>Delta Infotech</option>
                        <option>International Software Inc</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        Department <span className="text-danger">*</span>
                      </label>
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
                      <label>
                        Designation <span className="text-danger">*</span>
                      </label>
                      <select className="select">
                        <option>Select Designation</option>
                        <option>Web Designer</option>
                        <option>Web Developer</option>
                        <option>Android Developer</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="table-responsive m-t-15">
                  <table className="table table-striped custom-table">
                    <thead>
                      <tr>
                        <th>Module Permission</th>
                        <th className="text-center">Read</th>
                        <th className="text-center">Write</th>
                        <th className="text-center">Create</th>
                        <th className="text-center">Delete</th>
                        <th className="text-center">Import</th>
                        <th className="text-center">Export</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Holidays</td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                      </tr>
                      <tr>
                        <td>Leaves</td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                      </tr>
                      <tr>
                        <td>Clients</td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                      </tr>
                      <tr>
                        <td>Projects</td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                      </tr>
                      <tr>
                        <td>Tasks</td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                      </tr>
                      <tr>
                        <td>Chats</td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                      </tr>
                      <tr>
                        <td>Assets</td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                      </tr>
                      <tr>
                        <td>Timing Sheets</td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Edit Employee Modal */}
      {/* Delete Employee Modal */}
      <div
        className="modal custom-modal fade"
        id="delete_employee"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Delete Employee</h3>
                <p>Are you sure want to delete?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <a href="" className="btn btn-primary continue-btn">
                      Delete
                    </a>
                  </div>
                  <div className="col-6">
                    <a
                      href=""
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
      {/* /Delete Employee Modal */}
    </div>
  );
};

export default Employee;
