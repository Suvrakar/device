import React, { useEffect, useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { Avatar_02 } from '../../../Entryfile/imagepath'
import { useToastify } from '../../../Contexts/ToastContext';

const AddEmployeemodal = () => {
  const { startLoading, stopLoading, successToast, errorToast } =
    useToastify();
  const [image, setImage] = useState();

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
    setValue("fname");
    setValue("lname");
    setValue("email");
    setValue("pass");
    setValue("repass");
    setValue("repass");
    setValue("jdate");
    setValue("phone");
    // setValue("image")

  }, []);

  const onSubmit = (data) => {
    const pass = getValues("pass");
    const repass = getValues("repass");
    if (pass != repass) {
      errorToast("Password Does not Match")

    } else {
      successToast("Employee Data has been Submitted")
      console.log(data);
    }
  }

  // const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-sm-12">
          <div className="form-group" >
            <div className="profile-img-wrap edit-img">
              <img className="inline-block" src={image ? URL.createObjectURL(image) : Avatar_02} alt="user" />
              <div className="fileupload btn">
                <span className="btn-text">upload</span>
                <input
                  className="upload"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
            </div>
          </div>
        </div>


        <div className="col-sm-6">
          <div className="form-group">
            <label className="col-form-label">First Name <span className="text-danger">*</span></label>
            {/* <input className="form-control" type="text" /> */}
            <input
              className="form-control"
              type="text"
              {...register("fname", {
                required: true,
                onChange: (e) => {
                  e.persist();
                  // setStart(e.target.value);
                  if (e) setValue("fname", e.target.value);
                  else setValue("fname", null);
                },
              })}
            />
            {errors.fname && <span style={{ color: "red", fontSize: "small" }}>is required</span>}

          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <label className="col-form-label">Last Name</label>
            <input
              className="form-control"
              type="text"
              {...register("lname", {
                required: true,
                onChange: (e) => {
                  e.persist();
                  // setStart(e.target.value);
                  if (e) setValue("lname", e.target.value);
                  else setValue("lname", null);
                },
              })}
            />
            {errors.lname && <span style={{ color: "red", fontSize: "small" }}>is required</span>}


          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <label className="col-form-label">Email <span className="text-danger">*</span></label>
            {/* <input className="form-control" type="email" /> */}
            <input
              className="form-control"
              type="text"
              {...register("email", {
                required: true,
                onChange: (e) => {
                  e.persist();
                  // setStart(e.target.value);
                  if (e) setValue("email", e.target.value);
                  else setValue("email", null);
                },
              })}
            />
            {errors.email && <span style={{ color: "red", fontSize: "small" }}>is required</span>}

          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <label className="col-form-label">Password</label>
            {/* <input className="form-control" type="password" /> */}
            <input
              className="form-control"
              type="password"
              {...register("pass", {
                required: true,
                onChange: (e) => {
                  e.persist();
                  // setStart(e.target.value);
                  if (e) setValue("pass", e.target.value);
                  else setValue("pass", null);
                },
              })}
            />
            {errors.pass && <span style={{ color: "red", fontSize: "small" }}>is required</span>}

          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <label className="col-form-label">Confirm Password</label>
            <input
              className="form-control"
              type="password"
              {...register("repass", {
                required: true,
                onChange: (e) => {
                  e.persist();
                  // setStart(e.target.value);
                  if (e) setValue("repass", e.target.value);
                  else setValue("repass", null);
                },
              })}
            />
            {errors.repass && <span style={{ color: "red", fontSize: "small" }}>is required</span>}

          </div>
        </div>

        <div className="col-sm-6">
          <div className="form-group">
            <label className="col-form-label">Joining Date <span className="text-danger">*</span></label>
            <div className="">
              {/* <input className="form-control datetimepicker" type="text" /> */}
              <input
                className="form-control"
                type="date"
                {...register("jdate", {
                  required: true,
                  onChange: (e) => {
                    e.persist();
                    // setStart(e.target.value);
                    if (e) setValue("jdate", e.target.value);
                    else setValue("jdate", null);
                  },
                })}
              />
              {errors.jdate && <span style={{ color: "red", fontSize: "small" }}>is required</span>}

            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <label className="col-form-label">Phone </label>
            {/* <input className="form-control" type="text" /> */}
            <input
              className="form-control"
              type="text"
              {...register("phone", {
                required: true,
                onChange: (e) => {
                  e.persist();
                  // setStart(e.target.value);
                  if (e) setValue("phone", e.target.value);
                  else setValue("phone", null);
                },
              })}
            />
            {errors.phone && <span style={{ color: "red", fontSize: "small" }}>is required</span>}

          </div>
        </div>
      </div>

      <div className="submit-section">
        <button className="btn btn-primary submit-btn" type="submit">Submit</button>
      </div>
    </form>

  )
}

export default AddEmployeemodal
