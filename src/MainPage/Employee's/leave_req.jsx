
// import React, { useState, useEffect } from 'react';
// import { Helmet } from "react-helmet";
// import { Avatar_09, Avatar_02, Avatar_03, Avatar_05, Avatar_08, Avatar_10, Avatar_15, Avatar_20, Avatar_24, Avatar_25 } from "../../Entryfile/imagepath"
// import { Tooltip } from "antd";
// import { Table } from 'antd';
// import 'antd/dist/antd.css';
// import Select from "react-select";
// import $ from "jquery";
// import messages from "../../message"
// import { useToastify } from "../../Contexts/ToastContext";
// import { itemRender, onShowSizeChange } from "../paginationfunction"
// import "../antdstyle.css"
// import { getLeaveforApprovalEnd, updateLeavefromdecision } from '../../Services/dashBoardServices';
// import { faltObject } from '../../Services/Helper';
// import { useReactOidc } from '@axa-fr/react-oidc-context';
// import { useForm, Controller } from "react-hook-form";


// const Leavesapproval = (props) => {
//   const { startLoading, stopLoading, successToast, errorToast } =
//     useToastify();
//   const { oidcUser } = useReactOidc();
//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//     setValue,
//     getValues
//   } = useForm();
//   const [data, setData] = useState([])
//   const [itemId, setItemId] = useState("");

//   const approvalTypes = [
//     { value: "new", label: 'New' },
//     { value: "pending", label: 'Pending' },
//     { value: "approved", label: 'Approved' },
//     { value: "rejected", label: 'Rejected' }
//   ]

//   useEffect(() => {
//     getLeave()
//   }, [])
//   const closeEdit = () => {
//     $("#edit_leave").modal("hide");

//     setValue("no_of_days", 0);
//     setValue("emplyee", "");
//     setValue("leave_type", "");
//     setValue("date_from", "");
//     setValue("date_to", "");
//     setValue("approval_type", "");
//     setValue("reason", "");
//     setItemId("");
//   };
//   const openEdit = (x) => {
//     setValue("date_from", x.leave_form_date_from);
//     setValue("emplyee", x.leave_form_applicant);
//     setValue("date_to", x.leave_form_date_to);
//     setValue("no_of_days", x.leave_form_no_of_days);
//     setValue("leave_type", x.leave_type_name);
//     setValue("approval_type", x.approval_type);
//     setValue("reason", x.leave_form_reason);
//     setItemId(x.id);
//     $("#edit_leave").modal("show");
//   };
//   const onSubmit = (data) => {
//     let obj = { approval_type: data.approval_type }
//     updateLeave(obj);
//   }

//   const updateLeave = async (data) => {
//     startLoading();
//     data.id = itemId;
//     let res = await updateLeavefromdecision(data, oidcUser.access_token);
//     if (!res.error) {
//       getLeave()
//       closeEdit()
//       successToast(messages.updateSuccess)
//     }
//     else {
//       errorToast(res.error.messages);
//     }
//     stopLoading();
//   }
//   const getLeave = async () => {

//     let res = await getLeaveforApprovalEnd(oidcUser.access_token);
//     if (!!!res.error) {
//       let data = await faltObject(res.data)
//       setData(data)
//     }
//     else {
//       errorToast(res.error.messages);
//     }

//   }

//   const columns = [
//     {
//       title: "Employee",
//       dataIndex: "leave_form_applicant",
//     },
//     {
//       title: "Leave Type",
//       dataIndex: "leave_type_name",
//     },

//     {
//       title: "From",
//       dataIndex: "leave_form_date_from",
//     },
//     {
//       title: "To",
//       dataIndex: "leave_form_date_to",
//     },

//     {
//       title: "No Of Days",
//       dataIndex: "leave_form_no_of_days",
//     },

