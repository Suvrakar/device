import React, { useEffect, useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { useToastify } from '../../../Contexts/ToastContext';

const axios = require('axios');
import tick from "../../../assets/img/tick.png"
import x from "../../../assets/img/x.png"

const AddDevice = ({ }) => {
  const { startLoading, stopLoading, successToast, errorToast } =
    useToastify();

  const [state, setstate] = useState();

  const checkIP = async () => {
    const ipAddress = getValues("ip")
    try {
      startLoading()
      let res = await axios.post(`http://localhost:8000/devices/ping`, { "ip": ipAddress }, {
      });
      // console.log(res.status)
      setstate(res.status)
      stopLoading()
      return res
    }
    catch (error) {
      startLoading()
      setstate(error.response.status)
      stopLoading()
      return { error }
    }
  }

  const closeEdit = () => {
    $("#modal1").modal("hide");
    setValue("ip", "");
    setValue("name", "");
    setValue("description", "");
    // setstate("")
  };


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
    setValue("ip");
    setValue("name");
    setValue("description");
  }, []);



  const onSubmit = async (data) => {
    try {
      let res = await axios.post(`http://localhost:8000/devices`, data, {
      });
      successToast("Device Added")
      closeEdit()
      return res
    } catch (error) {
      errorToast("Error")
      return { error }
    }
    // console.log(data)
  };

  // const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row" id="modal1">
        <div className="col-sm-12">
          <div className="form-group">
            <label className="col-form-label">Device IP <span className="text-danger">*</span></label>
            {/* <input className="form-control" type="text" /> */}
            <input
              className="form-control"
              type="text"
              {...register("ip", {
                required: true,
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
        <div className="col-sm-12 d-flex justify-content-center">
          {/* <Button></Button> */}
          <button className="btn btn-primary submit-btn px-5" type="button" onClick={() => checkIP()} >Test IP Address</button>
          <div className='mx-3'>
            {state === 200 ? <img style={{ height: 50, width: 50, }} src={tick} /> : state !== undefined ? <img style={{ height: 50, width: 50, }} src={x} /> : <div></div>

            }

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

  )
}

export default AddDevice