//     {
//       title: "Reason",
//       dataIndex: "leave_form_reason",
//       render: (text, record) => (
//         <Tooltip title={text}>
//           <div
//             style={{
//               maxWidth: "150px",
//               whiteSpace: "nowrap",
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//             }}
//           >
//             {text}
//           </div>
//         </Tooltip>
//       ),
//     },
//     {
//       title: "Status",
//       dataIndex: "approval_type",
//       render: (text, record) => (
//         <div className="action-label text-center">
//           <a className="btn btn-white btn-sm btn-rounded text-capitalize">
//             <i
//               className={
//                 text.toLowerCase() == "pending"
//                   ? "fa fa-dot-circle-o text-info" : text.toLowerCase() == "new" ? "fa fa-dot-circle-o text-purple"
//                     : text.toLowerCase() == "approved"
//                       ? "fa fa-dot-circle-o text-success"
//                       : "fa fa-dot-circle-o text-danger"
//               }
//             />{" "}
//             {text}
//           </a>
//         </div>
//       )
//     },
//     {
//       title: "Authority Body",
//       dataIndex: "authority_name",
//       render: (text, record) => (
//         <h2 className="table-avatar">
//           <a className="avatar">
//             <img alt="" src={record.authority_image} />
//           </a>
//           <a>{text} </a>
//         </h2>
//       ),
//       sorter: (a, b) => a.authority_name.length - b.authority_name.length,
//     },
//     {
//       title: "Action",
//       render: (text, record) => (
//         <div className="dropdown dropdown-action text-right">
//           <a
//             className="action-icon dropdown-toggle"
//             data-toggle="dropdown"
//             aria-expanded="false"
//           >
//             <i className="material-icons">more_vert</i>
//           </a>
//           <div className="dropdown-menu dropdown-menu-right">
//             <a
//               className="dropdown-item"
//               onClick={() => openEdit(record)}
//             >
//               <i className="fa fa-pencil m-r-5" /> Review
//             </a>
//           </div>
//         </div>
//       ),
//     },
//   ];
//   return (
//     <div className="page-wrapper">
//       <Helmet>
//         <title>Leaves to approve - Hive HRMS Admin Template</title>
//         <meta name="description" content="Login page" />
//       </Helmet>
//       {/* Page Content */}
//       <div className="content container-fluid">
//         {/* Page Header */}
//         <div className="page-header">
//           <div className="row align-items-center">
//             <div className="col">
//               <h3 className="page-title">Leaves to approve</h3>
//             </div>
//           </div>
//         </div>
//         {/* /Page Header */}
//         {/* Leave Statistics */}
//         {/* <div className="row">
//           <div className="col-md-3">
//             <div className="stats-info">
//               <h6>Today Presents</h6>
//               <h4>12 / 60</h4>
//             </div>
//           </div>
//           <div className="col-md-3">
//             <div className="stats-info">
//               <h6>Planned Leaves</h6>
//               <h4>8 <span>Today</span></h4>
//             </div>
//           </div>
//           <div className="col-md-3">
//             <div className="stats-info">
//               <h6>Unplanned Leaves</h6>
//               <h4>0 <span>Today</span></h4>
//             </div>
//           </div>
//           <div className="col-md-3">
//             <div className="stats-info">
//               <h6>Pending Requests</h6>
//               <h4>12</h4>
//             </div>
//           </div>
//         </div> */}
//         {/* /Leave Statistics */}
//         {/* Search Filter */}
//         {/* <div className="row filter-row">
//           <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
//             <div className="form-group form-focus">
//               <input type="text" className="form-control floating" />
//               <label className="focus-label">Employee Name</label>
//             </div>
//           </div>
//           <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
//             <div className="form-group form-focus select-focus">
//               <select className="select floating">
//                 <option> -- Select -- </option>
//                 <option>Casual Leave</option>
//                 <option>Medical Leave</option>
//                 <option>Loss of Pay</option>
//               </select>
//               <label className="focus-label">Leave Type</label>
//             </div>
//           </div>
//           <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
//             <div className="form-group form-focus select-focus">
//               <select className="select floating">
//                 <option> -- Select -- </option>
//                 <option> Pending </option>
//                 <option> Approved </option>
//                 <option> Rejected </option>
//               </select>
//               <label className="focus-label">Leave Status</label>
//             </div>
//           </div>
//           <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
//             <div className="form-group form-focus">
//               <div className="cal-icon">
//                 <input className="form-control floating datetimepicker" type="text" />
//               </div>
//               <label className="focus-label">From</label>
//             </div>
//           </div>
//           <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
//             <div className="form-group form-focus">
//               <div className="cal-icon">
//                 <input className="form-control floating datetimepicker" type="text" />
//               </div>
//               <label className="focus-label">To</label>
//             </div>
//           </div>
//           <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
//             <a href="#" className="btn btn-success btn-block"> Search </a>
//           </div>
//         </div> */}
//         {/* /Search Filter */}
//         <div className="row">
//           <div className="col-md-12">
//             <div className="table-responsive">

//               <Table className="table-striped"
//                 pagination={{
//                   total: data.length,
//                   showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
//                   showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
//                 }}
//                 style={{ overflowX: 'auto' }}
//                 columns={columns}
//                 // bordered
//                 dataSource={data}
//                 rowKey={record => record.id + Math.random()}
//               />

//             </div>
//           </div>
//         </div>
//       </div>
//       {/* /Page Content */}
//       {/* Add Leave Modal */}
//       <div id="add_leave" className="modal custom-modal fade" role="dialog">
//         <div className="modal-dialog modal-dialog-centered" role="document">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title">Add Leave</h5>
//               <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//                 <span aria-hidden="true">×</span>
//               </button>
//             </div>
//             <div className="modal-body">
//               <form>
//                 <div className="form-group">
//                   <label>Leave Type <span className="text-danger">*</span></label>
//                   <select className="select">
//                     <option>Select Leave Type</option>
//                     <option>Casual Leave 12 Days</option>
//                     <option>Medical Leave</option>
//                     <option>Loss of Pay</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label>From <span className="text-danger">*</span></label>
//                   <div className="cal-icon">
//                     <input className="form-control datetimepicker" type="text" />
//                   </div>
//                 </div>
//                 <div className="form-group">
//                   <label>To <span className="text-danger">*</span></label>
//                   <div className="cal-icon">
//                     <input className="form-control datetimepicker" type="text" />
//                   </div>
//                 </div>
//                 <div className="form-group">
//                   <label>Number of days <span className="text-danger">*</span></label>
//                   <input className="form-control" readOnly type="text" />
//                 </div>
//                 <div className="form-group">
//                   <label>Remaining Leaves <span className="text-danger">*</span></label>
//                   <input className="form-control" readOnly defaultValue={12} type="text" />
//                 </div>
//                 <div className="form-group">
//                   <label>Leave Reason <span className="text-danger">*</span></label>
//                   <textarea rows={4} className="form-control" defaultValue={""} />
//                 </div>
//                 <div className="submit-section">
//                   <button className="btn btn-primary submit-btn">Submit</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* /Add Leave Modal */}
//       {/* Edit Leave Modal */}
//       <div id="edit_leave" className="modal custom-modal fade" role="dialog">
//         <div className="modal-dialog modal-dialog-centered" role="document">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title">Edit Leave</h5>
//               <button
//                 type="button"
//                 className="close"
//                 data_dismiss="modal"
//                 aria-label="Close"
//                 onClick={() => closeEdit()}
//               >
//                 <span aria-hidden="true">×</span>
//               </button>
//             </div>
//             <div className="modal-body">
//               {/* working  */}
//               <form onSubmit={handleSubmit(onSubmit)}>
//               <div className="form-group">
//                   <label>
//                     Emplyee <span className="text-danger">*</span>
//                   </label>
//                   <input
//                     className="form-control"
//                     readOnly
//                     type="text"
//                     disabled={true}
//                     {...register("emplyee", { required: true })}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>
//                     Leave Type <span className="text-danger">*</span>
//                   </label>
//                   <input
//                     className="form-control"
//                     readOnly
//                     type="text"
//                     disabled={true}
//                     {...register("leave_type", { required: true })}
//                   />
//                 </div>
               
//                 <div className="form-group">
//                   <label>
//                     From <span className="text-danger">*</span>
//                   </label>
//                   <input
//                     className="form-control datetimepicker"
//                     type="date"
//                     disabled={true}
//                     {...register("date_from", {
//                       required: true
//                     })}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>
//                     To <span className="text-danger">*</span>
//                   </label>

//                   <input
//                     disabled={true}
//                     className="form-control datetimepicker"
//                     type="date"
//                     {...register("date_to", {
//                       required: true
//                     })}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>
//                     Number of days <span className="text-danger">*</span>
//                   </label>
//                   <input
//                     className="form-control"
//                     readOnly
//                     type="text"
//                     disabled={true}
//                     {...register("no_of_days", { required: true })}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>
//                     Leave Reason <span className="text-danger">*</span>
//                   </label>
//                   <textarea
//                     rows={4}
//                     disabled={true}
//                     className="form-control"
//                     defaultValue={""}
//                     {...register("reason", { required: true })}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>
//                     Decision <span className="text-danger">*</span>
//                   </label>
//                   <Controller
//                     control={control}
//                     name="approval_type"
//                     rules={{ required: true }}
//                     render={({ field: { onChange, value, name, ref } }) => {
//                       return (
//                         <Select
//                           classNamePrefix="select"
//                           options={approvalTypes}
//                           value={approvalTypes.find((c) => c.value === value)}
//                           onChange={(val) => onChange(val.value)}
//                         />
//                       );
//                     }}
//                   />
//                 </div>
//                 <div className="submit-section">
//                   <button className="btn btn-primary submit-btn">Submit</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* /Edit Leave Modal */}
//       {/* Approve Leave Modal */}
//       <div className="modal custom-modal fade" id="approve_leave" role="dialog">
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content">
//             <div className="modal-body">
//               <div className="form-header">
//                 <h3>Leave Approve</h3>
//                 <p>Are you sure want to approve for this leave?</p>
//               </div>
//               <div className="modal-btn delete-action">
//                 <div className="row">
//                   <div className="col-6">
//                     <a href="" className="btn btn-primary continue-btn">Approve</a>
//                   </div>
//                   <div className="col-6">
//                     <a href="" data-dismiss="modal" className="btn btn-primary cancel-btn">Decline</a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* /Approve Leave Modal */}
//       {/* Delete Leave Modal */}
//       <div className="modal custom-modal fade" id="delete_approve" role="dialog">
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content">
//             <div className="modal-body">
//               <div className="form-header">
//                 <h3>Delete Leave</h3>
//                 <p>Are you sure want to delete this leave?</p>
//               </div>
//               <div className="modal-btn delete-action">
//                 <div className="row">
//                   <div className="col-6">
//                     <a href="" className="btn btn-primary continue-btn">Delete</a>
//                   </div>
//                   <div className="col-6">
//                     <a href="" data-dismiss="modal" className="btn btn-primary cancel-btn">Cancel</a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* /Delete Leave Modal */}
//     </div>
//   );
// }


// export default Leavesapproval;
